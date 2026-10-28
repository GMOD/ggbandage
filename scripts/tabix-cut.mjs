import { TabixIndexedFile } from '@gmod/tabix'
import { rgfaCut } from '@jbrowse/graph-walks'

import { rangeFile } from './v8-host.mjs'

const fetchRange = 'ggbandage:::fetch_range'

export function openIndexed(file, index) {
  return new TabixIndexedFile({
    filehandle: rangeFile(fetchRange, file),
    [/\.csi([?#]|$)/.test(index) ? 'csiFilehandle' : 'tbiFilehandle']:
      rangeFile(fetchRange, index),
    chunkCacheIdleTimeoutMs: 0,
  })
}

function resolveName(names, refName) {
  if (names.includes(refName)) {
    return refName
  }
  const ends = names.filter(n => n.endsWith(`#${refName}`))
  if (ends.length === 1) {
    return ends[0]
  }
  if (ends.length > 1) {
    throw new Error(
      `${refName} names ${ends.length} sequences in the index (${ends.join(', ')}): give one in full`,
    )
  }
  throw new Error(
    `${refName} is not in the index, which has ${names.slice(0, 5).join(', ')}${names.length > 5 ? ', ...' : ''}`,
  )
}

// The graph under a region of a gfa-to-tabix segment index, as GFA text, cut
// as the JBrowse graph plugin cuts it: one hop past the window on a
// contig-layout index
export async function cutTabix({
  segments,
  segmentsIndex,
  links,
  linksIndex,
  refName,
  start,
  end,
}) {
  const files = {
    segments: openIndexed(segments, segmentsIndex),
    links: openIndexed(links, linksIndex),
  }
  const name = resolveName(
    await files.segments.getReferenceSequenceNames(),
    refName,
  )
  return rgfaCut(files, { refName: name, start, end }, { hops: 1 })
}

// The lines of an indexed file under a region, as one string
export async function indexedLines({ file, index, refName, start, end }) {
  const tabix = openIndexed(file, index)
  const names = await tabix.getReferenceSequenceNames()
  // a VCF names the reference's contig bare where the graph says GRCh38#0#chr4
  const contig = refName.split('#').at(-1)
  const name = resolveName(
    names,
    names.includes(refName) || !names.includes(contig) ? refName : contig,
  )
  const lines = []
  await tabix.getLines(name, start, end, line => {
    lines.push(line)
  })
  return lines.join('\n')
}
