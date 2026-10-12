import { TabixIndexedFile } from '@gmod/tabix'

// Ports RgfaTabixAdapter.getSubgraph from jbrowse-plugin-graphgenomeviewer.
// V8 has no file system or network, so the filehandles get bytes from R through
// console.r.call, as line-wrapped base64 that `bandageBase64` in the banner decodes.

const GFA_TAG = /^[A-Za-z][A-Za-z0-9]:[AifZJHB]:/

function fromR(fn, ...args) {
  const [value] = console.r.call(`ggbandage:::${fn}`, args)
  return value
}

function rangeFile(location) {
  const bytes = (position, length) =>
    bandageBase64(
      fromR('fetch_range', location, position, length).replace(/\s/g, ''),
    )
  return {
    read: async (length, position) => bytes(position, length),
    readFile: async () => bytes(0, -1),
    stat: async () => ({ size: Number(fromR('file_size', location)) }),
    close: async () => {},
  }
}

function openIndexed(file, index) {
  return new TabixIndexedFile({
    filehandle: rangeFile(file),
    tbiFilehandle: rangeFile(index),
    chunkCacheIdleTimeoutMs: 0,
  })
}

function parseSegment(line) {
  const cols = line.split('\t')
  if (cols.length < 8) {
    throw new Error(
      'the segment index is not anchored: rebuild it with gfa-to-tabix without --layout contig',
    )
  }
  return {
    id: cols[3],
    rank: +cols[4],
    refName: cols[5],
    start: +cols[6],
    end: +cols[7],
    tags: cols[8] ?? '',
  }
}

function endpoint(field) {
  return { id: field.slice(0, -1), strand: field.slice(-1) }
}

function parseLink(line) {
  const cols = line.split('\t')
  const source = endpoint(cols[3])
  const target = endpoint(cols[4])
  return {
    source: source.id,
    sourceStrand: source.strand,
    target: target.id,
    targetStrand: target.strand,
    sourceSegment: {
      id: source.id,
      refName: cols[5],
      start: +cols[6],
      end: +cols[7],
      rank: +cols[8],
      tags: cols[13] ?? '',
    },
    targetSegment: {
      id: target.id,
      refName: cols[9],
      start: +cols[10],
      end: +cols[11],
      rank: +cols[12],
      tags: cols[14] ?? '',
    },
  }
}

const linkKey = l => `${l.source}${l.sourceStrand}${l.target}${l.targetStrand}`

const compare = (a, b) => (a < b ? -1 : a > b ? 1 : 0)

function anchoredCut(under, found, window) {
  const side = s =>
    s.rank !== 0 || s.refName !== window.refName
      ? 0
      : s.end <= window.start
        ? -1
        : s.start >= window.end
          ? 1
          : 0
  const segments = new Map(under)
  const links = new Map()
  for (const link of found) {
    if (
      under.has(link.source) ||
      under.has(link.target) ||
      side(link.sourceSegment) * side(link.targetSegment) === -1
    ) {
      links.set(linkKey(link), link)
      for (const s of [link.sourceSegment, link.targetSegment]) {
        if (!segments.has(s.id)) {
          segments.set(s.id, s)
        }
      }
    }
  }
  for (const link of found) {
    if (segments.has(link.source) && segments.has(link.target)) {
      links.set(linkKey(link), link)
    }
  }
  return { segments, links }
}

function formatSegment({ id, refName, start, end, rank, tags }) {
  const valid = tags.split(' ').filter(t => GFA_TAG.test(t))
  const extra = valid.length ? `\t${valid.join('\t')}` : ''
  return `S\t${id}\t*\tLN:i:${end - start}\tSN:Z:${refName}\tSO:i:${start}\tSR:i:${rank}${extra}`
}

function formatLink(l) {
  return `L\t${l.source}\t${l.sourceStrand}\t${l.target}\t${l.targetStrand}\t0M`
}

function formatGfa(segments, links) {
  const sorted = [...segments.values()].sort(
    (a, b) =>
      compare(a.refName, b.refName) || a.start - b.start || compare(a.id, b.id),
  )
  return [
    'H\tVN:Z:1.0',
    ...sorted.map(formatSegment),
    ...[...links.keys()].sort(compare).map(k => formatLink(links.get(k))),
  ].join('\n')
}

function resolveName(names, refName) {
  if (names.includes(refName)) {
    return refName
  }
  const ends = names.filter(n => n.endsWith(`#${refName}`))
  if (ends.length === 1) {
    return ends[0]
  }
  throw new Error(
    `${refName} is not in the index, which has ${names.slice(0, 5).join(', ')}${names.length > 5 ? ', ...' : ''}`,
  )
}

export async function cutTabix({
  segments,
  segmentsIndex,
  links,
  linksIndex,
  refName,
  start,
  end,
}) {
  const segmentFile = openIndexed(segments, segmentsIndex)
  const linkFile = openIndexed(links, linksIndex)
  const name = resolveName(
    await segmentFile.getReferenceSequenceNames(),
    refName,
  )
  const under = new Map()
  await segmentFile.getLines(name, start, end, {
    lineCallback: line => {
      const segment = parseSegment(line)
      under.set(segment.id, segment)
    },
  })
  const found = []
  await linkFile.getLines(name, start, end, {
    lineCallback: line => found.push(parseLink(line)),
  })
  const cut = anchoredCut(under, found, { refName: name, start, end })
  return formatGfa(cut.segments, cut.links)
}
