# Gallery

Every snippet runs on its own. `scripts/gallery.R` draws them all.

## The data files

| Variable | File | How it was made |
| --- | --- | --- |
| `walks` | HPRC v2.1 GRCh38 walk file | `gfa-to-tabix hprc-v2.1-mc-grch38.gfa.gz --walks --refs GRCh38,CHM13 -o hprc-v2.1-mc-grch38-f5`, as in [Hosting your own graph](https://jbrowse.org/jb2/docs/tutorials/pangenome_prepare_graph/). `f5` is the walk file format, gfa-to-tabix's format 5 |
| `index` | HPRC v2.1 GRCh38 segment index | `gfa-to-tabix hprc-v2.1-mc-grch38.sv.gfa.gz --layout anchored -o hprc-v2.1-mc-grch38.anchored`. `anchored` is the layout: every node filed under the reference interval its bubble hangs from |
| `genes` | UCSC hg38 ncbiRefSeq GFF3, bgzipped and tabix-indexed | Hosted by JBrowse, used as is |
| `syng` | C4 syng graph from 90 haplotypes | [build.sh](https://github.com/GMOD/jbrowse-plugin-graphgenomeviewer/blob/main/test_data/syng/build.sh) runs [impg](https://github.com/pangenome/impg) on odgi's C4 test haplotypes |

The HPRC graphs are the files behind the
[JBrowse HPRC tutorial](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc/).
[Region-specific pangenomes](../README.md#region-specific-pangenomes) has the steps for another graph.

## CFHR3 and CFHR1 deleted in one haplotype

`chr1:196,640,001-196,900,000`

![Force-directed CFH locus with GRCh38, HG00097 and HG02055 lifted together, each shaded along its own length: GRCh38 grey, HG00097 cyan to blue and HG02055 pink to plum. GRCh38 and HG00097 run the loop through CFHR3 and CFHR1, and HG02055 alone takes the dashed deletion edge under it. Walk rows below, each on its walk's ramp, give the lengths, GRCh38 and HG00097 260 kb and HG02055 176 kb, and the ribbons from HG00097 down to HG02055 break across the 85 kb HG02055 lacks](../gallery/cfh_overlay.png)

```r
library(ggbandage)
library(patchwork)

walks <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f5.GRCh38.walks.bed.gz"
genes <- "https://jbrowse.org/ucsc/hg38/ncbiRefSeq.gff.gz"

cfh <- "chr1:196,640,001-196,900,000"
haps <- c("HG00097#1", "HG02055#1")
schemes <- c(GRCh38 = "grey", "HG00097#1" = "blue", "HG02055#1" = "purple")
progress <- lapply(names(schemes), function(w) list(walk = w, color = list(field = "progress", scheme = schemes[[w]])))
g <- bandage_layout(walks, region = cfh, haplotypes = haps, walks = progress, genes = genes)
rows <- bandage_walk_rows(walks, cfh, haplotypes = haps)
autoplot(g) / autoplot(rows, hues = "walk", layout = g) + plot_layout(heights = c(1, 1.2))
```

## KIV-2 copy number as walk rows

`chr6:160,616,004-160,646,753`

![Walk rows at KIV-2 on a bp-from-flank axis: between the flanking reference nodes GRCh38 spans 31 kb and HG00133#2 164 kb, and the extra copies, on non-reference nodes, fall into three blocks: A, 68 kb walked by HG02055#1 and HG00133#2; B, 22 kb walked by four haplotypes; and C, 5.5 kb walked by two](../gallery/kiv2_rows.png)

```r
library(ggbandage)
library(ggplot2)

walks <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f5.GRCh38.walks.bed.gz"
kiv2 <- "chr6:160,616,004-160,646,753"
five <- c("HG00097#1", "HG00099#1", "HG00133#2", "HG01123#1", "HG02055#1")

rows <- bandage_walk_rows(walks, kiv2, haplotypes = five)
autoplot(rows) +
  theme(legend.position = "inside", legend.position.inside = c(1, 0), legend.justification.inside = c(1, 0))
```

## Amylase haplotypes from 146 to 475 kb

`chr1:103,540,000-103,780,000`

![Walk rows over the salivary amylase genes for GRCh38 and seven haplotypes, each bar coloured by the GRCh38 position it covers: against GRCh38's 240 kb the haplotypes span 146 kb to 475 kb. HG00128#1 and HG002#1 walk the non-reference block A twice, CHM13 and HG00097#2 once, HG00099#1 and HG00097#1 walk block C in its place, and HG00097#1 has a 19 kb stretch the graph lacks, drawn as an open box](../gallery/amylase_rows.png)

```r
library(ggbandage)

walks <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f5.GRCh38.walks.bed.gz"

amylase <- c("HG00128#1", "CHM13#0", "HG00097#2", "HG002#1", "HG00099#1", "HG00097#1", "HG00099#2")
rows <- bandage_walk_rows(walks, "chr1:103,540,000-103,780,000", haplotypes = amylase)
autoplot(rows)
```

## CYP2D6 deletion as an arch over the gene

`chr22:42,118,000-42,136,000`

![Stress layout of CYP2D6 from the hosted index, GRCh38 drawn straight and coloured by position from NDUFA6-DT to CYP2D7, exons outlined in gold: a dashed arch spans CYP2D6, the route of haplotypes that skip the gene, and non-reference sequence hangs in charcoal loops above and below](../gallery/cyp2d6_stress.png)

```r
library(ggbandage)

index <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38.anchored.segs.bed.gz"
genes <- "https://jbrowse.org/ucsc/hg38/ncbiRefSeq.gff.gz"

g <- bandage_layout(index, region = "chr22:42,118,000-42,136,000", engine = "stress", genes = genes)
autoplot(g)
```

## KIV-2 expansions as extra loops

`chr6:160,616,004-160,646,753`

- `context = 30000` keeps 30 kb of GRCh38 past each end of the region, so the
  reference runs in straight before it reaches the array
- `bubbleSpread = "compress"` pulls node lengths towards the mean, so HG00133's
  extra copies no longer dwarf the rest. Loop size stops tracking bp, so read
  lengths off the walk rows below

![Force-directed KIV-2 array with GRCh38, HG00133 and HG00097 lifted together, each shaded along its own length from light to mid-tone: GRCh38 grey, HG00133 cyan to blue, 133 kb longer, and HG00097 yellow to red-orange, 22.4 kb longer. GRCh38 runs straight in along 30 kb of flank from either side to a knot of loops at the array. Where walks share nodes their lanes run side by side. All three walks run the loops at the top, HG00133 and HG00097 run the loop at the lower right together, and HG00133 alone runs the loop at the lower left. Walk rows below, each on its walk's ramp under a grey strip where it runs on the GRCh38 path, give the lengths: GRCh38 31 kb, HG00133 164 kb and HG00097 53 kb, with the lower right loop outlined as block A in both](../gallery/kiv2_overlay.png)

```r
library(ggbandage)
library(patchwork)

walks <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f5.GRCh38.walks.bed.gz"
kiv2 <- "chr6:160,616,004-160,646,753"

haps <- c("HG00133#2", "HG00097#1")
progress <- lapply(c("GRCh38", haps), function(w) list(walk = w, color = list(field = "progress")))
g <- bandage_layout(walks, region = kiv2, haplotypes = haps, walks = progress, context = 30000, bubbleSpread = "compress")
rows <- bandage_walk_rows(walks, kiv2, haplotypes = haps)
autoplot(g) / autoplot(rows, ribbons = FALSE, hues = "walk", layout = g) + plot_layout(heights = c(1.6, 1))
```

## C4 copies as threads round an impg syng graph

`chr6:31,972,047-32,055,647`

[impg](https://github.com/pangenome/impg) builds a
[syng](https://github.com/richarddurbin/syng) graph of C4 from 90 haplotypes
with no alignment step;
[build.sh](https://github.com/GMOD/jbrowse-plugin-graphgenomeviewer/blob/main/test_data/syng/build.sh)
in jbrowse-plugin-graphgenomeviewer cuts it from odgi's C4 test haplotypes.

- The ring holds every C4 copy's sequence once, so a walk with more copies goes
  round it more often. Each walk draws a thread per pass: grch38 two round the
  ring, and HG01978 three, its extra 32.7 kb
- HG01978's row runs 32.7 kb past grch38's for that copy
- Each walk shades light to dark along its length, in the drawing and in its
  row, so a darker thread is a later pass round the ring
- The loop at the left is the HERV-K in C4's intron 9, which makes a C4 long.
  GRCh38's C4A and C4B both contain it, and both of HG01952#1's copies lack it

![The syng graph of C4 with three walks lifted together, each shaded light to dark along its own length, grch38#chr6 grey, HG01978#2 cyan to blue and HG01952#1 peach to rust, and a thread for every pass through a node: round the ring, outside in, grch38#chr6 draws two threads, HG01978#2 three, its extra C4 copy, and HG01952#1 two, each pass darker than the one before. Grey and blue threads run round the HERV-K loop at the left, and the orange ones cut across it. Walk rows below, each on its walk's ramp under a grey strip where it runs on the grch38 path, give the lengths: grch38#chr6 84 kb, HG01978#2 116 kb and HG01952#1 71 kb](../gallery/syng_overlay.png)

```r
library(ggbandage)
library(patchwork)

syng <- "https://raw.githubusercontent.com/GMOD/jbrowse-plugin-graphgenomeviewer/main/test_data/syng/c4.syng.gfa.gz"

haps <- c("HG01978#2", "HG01952#1")
schemes <- c(grch38 = "grey", "HG01978#2" = "blue", "HG01952#1" = "orange")
progress <- lapply(names(schemes), function(w) list(walk = w, color = list(field = "progress", scheme = schemes[[w]])))
g <- bandage_layout(syng, walks = progress)
rows <- bandage_walk_rows(syng, haplotypes = haps)
autoplot(g) / autoplot(rows, ribbons = FALSE, hues = "walk", layout = g) + plot_layout(heights = c(3, 1))
```

## RHD deletion and duplication in an impg syng graph

`chr1:25,250,000-25,450,000`

The RHD syng graph is a region-specific pangenome.
`scripts/build-syng-region.sh` cuts the region from the HPRC walk file to find
each haplotype's contig span, fetches those spans from GenBank, and builds the
graph with [impg](https://github.com/pangenome/impg). ggbandage ships it in
`inst/extdata`.

- The Rhesus boxes either side of RHD share many of their nodes, so GRCh38
  walks them twice
- Each lifted walk draws a thread per pass and shades light to dark along its
  length, in the drawing and in its row, so a darker thread is a later pass
- Six of the 18 other haplotypes span about 132 kb. They walk the boxes once and
  skip RHD, the deletion that most often makes blood RhD-negative
- HG01106#1 walks the boxes three times and has a second RHD

![Force-directed syng graph of RHD from 19 HPRC haplotypes with three walks lifted together, each shaded light to dark along its own length, grch38 grey, HG01106#1 cyan to blue and HG01258#2 peach to rust, and a thread for every pass through a node. Through the Rhesus box at the left, grch38 draws two threads, HG01106#1 three and HG01258#2 one, each pass darker than the one before. Round the loop at the top, labelled RHD, grch38 draws one thread, HG01106#1 two, its second RHD, and HG01258#2 none, taking the box straight on to the loop below, labelled TMEM50A and RHCE, that every walk runs once. In the walk rows below, each on its walk's ramp under a grey strip where it runs on the grch38 path, grch38 spans 202 kb, HG01106#1 272 kb and HG01258#2 132 kb](../gallery/syng_rhd.png)

```r
library(ggbandage)
library(patchwork)

genes <- "https://jbrowse.org/ucsc/hg38/ncbiRefSeq.gff.gz"

rhd_syng <- system.file("extdata", "rhd.syng.gfa.gz", package = "ggbandage")
haps <- c("HG01106#1", "HG01258#2")
schemes <- c(grch38 = "grey", "HG01106#1" = "blue", "HG01258#2" = "orange")
progress <- lapply(names(schemes), function(w) list(walk = w, color = list(field = "progress", scheme = schemes[[w]])))
g <- bandage_layout(rhd_syng, walks = progress, genes = genes)
g$genes <- g$genes[g$genes$gene %in% c("RHD", "TMEM50A", "RHCE"), ]
g$exons <- g$exons[0, ]
rows <- bandage_walk_rows(rhd_syng, haplotypes = haps)
autoplot(g) / autoplot(rows, ribbons = FALSE, hues = "walk", layout = g) + plot_layout(heights = c(1.6, 1))
```

## Your own colours: GSTM1, missing from two thirds of haplotypes

`chr1:109,665,000-109,715,000`

- Colour and width both show `frequency`, the share of the cut's haplotypes
  through a node: `depth` over the haplotype count.
- Of 465 walks, 71 run GRCh38's GSTM1 loop, 84 the non-reference loop beside it,
  2 both, and 308 neither, taking the dashed deletion edge.
- A walk through either loop spans 60.6 kb, and one taking the deletion 42.2 kb.
  The 18 kb between them is the GSTM1 deletion, so the second loop is most likely
  GSTM1 too, a copy the graph did not align to GRCh38's.

![The GSTM1 locus cut from the walk file with all 464 HPRC haplotypes, force-directed and drawn with plain ggplot2 layers: grey edges, exons outlined in orange, and each node coloured and sized by the share of haplotypes through it. GSTM4, GSTM2 and GSTM5 run as thick black strands that every haplotype walks. GSTM1 hangs off them as a thin pale loop, beside a second pale loop of non-reference sequence, and most haplotypes take the grey dashed edge that skips both. Small pale specks along the black strands are small variants](../gallery/own_colours.png)

```r
library(ggbandage)
library(ggplot2)

walks <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f5.GRCh38.walks.bed.gz"
genes <- "https://jbrowse.org/ucsc/hg38/ncbiRefSeq.gff.gz"

gstm1 <- "chr1:109,665,000-109,715,000"
g <- bandage_layout(walks, region = gstm1, genes = genes)
share <- "share of HPRC haplotypes"
ggplot(g) +
  geom_bandage_edges(aes(colour = I("grey80"))) +
  geom_bandage_genes() +
  geom_bandage_nodes(aes(colour = frequency, linewidth = frequency)) +
  scale_colour_viridis_c(share, option = "mako", direction = -1, end = 0.9, labels = scales::label_percent()) +
  scale_linewidth(share, range = c(0.4, 3.5), labels = scales::label_percent()) +
  guides(colour = "legend") +
  labs(caption = "Specks along a strand are small variants that some haplotypes carry") +
  coord_fixed() +
  theme_void() +
  theme(legend.position = "bottom", legend.title.position = "top", plot.caption = element_text(hjust = 0.5))
```

## More examples

Narrower cases, and other ways to draw the same loci.

### LPA's KIV-2 repeat, a panel per walk

`chr6:160,616,004-160,646,753`

![Force-directed layout of the KIV-2 array cut from the walk file for HG00097, GRCh38 and HG00097 each lifted in a separate panel and shaded yellow to red along its length: HG00097 walks one 22 kb loop that GRCh38 skips, and a grey dashed link that neither walk takes skips the loop at the top. The panel titles give HG00097 113 kb and GRCh38 90.8 kb, each span the region plus 30 kb of flank either side](../gallery/kiv2_walks.png)

```r
library(ggbandage)

walks <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f5.GRCh38.walks.bed.gz"
kiv2 <- "chr6:160,616,004-160,646,753"

g <- bandage_layout(
  walks,
  region = kiv2, haplotypes = "HG00097#1", context = 30000,
  walks = c("GRCh38", "HG00097#1"),
  facet = "walk"
)
autoplot(g, ncol = 2)
```

### KIV-2 against a straight GRCh38 backbone, with LPA's exons

`chr6:160,616,004-160,646,753`

![Stress layout of the KIV-2 array from the hosted index: GRCh38 drawn straight and coloured by position, LPA's exons outlined in orange, non-reference nodes in grey hanging below in two tiers, node lengths compressed so the longest insertion draws as a bar shorter than the array, and dashed arches where haplotypes skip reference sequence](../gallery/kiv2_stress.png)

```r
library(ggbandage)
library(ggplot2)

index <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38.anchored.segs.bed.gz"
genes <- "https://jbrowse.org/ucsc/hg38/ncbiRefSeq.gff.gz"
kiv2 <- "chr6:160,616,004-160,646,753"

g <- bandage_layout(index, region = kiv2, engine = "stress", genes = genes, bubbleSpread = "compress")
ggplot(g) +
  geom_bandage_edges() +
  geom_bandage_genes() +
  geom_bandage_nodes(aes(colour = I(ifelse(backbone, color, "grey70")))) +
  coord_fixed() +
  theme_void() +
  theme(legend.position = "bottom")
```

### C4A and C4B in the stress layout

`chr6:31,978,000-32,040,000`

![Stress layout of the complement C4 genes in the MHC, GRCh38 drawn straight, its C4A and C4B the long forms: non-reference sequence hangs in loops below C4A and C4B, and a dashed arch from inside C4A to inside C4B skips one module of C4, CYP21A1P and TNXA](../gallery/c4_stress.png)

```r
library(ggbandage)

index <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38.anchored.segs.bed.gz"
genes <- "https://jbrowse.org/ucsc/hg38/ncbiRefSeq.gff.gz"

g <- bandage_layout(
  index,
  region = "chr6:31,978,000-32,040,000", engine = "stress", genes = genes
)
autoplot(g)
```

### UGT2B17's deletion, each node as wide as its frequency

`chr4:68,500,000-68,680,000`

- Nearly every haplotype walks the flanks, which draw full width. Half the haplotypes
  lack UGT2B17, so its loop draws half as wide, and the dashed deletion edge is
  the other half's route.
- `vcf_frequencies()` reads the same widths from a VCF's `AT` allele paths:
  HPRC's own `hprc-v2.1-mc-grch38.raw.vcf.gz`, or a cohort genotyped with
  `vg call`. Pass its table to `bandage_layout(frequencies = )`.

![Force-directed UGT2B17 locus cut from the walk file with all 464 haplotypes, GRCh38 coloured by position and each node drawn as wide as the share of haplotypes that pass it: the flank through UGT2B15 at the right draws full width, the loop through UGT2B17 half width, and a dashed edge under the loop skips it. Off-reference alleles hang along the loop as dark specks, most a hairline wide. A key gives the widths of 100%, 50% and 10%](../gallery/ugt2b17_frequency.png)

```r
library(ggbandage)

walks <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f5.GRCh38.walks.bed.gz"
genes <- "https://jbrowse.org/ucsc/hg38/ncbiRefSeq.gff.gz"

ugt2b17 <- "chr4:68,500,000-68,680,000"
g <- bandage_layout(walks, region = ugt2b17, genes = genes, nodeWidth = "frequency", contigThickness = 10)
autoplot(g)
```
