import { TabixIndexedFile } from '@gmod/tabix'
import { rgfaCut } from '@jbrowse/graph-walks'

// V8 has no file system or network, so the filehandles get bytes from R
// through console.r.call, as line-wrapped base64 that `bandageBase64` in the
// banner decodes.

function fromR(fn, ...args) {
  const [value] = console.r.call(`ggbandage:::${fn}`, args)
  return value
}

export function rangeFile(location) {
  const bytes = (position, length) =>
    bandageBase64(
      (fromR('fetch_range', location, position, length) ?? '').replace(
        /\s/g,
        '',
      ),
    )
  return {
    read: async (length, position) => bytes(position, length),
    readFile: async () => bytes(0, -1),
    close: async () => {},
  }
}

export function openIndexed(file, index) {
  return new TabixIndexedFile({
    filehandle: rangeFile(file),
    [index.endsWith('.csi') ? 'csiFilehandle' : 'tbiFilehandle']:
      rangeFile(index),
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
