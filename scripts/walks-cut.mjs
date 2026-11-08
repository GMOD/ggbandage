import { graphTablesGFA } from '@jbrowse/bandage-core/gfa/graphTables'
import { WalkReader } from '@jbrowse/graph-walks'

import { openFile } from './tabix-cut.mjs'

// The reference over the region with `context` bp either side, and the walks
// of the haplotypes asked for, every one when none are, as graph tables with
// every departure from the reference over the cut, which no GFA line states.
// A browser caps a cut's reads, draws an abridged walk as a block until
// asked, and attaches a departure's own steps only up to a size and a number
// of tile fetches; R asks for one region and waits, so this cut lifts every
// budget, reads every abridged walk in full and attaches every departure's
// own steps.
export async function walkCut({
  file,
  refName,
  start,
  end,
  haplotypes,
  context,
}) {
  const { tables, refName: anchor } = await WalkReader.open(
    file,
    openFile,
  ).cutRegion(
    { refName, start, end },
    {
      haplotypes,
      context,
      expand: () => true,
      stepBudget: Infinity,
      byteBudget: Infinity,
      departureByteBudget: Infinity,
      attachBp: Infinity,
      attachFetches: Infinity,
    },
  )
  return { tables, region: { refName: anchor, start, end } }
}

// The cut's nodes, links and walks as GFA text, which drops its departures
export async function cutWalks(request) {
  return graphTablesGFA((await walkCut(request)).tables)
}
