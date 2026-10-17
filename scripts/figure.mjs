import {
  figureData,
  laidOutGraph,
  walkLayers,
} from '@jbrowse/bandage-core/figureData'
import { parseRegion } from '@jbrowse/bandage-core/gbzCut'
import { backboneGenes } from '@jbrowse/bandage-core/genes/backboneGenes'
import { walkRowReadout } from '@jbrowse/bandage-core/layout/walkRowDraw'
import { walkRows as cutRows } from '@jbrowse/bandage-core/layout/walkRows'
import { loadGraph } from '@jbrowse/bandage-core/pipeline'

import { openIndexed } from './tabix-cut.mjs'

// R sends NULL as {}
function geneSource({ file, index, ...rest } = {}) {
  if (index) {
    return { indexed: openIndexed(file, index), ...rest }
  }
  return rest.text === undefined ? undefined : rest
}

export async function figure(text, name, spec, genes) {
  const region = spec.region ? parseRegion(spec.region) : undefined
  const { graph, layout } = await laidOutGraph(text, name, region, spec)
  const source = geneSource(genes)
  const read = source ? await backboneGenes(graph, source) : { genes: [] }
  return {
    ...figureData(graph, layout, {
      ...spec,
      region,
      walks: walkLayers(spec.walks),
      genes: read.genes,
    }),
    unbound: read.unbound,
  }
}

// Each node a row's bar visits, at every bp offset it visits it
function barOf(row) {
  const offsets = new Map()
  for (const { node, start } of row.visits) {
    const at = offsets.get(node)
    if (at) {
      at.push(start)
    } else {
      offsets.set(node, [start])
    }
  }
  return { visits: row.visits, offsets }
}

function sharedBp(a, b, lengths) {
  let bp = 0
  for (const [id, visits] of a.offsets) {
    const other = b.offsets.get(id)
    if (other) {
      bp += (lengths.get(id) ?? 0) * Math.min(visits.length, other.length)
    }
  }
  return bp
}

// The reference first, then each row after the one it shares the most
// sequence with, so neighbours share as much as they can. A row cut from one
// flank has no bar to compare, so the next is compared with the last that has.
function sharedOrder(bars, lengths) {
  const order = [0]
  const rest = bars.map((_, i) => i).slice(1)
  while (rest.length) {
    const last = bars[[...order].reverse().find(i => bars[i]) ?? 0]
    let best = 0
    let bestBp = -1
    rest.forEach((i, k) => {
      const bp = last && bars[i] ? sharedBp(last, bars[i], lengths) : 0
      if (bp > bestBp) {
        best = k
        bestBp = bp
      }
    })
    order.push(...rest.splice(best, 1))
  }
  return order
}

// Whether a lower-row visit at `b` carries a run on. A run of one node may go
// either way.
function continues(run, b, len, join) {
  const low = run.dir === 0 ? run.b0 : run.b1
  if (run.dir >= 0 && b >= run.b1 && b - run.b1 <= join) {
    return 1
  }
  if (run.dir <= 0 && b + len <= low && low - b - len <= join) {
    return -1
  }
  return 0
}

// Every stretch two rows share, each a run of nodes both walk in step, joined
// across unshared stretches of `join` bp or less in both. `b0 > b1` where the
// lower row walks it backwards.
function sharedRuns(upper, lower, lengths, join) {
  const runs = []
  let open = []
  upper.visits.forEach(({ node, start: a }, k) => {
    const visits = lower.offsets.get(node)
    const len = lengths.get(node) ?? 0
    if (!visits || len === 0) {
      return
    }
    open = open.filter(run => a - run.a1 <= join)
    for (const b of visits) {
      let dir = 0
      const run = open.find(
        r => r.step !== k && (dir = continues(r, b, len, join)) !== 0,
      )
      if (!run) {
        const fresh = { a0: a, a1: a + len, b0: b, b1: b + len, dir: 0, step: k }
        runs.push(fresh)
        open.push(fresh)
      } else if (dir > 0) {
        Object.assign(run, { a1: a + len, b1: b + len, dir, step: k })
      } else {
        const high = run.dir === 0 ? run.b1 : run.b0
        Object.assign(run, { a1: a + len, b0: high, b1: b, dir, step: k })
      }
    }
  })
  return runs
}

// The heaviest set of runs in one order down both bars. Where a repeat's
// copies pair several ways between two rows, this keeps the pairing that
// holds the rows in step, and a copy one row has more of is left unjoined.
function chained(runs, join) {
  const sorted = runs
    .filter(r => r.a1 - r.a0 >= join)
    .sort((x, y) => x.a0 - y.a0)
  const lo = r => Math.min(r.b0, r.b1)
  const hi = r => Math.max(r.b0, r.b1)
  const best = []
  const prev = []
  sorted.forEach((run, i) => {
    best[i] = run.a1 - run.a0
    prev[i] = -1
    for (let j = 0; j < i; j++) {
      const q = sorted[j]
      const weight = best[j] + run.a1 - run.a0
      if (
        q.a1 <= run.a0 + join &&
        hi(q) <= lo(run) + join &&
        weight > best[i]
      ) {
        best[i] = weight
        prev[i] = j
      }
    }
  })
  const out = []
  let i = best.indexOf(Math.max(...best))
  while (i >= 0) {
    out.unshift(sorted[i])
    i = prev[i]
  }
  return out
}

// The ribbons between two neighbouring rows: the chained shared runs
function rowLinks(upper, lower, lengths, join) {
  return chained(sharedRuns(upper, lower, lengths, join), join)
}

// Blocks of nodes off the reference's path that two or more rows walk: the
// nodes one set of rows walks, joined where a row walks them within `join` bp
// of each other. offBlocks ranks blocks by bp over every visit, 0 for the
// most, so a block has one rank in every row, set by neither the rows' order
// nor the build order that created its nodes. It leaves out a block under
// 0.3% of the bp off the path, and returns each row's stretches of each block.
function offBlocks(bars, names, lengths, join) {
  const carriers = new Map()
  bars.forEach((bar, i) => {
    for (const { node, onReference } of bar?.visits ?? []) {
      if (!onReference) {
        carriers.set(node, (carriers.get(node) ?? new Set()).add(names[i]))
      }
    }
  })
  const setKey = new Map()
  for (const [id, rows] of carriers) {
    if (rows.size > 1) {
      setKey.set(id, [...rows].sort().join('\n'))
    }
  }
  const parent = new Map([...setKey.keys()].map(id => [id, id]))
  const find = id => {
    while (parent.get(id) !== id) {
      parent.set(id, parent.get(parent.get(id)))
      id = parent.get(id)
    }
    return id
  }
  for (const bar of bars) {
    const last = new Map()
    for (const { node: id, start } of bar?.visits ?? []) {
      const key = setKey.get(id)
      if (key === undefined) {
        continue
      }
      const prev = last.get(key)
      if (prev && start - prev.end <= join) {
        parent.set(find(id), find(prev.id))
      }
      last.set(key, { id, end: start + (lengths.get(id) ?? 0) })
    }
  }
  const total = new Map()
  const least = new Map()
  let offBp = 0
  for (const bar of bars) {
    for (const { node: id, onReference } of bar?.visits ?? []) {
      if (onReference) {
        continue
      }
      const bp = lengths.get(id) ?? 0
      offBp += bp
      if (setKey.has(id)) {
        const root = find(id)
        total.set(root, (total.get(root) ?? 0) + bp)
        least.set(root, [least.get(root) ?? id, id].sort()[0])
      }
    }
  }
  const ranked = [...total.keys()]
    .filter(root => total.get(root) >= offBp * 0.003)
    .sort((a, b) => total.get(b) - total.get(a) || (least.get(a) < least.get(b) ? -1 : 1))
  const rank = new Map(ranked.map((root, i) => [root, i]))
  const spans = []
  bars.forEach((bar, i) => {
    let last
    for (const { node: id, start } of bar?.visits ?? []) {
      const block = setKey.has(id) ? rank.get(find(id)) : undefined
      if (block === undefined) {
        continue
      }
      const end = start + (lengths.get(id) ?? 0)
      if (last && last.block === block && start - last.end <= join) {
        last.end = end
      } else {
        last = { row: i, start, end, block }
        spans.push(last)
      }
    }
  })
  return spans.map(({ row, start, end, block }) => ({ row, start, bp: end - start, block }))
}

function columns(records, keys) {
  return Object.fromEntries(keys.map(k => [k, records.map(r => r[k])]))
}

// cutRows' rows and runs, with ribbons joining the nodes neighbouring rows
// share and blocks lettering the stretches off the reference several rows walk
export function walkRows(text, name, spec) {
  const region = spec.region ? parseRegion(spec.region) : undefined
  const graph = loadGraph(text, name, { referencePath: spec.referencePath })
  const cut = cutRows(graph, region, undefined, { visits: true })
  if (!cut) {
    throw new Error(
      'walk rows need a reference walk and at least one other walk (P or W lines)',
    )
  }
  const cutAll = [cut.reference, ...cut.rows]
  const lengths = new Map(graph.nodes.map(n => [n.id, n.length]))
  const cutBars = cutAll.map(row => (row.complete ? barOf(row) : undefined))
  const order =
    spec.order === 'shared'
      ? sharedOrder(cutBars, lengths)
      : cutAll.map((_, i) => i)
  const all = order.map(i => cutAll[i])
  const bars = order.map(i => cutBars[i])
  const join = spec.join ?? Math.max(...all.map(r => r.bp)) / 2000

  const runs = all.flatMap((row, i) =>
    row.runs.map(run => ({
      row: i,
      start: run.start,
      bp: run.bp,
      onReference: run.onReference,
      gap: !!run.gap,
      cause: run.gap ? (run.cause ?? 'outside') : null,
      referenceStart: run.referenceStart ?? null,
      reversed: !!run.reversed,
    })),
  )
  const links = []
  for (let i = 0; i + 1 < all.length; i++) {
    if (bars[i] && bars[i + 1]) {
      const pair = rowLinks(bars[i], bars[i + 1], lengths, join)
      links.push(...pair.map(link => ({ row: i, ...link })))
    }
  }

  return {
    origin: cut.origin,
    reference: cut.reference.name,
    rows: {
      row: all.map((_, i) => i),
      name: all.map(r => r.name),
      label: all.map(r => r.label),
      sample: all.map(r => r.sample),
      bp: all.map(r => r.bp),
      offReferenceBp: all.map(r => r.offReferenceBp),
      complete: all.map(r => r.complete),
      linked: bars.map(bar => bar !== undefined),
      readout: all.map((r, i) =>
        walkRowReadout(r, order[i] === 0 ? undefined : cut.reference),
      ),
    },
    runs: columns(runs, [
      'row',
      'start',
      'bp',
      'onReference',
      'gap',
      'cause',
      'referenceStart',
      'reversed',
    ]),
    links: columns(links, ['row', 'a0', 'a1', 'b0', 'b1']),
    blocks: columns(
      offBlocks(bars, all.map(r => r.name), lengths, join),
      ['row', 'start', 'bp', 'block'],
    ),
  }
}
