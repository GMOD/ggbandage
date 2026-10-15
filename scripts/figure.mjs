import {
  figureData,
  laidOutGraph,
  walkLayers,
} from '@jbrowse/bandage-core/figureData'
import { figureScene } from '@jbrowse/bandage-core/figureScene'
import { parseRegion } from '@jbrowse/bandage-core/gbzCut'
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
  const pins = { gene: [], x: [], y: [], covered: [] }
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
    ...(await pinRows(graph, layout, genes)),
  }
}

export function walkRows(text, name, spec) {
  const region = spec.region ? parseRegion(spec.region) : undefined
  const graph = loadGraph(text, name, { referencePath: spec.referencePath })
  const cut = cutRows(graph, region)
  if (!cut) {
    throw new Error(
      'walk rows need a reference walk and at least one other walk (P or W lines)',
    )
  }
  const all = [cut.reference, ...cut.rows]
  const runs = {
    row: [],
    start: [],
    bp: [],
    onReference: [],
    gap: [],
    referenceStart: [],
  }
  all.forEach((row, i) => {
    for (const run of row.runs) {
      runs.row.push(i)
      runs.start.push(run.start)
      runs.bp.push(run.bp)
      runs.onReference.push(run.onReference)
      runs.gap.push(!!run.gap)
      runs.referenceStart.push(run.referenceStart ?? null)
    }
  })
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
        walkRowReadout(r, i === 0 ? undefined : cut.reference),
      ),
    },
    runs,
  }
}
