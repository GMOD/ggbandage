# ggbandage

- **In:** a GFA file, or a region of a
  [gfa-to-tabix](https://github.com/GMOD/gfa-to-tabix) walk file or segment
  index, local or a url
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
gfa-to-tabix hprc-v2.1-mc-grch38.gfa --walks --refs GRCh38,CHM13 -o hprc-v2.1-mc-grch38
```

[Layout options](vignettes/layout-options.Rmd) covers `walks`, `facet`,
`engine` and `genes`.

## Your own pangenome

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

## Gallery

<!-- gallery -->
<table>
<tr><td width="25%"><a href="docs/gallery.md#kiv-2-against-a-straight-grch38-backbone-with-lpas-exons"><img src="gallery/kiv2_stress.png" alt="Stress layout of the KIV-2 array from the hosted index: GRCh38 drawn straight and coloured by position, LPA's exons outlined in orange, non-reference nodes in grey hanging below, and dashed arches where haplotypes skip reference sequence" width="100%"></a><br>KIV-2 against a straight GRCh38 backbone, with LPA's exons</td><td width="25%"><a href="docs/gallery.md#lpas-kiv-2-repeat-a-panel-per-walk"><img src="gallery/kiv2_walks.png" alt="Force-directed layout of the KIV-2 array cut from the walk file for HG00097, GRCh38 and HG00097 each lifted in a separate panel and shaded yellow to red along its length: HG00097 walks one 22 kb loop that GRCh38 skips, and the panel titles give HG00097 55 kb and GRCh38 32.8 kb, each span the region plus 1 kb of flank either side" width="100%"></a><br>LPA's KIV-2 repeat, a panel per walk</td><td width="25%"><a href="docs/gallery.md#three-kiv-2-haplotypes-overlaid"><img src="gallery/kiv2_overlay.png" alt="Force-directed KIV-2 array with three walks lifted together, each shaded along its own length: GRCh38 grey to black, HG00097#1 cyan to navy, 22.2 kb longer, and HG00133#1 yellow to red, 116 kb longer. Walk rows below show each haplotype's length. HG00097#1 alone runs a small loop at the right, and only HG00133#1 runs the large loop below" width="100%"></a><br>Three KIV-2 haplotypes overlaid</td><td width="25%"><a href="docs/gallery.md#cfhr3-and-cfhr1-deleted-in-one-of-three-walks"><img src="gallery/cfh_overlay.png" alt="Force-directed CFH locus with three walks lifted together, each shaded along its own length: GRCh38 grey to black, HG00097#1 cyan to navy, and HG02055#1 yellow to red, 84.5 kb shorter, which takes the dashed deletion edge under the loop through CFHR3 and CFHR1. Walk rows below show each haplotype's length" width="100%"></a><br>CFHR3 and CFHR1 deleted in one of three walks</td></tr>
<tr><td width="25%"><a href="docs/gallery.md#kiv-2-copy-number-as-walk-rows"><img src="gallery/kiv2_rows.png" alt="Walk rows at KIV-2 on a bp-from-flank axis: between the flanking reference nodes GRCh38 spans 31 kb and HG00133#2 164 kb, and the extra copies, on non-reference nodes, fall into three blocks: A, 68 kb walked by HG02055#1 and HG00133#2; B, 22 kb walked by four haplotypes; and C, 5.5 kb walked by two" width="100%"></a><br>KIV-2 copy number as walk rows</td><td width="25%"><a href="docs/gallery.md#amylase-copy-number-in-twelve-haplotypes"><img src="gallery/amylase_rows.png" alt="Walk rows over the salivary amylase genes, each bar coloured by the GRCh38 position it covers: the haplotypes span 146 kb to 475 kb, HG00128#1 walks the stretch near 103.72 Mb twice, so its green recurs, five haplotypes walk much of the non-reference block A twice, and HG00097#1 has a 19 kb stretch the graph lacks, drawn as an open box" width="100%"></a><br>Amylase copy number in twelve haplotypes</td><td width="25%"><a href="docs/gallery.md#c4a-and-c4b-in-the-stress-layout"><img src="gallery/c4_stress.png" alt="Stress layout of the complement C4 genes in the MHC, GRCh38 drawn straight, its C4A and C4B the long forms: non-reference sequence hangs in loops below C4A and C4B, and a dashed arch from inside C4A to inside C4B skips one module of C4, CYP21A1P and TNXA" width="100%"></a><br>C4A and C4B in the stress layout</td><td width="25%"><a href="docs/gallery.md#rhd-and-cyp2d6-gene-deletions-as-arches"><img src="gallery/deletions.png" alt="RHD and CYP2D6 in the stress layout, one above the other, GRCh38 straight and genes named: in each, a dashed arch spans the whole gene, the route of haplotypes that skip it, and non-reference sequence hangs in grey" width="100%"></a><br>RHD and CYP2D6 gene deletions as arches</td></tr>
<tr><td width="25%"><a href="docs/gallery.md#c4-as-a-syng-graph-from-impg"><img src="gallery/syng_c4.png" alt="Force-directed syng graph of C4 from 90 haplotypes: a ring coloured red to magenta along GRCh38, whose two C4 copies share its nodes, with blue specks where only the second copy goes. Under it, walk rows for three samples in the same hues: GRCh38 is one smooth gradient over 84 kb, HG02080's 51 kb haplotype has one copy and HG01978's 116 kb haplotype three, each copy in the colours of the GRCh38 copy it continues" width="100%"></a><br>C4 as a syng graph from impg</td><td width="25%"><a href="docs/gallery.md#c4s-herv-k-loop-in-three-syng-walks"><img src="gallery/syng_overlay.png" alt="The syng graph of C4 with three walks lifted together, each shaded along its own length: GRCh38 grey to black, HG01952#1 cyan to navy, 12.7 kb shorter, and HG01978#2 yellow to red, 32.7 kb longer. Walk rows below show each haplotype's length. Only HG01952#1 skips the loop at the left, the 6.5 kb HERV-K of C4's long form" width="100%"></a><br>C4's HERV-K loop in three syng walks</td><td width="25%"><a href="docs/gallery.md#your-own-colours-kiv-2-nodes-by-walk-passes"><img src="gallery/own_colours.png" alt="The KIV-2 array cut from the walk file, force-directed and drawn with plain ggplot2 layers: grey edges, and each node coloured by how many times the cut's walks pass through it, light for once to dark for six" width="100%"></a><br>Your own colours: KIV-2 nodes by walk passes</td></tr>
</table>
<!-- /gallery -->

More, with code, in [the gallery](docs/gallery.md).

## Docs

- [Gallery](docs/gallery.md): every figure with its code, including your own
  colours and stacking loci with patchwork
- [Walk rows](vignettes/walk-rows.Rmd): `bandage_walk_rows()` and how to read its
  bars
- [Developing](docs/developing.md): for contributors, with the file readers,
  the engine bundle, the gallery and the test fixtures

## See also

- [BandageJS](https://github.com/GMOD/BandageJS) browses the same graphs in a
  web browser
- [jbrowse-plugin-graphgenomeviewer](https://github.com/GMOD/jbrowse-plugin-graphgenomeviewer)
  browses them in JBrowse
- [ggjbrowse](https://github.com/GMOD/ggjbrowse) draws gene tracks to stack
  above these figures
- [ggtubemap](https://github.com/GMOD/ggtubemap) draws tube maps from the GFA
  that `bandage_gfa()` returns
- The HPRC tutorials on jbrowse.org:
  [graph alleles and haplotypes](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc/)
  and [repeat lengths](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc_repeats/)

### Libraries

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
