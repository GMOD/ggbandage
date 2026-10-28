# Developing

## Reading gfa-to-tabix files

`bandage_layout()`, `bandage_walk_rows()` and `bandage_gfa()` read the part of
a [gfa-to-tabix](https://github.com/GMOD/gfa-to-tabix) walk file or segment
index under a `region`. JavaScript in V8 cuts the graph to GFA text, and R
fetches every byte it reads.

### Walk files

- **In:** a `<prefix>.<sample>.walks.bed.gz` from `gfa-to-tabix --walks`, with
  its `.tbi` or `.csi`, and a `region`
- **Out:** the reference over the region, `context` bp past each end, and the
  walks of the `haplotypes` asked for, as GFA with W lines
- `cutWalks` in `scripts/walks-cut.mjs` calls
  [@jbrowse/graph-walks](https://github.com/GMOD/graph-walks)' `cutRegion`,
  as BandageJS does, over the R byte-range callback below
- BandageJS caps a cut's bytes and nodes and draws an abridged walk as a
  block. R asks for one region and waits, so ggbandage sets no cap and reads
  every abridged walk in full
- A cut at KIV-2 with five HPRC haplotypes takes about 3 s from the hosted
  1.2 GB file

### Segment indexes

```
bandage_layout()            R/engine.R
  is_tabix_graph()          R/tabix.R    the input is a segment index
  tabix_files()             R/tabix.R    the four files (segs, links and a .tbi or .csi each)
  parse_region()            R/standalone-byte-ranges.R    "chr6:1,001-2,000" to chr6, 1000, 2000
  bandage.cutTabix()        scripts/tabix-cut.mjs, in V8
    @gmod/tabix             asks its filehandles for bytes
      console.r.call()      V8 calls back into R, synchronously
        fetch_range()       R/standalone-byte-ranges.R    reads a local file or sends a Range request
    rgfaCut()               @jbrowse/graph-walks: the segments and links under
                            the region, as GFA text
  bandage.figure()          scripts/figure.mjs: bandage-core lays the GFA out,
                            as for any GFA file
```

- The cut gives each segment `LN`, `SN`, `SO` and `SR` tags and `SM` where the
  index has it; the `auto` layout anchors on the reference through them
- `<prefix>.segs.bed.gz` has a row per segment, and `<prefix>.links.bed.gz` a
  row per link, each with a `.tbi` or `.csi`
- The default `anchored` layout files every row under the reference interval
  its bubble hangs from, so one query on each file returns the whole graph under
  a region, however deeply alleles nest
- A `contig` index files rows by the segment's own coordinate. The cut follows
  links one hop past the region and reads once more to close each allele it
  reached, as the JBrowse graph plugin's view does
- The index [README](https://github.com/GMOD/gfa-to-tabix#readme) lists the
  columns

### Which links a segment-index cut keeps

On an anchored index, a query on the link file returns links the drawing does
not need along with those it does. The cut keeps a link when:

- one of its segments came back from the segment file
- its two ends are backbone on opposite sides of the region, as a deletion
  spanning the region is
- both its segments are already in the cut

The cut also adds the segments at the far end of each kept link, so a window
shows the neighbour each edge leads to. The JBrowse graph plugin cuts with the
same `rgfaCut`, so the two draw the same cut.

### A segment index at HPRC scale

jbrowse.org hosts the release 2.1 Minigraph-Cactus graph's anchored index for
the [JBrowse HPRC tutorial](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc/),
and a [README.txt](https://jbrowse.org/demos/hprc/README.txt) that records how
it was built. The index has 759,223 segments, an 11 MB segment file, a 20 MB
link file and a `.tbi` of about 240 kB for each. Timed on 2026-10-12 over a
home connection, with `layout = "auto"`:

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
  curves, because the cut drops the links that touch nothing in it

## Why the bytes come from R

V8 has no file system or network access, so `rangeFile` in `v8-host.mjs`
gives `@gmod/tabix` a filehandle whose `read(length, position)` calls
`ggbandage:::fetch_range` through `console.r.call`. Walk files and segment
indexes both read through it.

- `console.r.call` is synchronous, so the tabix promises settle without an event
  loop
- V8 passes every argument to R as a string, so `fetch_range` converts them
- R returns a raw vector, and V8 hands it to JavaScript as a base64 string in
  an array, wrapped every 76 characters. `rangeFile` strips the whitespace and
  decodes it with `fromBase64`
- A URL becomes one `Range` request per call through `curl`. A local file,
  or a `file://` URL, is read with `seek` and `readBin`
- A length of `-1` means the whole file, which the reader uses for the `.tbi`
- A range that runs past the end of a file returns the bytes that exist, and
  an HTTP 416 reads as no bytes, because the reader asks for whole 64 kB
  blocks near the end of small files
- A server without range support, such as `python -m http.server`, answers
  `200` with the whole file. `url_range` cuts the asked-for bytes from it and
  keeps the body for later reads, up to 1 GB of bodies in all
- An R error in `fetch_range`, such as a missing file or an HTTP error status,
  reaches the caller as the error message, and the V8 context stays usable

[ggjbrowse](https://github.com/GMOD/ggjbrowse) reads BAM, VCF and other indexed
files into V8 the same way, through `read_range()` in its `R/engine.R`. Its
[data flow](https://github.com/GMOD/ggjbrowse/blob/main/docs/dataflow.md)
page walks one call through that loop. The two packages differ in the callback:

- ggjbrowse returns a status, the file size and the bytes, which the JBrowse
  adapters check. ggbandage returns the bytes alone, which is all the tabix
  reader needs
- ggjbrowse defers the engine's warnings until the V8 call returns. ggbandage
  defers nothing, so an error in `fetch_range` ends the call

## Code shared with ggtubemap and ggjbrowse

ggbandage holds the one copy of the helpers its sibling packages share. The
siblings import them with `usethis::use_standalone()` and check their copies
against it.

| File | Holds | Imported by |
| ---- | ----- | ----------- |
| `R/standalone-v8-host.R` | `is_url`, `beside`, `bare_name`, the V8 fork guard | ggtubemap, ggjbrowse |
| `R/standalone-byte-ranges.R` | `parse_region`, `fetch_range` and its readers, `index_of`, `read_lines` | ggtubemap |
| `scripts/v8-host.mjs` | V8's missing browser globals, `rangeFile` | ggtubemap, as `tools/v8-host.mjs` |

- Change a helper here and push. Then in each sibling,
  `check-standalone.sh --update <sha>` (in ggtubemap's `tools/`, ggjbrowse's
  `scripts/`) copies every file again from that commit, with the header
  `usethis::use_standalone()` writes
- Each sibling's `Standalone files` workflow fails when a copy differs from
  ggbandage at the commit its header names, and weekly when ggbandage's main
  has changed the file since
- The shared files are under the Unlicense, a public-domain dedication, so a
  GPL, MIT or Apache package can include them

## The engine bundle

`inst/js/bandage.js` is bandage-core, the tabix reader and graph-walks bundled
for V8, committed so installing needs no JavaScript toolchain. Its first line
names the core release it was built from, the one `package.json` pins. To
take the latest releases by hand:

```console
scripts/update-deps.sh
```

- The `bundle` workflow checks the committed bundle is the pinned releases'
  build
- The `update-deps` workflow runs `scripts/update-deps.sh` daily. The script
  moves every bundled package to its latest release and the packages they
  depend on to the newest their ranges allow, rebuilds, and commits to main
  once R CMD check passes
- `@jbrowse` releases go in the day they come out. Others wait three days,
  the `minimumReleaseAge` in `pnpm-workspace.yaml`
- `BANDAGE_CORE=<bandage-core checkout> pnpm build` bundles that checkout's
  sources in place of the pinned release, and the banner names its commit,
  such as `11.7.3+65218ad`. The bundle comes out the same from any checkout
  path

### Before pushing a bundle built from a checkout

The `bundle` workflow rebuilds from the release `package.json` pins and fails
on any other bundle, so main must not get one until the core is out:

1. Release bandage-core from the commit the banner names
2. Bump `@jbrowse/bandage-core` in `package.json` to that release and run
   `pnpm install`
3. Rebuild with `pnpm build`, without `BANDAGE_CORE`, and commit the bundle

### Browser globals the bundle defines

`@gmod/tabix` and its bgzf wasm expect browser globals.
`scripts/v8-host.mjs`, the bundle's first import, defines each one when V8
lacks it:

| Global | Needed by |
| ------ | --------- |
| `TextDecoder`, `TextEncoder` | line decoding and the wasm bindings |
| `AbortController` | `@gmod/shared-read-cache` |
| `fetch` | the bgzf wasm, which loads from a `data:` URL |
| `performance`, `structuredClone` | timing and copying in the core |

- `fetch` only reads `data:` URLs and throws on anything else
- The build inlines the core's wasm as base64, which `bandageBase64` in the
  bundle's banner decodes before any module runs
- The cut passes `chunkCacheIdleTimeoutMs: 0`, which stops the chunk cache
  from starting a timer, since V8 has no `setInterval`
- The build stubs `fs/promises`, which `generic-filehandle2` imports for a
  local file class nothing opens

## The gallery

`scripts/gallery.R` holds each gallery figure's code, title and alt text. It
draws `gallery/*.png` from the hosted files, then writes `docs/gallery.md` and
the README's cards from the same list, a card for each figure marked
`readme = TRUE`:

```console
Rscript scripts/gallery.R            # every figure
Rscript scripts/gallery.R c4_stress  # one figure, and the docs
Rscript scripts/gallery.R --check    # what CI runs: offline, draws nothing
```

`--check` fails when a snippet calls a function no attached package defines, or
when `docs/gallery.md` or the README cards differ from what the script writes.

## The syng graphs

`inst/extdata/*.syng.gfa.gz` are the gallery's region syng graphs, from
`scripts/build-syng-region.sh` and impg 0.5.0. The script cuts with R, then fetches and builds
with impg, so a box without R can run the second half from a `<prefix>.walks`
file the first half wrote.

- `<prefix>.walks` gives each walk through the region a line of sample,
  haplotype, contig, 0-based start, end and strand, 1 or 2, GRCh38's first
- impg's syng GFA splits off reverse-complemented haplotypes, so the script
  fetches each walk's sequence on GRCh38's strand, references from UCSC and
  haplotypes from their GenBank contigs
- impg leaves the queried path out of its GFA, so the script appends a copy of
  the reference as `query#0#ref` and queries that. GRCh38 comes back as a hit
- impg names paths `name:a-b:c-d`, and the script rewrites each as
  `name:(a+c)-(a+d)`

## Test fixtures

`tests/testthat/testdata/ecoli_pggb.*` and `ecoli_rgfa.*` are segment indexes
of the two test GFAs, made with gfa-to-tabix 0.12.1:

```console
gfa-to-tabix ecoli_pggb_subgraph.gfa --reference K12 -o ecoli_pggb
gfa-to-tabix ecoli_rgfa_slice.gfa.gz -o ecoli_rgfa
```

`ecoli_pggb.K12.walks.bed.gz` is the pggb GFA's walk file, and `ecoli_contig.*`
the same graph in the contig layout, made with gfa-to-tabix 1.0.0:

```console
gfa-to-tabix ecoli_pggb_subgraph.gfa --walks --refs K12 -o ecoli_pggb
gfa-to-tabix ecoli_pggb_subgraph.gfa --reference K12 --layout contig -o ecoli_contig
```

`ecoli_pggb_csi.*` copies `ecoli_pggb`'s two files with a `.csi` in place of
each `.tbi`, from `tabix -C -p bed`.
