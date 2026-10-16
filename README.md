# ggbandage

Pangenome graph figures as ggplot2 layers.

- **In:** a GFA, or a region of a [gfa-to-tabix](https://github.com/GMOD/gfa-to-tabix)
  index or walk file, local or a URL
- **Out:** the graph laid out by Bandage's force-directed engine (FMMM) or a
  stress layout, as tables of node strokes, edge curves, arrowheads, walk keys
  and gene pins, or each walk as a bar of its own bp
- **Drawn with:** a geom per table, so a plot is an ordinary ggplot: themes,
  facets, scales, patchwork and `ggsave()` to PDF all work

`bandage_layout()` runs the
[@jbrowse/bandage-core](https://github.com/GMOD/bandage-core) pipeline in V8.

```r
remotes::install_github("GMOD/ggbandage")
```

```r
library(ggbandage)

walks <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f2.GRCh38.walks.bed.gz"
kiv2 <- "chr6:160,616,004-160,646,753"
haplotypes <- c("HG00097#1", "HG00099#1", "HG00133#2", "HG01123#1", "HG02055#1")

g <- bandage_layout(
  walks,
  region = kiv2, haplotypes = haplotypes,
  walks = c("GRCh38#0#chr6", "HG00097#1#JBIRDD010000043.1"),
  facet = "walk"
)
autoplot(g, ncol = 2)
ggplot2::ggsave("kiv2.pdf", width = 10, height = 6)
```

![LPA's KIV-2 repeat array from the HPRC release 2.1 walk file, force-directed, a panel per walk with its colour bar running along the walk](gallery/kiv2_walks.png)

`autoplot()` draws the graph as the Bandage view does. To draw it your own way,
map columns of the node table (`depth`, `length`, `backbone`, `node`, `name`):

```r
library(ggplot2)

ggplot(g) +
  geom_bandage_edges(aes(colour = I("grey70"))) +
  geom_bandage_nodes(aes(colour = log10(length))) +
  geom_bandage_labels() +
  scale_colour_viridis_c() +
  coord_fixed() +
  theme_void()
```

- Widths are absolute, as on screen: a 6 px node is 1/16 in at any figure size
- `geom_bandage_labels()` names each node, longest first, dropping overlaps;
  `autoplot(g, labels = TRUE)` adds it
- `geom_bandage_keys()` draws each lifted walk's colour bar, a gradient for a
  walk shaded along its length

## Gallery

- Every figure runs from the hosted HPRC files behind the
  [JBrowse HPRC demo](https://jbrowse.org/demos/hprc/), read by range request
- A title links to its code in [docs/gallery.md](docs/gallery.md);
  `scripts/gallery.R` draws them all and writes this table

<!-- gallery -->
<table>
<tr><td width="50%"><b><a href="docs/gallery.md#lpas-kiv-2-repeat-a-panel-per-walk">LPA's KIV-2 repeat, a panel per walk</a></b><br><code>chr6:160,616,004-160,646,753</code><br><img src="gallery/kiv2_walks.png" alt="Force-directed layout of the KIV-2 array cut from the walk file, GRCh38 and HG00097 each lifted in its own panel and shaded yellow to red along its length: HG00097 runs 55 kb through loops GRCh38's 33 kb skips" width="100%"></td><td width="50%"><b><a href="docs/gallery.md#kiv-2-in-the-stress-layout-lpas-exons-pinned">KIV-2 in the stress layout, LPA's exons pinned</a></b><br><code>chr6:160,616,004-160,646,753</code><br><img src="gallery/kiv2_stress.png" alt="Stress layout of the KIV-2 array from the hosted index: the reference straight and coloured by position, LPA's exons outlined in orange, and the repeat alleles hanging below it" width="100%"></td></tr>
<tr><td width="50%"><b><a href="docs/gallery.md#kiv-2-copy-number-as-walk-rows">KIV-2 copy number as walk rows</a></b><br><code>chr6:160,616,004-160,646,753</code><br><img src="gallery/kiv2_rows.png" alt="Walk rows at KIV-2 on a bp-from-flank axis: GRCh38 spans 31 kb and HG00133#2 164 kb, and the extra copies, on nodes GRCh38 does not walk, fall into three blocks: A, 68 kb walked by HG02055#1 and HG00133#2; B, 22 kb walked by four haplotypes; and C, 5.5 kb walked by two" width="100%"></td><td width="50%"><b><a href="docs/gallery.md#amylase-copy-number-in-twelve-haplotypes">Amylase copy number in twelve haplotypes</a></b><br><code>chr1:103,540,000-103,780,000</code><br><img src="gallery/amylase_rows.png" alt="Walk rows over the salivary amylase genes, each bar coloured by the GRCh38 position it covers: the haplotypes span 146 kb to 475 kb, HG00128#1 walks the stretch near 103.72 Mb twice, so its green recurs, and five haplotypes walk much of the off-GRCh38 block A twice" width="100%"></td></tr>
<tr><td width="50%"><b><a href="docs/gallery.md#the-amylase-locus-force-directed-the-longest-haplotype-lifted">The amylase locus force-directed, the longest haplotype lifted</a></b><br><code>chr1:103,540,000-103,780,000</code><br><img src="gallery/amylase_force.png" alt="Force-directed layout of the amylase locus with HG00128#1, 475 kb, lifted and shaded along its length through loops of extra AMY1 copies, the AMY genes outlined and named" width="100%"></td><td width="50%"><b><a href="docs/gallery.md#c4a-and-c4b-in-the-stress-layout">C4A and C4B in the stress layout</a></b><br><code>chr6:31,975,000-32,060,000</code><br><img src="gallery/c4_stress.png" alt="Stress layout of the complement C4 genes in the MHC: the HERV-K insertions in C4A and C4B hang as loops below the reference, and a dashed arch skips a whole C4 module" width="100%"></td></tr>
<tr><td width="50%"><b><a href="docs/gallery.md#four-common-deletions-in-the-stress-layout">Four common deletions in the stress layout</a></b><br><code>RHD, AMY1, C4, CYP2D6</code><br><img src="gallery/deletions.png" alt="Four loci in the stress layout, each a dashed arch over the reference where a deletion skips it, such as the RHD gene deletion" width="100%"></td><td width="50%"><b><a href="docs/gallery.md#your-own-colours-nodes-by-length">Your own colours: nodes by length</a></b><br><code>chr6:160,653,940-160,654,130</code><br><img src="gallery/own_colours.png" alt="A short tandem repeat near LPA, cut from the walk file, force-directed and drawn with plain ggplot2 layers: grey edges, nodes coloured by log10 length on viridis, and each node of 5 bp or more labelled with its length" width="100%"></td></tr>
</table>
<!-- /gallery -->

## Force-directed and stress layouts

- `engine = "fmmm"`, the default, is Bandage's force-directed layout, OGDF's
  FMMM compiled to WASM
- `engine = "stress"` draws the reference straight and places each variant
  against it: an allele as a lens, a repeat loop as a ring, a deletion as an arch
- `genes` pins a GFF3 or BED on the backbone: `geom_bandage_genes()` outlines
  each exon round its node and names the gene. From an indexed file, the
  package reads only the backbone's span

```r
index <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38.anchored.segs.bed.gz"
genes <- "https://jbrowse.org/ucsc/hg38/ncbiRefSeq.gff.gz"

g <- bandage_layout(index, region = kiv2, engine = "stress", genes = genes)
autoplot(g)
```


Each plot is a ggplot, so patchwork tiles four loci with common deletions:

```r
library(patchwork)

deletions <- c(
  RHD = "chr1:25,250,000-25,450,000",
  AMY1 = "chr1:103,540,000-103,780,000",
  C4 = "chr6:31,975,000-32,060,000",
  CYP2D6 = "chr22:42,115,000-42,155,000"
)
plots <- Map(
  function(gene, region) {
    autoplot(bandage_layout(index, region = region, engine = "stress")) +
      ggtitle(gene)
  },
  names(deletions), deletions
)
wrap_plots(plots, ncol = 2)
```


The reference-anchored layouts, `layout = "auto"`, `"ordered"` and
`"samplerows"`, put reference bp on x and name their rows on y.

## Walk rows

`bandage_walk_rows()` draws each walk as a bar of the bp it carries between
the reference nodes flanking the region, the reference on top, then the walks
that reach both flanks longest first. A repeat expansion reads as bar length,
which no node layout shows:

```r
rows <- bandage_walk_rows(walks, kiv2, haplotypes = haplotypes)
autoplot(rows)
```

- **x:** bp from the left flank, each haplotype on its own bp, not reference
  coordinates
- **Colour:** sequence on the reference's path takes the colour of the
  reference position it covers. A duplicated reference stretch repeats its
  colours, and an inverted one runs them backwards. A copy the graph threads
  through a different reference paralogue takes that paralogue's colours
- **Light grey:** sequence on nodes the reference does not walk. It can still
  resemble the reference, as an extra repeat copy does; the graph just keeps
  it on nodes of its own
- **Letters:** a block of those nodes that two or more drawn rows walk, the
  same letter wherever it recurs, A for the most bp. A letter twice in one row
  means the row walks some of those nodes twice, or other sequence splits the
  block. The three largest blocks are filled.
  Which rows are drawn decides the blocks, and another row can split one
- **White:** contig the walk leaves the cut's nodes for. Its bp count toward
  the bar's length, but the cut holds nothing of it
- **Ribbons:** neighbouring rows walk the same graph nodes there, orange where
  one walks them backwards. Shared nodes mean similar sequence, not shared
  ancestry
- Inside a repeat, the ribbons show one pairing of the copies, the one that
  keeps both rows in order. A missing ribbon does not mean the rows share
  nothing there
- `order = "shared"` puts each row under the one it shares the most nodes
  with, a layout aid that says nothing about relatedness
- `rows$rows` has each walk's `bp` and readout, `rows$runs` each stretch of
  each bar, and `rows$links` each ribbon

## Inputs

- **GFA:** plain or gzipped, local or a URL
- **Index:** the `.graph.json` manifest or `.segs.bed.gz` that gfa-to-tabix
  writes, and a `region`. Range requests fetch only the blocks the region
  needs: KIV-2 takes half a second and 0.7 MB of the index's 32 MB
- **Walk file:** a `gfa-to-tabix --walks` file, a `region`, and the
  `haplotypes` to cut, every one by default. It holds every haplotype's path,
  so walks can be lifted and drawn as rows
- `chr6` names `GRCh38#0#chr6` when exactly one sequence ends that way
- `bandage_gfa()` returns the cut as GFA text, for another tool to read

[docs/tabix.md](docs/tabix.md) follows a cut through V8 and times wider windows.

## Combined with ggjbrowse and ggtubemap

Every figure is a ggplot, so patchwork stacks it with other ggplot2 packages:

- [Genes, walk rows and both layouts of one cut](docs/gallery.md#genes-walk-rows-and-both-layouts-of-one-cut)
  puts a [ggjbrowse](https://github.com/GMOD/ggjbrowse) gene track over the
  walk rows, over the force-directed and stress layouts
- [A tandem repeat as a tube map and a force layout](docs/gallery.md#a-tandem-repeat-as-a-tube-map-and-a-force-layout)
  hands `bandage_gfa()`'s cut to [ggtubemap](https://github.com/GMOD/ggtubemap)

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
- The `update-deps` workflow runs `scripts/update-deps.sh` daily: it moves
  every bundled package to its latest release and the packages they depend on
  to the newest their ranges allow, rebuilds, and commits to main once R CMD
  check passes
- `@jbrowse` releases go in the day they come out. Others wait three days,
  the `minimumReleaseAge` in `pnpm-workspace.yaml`

## See also

- [@jbrowse/bandage-core](https://github.com/GMOD/bandage-core) - Bandage layout
  and drawing engine
- [gfa-to-tabix](https://github.com/GMOD/gfa-to-tabix) - indexes a GFA by genome
  coordinate, for the `region` form of `bandage_layout()`
- [@jbrowse/graph-walks](https://github.com/GMOD/graph-walks) - cuts a region
  out of a walk file
- [ggtubemap](https://github.com/GMOD/ggtubemap) - tube maps as ggplot2 layers
- [ggjbrowse](https://github.com/GMOD/ggjbrowse) - genome browser tracks as
  ggplot2 layers; reads indexed files into V8 the same way
- [jbrowse-plugin-graphgenomeviewer](https://github.com/GMOD/jbrowse-plugin-graphgenomeviewer) -
  JBrowse 2 plugin that browses these graphs by locus
- [BandageJS](https://github.com/cmdcolin/BandageJS) - standalone page for GFA
  and gbz-base graphs
- [@jbrowse/graph-stress-layout](https://github.com/GMOD/graph-stress-layout) -
  stress layout that keeps the reference straight

Tutorials on [jbrowse.org](https://jbrowse.org/jb2/docs/tutorials/)

- [HPRC part 3: repeat lengths](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc_repeats/)
- [HPRC part 1: graph alleles and haplotypes](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc/)

## License

GPL-3.0-or-later, as bandage-core, Bandage and OGDF are.
