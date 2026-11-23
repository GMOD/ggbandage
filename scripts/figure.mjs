import { figureData, walkLayers } from '@jbrowse/bandage-core/figureData'
import { figureFit } from '@jbrowse/bandage-core/figureSettings'

export { walkRowInks } from '@jbrowse/bandage-core/figureData'
export { EXON_COLOR } from '@jbrowse/bandage-core/genes/exonOutline'
import { parseRegion } from '@jbrowse/bandage-core/gbzCut'
import { backboneGenes } from '@jbrowse/bandage-core/genes/backboneGenes'
import {
  GAP_CAUSE_TEXT,
  NOT_LOADED_TEXT,
} from '@jbrowse/bandage-core/gfa/departures'
import {
  BREAK_TEXT,
  NOT_COMPARED_TEXT,
  barEnd,
  gapStyle,
  reversedText,
  walkRowReadout,
} from '@jbrowse/bandage-core/layout/walkRowDraw'
import {
  ribbonJoin,
  sharedRowOrder,
  walkRowBlocks,
  walkRowLinks,
} from '@jbrowse/bandage-core/layout/walkRowLinks'
import { walkRows as cutRows } from '@jbrowse/bandage-core/layout/walkRows'
import { layoutEngine } from '@jbrowse/bandage-core/layoutEngines'
import { layoutModeByValue } from '@jbrowse/bandage-core/layoutModes'
import { withFrequencies } from '@jbrowse/bandage-core/nodeWidths'
import { abgrHex } from '@jbrowse/bandage-core/renderer/colorBits'
import {
  NOT_LOADED_COLOR,
  NOT_LOADED_FILL_COLOR,
} from '@jbrowse/bandage-core/renderer/GeometryBuilder'
import {
  drawingBounds,
  engineSettingsOf,
  fitTransform,
  forceLayout,
  loadGraph,
} from '@jbrowse/bandage-core/pipeline'
import { axisScaleOf, viewportOf } from '@jbrowse/bandage-core/viewport'

import { openIndexed } from './tabix-cut.mjs'
import { walkCut } from './walks-cut.mjs'

// The graph a source holds and the region it is read under: GFA text, with
// the region R names, or a walk file's cut as tables, which keep the
// departures and trimmed bp GFA text has no line for, under the region on the
// sequence the cut anchored to
async function loaded(source, name, spec) {
  const options = { referencePath: spec.referencePath }
  if (source.walks) {
    const { tables, region } = await walkCut(source.walks)
    return { graph: loadGraph(tables, name, options), region }
  }
  return {
    graph: loadGraph(source.text, name, options),
    region: spec.region ? parseRegion(spec.region) : undefined,
  }
}

// R sends NULL as {}
function geneSource({ file, index, ...rest } = {}) {
  if (index) {
    return { indexed: openIndexed(file, index), ...rest }
  }
  return rest.text === undefined ? undefined : rest
}

// A walk named in full, or every walk a prefix such as sample#haplotype begins
function namesWalk(prefix, name) {
  return (
    name === prefix ||
    [`${prefix}#`, `${prefix}:`].some(start => name.startsWith(start))
  )
}

function liftedWalks(graph, walks = []) {
  const names = [...new Set((graph.paths ?? []).map(p => p.name))]
  const lifted = walkLayers(walks).map(layer =>
    names.includes(layer.walk)
      ? [layer]
      : names
          .filter(n => namesWalk(layer.walk, n))
          .map(walk => ({ ...layer, walk })),
  )
  return {
    walks: lifted.flat(),
    unmatched: walks.filter((_, i) => lifted[i].length === 0),
  }
}

// bandage-core's laidOutGraph, over a loaded graph, since it takes text only
async function laidOut(source, name, spec) {
  const { graph: plain, region } = await loaded(source, name, spec)
  const graph = withFrequencies(plain, spec.frequencies)
  const layout =
    layoutModeByValue(spec.layout ?? 'force').run(graph, region) ??
    (
      await forceLayout(
        graph,
        engineSettingsOf(spec),
        layoutEngine,
        figureFit(spec),
      )
    ).result
  return { graph, layout, region }
}

// The width by height px pane figureData fits the drawing and its labels to,
// in layout units
function paneOf(layout, region, { width, height, fitToDrawing }) {
  const pixelRows = layout.pixelRows ?? false
  const bounds = drawingBounds(layout, {
    region: fitToDrawing ? undefined : region,
  })
  const fit = fitTransform(bounds, width, height, pixelRows)
  return viewportOf(fit, axisScaleOf(fit.scale, pixelRows), width, height)
}

export async function figure(source, name, spec, genes) {
  const { graph, layout, region } = await laidOut(source, name, spec)
  const pins = geneSource(genes)
  const read = pins ? await backboneGenes(graph, pins) : { genes: [] }
  const { walks, unmatched } = liftedWalks(graph, spec.walks)
  return {
    ...figureData(graph, layout, {
      ...spec,
      region,
      walks,
      genes: read.genes,
    }),
    pane: paneOf(layout, region, spec),
    unmatched,
    unbound: read.unbound,
  }
}

function columns(records, keys) {
  return Object.fromEntries(keys.map(k => [k, records.map(r => r[k])]))
}

// cutRows' rows and runs, with ribbons joining the nodes neighbouring rows
// share and blocks lettering the stretches off the reference several rows walk
export async function walkRows(source, name, spec) {
  const { graph, region } = await loaded(source, name, spec)
  const cut = cutRows(graph, region, undefined, { visits: true })
  if (!cut) {
    throw new Error(
      'walk rows need a reference walk and at least one other walk (P or W lines)',
    )
  }
  const haplotypes = spec.haplotypes ?? []
  const picked = spec.haplotypes
    ? cut.rows.filter(r => haplotypes.some(h => namesWalk(h, r.name)))
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
      unloaded: !!run.unloaded,
      heldBp: run.heldBp ?? null,
    })),
  )
  const breaks = all.flatMap((row, i) =>
    (row.axis?.breaks ?? []).map(b => ({ row: i, ...b })),
  )
  return {
    origin: cut.origin,
    reference: cut.reference.name,
    unmatched: haplotypes.filter(
      h => !cut.rows.some(r => namesWalk(h, r.name)),
    ),
    walkNames: [cut.reference, ...cut.rows].map(r => r.name),
    // the key's words, as bandage-core's walk rows key gives them: a gap
    // with no cause is a GFA's walk between two of its pieces
    causes: {
      ...GAP_CAUSE_TEXT,
      away: gapStyle('away', undefined, cut.reference.label).label,
      outside: gapStyle(undefined).label,
    },
    marks: { break: BREAK_TEXT, reversed: reversedText(cut.reference.label) },
    notLoaded: {
      text: NOT_LOADED_TEXT,
      fill: abgrHex(NOT_LOADED_FILL_COLOR),
      rim: abgrHex(NOT_LOADED_COLOR),
      notCompared: NOT_COMPARED_TEXT,
    },
    rows: {
      row: all.map((_, i) => i),
      name: all.map(r => r.name),
      label: all.map(r => r.label),
      sample: all.map(r => r.sample),
      bp: all.map(r => r.bp),
      end: all.map(barEnd),
      offReferenceBp: all.map(r => r.offReferenceBp),
      unloadedBp: all.map(r => r.unloadedBp ?? 0),
      linked: all.map(r => r.complete),
      stepless: all.map(r => !!r.stepless),
      placementChoice: all.map(r => !!r.placementChoice),
      contig: all.map(r => r.axis?.contig ?? null),
      contigStart: all.map(r => r.axis?.start ?? null),
      offset: all.map(r => r.axis?.offset ?? 0),
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
      'unloaded',
      'heldBp',
    ]),
    breaks: columns(breaks, ['row', 'at', 'bp', 'drawn']),
    links: columns(walkRowLinks(all, join), ['row', 'a0', 'a1', 'b0', 'b1']),
    blocks: columns(walkRowBlocks(all, join), ['row', 'start', 'bp', 'block']),
  }
}
