# ggbandage

- **In:** a GFA file, or a region of a
  [gfa-to-tabix](https://github.com/GMOD/gfa-to-tabix) walk file or segment
  index, local or a url
- **Out:** a ggplot of the graph, laid out as
  [Bandage](https://rrwick.github.io/Bandage/) lays it out

```r
remotes::install_github("GMOD/ggbandage")
```

## Usage

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

- `walks` picks the haplotypes to colour, and `facet = "walk"` gives each one
  a panel
- `engine = "stress"` draws the reference straight, with each variant hanging
  off it, in place of Bandage's force-directed default
- `genes` pins a GFF3 or BED file onto the reference
- `?bandage_layout` lists every argument

## Walk rows

`bandage_walk_rows()` draws each haplotype as a bar, so a repeat expansion
shows as a longer bar. See [Reading walk rows](docs/walk-rows.md).

```r
haplotypes <- c("HG00097#1", "HG00099#1", "HG00133#2", "HG01123#1", "HG02055#1")
rows <- bandage_walk_rows(walks, kiv2, haplotypes = haplotypes)
autoplot(rows)
```

## Gallery

Each title links to the figure's code in [docs/gallery.md](docs/gallery.md).

<!-- gallery -->
<table>
<tr><td width="50%"><b><a href="docs/gallery.md#kiv-2-against-a-straight-grch38-backbone-with-lpas-exons">KIV-2 against a straight GRCh38 backbone, with LPA's exons</a></b><br><code>chr6:160,616,004-160,646,753</code><br><img src="gallery/kiv2_stress.png" alt="Stress layout of the KIV-2 array from the hosted index: GRCh38 drawn straight and coloured by position, LPA's exons outlined in orange, non-reference nodes in grey hanging below, and dashed arches where haplotypes skip reference sequence" width="100%"></td><td width="50%"><b><a href="docs/gallery.md#lpas-kiv-2-repeat-a-panel-per-walk">LPA's KIV-2 repeat, a panel per walk</a></b><br><code>chr6:160,616,004-160,646,753</code><br><img src="gallery/kiv2_walks.png" alt="Force-directed layout of the KIV-2 array cut from the walk file for HG00097, GRCh38 and HG00097 each lifted in a separate panel and shaded yellow to red along its length: HG00097 walks one 22 kb loop that GRCh38 skips, and the panel titles give HG00097 55 kb and GRCh38 32.8 kb, each span the region plus 1 kb of flank either side" width="100%"></td></tr>
<tr><td width="50%"><b><a href="docs/gallery.md#three-kiv-2-haplotypes-overlaid">Three KIV-2 haplotypes overlaid</a></b><br><code>chr6:160,616,004-160,646,753</code><br><img src="gallery/kiv2_overlay.png" alt="Force-directed KIV-2 array with three walks lifted together, one flat colour each, side by side where they share nodes: GRCh38 in charcoal, HG00097#1 in blue, 22.2 kb longer, and HG00133#1 in orange, 116 kb longer. HG00097#1 alone runs a small loop at the right, and only HG00133#1 runs the large loop below" width="100%"></td><td width="50%"><b><a href="docs/gallery.md#kiv-2-copy-number-as-walk-rows">KIV-2 copy number as walk rows</a></b><br><code>chr6:160,616,004-160,646,753</code><br><img src="gallery/kiv2_rows.png" alt="Walk rows at KIV-2 on a bp-from-flank axis: between the flanking reference nodes GRCh38 spans 31 kb and HG00133#2 164 kb, and the extra copies, on non-reference nodes, fall into three blocks: A, 68 kb walked by HG02055#1 and HG00133#2; B, 22 kb walked by four haplotypes; and C, 5.5 kb walked by two" width="100%"></td></tr>
</table>
<!-- /gallery -->

## Docs

- [Gallery](docs/gallery.md): every figure with its code, including your own
  colours and stacking loci with patchwork
- [Reading walk rows](docs/walk-rows.md): what each colour and letter in a
  walk-row figure means
- [Walk files and segment indexes](docs/tabix.md): the file formats, and how
  ggbandage reads them
- [Developing](docs/developing.md): the engine bundle, the gallery and the
  tests

## See also

- [gfa-to-tabix](https://github.com/GMOD/gfa-to-tabix) writes the walk files
  and segment indexes
- [ggjbrowse](https://github.com/GMOD/ggjbrowse) draws gene tracks to stack
  above these figures
- [ggtubemap](https://github.com/GMOD/ggtubemap) draws tube maps from the GFA
  that `bandage_gfa()` returns
- [BandageJS](https://github.com/GMOD/BandageJS) and
  [jbrowse-plugin-graphgenomeviewer](https://github.com/GMOD/jbrowse-plugin-graphgenomeviewer)
  browse the same graphs in a web browser
- [@jbrowse/bandage-core](https://github.com/GMOD/bandage-core) is the layout
  engine ggbandage runs
- The HPRC tutorials on jbrowse.org:
  [graph alleles and haplotypes](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc/)
  and [repeat lengths](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc_repeats/)

## License

GPL-3.0-or-later, as bandage-core, Bandage and OGDF are.
