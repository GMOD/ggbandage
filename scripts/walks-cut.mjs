import { graphTablesGFA } from '@jbrowse/bandage-core/gfa/graphTables'
import { CUT_PRESETS, WalkReader } from '@jbrowse/graph-walks'

import { openFile } from './tabix-cut.mjs'

// The reference over the region with `context` bp either side, the browser
// readers' by default, and the walks of the haplotypes asked for, every one
// when none are, as graph tables with every departure from the reference over
// the cut, which no GFA line states. The cut follows the browser readers'
// rules, graph-walks' figure preset, so a region draws the graph they draw;
// R asks for one region and waits, so the preset lifts every budget, and this
// cut reads every abridged walk in full.
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
      ...CUT_PRESETS.figure,
      ...(context === undefined ? {} : { context }),
      haplotypes,
      expand: () => true,
    },
  )
  return { tables, region: { refName: anchor, start, end } }
}

// The cut's nodes, links and walks as GFA text, which drops its departures
export async function cutWalks(request) {
  return graphTablesGFA((await walkCut(request)).tables)
}
