import { graphTablesGFA } from '@jbrowse/bandage-core/gfa/graphTables'
import { WalkReader, walksKept } from '@jbrowse/graph-walks'

import { openIndexed } from './tabix-cut.mjs'

// Ports BandageJS's cutWalksRegion: the reference over the region with
// `context` bp either side, and the walks of the haplotypes asked for, every
// one when none are, as GFA text
export async function cutWalks({
  file,
  index,
  refName,
  start,
  end,
  haplotypes,
  context,
}) {
  const reader = new WalkReader(openIndexed(file, index))
  const header = await reader.header()
  const sample = header.references[0] ?? ''
  const anchor = await reader.sequenceFor(sample, refName)
  if (anchor === undefined) {
    const names = await reader.referenceSequences()
    throw new Error(
      `the walk file has no sequence ${refName} on ${sample}; it holds ${names.slice(0, 5).join(', ')}${names.length > 5 ? ', ...' : ''}`,
    )
  }
  const { graph, kept, fragments } = await reader.cut(
    anchor,
    { start, end },
    { context, keep: walksKept(haplotypes, anchor) },
  )
  return {
    gfa: graphTablesGFA(graph.tables(kept, fragments)),
    refName: anchor,
  }
}
