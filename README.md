# ggbandage

Pangenome graph figures as ggplot2 layers. `bandage_layout()` runs the
[@jbrowse/bandage-core](https://github.com/GMOD/bandage-core) pipeline in V8
(GFA parsing, Bandage's FMMM layout as WASM, the anchored and row layouts, walk
lifting) and returns its drawing as tables, which the geoms draw with grid. A
plot is an ordinary ggplot: themes, facets, scales, patchwork and `ggsave()` to
PDF all work.

```r
remotes::install_github("GMOD/ggbandage")
```

```r
library(ggbandage)

g <- bandage_layout(
  "kiv2.gfa",
  walks = c("GRCh38#0#chr6", "HG00097#1#JBIRDD010000043.1"),
  facet = "walk"
)
autoplot(g, ncol = 2)
ggplot2::ggsave("kiv2.pdf", width = 10, height = 6)
```

![LPA's KIV-2 repeat array from the HPRC release 2 graph, a panel per walk](man/figures/kiv2.png)

`autoplot()` draws the graph as the Bandage view does. To draw it your own way,
map columns of the node table (`depth`, `length`, `backbone`, `node`):

```r
library(ggplot2)

ggplot(g) +
  geom_bandage_edges(aes(colour = I("grey70"))) +
  geom_bandage_nodes(aes(colour = log10(length))) +
  scale_colour_viridis_c() +
  coord_fixed() +
  theme_void()
```

Widths are absolute, as on screen: a 6 px node is 1/16 in at any figure size.

Layouts are `force` (the default), `auto` (anchored to the reference),
`ordered` and `samplerows`. The anchored and row layouts put reference bp on x
and name their rows on y.

## The engine bundle

`inst/js/bandage.js` is bandage-core bundled for V8, committed so installing
needs no JavaScript toolchain. Its first line names the core it was built from.
To rebuild it, with bandage-core checked out beside this repo:

```console
cd ../bandage-core && pnpm install && cd -
pnpm install
pnpm build
```

The `bundle` workflow rebuilds it nightly against bandage-core `main` and runs
the tests on the result, since a change there fires no event here.

## Not yet

Tube maps, walk rows, gene pins, node labels and the walk keys' colour bars.

## License

GPL-3.0-or-later, as bandage-core, Bandage and OGDF are.
