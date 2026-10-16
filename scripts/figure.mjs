import {
  figureData,
  laidOutGraph,
  walkLayers,
} from '@jbrowse/bandage-core/figureData'
import { figureScene } from '@jbrowse/bandage-core/figureScene'
import { parseRegion } from '@jbrowse/bandage-core/gbzCut'
import { pathOrigin } from '@jbrowse/bandage-core/pathAnchoring'
import { genesFromText } from '@jbrowse/bandage-core/genes/geneFiles'
import { genePins } from '@jbrowse/bandage-core/genes/genePins'
import { walkRowReadout } from '@jbrowse/bandage-core/layout/walkRowDraw'
import { walkRows as cutRows } from '@jbrowse/bandage-core/layout/walkRows'
import { loadGraph } from '@jbrowse/bandage-core/pipeline'
import {
  featuresOnBackbone,
  graphBackbone,
  refNameBinding,
} from '@jbrowse/bandage-core/reference'
import { encodingStops } from '@jbrowse/bandage-core/walkEncoding'

import { openIndexed } from './tabix-cut.mjs'

// What figureData leaves to figureSvg, as tables: each lifted walk's key, the
// genes pinned on the backbone, and the walks as bars on their own bp

const hex = css =>
  css.replace(
    /^rgba?\((\d+),\s*(\d+),\s*(\d+).*\)$/,
    (_, ...rgb) =>
      `#${rgb
        .slice(0, 3)
        .map(v => (+v).toString(16).padStart(2, '0'))
        .join('')}`,
  )

function keyRows(scene) {
  const { lift, facets, labelOf, keyText } = scene
  const walks = facets ? facets.panels.map(p => p.walks[0]) : (lift?.walks ?? [])
  const rows = { panel: [], walk: [], note: [], scale: [], stops: [] }
  for (const walk of walks) {
    const text = keyText(walk)
    rows.panel.push(facets ? labelOf(walk.name) : '')
    rows.walk.push(labelOf(walk.name))
    rows.note.push(text.note)
    rows.scale.push(text.scale ?? '')
    rows.stops.push(
      encodingStops(walk.encoding)
        .map(s => hex(s.color))
        .join(','),
    )
  }
  return rows
}

// Ports bandage-figure's readGenes: an indexed file is read over each
// backbone contig alone
async function genesOf(genes, graph) {
  const backbone = graphBackbone(graph)
  if (!backbone || (!genes?.file && genes?.text === undefined)) {
    return []
  }
  let text = genes.text
  if (genes.index) {
    const bind = refNameBinding(
      backbone.contigs.map(c => c.refName),
      genes.refNames,
    )
    const file = openIndexed(genes.file, genes.index)
    const names = await file.getReferenceSequenceNames()
    const lines = []
    for (const contig of backbone.contigs) {
      const name = names.find(n => bind(n) === contig.refName)
      if (name !== undefined) {
        await file.getLines(name, contig.start, contig.end, {
          lineCallback: line => lines.push(line),
        })
      }
    }
    text = lines.join('\n')
  }
  return featuresOnBackbone(
    genesFromText(text, genes.format),
    backbone,
    genes.refNames,
  )
}

const POINT = /[ML](-?[\d.e-]+),(-?[\d.e-]+)/g

async function pinRows(graph, layout, genes) {
  const pins = { gene: [], x: [], y: [], covered: [], bp: [] }
  const exons = { gene: [], node: [], stretch: [], x: [], y: [] }
  let stretch = 0
  for (const pin of genePins(
    graph,
    await genesOf(genes, graph),
    layout.nodePositions,
  )) {
    pins.gene.push(pin.gene.name)
    pins.x.push(pin.at.x)
    pins.y.push(pin.at.y)
    pins.covered.push(pin.covered)
    pins.bp.push(pin.gene.end - pin.gene.start)
    for (const { nodeId, d } of pin.exonsByNode) {
      for (const part of d.split('M').filter(Boolean)) {
        stretch++
        for (const [, x, y] of `M${part}`.matchAll(POINT)) {
          exons.gene.push(pin.gene.name)
          exons.node.push(nodeId)
          exons.stretch.push(stretch)
          exons.x.push(+x)
          exons.y.push(+y)
        }
      }
    }
  }
  return { pins, exons }
}

export async function figure(text, name, spec, genes) {
  const region = spec.region ? parseRegion(spec.region) : undefined
  const { graph, layout } = await laidOutGraph(text, name, region, spec)
  const options = { ...spec, region, walks: walkLayers(spec.walks) }
  const scene = figureScene(graph, layout, options)
  return {
    ...figureData(graph, layout, options),
    keys: keyRows(scene),
    walkNames: [...new Set((graph.paths ?? []).map(p => p.name))],
    ...(await pinRows(graph, layout, genes)),
  }
}

// A walk's steps in contig order, as cutRows reads them: a node id, or between
// two pieces the bp of contig the cut does not hold, as a number
function stepsOf(pieces, lengths) {
  const out = []
  let end
  for (const piece of [...pieces].sort((a, b) => (a.start ?? 0) - (b.start ?? 0))) {
    if (end !== undefined && piece.start !== undefined && piece.start > end) {
      out.push(piece.start - end)
    }
    let bp = 0
    for (const id of piece.nodeIds) {
      out.push(id)
      bp += lengths.get(id) ?? 0
    }
    end = piece.start === undefined ? undefined : piece.start + bp
  }
  return out
}

// The steps of a row's bar, cut between the reference nodes flanking the
// region as cutRows cuts a walk that reaches both
function barSteps(steps, reference, region) {
  if (!region) {
    return steps
  }
  let i0 = -1
  let i1 = -1
  let bestEnd = -Infinity
  let bestStart = Infinity
  steps.forEach((id, i) => {
    const span = typeof id === 'string' ? reference.get(id) : undefined
    if (span && span.end <= region.start && span.end > bestEnd) {
      bestEnd = span.end
      i0 = i
    }
    if (span && span.start >= region.end && span.start < bestStart) {
      bestStart = span.start
      i1 = i
    }
  })
  if (i0 < 0 || i1 < 0) {
    return steps
  }
  const slice = steps.slice(Math.min(i0, i1) + 1, Math.max(i0, i1))
  return i0 < i1 ? slice : slice.reverse()
}

// Each step's bp offset along the bar, and each node's offset at every visit
function barOf(steps, lengths) {
  const at = []
  const offsets = new Map()
  let bp = 0
  for (const step of steps) {
    at.push(bp)
    if (typeof step === 'number') {
      bp += step
    } else {
      const visits = offsets.get(step)
      if (visits) {
        visits.push(bp)
      } else {
        offsets.set(step, [bp])
      }
      bp += lengths.get(step) ?? 0
    }
  }
  return { steps, at, offsets, bp }
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
// sequence with, so neighbours share as much as they can
function sharedOrder(bars, lengths) {
  const order = [0]
  const rest = bars.map((_, i) => i).slice(1)
  while (rest.length) {
    const last = bars[order.at(-1)]
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

// A row's bar as stretches of one source, the first row down that carries
// the node, or -1 for contig the cut does not hold, a stretch shorter than
// `join` given the source of the one before it
function spansOf(bar, row, first, lengths, join) {
  const spans = []
  bar.steps.forEach((step, k) => {
    const gap = typeof step === 'number'
    const bp = gap ? step : (lengths.get(step) ?? 0)
    if (bp === 0) {
      return
    }
    const source = gap ? -1 : (first.get(step) ?? row)
    const last = spans.at(-1)
    if (last && last.source === source) {
      last.bp += bp
    } else {
      spans.push({ start: bar.at[k], bp, source })
    }
  })
  const out = []
  for (const span of spans) {
    const last = out.at(-1)
    const absorb = span.bp < join || last?.source === span.source
    if (last && span.source !== -1 && last.source !== -1 && absorb) {
      last.bp += span.bp
    } else {
      out.push(span)
    }
  }
  return out
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
  upper.steps.forEach((id, k) => {
    const visits = lower.offsets.get(id)
    const len = typeof id === 'string' ? (lengths.get(id) ?? 0) : 0
    if (!visits || len === 0) {
      return
    }
    const a = upper.at[k]
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

// The ribbons between two neighbouring rows: the chained shared runs, cut
// where the upper row's spans change source, each piece 4 `join` across or
// more
function rowLinks(upper, lower, lengths, spans, join) {
  const links = []
  for (const run of chained(sharedRuns(upper, lower, lengths, join), join)) {
    const along = a =>
      run.b0 + ((a - run.a0) * (run.b1 - run.b0)) / (run.a1 - run.a0)
    for (const span of spans) {
      const a0 = Math.max(run.a0, span.start)
      const a1 = Math.min(run.a1, span.start + span.bp)
      if (a1 - a0 >= 4 * join && span.source >= 0) {
        links.push({ a0, a1, b0: along(a0), b1: along(a1), source: span.source })
      }
    }
  }
  return links
}


function columns(records, keys) {
  return Object.fromEntries(keys.map(k => [k, records.map(r => r[k])]))
}

// cutRows' rows, and what it leaves out: each node's offset along its bar, so
// the rows can be ordered by what neighbours share, coloured by which row
// first carries each stretch, and joined by ribbons where neighbours share it
export function walkRows(text, name, spec) {
  const region = spec.region ? parseRegion(spec.region) : undefined
  const graph = loadGraph(text, name, { referencePath: spec.referencePath })
  const cut = cutRows(graph, region)
  if (!cut) {
    throw new Error(
      'walk rows need a reference walk and at least one other walk (P or W lines)',
    )
  }
  const cutAll = [cut.reference, ...cut.rows]
  const lengths = new Map(graph.nodes.map(n => [n.id, n.length]))
  const piecesOf = new Map()
  for (const path of graph.paths ?? []) {
    const key = pathOrigin(path.name).name
    piecesOf.set(key, [...(piecesOf.get(key) ?? []), path])
  }
  const reference = new Map()
  for (const piece of piecesOf.get(pathOrigin(cut.reference.name).name)) {
    let pos = piece.start ?? 0
    for (const id of piece.nodeIds) {
      const len = lengths.get(id) ?? 0
      if (!reference.has(id)) {
        reference.set(id, { start: pos, end: pos + len })
      }
      pos += len
    }
  }
  const cutBars = cutAll.map(row => {
    const steps = stepsOf(piecesOf.get(pathOrigin(row.name).name), lengths)
    const bar = barOf(barSteps(steps, reference, region), lengths)
    return row.complete && bar.bp === row.bp ? bar : undefined
  })
  const order =
    spec.order === 'shared'
      ? sharedOrder(cutBars, lengths)
      : cutAll.map((_, i) => i)
  const all = order.map(i => cutAll[i])
  const bars = order.map(i => cutBars[i])
  const join = spec.join ?? Math.max(...all.map(r => r.bp)) / 2000

  const first = new Map()
  bars.forEach((bar, i) => {
    for (const id of bar?.offsets.keys() ?? []) {
      if (!first.has(id)) {
        first.set(id, i)
      }
    }
  })
  const rowSpans = all.map((row, i) =>
    bars[i]
      ? spansOf(bars[i], i, first, lengths, join)
      : row.runs.map(run => ({
          start: run.start,
          bp: run.bp,
          source: run.gap ? -1 : run.onReference ? 0 : i,
        })),
  )
  const spans = rowSpans.flatMap((s, i) => s.map(span => ({ row: i, ...span })))

  const links = []
  for (let i = 0; i + 1 < all.length; i++) {
    if (bars[i] && bars[i + 1]) {
      const pair = rowLinks(bars[i], bars[i + 1], lengths, rowSpans[i], join)
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
      readout: all.map((r, i) =>
        walkRowReadout(r, order[i] === 0 ? undefined : cut.reference),
      ),
    },
    spans: columns(spans, ['row', 'start', 'bp', 'source']),
    links: columns(links, ['row', 'a0', 'a1', 'b0', 'b1', 'source']),
  }
}
