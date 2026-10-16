# Gallery

Every figure runs as written after this setup, from the files behind the
[JBrowse HPRC demo](https://jbrowse.org/demos/hprc/).
`scripts/gallery.R` draws them all.

```r
library(ggbandage)
library(ggplot2)
library(patchwork)

walks <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f2.GRCh38.walks.bed.gz"
index <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38.anchored.segs.bed.gz"
genes <- "https://jbrowse.org/ucsc/hg38/ncbiRefSeq.gff.gz"
kiv2 <- "chr6:160,616,004-160,646,753"
five <- c("HG00097#1", "HG00099#1", "HG00133#2", "HG01123#1", "HG02055#1")
twelve <- c(
  "CHM13#0",
  paste0(rep(c("HG00097", "HG00099", "HG00126", "HG00128", "HG00133", "HG002"), each = 2), "#", 1:2)
)
```

## LPA's KIV-2 repeat, a panel per walk

`chr6:160,616,004-160,646,753`

![Force-directed layout of the KIV-2 array cut from the walk file, GRCh38 and HG00097 each lifted in its own panel and shaded yellow to red along its length: HG00097 runs 55 kb through loops GRCh38's 33 kb skips](../gallery/kiv2_walks.png)

```r
g <- bandage_layout(
  walks,
  region = kiv2, haplotypes = five,
  walks = c("GRCh38#0#chr6", "HG00097#1#JBIRDD010000043.1"),
  facet = "walk"
)
autoplot(g, ncol = 2)
```

## KIV-2 in the stress layout, LPA's exons pinned

`chr6:160,616,004-160,646,753`

![Stress layout of the KIV-2 array from the hosted index: the reference straight and coloured by position, LPA's exons outlined in orange, and the repeat alleles hanging below it](../gallery/kiv2_stress.png)

```r
g <- bandage_layout(index, region = kiv2, engine = "stress", genes = genes)
autoplot(g)
```

## KIV-2 copy number as walk rows

`chr6:160,616,004-160,646,753`

![Walk rows at KIV-2 on a bp-from-flank axis: GRCh38 spans 31 kb and HG00133#2 164 kb, and the extra copies, on non-reference nodes, fall into three blocks: A, 68 kb walked by HG02055#1 and HG00133#2; B, 22 kb walked by four haplotypes; and C, 5.5 kb walked by two](../gallery/kiv2_rows.png)

```r
rows <- bandage_walk_rows(walks, kiv2, haplotypes = five)
autoplot(rows)
```

## Amylase copy number in twelve haplotypes

`chr1:103,540,000-103,780,000`

![Walk rows over the salivary amylase genes, each bar coloured by the GRCh38 position it covers: the haplotypes span 146 kb to 475 kb, HG00128#1 walks the stretch near 103.72 Mb twice, so its green recurs, and five haplotypes walk much of the non-reference block A twice](../gallery/amylase_rows.png)

```r
rows <- bandage_walk_rows(walks, "chr1:103,540,000-103,780,000", haplotypes = twelve)
autoplot(rows)
```

## The amylase locus force-directed, the longest haplotype lifted

`chr1:103,540,000-103,780,000`

![Force-directed layout of the amylase locus with HG00128#1, 475 kb, lifted and shaded along its length through loops of extra AMY1 copies, the AMY genes outlined and named](../gallery/amylase_force.png)

```r
g <- bandage_layout(
  walks,
  region = "chr1:103,540,000-103,780,000",
  haplotypes = c("HG00128#1", "HG00099#2"),
  walks = "HG00128#1#JBHIKS010000010.1",
  genes = genes
)
autoplot(g)
```

## C4A and C4B in the stress layout

`chr6:31,975,000-32,060,000`

![Stress layout of the complement C4 genes in the MHC: the HERV-K insertions in C4A and C4B hang as loops below the reference, and a dashed arch skips a whole C4 module](../gallery/c4_stress.png)

```r
g <- bandage_layout(
  index,
  region = "chr6:31,975,000-32,060,000", engine = "stress", genes = genes
)
autoplot(g)
```

## Four common deletions in the stress layout

`RHD, AMY1, C4, CYP2D6`

![Four loci in the stress layout, each a dashed arch over the reference where a deletion skips it, such as the RHD gene deletion](../gallery/deletions.png)

```r
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

## Your own colours: nodes by length

`chr6:160,653,940-160,654,130`

![A short tandem repeat near LPA, cut from the walk file, force-directed and drawn with plain ggplot2 layers: grey edges, nodes coloured by log10 length on viridis, and each node of 5 bp or more labelled with its length](../gallery/own_colours.png)

```r
cut <- tempfile(fileext = ".gfa")
writeLines(
  bandage_gfa(walks, "chr6:160,653,940-160,654,130", haplotypes = five, context = 0),
  cut
)
g <- bandage_layout(cut, width = 600)
ggplot(g) +
  geom_bandage_edges(aes(colour = I("grey75"))) +
  geom_bandage_nodes(aes(colour = log10(length))) +
  geom_bandage_labels(aes(label = ifelse(length >= 5, paste(length, "bp"), ""))) +
  scale_colour_viridis_c("log10 bp") +
  coord_fixed() +
  theme_void()
```
