# Drawing from a gfa-to-tabix index

`bandage_layout(index, region = ...)` draws the part of a pangenome graph under
a region, reading an index that [gfa-to-tabix](https://github.com/GMOD/gfa-to-tabix)
wrote. This page explains how the pieces fit.

## The flow

```
bandage_layout()            R/engine.R
  is_tabix_graph()          R/tabix.R    the input is an index
  tabix_files()             R/tabix.R    the four files (segs, links and a .tbi each)
  parse_region()            R/tabix.R    "chr6:1,001-2,000" to chr6, 1000, 2000
  bandage.cutTabix()        scripts/tabix-cut.mjs, in V8
    @gmod/tabix             asks its filehandles for bytes
      console.r.call()      V8 calls back into R, synchronously
        fetch_range()       R/tabix.R    reads a local file or sends a Range request
    anchoredCut()           keeps the segments and links under the region
    formatGfa()             writes them as GFA text
  bandage.gfaFigureData()   bandage-core lays the GFA out, as for any GFA file
```

- The cut ends as GFA text, so the layout, the tables and the geoms are the
  ones a GFA file uses
- The cut gives each segment `LN`, `SN`, `SO` and `SR` tags and `SM` where the
  index has it; the `auto` layout anchors on the reference through them

## What the index holds

- `<prefix>.segs.bed.gz` has a row per segment, and `<prefix>.links.bed.gz` a
  row per link, each with a `.tbi`
- The default `anchored` layout files every row under the reference interval
  its bubble hangs from, so one query on each file returns the whole graph under
  a region, however deeply alleles nest
- A `contig` index files rows by the segment's own coordinate and would need a
  round of queries per link followed. The reader does not do that and raises an
  error when a segment row has fewer than eight columns
- The index [README](https://github.com/GMOD/gfa-to-tabix#readme) lists the
  columns

## Which links the cut keeps

The link file returns links of neither kind the drawing needs along with those
it does. `anchoredCut` keeps a link when:

- one of its segments came back from the segment file
- its two ends are backbone on opposite sides of the region, as a deletion
  spanning the region is
- both its segments are already in the cut

The segments at the far end of a kept link join the cut too, so a window shows
the neighbour each edge leads to. The code is a port of
`RgfaTabixAdapter.getSubgraph` in `jbrowse-plugin-graphgenomeviewer`, so the
two draw the same cut.

## Why the bytes come from R

V8 has no file system or network. `@gmod/tabix` takes a filehandle with
`read(length, position)`, so `rangeFile` in `tabix-cut.mjs` implements one that
calls `ggbandage:::fetch_range` through `console.r.call`.

- `console.r.call` is synchronous, so the tabix promises settle without an event
  loop
- V8 passes every argument to R as a string, so `fetch_range` converts them
- R returns a raw vector, and V8 hands it to JavaScript as a base64 string in
  an array, wrapped every 76 characters. `rangeFile` strips the whitespace and
  decodes it with `bandageBase64`, defined in the bundle's banner
- A URL becomes one `Range` request per call through `curl`. A local file is
  read with `seek` and `readBin`
- A length of `-1` means the whole file, which the reader uses for the `.tbi`
- A range that runs past the end of a file returns the bytes that exist, and
  an HTTP 416 reads as no bytes, because the reader asks for whole 64 kB
  blocks near the end of small files
- A server without range support, such as `python -m http.server`, answers
  `200` with the whole file. `url_range` cuts the asked-for bytes from it, so
  the cut is right but downloads the file on every read
- An R error in `fetch_range`, such as a missing file or an HTTP error status,
  reaches the caller as the error message, and the V8 context stays usable

[ggjbrowse](https://github.com/GMOD/ggjbrowse) reads BAM, VCF and other indexed
files into V8 the same way, through `read_range()` in its `R/engine.R`. Its
[data flow](https://github.com/GMOD/ggjbrowse/blob/main/docs/dataflow.md)
page walks one call through that loop. The two packages differ in the callback:

- ggjbrowse returns a status, the file size and the bytes, which the JBrowse
  adapters check. The tabix reader needs only the bytes
- ggjbrowse defers the engine's warnings until the V8 call returns. This
  package defers nothing: an error in `fetch_range` ends the call

## What the bundle defines for tabix

`@gmod/tabix` and its bgzf wasm expect browser globals. The banner in
`scripts/build-js.mjs` defines each one when V8 lacks it:

| Global | Needed by |
| ------ | --------- |
| `TextDecoder`, `TextEncoder` | line decoding and the wasm bindings |
| `AbortController` | `@gmod/shared-read-cache` |
| `fetch` | the bgzf wasm, which loads from a `data:` URL |

- `fetch` only reads `data:` URLs and throws on anything else
- The cut passes `chunkCacheIdleTimeoutMs: 0`, which stops the chunk cache
  from starting a timer, since V8 has no `setInterval`
- The build stubs `fs/promises`, which `generic-filehandle2` imports for a
  local file class nothing opens

## At HPRC scale

jbrowse.org hosts the release 2.1 Minigraph-Cactus graph's anchored index for
the [JBrowse HPRC tutorial](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc/),
and a [README.txt](https://jbrowse.org/demos/hprc/README.txt) that records how
it was built. The index has 759,223 segments, an 11 MB segment file,
a 20 MB link file and a `.tbi` of about 240 kB for each. Timed on 2026-10-12 over a home
connection, with `layout = "auto"`:

| Region                           | Span    | Nodes drawn | Downloaded | Time  |
| -------------------------------- | ------- | ----------- | ---------- | ----- |
| chr6:160,616,004-160,646,753     | 31 kb   | 29          | 0.7 MB     | 0.5 s |
| chr6:160,000,000-161,500,000     | 1.5 Mb  | 395         | 0.7 MB     | 0.2 s |
| chr6:29,700,000-33,200,000       | 3.5 Mb  | 1,311       | 1.0 MB     | 0.3 s |
| chr6:28,000,000-34,000,000       | 6 Mb    | 1,702       | 1.0 MB     | 0.3 s |
| chr1:100,000,000-110,000,000     | 10 Mb   | 1,421       | 0.8 MB     | 0.3 s |

- Each cut is four range requests: the two `.tbi` files whole, 0.5 MB that
  every cut pays, then one read of the segment file and one of the link file
- The 3.5 Mb plot is too dense to read as a figure, so the table times the
  fetch and the cut, not a layout of that many nodes
- At the KIV-2 window, htslib's `tabix` returns 27 segment rows and 46 link
  rows. The drawing has those 27 segments plus 2 that links reach, and 42 edge
  curves. The link file also returns links that touch nothing in the cut, and
  `anchoredCut` drops them

## Test fixtures

`tests/testthat/testdata/ecoli_pggb.*` and `ecoli_rgfa.*` are indexes of the
two test GFAs, made with gfa-to-tabix 0.12.1:

```console
gfa-to-tabix ecoli_pggb_subgraph.gfa --reference K12 -o ecoli_pggb
gfa-to-tabix ecoli_rgfa_slice.gfa.gz -o ecoli_rgfa
```

`ecoli_pggb.K12.walks.bed.gz` is the pggb GFA's walk file, made with
gfa-to-tabix 1.0.0:

```console
gfa-to-tabix ecoli_pggb_subgraph.gfa --walks --refs K12 -o ecoli_pggb
```

## Walk files

- **In:** a `<prefix>.<sample>.walks.bed.gz` from `gfa-to-tabix --walks`, with
  its `.tbi`, and a `region`
- **Out:** the reference over the region, `context` bp past each end, and the
  walks of the `haplotypes` asked for, as GFA with W lines
- [@jbrowse/graph-walks](https://github.com/GMOD/graph-walks) does the cut, the
  reader the JBrowse graph plugin and BandageJS use, over the same R byte-range
  callback
- A cut at KIV-2 with five HPRC haplotypes takes about 3 s from the hosted
  1.2 GB file

## Not yet

- Contig-layout indexes
- The coarse tier that `gfa-to-tabix build` writes for wide windows
