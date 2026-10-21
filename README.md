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

walks <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f5.GRCh38.walks.bed.gz"
kiv2 <- "chr6:160,616,004-160,646,753"

g <- bandage_layout(
  walks,
  region = kiv2, haplotypes = "HG00097#1",
  walks = c("GRCh38#0#chr6", "HG00097#1#JBIRDD010000043.1"),
  facet = "walk"
)
autoplot(g, ncol = 2)
ggplot2::ggsave("kiv2.pdf", width = 10, height = 4)
```

![LPA's KIV-2 repeat array cut from the HPRC release 2.1 walk file for HG00097, force-directed, a panel per walk shaded along its length: HG00097 walks one 22 kb loop that GRCh38 skips](gallery/kiv2_walks.png)

`autoplot()` draws the graph as the Bandage view does. To draw it your own way,
map columns of the node table (`depth`, `length`, `backbone`, `node`, `name`).
Here `depth` counts how many times the cut's walks pass through each node:

```r
library(ggplot2)

haplotypes <- c("HG00097#1", "HG00099#1", "HG00133#2", "HG01123#1", "HG02055#1")
g <- bandage_layout(walks, region = kiv2, haplotypes = haplotypes)
ggplot(g) +
  geom_bandage_edges(aes(colour = I("grey80"))) +
  geom_bandage_nodes(aes(colour = depth)) +
  scale_colour_viridis_c(
    "walk passes through node",
    option = "mako", direction = -1, end = 0.85, breaks = 1:6
  ) +
  coord_fixed() +
  theme_void() +
  theme(legend.position = "bottom")
```

- Widths are absolute, as on screen: a 6 px node is 1/16 in at any figure size
- `geom_bandage_labels()` names each node, longest first, dropping overlaps;
  `autoplot(g, labels = TRUE)` adds it
- `geom_bandage_keys()` draws each lifted walk's colour bar, a gradient for a
  walk shaded along its length

## Gallery

- Most figures read the hosted HPRC files behind the
  [JBrowse HPRC tutorial](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc/) by range request
- The C4 syng figure reads a [syng](https://github.com/richarddurbin/syng)
  graph that impg built, hosted in jbrowse-plugin-graphgenomeviewer
- A title links to its code in [docs/gallery.md](docs/gallery.md);
  `scripts/gallery.R` draws them all and writes this table

<!-- gallery -->
<table>
<tr><td width="50%"><b><a href="docs/gallery.md#kiv-2-against-a-straight-grch38-backbone-with-lpas-exons">KIV-2 against a straight GRCh38 backbone, with LPA's exons</a></b><br><code>chr6:160,616,004-160,646,753</code><br><img src="gallery/kiv2_stress.png" alt="Stress layout of the KIV-2 array from the hosted index: GRCh38 drawn straight and coloured by position, LPA's exons outlined in orange, non-reference nodes in grey hanging below, and dashed arches where haplotypes skip reference sequence" width="100%"></td><td width="50%"><b><a href="docs/gallery.md#lpas-kiv-2-repeat-a-panel-per-walk">LPA's KIV-2 repeat, a panel per walk</a></b><br><code>chr6:160,616,004-160,646,753</code><br><img src="gallery/kiv2_walks.png" alt="Force-directed layout of the KIV-2 array cut from the walk file for HG00097, GRCh38 and HG00097 each lifted in a separate panel and shaded yellow to red along its length: HG00097 walks one 22 kb loop that GRCh38 skips, and the panel titles give HG00097 55 kb and GRCh38 32.8 kb, each span the region plus 1 kb of flank either side" width="100%"></td></tr>
<tr><td width="50%"><b><a href="docs/gallery.md#three-kiv-2-haplotypes-overlaid">Three KIV-2 haplotypes overlaid</a></b><br><code>chr6:160,616,004-160,646,753</code><br><img src="gallery/kiv2_overlay.png" alt="Force-directed KIV-2 array with three walks lifted together, one flat colour each, side by side where they share nodes: GRCh38 in charcoal, HG00097#1 in blue, 22.2 kb longer, and HG005#1 in orange, 88.7 kb longer. HG00097#1 alone runs a small loop at the right, and only HG005#1 runs the large loop below" width="100%"></td><td width="50%"><b><a href="docs/gallery.md#cfhr3-and-cfhr1-deleted-in-one-of-three-walks">CFHR3 and CFHR1 deleted in one of three walks</a></b><br><code>chr1:196,640,001-196,900,000</code><br><img src="gallery/cfh_overlay.png" alt="Force-directed CFH locus with three walks lifted together: GRCh38 in charcoal and HG00097#1 in blue run the loop through CFHR3 and CFHR1, and HG02055#1 in orange, 84.5 kb shorter, takes the dashed deletion edge under it" width="100%"></td></tr>
<tr><td width="50%"><b><a href="docs/gallery.md#kiv-2-copy-number-as-walk-rows">KIV-2 copy number as walk rows</a></b><br><code>chr6:160,616,004-160,646,753</code><br><img src="gallery/kiv2_rows.png" alt="Walk rows at KIV-2 on a bp-from-flank axis: between the flanking reference nodes GRCh38 spans 31 kb and HG00133#2 164 kb, and the extra copies, on non-reference nodes, fall into three blocks: A, 68 kb walked by HG02055#1 and HG00133#2; B, 22 kb walked by four haplotypes; and C, 5.5 kb walked by two" width="100%"></td><td width="50%"><b><a href="docs/gallery.md#amylase-copy-number-in-twelve-haplotypes">Amylase copy number in twelve haplotypes</a></b><br><code>chr1:103,540,000-103,780,000</code><br><img src="gallery/amylase_rows.png" alt="Walk rows over the salivary amylase genes, each bar coloured by the GRCh38 position it covers: the haplotypes span 146 kb to 475 kb, HG00128#1 walks the stretch near 103.72 Mb twice, so its green recurs, five haplotypes walk much of the non-reference block A twice, and HG00097#1 has a 19 kb stretch the graph lacks, drawn as an open box" width="100%"></td></tr>
<tr><td width="50%"><b><a href="docs/gallery.md#c4a-and-c4b-in-the-stress-layout">C4A and C4B in the stress layout</a></b><br><code>chr6:31,978,000-32,040,000</code><br><img src="gallery/c4_stress.png" alt="Stress layout of the complement C4 genes in the MHC, GRCh38 drawn straight, its C4A and C4B the long forms: non-reference sequence hangs in loops below C4A and C4B, and a dashed arch from inside C4A to inside C4B skips one module of C4, CYP21A1P and TNXA" width="100%"></td><td width="50%"><b><a href="docs/gallery.md#rhd-and-cyp2d6-gene-deletions-as-arches">RHD and CYP2D6 gene deletions as arches</a></b><br><code>RHD, CYP2D6</code><br><img src="gallery/deletions.png" alt="RHD and CYP2D6 in the stress layout, one above the other, GRCh38 straight and genes named: in each, a dashed arch spans the whole gene, the route of haplotypes that skip it, and non-reference sequence hangs in grey" width="100%"></td></tr>
<tr><td width="50%"><b><a href="docs/gallery.md#your-own-colours-kiv-2-nodes-by-walk-passes">Your own colours: KIV-2 nodes by walk passes</a></b><br><code>chr6:160,616,004-160,646,753</code><br><img src="gallery/own_colours.png" alt="The KIV-2 array cut from the walk file, force-directed and drawn with plain ggplot2 layers: grey edges, and each node coloured by how many times the cut's walks pass through it, light for once to dark for six" width="100%"></td><td width="50%"><b><a href="docs/gallery.md#c4-as-a-syng-graph-from-impg">C4 as a syng graph from impg</a></b><br><code>chr6:31,972,047-32,055,647</code><br><img src="gallery/syng_c4.png" alt="Force-directed syng graph of C4 from 90 haplotypes: a ring coloured red to magenta along GRCh38, whose two C4 copies share its nodes, with blue specks where only the second copy goes. Under it, walk rows for three samples in the same hues: GRCh38 is one smooth gradient over 84 kb, HG02080's 51 kb haplotype carries one copy and HG01978's 116 kb haplotype three, each copy in the colours of the GRCh38 copy it continues" width="100%"></td></tr>
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
- `gene_names` binds a file that calls a contig otherwise:
  `gene_names = c(chr6 = "NC_000006.12")`

```r
index <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38.anchored.segs.bed.gz"
genes <- "https://jbrowse.org/ucsc/hg38/ncbiRefSeq.gff.gz"

g <- bandage_layout(index, region = kiv2, engine = "stress", genes = genes)
autoplot(g)
```

Each plot is a ggplot, so patchwork stacks loci, here the RHD and CYP2D6
gene deletions:

```r
library(patchwork)

deletions <- c(
  RHD = "chr1:25,250,000-25,450,000",
  CYP2D6 = "chr22:42,118,000-42,136,000"
)
plots <- Map(
  function(gene, region) {
    g <- bandage_layout(index, region = region, engine = "stress", genes = genes)
    autoplot(g) + labs(title = gene, subtitle = region)
  },
  names(deletions), deletions
)
wrap_plots(plots, ncol = 1, heights = c(1, 2.5))
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
- **Readout:** a bar's bp between the flanks, so GRCh38 reads 31 kb at KIV-2.
  A layout's walk key counts the whole cut instead, `context` bp past each end
  of the region included, and reads 32.8 kb for the same GRCh38 walk
- **Colour:** sequence on the reference's path takes the colour of the
  reference position it covers. A duplicated reference stretch repeats its
  colours, and an inverted one runs them backwards. A copy the graph threads
  through a different reference paralogue takes that paralogue's colours
- **A reference that walks nodes twice:** a syng or pggb graph can fold the
  reference's own duplication onto one copy's nodes. Each copy then takes the
  colours of the reference copy it continues, and switches where the row walks
  a node only one reference copy holds. The reference's own row stays a smooth
  gradient
- **Charcoal:** sequence on non-reference nodes. It can still resemble the
  reference, as an extra repeat copy does; the graph just keeps it on nodes
  of its own
- **Letters:** a block of non-reference nodes that two or more drawn rows
  walk, the same letter wherever it recurs, A for the most bp. A letter twice
  in one row means the row walks some of those nodes twice, or other sequence
  splits the block. The three largest blocks are filled. A block counts once
  a stretch of it reaches 1.2% of the longest bar. Which rows are drawn
  decides the blocks, and another row can split one
- **White:** sequence the extracted subgraph does not hold. Its bp count
  toward the bar's length:
  - **outside the extracted subgraph** (dashed): graph sequence the walk takes
    away from the region's nodes. From a walk file, ggbandage names where in
    the readout, e.g. `34 kb on nodes filed near chr22:20.3 Mb`
  - **not in the graph** (solid dark, walk files only): the walk's record ends
    and the contig's next record starts past it
  - **gap, cause unknown** (dotted, walk files only): the file leaves it open,
    as between two record breaks with a record the reference never visits
    between them
- **Ribbons:** pale blue where neighbouring rows walk the same graph nodes,
  violet where one walks them backwards. Shared nodes mean similar sequence,
  not shared ancestry. `ribbons = FALSE` leaves them out, as for rows that
  share almost every node
- Inside a repeat, the ribbons show one pairing of the copies, the one that
  keeps both rows in order. A missing ribbon does not mean the rows share
  nothing there
- A walk measured from one flank gets no ribbons or letters, and its readout
  says so
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

- [ggjbrowse](https://github.com/GMOD/ggjbrowse) draws a gene track to set
  over walk rows or a layout of the same region
- [ggtubemap](https://github.com/GMOD/ggtubemap) draws a tube map from the GFA
  that `bandage_gfa()` returns

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

Helper libraries

- [@jbrowse/bandage-core](https://github.com/GMOD/bandage-core) - Bandage layout
  and drawing engine
- [@jbrowse/graph-walks](https://github.com/GMOD/graph-walks) - cuts a region
  out of a walk file
- [@jbrowse/graph-stress-layout](https://github.com/GMOD/graph-stress-layout) -
  graph stress layout 
- [@jbrowse/graph-fmmm-layout](https://github.com/GMOD/graph-fmmm-layout) -
  FMMM graph layout from bandage

Data format: GFA tabix

- [gfa-to-tabix](https://github.com/GMOD/gfa-to-tabix) - indexes a GFA by genome
  coordinate, for the `region` form of `bandage_layout()`

Other R libraries
- [ggtubemap](https://github.com/GMOD/ggtubemap) - tube maps as ggplot2 layers
- [ggjbrowse](https://github.com/GMOD/ggjbrowse) - genome browser tracks as
  ggplot2 layers; reads indexed files into V8 the same way

JBrowse 2 plugin and other applications
- [jbrowse-plugin-graphgenomeviewer](https://github.com/GMOD/jbrowse-plugin-graphgenomeviewer) -
  JBrowse 2 plugin that browses these graphs by locus
- [BandageJS](https://github.com/GMOD/BandageJS) - standalone page for GFA
  and gbz-base graphs


Tutorials on [jbrowse.org](https://jbrowse.org/jb2/docs/tutorials/)

- [HPRC part 3: repeat lengths](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc_repeats/)
- [HPRC part 1: graph alleles and haplotypes](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc/)

## License

GPL-3.0-or-later, as bandage-core, Bandage and OGDF are.
