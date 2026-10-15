pggb <- test_path("testdata", "ecoli_pggb_subgraph.gfa")
rgfa <- test_path("testdata", "ecoli_rgfa_slice.gfa.gz")
walk_file <- test_path("testdata", "ecoli_pggb.K12.walks.bed.gz")
lifted <- c("K12#1#chr:1004500-1004961", "IAI39#1#chr:2249412-2249872")

test_that("each lifted walk gets a key bar, and the rest a faded one", {
  g <- bandage_layout(pggb, walks = lifted)
  expect_equal(g$keys$walk, c("K12", "IAI39"))
  expect_match(g$keys$stops, "^#[0-9a-f]{6}(,#[0-9a-f]{6})*$")
  k <- keys_of(g)
  expect_equal(k$note[3], "not on these walks")
  expect_no_error(ggplot2::ggplot_gtable(ggplot2::ggplot_build(ggplot2::autoplot(g))))
})

test_that("faceted, each panel draws its own walk's bar", {
  g <- bandage_layout(pggb, walks = lifted, facet = "walk")
  expect_equal(levels(keys_of(g)$panel), c("K12", "IAI39"))
})

test_that("labels name each node once, at a point of its stroke", {
  g <- bandage_layout(pggb)
  d <- ggplot2::layer_data(ggplot2::ggplot(g) + geom_bandage_labels())
  expect_setequal(d$label, unique(g$nodes$name))
})

test_that("a gene lands on the backbone nodes under it", {
  g <- bandage_layout(rgfa, genes = test_path("testdata", "ecoli_genes.bed"))
  expect_equal(g$genes$gene, "geneA")
  expect_gt(nrow(g$exons), 0)
  expect_true(all(g$exons$node %in% g$nodes$node))
})

test_that("walk rows measure each walk on its own bp", {
  w <- bandage_walk_rows(pggb)
  expect_s3_class(w, "bandage_walk_rows")
  expect_equal(w$rows$label[1], "K12")
  bars <- tapply(w$runs$bp, w$runs$row, sum)
  expect_equal(as.vector(bars), w$rows$bp)
  expect_no_error(ggplot2::ggplot_build(ggplot2::autoplot(w)))
})

test_that("a walk file cuts the walks under a region", {
  region <- "chr:1004500-1004961"
  gfa <- bandage_gfa(walk_file, region, context = 0)
  expect_match(gfa, "\nW\t")
  w <- bandage_walk_rows(walk_file, region, context = 0)
  expect_setequal(w$rows$sample, bandage_walk_rows(pggb)$rows$sample)
  expect_s3_class(bandage_layout(walk_file, region = region), "bandage_layout")
})

test_that("a walk the graph lacks warns, naming the ones it has", {
  expect_warning(bandage_layout(pggb, walks = "K12"), "no walk named K12; the graph has K12#1")
})

test_that("the stress engine lays the graph out", {
  g <- bandage_layout(pggb, engine = "stress")
  expect_setequal(unique(g$nodes$node), unique(bandage_layout(pggb)$nodes$node))
})
