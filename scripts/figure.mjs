import {
  figureData,
  laidOutGraph,
  walkLayers,
} from '@jbrowse/bandage-core/figureData'
import { parseRegion } from '@jbrowse/bandage-core/gbzCut'
import { backboneGenes } from '@jbrowse/bandage-core/genes/backboneGenes'
import { walkRowReadout } from '@jbrowse/bandage-core/layout/walkRowDraw'
import {
  ribbonJoin,
  sharedRowOrder,
  walkRowBlocks,
  walkRowLinks,
} from '@jbrowse/bandage-core/layout/walkRowLinks'
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
  const picked = spec.haplotypes
    ? cut.rows.filter(r =>
        spec.haplotypes.some(h => r.name === h || r.name.startsWith(`${h}#`)),
      )
    : cut.rows
  const cutAll = [cut.reference, ...picked]
  const order =
    spec.order === 'shared' ? sharedRowOrder(cutAll) : cutAll.map((_, i) => i)
  const all = order.map(i => cutAll[i])
  const join = spec.join ?? ribbonJoin(all)

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
      linked: all.map(r => r.complete),
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
    links: columns(walkRowLinks(all, join), ['row', 'a0', 'a1', 'b0', 'b1']),
    blocks: columns(walkRowBlocks(all, join), ['row', 'start', 'bp', 'block']),
  }
}
