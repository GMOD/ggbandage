# ggbandage

- **In:** a GFA file, or any region of a whole-genome pangenome that
  [gfa-to-tabix](https://github.com/GMOD/gfa-to-tabix) has indexed, local or
  a url
- **Out:** a ggplot of the graph, laid out as
  [Bandage](https://github.com/rrwick/Bandage) lays it out

```r
remotes::install_github("GMOD/ggbandage")
```

## Genome graphs

- A **genome graph** stores DNA as sequence segments (nodes) joined by links
  (edges). [GFA](https://gfa-spec.github.io/GFA-spec/GFA1.html) is its file
  format
- A **pangenome graph** holds many genomes, each haplotype as a **walk**: the
  segments it passes through. HPRC names a walk `sample#haplotype#contig`,
  such as `HG00097#1#JBIRDD010000043.1`
- ggbandage also draws de novo assembly graphs, which have no walks

## Usage

```r
library(ggbandage)

walks <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f5.GRCh38.walks.bed.gz"
kiv2 <- "chr6:160,616,004-160,646,753"

g <- bandage_layout(
  walks,
  region = kiv2, haplotypes = "HG00097#1",
  walks = c("GRCh38", "HG00097#1"),
  facet = "walk"
)
autoplot(g, ncol = 2)
```

![GRCh38 and HG00097#1 at LPA's KIV-2 repeat, a panel each, shaded yellow to red along each walk: HG00097#1 walks a 22 kb loop that GRCh38 skips](gallery/kiv2_walks.png)

The walk file comes from HPRC's v2.1 graph, prepared as in JBrowse's
[Hosting your own graph](https://jbrowse.org/jb2/docs/tutorials/pangenome_prepare_graph/):

```console
vg convert -f hprc-v2.1-mc-grch38.gbz > hprc-v2.1-mc-grch38.gfa
gfa-to-tabix hprc-v2.1-mc-grch38.gfa --walks --refs GRCh38,CHM13 -o hprc-v2.1-mc-grch38-f5
```

`f5` is the walk file format, gfa-to-tabix's format 5.

[Layout options](vignettes/layout-options.Rmd) covers `walks`, `facet`,
`engine` and `genes`.

## Region-specific pangenomes

A whole-genome pangenome is too large to load, so gfa-to-tabix indexes it once
and ggbandage reads one region at a time:

1. Index the GFA once with gfa-to-tabix, where `--refs` names the genome
   whose coordinates `region` uses:

   ```console
   gfa-to-tabix graph.gfa --walks --refs GRCh38 -o graph
   ```

   A graph shipped as `.gbz`, as HPRC's are, converts to GFA first with
   `vg convert -f graph.gbz > graph.gfa`
2. Pass `graph.GRCh38.walks.bed.gz`, a path or a url, to `bandage_layout()`
   with a `region`. From a url, ggbandage fetches the blocks under the region
   by range request

[Region-specific pangenomes](vignettes/region-pangenomes.Rmd) covers the two
kinds of index, exporting a region as GFA, and building a region's syng graph.

## Gallery

<!-- gallery -->
<table>
<tr><td width="25%"><a href="docs/gallery.md#cfhr3-and-cfhr1-deleted-in-one-haplotype"><img src="gallery/cfh_overlay.png" alt="Force-directed CFH locus with GRCh38, HG00097 and HG02055 lifted together, each shaded along its own length: GRCh38 grey, HG00097 cyan to blue and HG02055 pink to plum. GRCh38 and HG00097 run the loop through CFHR3 and CFHR1, and HG02055 alone takes the dashed deletion edge under it. Walk rows below, each on its walk's ramp, give the lengths, GRCh38 and HG00097 260 kb and HG02055 176 kb, and the ribbons from HG00097 down to HG02055 break across the 85 kb HG02055 lacks" width="100%"></a><br>CFHR3 and CFHR1 deleted in one haplotype</td><td width="25%"><a href="docs/gallery.md#kiv-2-copy-number-as-walk-rows"><img src="gallery/kiv2_rows.png" alt="Walk rows at KIV-2 on a bp-from-flank axis: between the flanking reference nodes GRCh38 spans 31 kb and HG00133#2 164 kb, and the extra copies, on non-reference nodes, fall into three blocks: A, 68 kb walked by HG02055#1 and HG00133#2; B, 22 kb walked by four haplotypes; and C, 5.5 kb walked by two" width="100%"></a><br>KIV-2 copy number as walk rows</td><td width="25%"><a href="docs/gallery.md#amylase-haplotypes-from-146-to-475-kb"><img src="gallery/amylase_rows.png" alt="Walk rows over the salivary amylase genes for GRCh38 and seven haplotypes, each bar coloured by the GRCh38 position it covers: against GRCh38's 240 kb the haplotypes span 146 kb to 475 kb. HG00128#1 and HG002#1 walk the non-reference block A twice, CHM13 and HG00097#2 once, HG00099#1 and HG00097#1 walk block C in its place, and HG00097#1 has a 19 kb stretch the graph lacks, drawn as an open box" width="100%"></a><br>Amylase haplotypes from 146 to 475 kb</td><td width="25%"><a href="docs/gallery.md#cyp2d6-deletion-as-an-arch-over-the-gene"><img src="gallery/cyp2d6_stress.png" alt="Stress layout of CYP2D6 from the hosted index, GRCh38 drawn straight and coloured by position from NDUFA6-DT to CYP2D7, exons outlined in gold: a dashed arch spans CYP2D6, the route of haplotypes that skip the gene, and non-reference sequence hangs in charcoal loops above and below" width="100%"></a><br>CYP2D6 deletion as an arch over the gene</td></tr>
<tr><td width="25%"><a href="docs/gallery.md#kiv-2-expansions-as-extra-loops"><img src="gallery/kiv2_overlay.png" alt="Force-directed KIV-2 array with GRCh38, HG00133 and HG00097 lifted together, each shaded along its own length from light to mid-tone: GRCh38 grey, HG00133 cyan to blue, 133 kb longer, and HG00097 yellow to red-orange, 22.4 kb longer. GRCh38 runs straight in along 30 kb of flank from either side to a knot of loops at the array. Where walks share nodes their lanes run side by side. All three walks run the loops at the top, HG00133 and HG00097 run the loop at the lower right together, and HG00133 alone runs the loop at the lower left. Walk rows below, each on its walk's ramp under a grey strip where it runs on the GRCh38 path, give the lengths: GRCh38 31 kb, HG00133 164 kb and HG00097 53 kb, with the lower right loop outlined as block A in both" width="100%"></a><br>KIV-2 expansions as extra loops</td><td width="25%"><a href="docs/gallery.md#c4-copies-as-threads-round-an-impg-syng-graph"><img src="gallery/syng_overlay.png" alt="The syng graph of C4 with three walks lifted together, each shaded light to dark along its own length, grch38#chr6 grey, HG01978#2 cyan to blue and HG01952#1 peach to rust, and a thread for every pass through a node: round the ring, outside in, grch38#chr6 draws two threads, HG01978#2 three, its extra C4 copy, and HG01952#1 two, each pass darker than the one before. Grey and blue threads run round the HERV-K loop at the left, and the orange ones cut across it. Walk rows below, each on its walk's ramp under a grey strip where it runs on the grch38 path, give the lengths: grch38#chr6 84 kb, HG01978#2 116 kb and HG01952#1 71 kb" width="100%"></a><br>C4 copies as threads round an impg syng graph</td><td width="25%"><a href="docs/gallery.md#rhd-deletion-and-duplication-in-an-impg-syng-graph"><img src="gallery/syng_rhd.png" alt="Force-directed syng graph of RHD from 19 HPRC haplotypes with three walks lifted together, each shaded light to dark along its own length, grch38 grey, HG01106#1 cyan to blue and HG01258#2 peach to rust, and a thread for every pass through a node. Through the Rhesus box at the left, grch38 draws two threads, HG01106#1 three and HG01258#2 one, each pass darker than the one before. Round the loop at the top, labelled RHD, grch38 draws one thread, HG01106#1 two, its second RHD, and HG01258#2 none, taking the box straight on to the loop below, labelled TMEM50A and RHCE, that every walk runs once. In the walk rows below, each on its walk's ramp under a grey strip where it runs on the grch38 path, grch38 spans 202 kb, HG01106#1 272 kb and HG01258#2 132 kb" width="100%"></a><br>RHD deletion and duplication in an impg syng graph</td><td width="25%"><a href="docs/gallery.md#your-own-colours-gstm1-missing-from-two-thirds-of-haplotypes"><img src="gallery/own_colours.png" alt="The GSTM1 locus cut from the walk file with all 464 HPRC haplotypes, force-directed and drawn with plain ggplot2 layers: grey edges, exons outlined in orange, and each node coloured and sized by the share of haplotypes through it. GSTM4, GSTM2 and GSTM5 run as thick black strands that every haplotype walks. GSTM1 hangs off them as a thin pale loop, beside a second pale loop of non-reference sequence, and most haplotypes take the grey dashed edge that skips both. Small pale specks along the black strands are small variants" width="100%"></a><br>Your own colours: GSTM1, missing from two thirds of haplotypes</td></tr>
</table>
<!-- /gallery -->

More, with code, in [the gallery](docs/gallery.md).

## Docs

- [Gallery](docs/gallery.md): every figure with its code, including your own
  colours and stacking loci with patchwork
- [Region-specific pangenomes](vignettes/region-pangenomes.Rmd): creating and using an indexed
  pangenome with gfa-to-tabix
- [Walk rows](vignettes/walk-rows.Rmd): `bandage_walk_rows()` and how to read its
  bars
- [Developing](docs/developing.md): for contributors, with the file readers,
  the engine bundle, the gallery and the test fixtures

## See also

- [BandageJS](https://github.com/GMOD/BandageJS) browses the same graphs in a
  web browser
- [jbrowse-plugin-graphgenomeviewer](https://github.com/GMOD/jbrowse-plugin-graphgenomeviewer)
  browses them in JBrowse

R libraries

- [ggjbrowse](https://github.com/GMOD/ggjbrowse) draws gene tracks to stack
  above these figures
- [ggtubemap](https://github.com/GMOD/ggtubemap) draws tube maps from the GFA
  that `bandage_gfa()` returns

Tutorials

- The HPRC tutorials on jbrowse.org:
  [graph alleles and haplotypes](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc/)
  and [repeat lengths](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc_repeats/)

Libraries

- [gfa-to-tabix](https://github.com/GMOD/gfa-to-tabix): writes walk files and
  segment indexes
- [@jbrowse/graph-walks](https://github.com/GMOD/graph-walks) (npm): cuts a
  region out of a walk file
- [@jbrowse/bandage-core](https://github.com/GMOD/bandage-core) (npm): layout
  and drawing
- [@jbrowse/graph-stress-layout](https://github.com/GMOD/graph-stress-layout)
  (npm): stress layout

## License

GPL-3.0-or-later, as [bandage-core](https://github.com/GMOD/bandage-core),
[Bandage](https://github.com/rrwick/Bandage) and
[OGDF](https://www.ogdf.uni-osnabrueck.de/) are.
