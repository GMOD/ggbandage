# Gallery

Every figure runs as written after this setup. All but the syng graphs read
the files behind the
[JBrowse HPRC tutorial](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc/).
`scripts/gallery.R` draws them all.

```r
library(ggbandage)
library(ggplot2)
library(patchwork)

walks <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f5.GRCh38.walks.bed.gz"
index <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38.anchored.segs.bed.gz"
genes <- "https://jbrowse.org/ucsc/hg38/ncbiRefSeq.gff.gz"
kiv2 <- "chr6:160,616,004-160,646,753"
five <- c("HG00097#1", "HG00099#1", "HG00133#2", "HG01123#1", "HG02055#1")
twelve <- c(
  "CHM13#0",
  paste0(rep(c("HG00097", "HG00099", "HG00126", "HG00128", "HG00133", "HG002"), each = 2), "#", 1:2)
)
syng <- "https://raw.githubusercontent.com/GMOD/jbrowse-plugin-graphgenomeviewer/main/test_data/syng/c4.syng.gfa.gz"
```

## KIV-2 against a straight GRCh38 backbone, with LPA's exons

`chr6:160,616,004-160,646,753`

![Stress layout of the KIV-2 array from the hosted index: GRCh38 drawn straight and coloured by position, LPA's exons outlined in orange, non-reference nodes in grey hanging below, and dashed arches where haplotypes skip reference sequence](../gallery/kiv2_stress.png)

```r
g <- bandage_layout(index, region = kiv2, engine = "stress", genes = genes)
ggplot(g) +
  geom_bandage_edges() +
  geom_bandage_genes() +
  geom_bandage_nodes(aes(colour = I(ifelse(backbone, color, "grey70")))) +
  coord_fixed() +
  theme_void()
```

## LPA's KIV-2 repeat, a panel per walk

`chr6:160,616,004-160,646,753`

![Force-directed layout of the KIV-2 array cut from the walk file for HG00097, GRCh38 and HG00097 each lifted in a separate panel and shaded yellow to red along its length: HG00097 walks one 22 kb loop that GRCh38 skips, and the panel titles give HG00097 55 kb and GRCh38 32.8 kb, each span the region plus 1 kb of flank either side](../gallery/kiv2_walks.png)

```r
g <- bandage_layout(
  walks,
  region = kiv2, haplotypes = "HG00097#1",
  walks = c("GRCh38", "HG00097#1"),
  facet = "walk"
)
autoplot(g, ncol = 2)
```

## Three KIV-2 haplotypes overlaid

`chr6:160,616,004-160,646,753`

![Force-directed KIV-2 array with three walks lifted together, one flat colour each, side by side where they share nodes: GRCh38 in charcoal, HG00097#1 in blue, 22.2 kb longer, and HG00133#1 in orange, 116 kb longer. HG00097#1 alone runs a small loop at the right, and only HG00133#1 runs the large loop below](../gallery/kiv2_overlay.png)

```r
haps <- c("HG00097#1", "HG00133#1")
g <- bandage_layout(
  walks,
  region = kiv2, haplotypes = haps, walks = c("GRCh38", haps), genes = genes
)
autoplot(g)
```

## CFHR3 and CFHR1 deleted in one of three walks

`chr1:196,640,001-196,900,000`

![Force-directed CFH locus with three walks lifted together: GRCh38 in charcoal and HG00097#1 in blue run the loop through CFHR3 and CFHR1, and HG02055#1 in orange, 84.5 kb shorter, takes the dashed deletion edge under it](../gallery/cfh_overlay.png)

```r
haps <- c("HG00097#1", "HG02055#1")
g <- bandage_layout(
  walks,
  region = "chr1:196,640,001-196,900,000",
  haplotypes = haps, walks = c("GRCh38", haps), genes = genes
)
autoplot(g)
```

## KIV-2 copy number as walk rows

`chr6:160,616,004-160,646,753`

![Walk rows at KIV-2 on a bp-from-flank axis: between the flanking reference nodes GRCh38 spans 31 kb and HG00133#2 164 kb, and the extra copies, on non-reference nodes, fall into three blocks: A, 68 kb walked by HG02055#1 and HG00133#2; B, 22 kb walked by four haplotypes; and C, 5.5 kb walked by two](../gallery/kiv2_rows.png)

```r
rows <- bandage_walk_rows(walks, kiv2, haplotypes = five)
autoplot(rows)
```

## Amylase copy number in twelve haplotypes

`chr1:103,540,000-103,780,000`

![Walk rows over the salivary amylase genes, each bar coloured by the GRCh38 position it covers: the haplotypes span 146 kb to 475 kb, HG00128#1 walks the stretch near 103.72 Mb twice, so its green recurs, five haplotypes walk much of the non-reference block A twice, and HG00097#1 has a 19 kb stretch the graph lacks, drawn as an open box](../gallery/amylase_rows.png)

```r
rows <- bandage_walk_rows(walks, "chr1:103,540,000-103,780,000", haplotypes = twelve)
autoplot(rows)
```

## C4A and C4B in the stress layout

`chr6:31,978,000-32,040,000`

![Stress layout of the complement C4 genes in the MHC, GRCh38 drawn straight, its C4A and C4B the long forms: non-reference sequence hangs in loops below C4A and C4B, and a dashed arch from inside C4A to inside C4B skips one module of C4, CYP21A1P and TNXA](../gallery/c4_stress.png)

```r
g <- bandage_layout(
  index,
  region = "chr6:31,978,000-32,040,000", engine = "stress", genes = genes
)
autoplot(g)
```

## RHD and CYP2D6 gene deletions as arches

`RHD, CYP2D6`

![RHD and CYP2D6 in the stress layout, one above the other, GRCh38 straight and genes named: in each, a dashed arch spans the whole gene, the route of haplotypes that skip it, and non-reference sequence hangs in grey](../gallery/deletions.png)

```r
deletions <- c(
  RHD = "chr1:25,250,000-25,450,000",
  CYP2D6 = "chr22:42,118,000-42,136,000"
)
plots <- Map(
  function(gene, region) {
    g <- bandage_layout(index, region = region, engine = "stress", genes = genes)
    ggplot(g) +
      geom_bandage_edges() +
      geom_bandage_genes() +
      geom_bandage_nodes(aes(colour = I(ifelse(backbone, color, "grey70")))) +
      coord_fixed(clip = "off") +
      labs(title = gene, subtitle = region) +
      theme_void() +
      theme(plot.title = element_text(face = "italic"), plot.margin = margin(4, 12, 4, 12))
  },
  names(deletions), deletions
)
wrap_plots(plots, ncol = 1, heights = c(1, 2.5))
```

## C4 as a syng graph from impg

`chr6:31,972,047-32,055,647`

[impg](https://github.com/pangenome/impg) builds a
[syng](https://github.com/richarddurbin/syng) graph with no alignment step;
[build.sh](https://github.com/GMOD/jbrowse-plugin-graphgenomeviewer/blob/main/test_data/syng/build.sh)
in jbrowse-plugin-graphgenomeviewer cuts this one from odgi's C4 test haplotypes.

- GRCh38 has C4A and C4B, two copies of a 32.7 kb module, and syng puts both on
  one copy's nodes: GRCh38 walks the ring twice, and a haplotype's copy count is
  how often it goes round
- A layout node takes its first visit's colour, so the ring shows C4A's hues. The
  blue specks are nodes GRCh38 walks only in C4B, where C4B differs from C4A
- A walk row follows each copy to the GRCh38 copy it continues, and switches where
  it walks a node only C4A or only C4B holds: HG00735#1's second copy starts on
  C4A's own sequence, so it takes C4A's hues
- `hues = "bandage"` gives the rows the layout's hues. Ribbons are off, since
  the rows share almost every node

![Force-directed syng graph of C4 from 90 haplotypes: a ring coloured red to magenta along GRCh38, whose two C4 copies share its nodes, with blue specks where only the second copy goes. Under it, walk rows for three samples in the same hues: GRCh38 is one smooth gradient over 84 kb, HG02080's 51 kb haplotype has one copy and HG01978's 116 kb haplotype three, each copy in the colours of the GRCh38 copy it continues](../gallery/syng_c4.png)

```r
g <- bandage_layout(syng)
rows <- bandage_walk_rows(syng, haplotypes = c("HG02080", "HG00735", "HG01978"))
(autoplot(g) + guides(fill = "none")) /
  autoplot(rows, ribbons = FALSE, hues = "bandage") +
  plot_layout(heights = c(2.5, 1))
```

## C4's HERV-K loop in three syng walks

`chr6:31,972,047-32,055,647`

- Each walk runs the ring once per C4 copy, so the lanes show which nodes a walk
  visits and the key's lengths show its copies: HG01978#2 has one 32.7 kb copy
  more than GRCh38
- The loop at the left is the HERV-K in C4's intron 9, which makes a C4 long.
  GRCh38's C4A and C4B both contain it, and both of HG01952#1's copies lack it

![The syng graph of C4 with three walks lifted together, one flat colour each: GRCh38 in charcoal, HG01952#1 in blue, 12.7 kb shorter, and HG01978#2 in orange, 32.7 kb longer. All three run the ring every C4 copy shares, and only HG01952#1 skips the loop at the left, the 6.5 kb HERV-K of C4's long form](../gallery/syng_overlay.png)

```r
g <- bandage_layout(syng, walks = c("grch38", "HG01952#1", "HG01978#2"))
autoplot(g)
```

## Your own colours: KIV-2 nodes by walk passes

`chr6:160,616,004-160,646,753`

![The KIV-2 array cut from the walk file, force-directed and drawn with plain ggplot2 layers: grey edges, and each node coloured by how many times the cut's walks pass through it, light for once to dark for six](../gallery/own_colours.png)

```r
g <- bandage_layout(walks, region = kiv2, haplotypes = five)
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
