# ggbandage

```r
remotes::install_github("GMOD/ggbandage")
```

## Usage

`bandage_layout()` runs the
[@jbrowse/bandage-core](https://github.com/GMOD/bandage-core) pipeline in V8
and returns the layout as tables of node strokes, edge curves, arrowheads,
walk keys and gene pins. It reads one of:

- a [gfa-to-tabix](https://github.com/GMOD/gfa-to-tabix) walk file
  (`.walks.bed.gz` beside its `.tbi` or `.csi`), local or a url, plus a
  `region` such as `"chr6:160,616,004-160,646,753"`. ggbandage fetches the
  blocks of the file under the region, by range request for a url.
  `haplotypes` picks the `sample#haplotype` walks to cut, every one by default
- a GFA file (`.gfa` or `.gfa.gz`), local or a url
- a gfa-to-tabix segment index plus a `region`: the `.segs.bed.gz` file, with
  `.links.bed.gz` beside it and a `.tbi` or `.csi` beside each, or the
  `.graph.json` manifest that names them

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

- `autoplot()` draws the graph as the Bandage view does, and
  `autoplot(g, labels = TRUE)` adds `geom_bandage_labels()`, which names each
  node, longest first, dropping overlaps
- To draw the graph your own way, map columns of the node table (`depth`,
  `length`, `backbone`, `node`, `name`) in `geom_bandage_nodes()`.
  [Your own colours](docs/gallery.md#your-own-colours-kiv-2-nodes-by-walk-passes)
  maps `depth`, the number of times the cut's walks pass through each node
- `geom_bandage_keys()` draws each lifted walk's colour bar, a gradient for a
  walk shaded along its length
- Widths are absolute, as on screen: a 6 px node is 1/16 in at any figure size
- `region` can say `chr6` for `GRCh38#0#chr6` when exactly one sequence ends
  that way
- `bandage_gfa()` returns the cut as GFA text, for another tool such as
  ggtubemap's `read_gfa()`

## Layouts

- `engine = "fmmm"`, the default, is Bandage's force-directed layout, OGDF's
  FMMM compiled to WASM
- `engine = "stress"` draws the reference straight and places each variant
  against it: an allele as a lens, a repeat loop as a ring, a deletion as an arch
- `layout = "auto"`, `"ordered"` and `"samplerows"` put reference bp on x and
  name their rows on y
- `walks` lifts walks (P or W lines) named in full or by a prefix such as
  `"HG00097#1"`, one flat colour each, and `facet = "walk"` gives each a
  panel. A walk file has every haplotype's walk
- `genes` pins a GFF3 or BED file on the backbone, and `geom_bandage_genes()`
  outlines each exon round its node and names the gene. From a bgzipped file
  with a `.tbi` or `.csi`, ggbandage reads only the backbone's span
- `gene_names = c(chr6 = "NC_000006.12")` matches a gene file that names a
  contig otherwise

## Walk rows

`bandage_walk_rows()` draws each haplotype as a bar, so a repeat expansion
shows as a longer bar. See [Reading walk rows](docs/walk-rows.md).

```r
haplotypes <- c("HG00097#1", "HG00099#1", "HG00133#2", "HG01123#1", "HG02055#1")
rows <- bandage_walk_rows(walks, kiv2, haplotypes = haplotypes)
autoplot(rows)
```

## Combining figures

Every figure is a ggplot, so patchwork stacks it with other loci, as in
[RHD and CYP2D6 gene deletions as arches](docs/gallery.md#rhd-and-cyp2d6-gene-deletions-as-arches),
and with other ggplot2 packages:

- [ggjbrowse](https://github.com/GMOD/ggjbrowse) draws a gene track to set
  over walk rows or a layout of the same region
- [ggtubemap](https://github.com/GMOD/ggtubemap) draws a tube map from the GFA
  that `bandage_gfa()` returns

## Gallery

[docs/gallery.md](docs/gallery.md) has every figure with its code. A title
below links to that figure's code.

<!-- gallery -->
<table>
<tr><td width="50%"><b><a href="docs/gallery.md#kiv-2-against-a-straight-grch38-backbone-with-lpas-exons">KIV-2 against a straight GRCh38 backbone, with LPA's exons</a></b><br><code>chr6:160,616,004-160,646,753</code><br><img src="gallery/kiv2_stress.png" alt="Stress layout of the KIV-2 array from the hosted index: GRCh38 drawn straight and coloured by position, LPA's exons outlined in orange, non-reference nodes in grey hanging below, and dashed arches where haplotypes skip reference sequence" width="100%"></td><td width="50%"><b><a href="docs/gallery.md#lpas-kiv-2-repeat-a-panel-per-walk">LPA's KIV-2 repeat, a panel per walk</a></b><br><code>chr6:160,616,004-160,646,753</code><br><img src="gallery/kiv2_walks.png" alt="Force-directed layout of the KIV-2 array cut from the walk file for HG00097, GRCh38 and HG00097 each lifted in a separate panel and shaded yellow to red along its length: HG00097 walks one 22 kb loop that GRCh38 skips, and the panel titles give HG00097 55 kb and GRCh38 32.8 kb, each span the region plus 1 kb of flank either side" width="100%"></td></tr>
<tr><td width="50%"><b><a href="docs/gallery.md#three-kiv-2-haplotypes-overlaid">Three KIV-2 haplotypes overlaid</a></b><br><code>chr6:160,616,004-160,646,753</code><br><img src="gallery/kiv2_overlay.png" alt="Force-directed KIV-2 array with three walks lifted together, one flat colour each, side by side where they share nodes: GRCh38 in charcoal, HG00097#1 in blue, 22.2 kb longer, and HG00133#1 in orange, 116 kb longer. HG00097#1 alone runs a small loop at the right, and only HG00133#1 runs the large loop below" width="100%"></td><td width="50%"><b><a href="docs/gallery.md#kiv-2-copy-number-as-walk-rows">KIV-2 copy number as walk rows</a></b><br><code>chr6:160,616,004-160,646,753</code><br><img src="gallery/kiv2_rows.png" alt="Walk rows at KIV-2 on a bp-from-flank axis: between the flanking reference nodes GRCh38 spans 31 kb and HG00133#2 164 kb, and the extra copies, on non-reference nodes, fall into three blocks: A, 68 kb walked by HG02055#1 and HG00133#2; B, 22 kb walked by four haplotypes; and C, 5.5 kb walked by two" width="100%"></td></tr>
</table>
<!-- /gallery -->

## Docs

- [Gallery](docs/gallery.md): every figure with its code
- [Reading walk rows](docs/walk-rows.md): what each colour, letter and ribbon
  in `bandage_walk_rows()` marks
- [Reading gfa-to-tabix files through V8](docs/tabix.md): how a cut reaches
  V8, and timings on the HPRC segment index
- [Developing](docs/developing.md): the engine bundle and its updates,
  redrawing the gallery, and the test fixtures

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

- [gfa-to-tabix](https://github.com/GMOD/gfa-to-tabix) - writes the walk files
  and segment indexes that the `region` form of `bandage_layout()` reads

Other R libraries

- [ggtubemap](https://github.com/GMOD/ggtubemap) - tube maps as ggplot2 layers
- [ggjbrowse](https://github.com/GMOD/ggjbrowse) - genome browser tracks as
  ggplot2 layers; reads indexed files into V8 the same way

JBrowse 2 plugin and other applications

- [jbrowse-plugin-graphgenomeviewer](https://github.com/GMOD/jbrowse-plugin-graphgenomeviewer) -
  JBrowse 2 plugin that browses these graphs by locus
- [BandageJS](https://github.com/GMOD/BandageJS) - browser viewer for GFA
  files, walk files and gbz-base databases

Tutorials on [jbrowse.org](https://jbrowse.org/jb2/docs/tutorials/)

- [HPRC part 3: repeat lengths](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc_repeats/)
- [HPRC part 1: graph alleles and haplotypes](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc/)

## License

GPL-3.0-or-later, as bandage-core, Bandage and OGDF are.
