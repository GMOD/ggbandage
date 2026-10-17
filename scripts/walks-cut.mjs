import { graphTablesGFA } from '@jbrowse/bandage-core/gfa/graphTables'
import { WalkReader } from '@jbrowse/graph-walks'

import { openIndexed } from './tabix-cut.mjs'

// The reference over the region with `context` bp either side, and the walks
// of the haplotypes asked for, every one when none are, as GFA text. A browser
// caps a cut's bytes and nodes; R asks for one region and waits, so this
// doesn't.
export async function cutWalks({
  file,
  index,
  refName,
  start,
  end,
  haplotypes,
  context,
}) {
  const { tables, refName: anchor } = await new WalkReader(
    openIndexed(file, index),
  ).cutRegion({ refName, start, end }, { haplotypes, context })
  return { gfa: graphTablesGFA(tables), refName: anchor }
}
