pggb <- test_path("testdata", "ecoli_pggb_subgraph.gfa")
rgfa <- test_path("testdata", "ecoli_rgfa_slice.gfa.gz")

test_that("a force layout lays every node out, with its node table", {
  g <- bandage_layout(pggb)
  expect_s3_class(g, "bandage_layout")
  expect_false(anyNA(g$nodes$length))
  expect_true(all(c("depth", "length", "backbone") %in% names(g$nodes)))
})

test_that("walks facet a panel each, in the core's order", {
  g <- bandage_layout(
    pggb,
    walks = c("K12#1#chr:1004500-1004961", "IAI39#1#chr:2249412-2249872"),
    facet = "walk"
  )
  expect_equal(levels(g$nodes$panel), c("K12", "IAI39"))
  b <- ggplot2::ggplot_build(ggplot2::autoplot(g))
  expect_equal(nrow(b$layout$layout), 2)
})

test_that("an anchored layout draws a bp axis and its rows on y", {
  g <- bandage_layout(rgfa, layout = "auto")
  expect_true(g$meta$referenceAxis)
  b <- ggplot2::ggplot_build(ggplot2::autoplot(g))
  expect_equal(b$layout$panel_params[[1]]$y$get_labels(), g$rows$label)
})

test_that("a mapped aesthetic replaces the view's colour", {
  g <- bandage_layout(pggb)
  p <- ggplot2::ggplot(g) + geom_bandage_nodes(ggplot2::aes(colour = length))
  d <- ggplot2::layer_data(p)
  expect_false(identical(d$colour, nodes_of(g)$ink))
})

test_that("faded ink is mixed with the background, not stacked", {
  expect_equal(ink("#000000", 0.5, "white"), "#808080")
  expect_equal(ink("#ff0000", 1, "white"), "#FF0000")
})

test_that("a GFA reads from a URL, plain or gzipped", {
  skip_on_os("windows")
  for (path in c(pggb, rgfa)) {
    url <- paste0("file://", normalizePath(path))
    expect_identical(read_gfa(url), read_gfa(path))
  }
})
