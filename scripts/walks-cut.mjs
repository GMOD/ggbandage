import { graphTablesGFA } from '@jbrowse/bandage-core/gfa/graphTables'
import { WalkReader } from '@jbrowse/graph-walks'

import { openIndexed } from './tabix-cut.mjs'

// The reference over the region with `context` bp either side, and the walks
// of the haplotypes asked for, every one when none are, as graph tables with
// every departure from the reference over the cut, which no GFA line states.
// A browser caps a cut's reads and draws an abridged walk as a block until
// asked; R asks for one region and waits, so this cut lifts every budget and
// reads every abridged walk in full.
export async function walkCut({
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
  ).cutRegion(
    { refName, start, end },
    {
      haplotypes,
      context,
      expand: () => true,
      stepBudget: Infinity,
      byteBudget: Infinity,
      departureByteBudget: Infinity,
    },
  )
  return { tables, region: { refName: anchor, start, end } }
}

// The cut's nodes, links and walks as GFA text, which drops its departures
export async function cutWalks(request) {
  return graphTablesGFA((await walkCut(request)).tables)
}
