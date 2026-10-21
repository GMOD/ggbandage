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

GRCh38 and HG00097#1 across LPA's KIV-2 repeat, each walk shaded yellow to
red along its length. HG00097#1 runs a 22 kb loop of extra repeat copies that
GRCh38 skips.

- `walks` picks the haplotypes to colour, and `facet = "walk"` gives each one
  a panel
- `engine = "stress"` draws the reference straight, with each variant hanging
  off it, in place of Bandage's force-directed default
- `genes` pins a GFF3 or BED file onto the reference
- `?bandage_layout` lists every argument

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

[Developing](docs/developing.md#reading-gfa-to-tabix-files) has how ggbandage
reads walk files and segment indexes.

## Walk rows

`bandage_walk_rows()` draws each walk as a bar of the bp it has between the
reference nodes flanking the region, with the reference on top and the walks
that reach both flanks below it, longest first. A repeat expansion shows as a longer bar,
which no node layout shows. The gallery has
[KIV-2](docs/gallery.md#kiv-2-copy-number-as-walk-rows) and
[amylase](docs/gallery.md#amylase-copy-number-in-twelve-haplotypes) examples.

```r
haplotypes <- c("HG00097#1", "HG00099#1", "HG00133#2", "HG01123#1", "HG02055#1")
rows <- bandage_walk_rows(walks, kiv2, haplotypes = haplotypes)
autoplot(rows)
```

![Walk rows at KIV-2: GRCh38 spans 31 kb between the flanking reference nodes and HG00133#2 164 kb, the extra copies falling into blocks A, B and C](gallery/kiv2_rows.png)

### Reading walk rows

- **x:** bp from the left flank, counted along each walk, not reference
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
- **Charcoal:** sequence on non-reference nodes. Such sequence can still
  resemble the reference, as an extra repeat copy does, but the graph holds it
  on separate nodes
- **Letters:** a block of non-reference nodes that two or more drawn rows
  walk, the same letter wherever it recurs, A for the most bp. A letter twice
  in one row means the row walks some of those nodes twice, or other sequence
  splits the block. A block counts once a stretch of it reaches 1.2% of the
  longest bar, and `autoplot()` fills the three largest. Which rows are drawn
  decides the blocks, and another row can split one
- **White:** sequence missing from the extracted subgraph, counted in the
  bar's length:
  - **outside the extracted subgraph** (dashed): graph sequence the walk takes
    away from the region's nodes. From a walk file, the readout names where,
    e.g. `34 kb on nodes filed near chr22:20.3 Mb`
  - **not in the graph** (solid dark, walk files only): the walk's record ends
    and the contig's next record starts past it
  - **gap, cause unknown** (dotted, walk files only): the file leaves it open,
    as between two record breaks with a record the reference never visits
    between them
- **Ribbons:** pale blue where neighbouring rows walk the same graph nodes,
  violet where one walks them backwards. Shared nodes mean similar sequence,
  not shared ancestry. `autoplot(rows, ribbons = FALSE)` leaves them out, as
  for rows that share almost every node
- Inside a repeat, the ribbons show one pairing of the copies, the one that
  keeps both rows in order. A missing ribbon there does not mean the rows
  share nothing
- A walk measured from one flank gets no ribbons or letters, and its readout
  ends `· no ribbons`
- `order = "shared"` puts each row under the row it shares the most nodes
  with. The order is a layout aid and does not show relatedness
- `rows$rows` has each walk's `bp` and readout, `rows$runs` each stretch of
  each bar, `rows$links` each ribbon and `rows$blocks` each stretch of a block

## Gallery

<!-- gallery -->
<table>
<tr><td width="33%"><a href="docs/gallery.md#kiv-2-against-a-straight-grch38-backbone-with-lpas-exons"><img src="gallery/kiv2_stress.png" alt="Stress layout of the KIV-2 array from the hosted index: GRCh38 drawn straight and coloured by position, LPA's exons outlined in orange, non-reference nodes in grey hanging below, and dashed arches where haplotypes skip reference sequence" width="100%"></a><br>KIV-2 against a straight GRCh38 backbone, with LPA's exons</td><td width="33%"><a href="docs/gallery.md#three-kiv-2-haplotypes-overlaid"><img src="gallery/kiv2_overlay.png" alt="Force-directed KIV-2 array with three walks lifted together, one flat colour each, side by side where they share nodes: GRCh38 in charcoal, HG00097#1 in blue, 22.2 kb longer, and HG00133#1 in orange, 116 kb longer. HG00097#1 alone runs a small loop at the right, and only HG00133#1 runs the large loop below" width="100%"></a><br>Three KIV-2 haplotypes overlaid</td><td width="33%"><a href="docs/gallery.md#amylase-copy-number-in-twelve-haplotypes"><img src="gallery/amylase_rows.png" alt="Walk rows over the salivary amylase genes, each bar coloured by the GRCh38 position it covers: the haplotypes span 146 kb to 475 kb, HG00128#1 walks the stretch near 103.72 Mb twice, so its green recurs, five haplotypes walk much of the non-reference block A twice, and HG00097#1 has a 19 kb stretch the graph lacks, drawn as an open box" width="100%"></a><br>Amylase copy number in twelve haplotypes</td></tr>
</table>
<!-- /gallery -->

More, with code, in [the gallery](docs/gallery.md).

## Docs

- [Gallery](docs/gallery.md): every figure with its code, including your own
  colours and stacking loci with patchwork
- [Developing](docs/developing.md): how ggbandage reads walk files and
  segment indexes, the engine bundle, the gallery and the test fixtures

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
