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

test_that("ribbons join neighbouring rows inside both bars", {
  w <- bandage_walk_rows(pggb)
  l <- w$links
  expect_gt(nrow(l), 0)
  expect_true(all(l$a0 >= 0 & l$a1 <= w$rows$bp[l$row + 1]))
  expect_true(all(pmin(l$b0, l$b1) >= 0))
  expect_true(all(pmax(l$b0, l$b1) <= w$rows$bp[l$row + 2] + 1e-6))
  expect_equal(w$rows$bp[-1], sort(w$rows$bp[-1], decreasing = TRUE))
  shared <- bandage_walk_rows(pggb, order = "shared")
  expect_setequal(shared$rows$label, w$rows$label)
  expect_no_error(ggplot2::ggplot_build(ggplot2::autoplot(shared, ribbons = FALSE)))
})

test_that("a walk measured from one flank says it gets no ribbons", {
  gfa <- tempfile(fileext = ".gfa")
  on.exit(unlink(gfa))
  writeLines(c(
    "H\tVN:Z:1.1",
    paste0("S\t", 1:6, "\t", strrep("A", 10)),
    "L\t1\t+\t2\t+\t0M", "L\t2\t+\t3\t+\t0M", "L\t3\t+\t4\t+\t0M", "L\t4\t+\t5\t+\t0M",
    "L\t2\t+\t6\t+\t0M", "L\t6\t+\t4\t+\t0M",
    "W\tref\t0\tchr\t0\t50\t>1>2>3>4>5",
    "W\thap\t1\tc1\t0\t50\t>1>2>6>4>5",
    "W\tcut\t1\tc2\t0\t25\t>1>2>6"
  ), gfa)
  w <- bandage_walk_rows(gfa, region = "ref#0#chr:21-30")
  partial <- w$rows[w$rows$label == "cut#1", ]
  expect_false(partial$linked)
  expect_match(partial$readout, "no ribbons$")
  expect_false(any(grepl("no ribbons", w$rows$readout[w$rows$linked])))
  expect_false(any(grepl("the cut", w$rows$readout)))
  expect_no_error(ggplot2::ggplot_build(ggplot2::autoplot(w)))
})

test_that("a block letter marks the same off-reference nodes in every row, whatever the order", {
  w <- bandage_walk_rows(pggb)
  b <- w$blocks
  expect_true(all(tapply(b$row, b$letter, function(r) length(unique(r))) >= 2))
  expect_true(all(b$xmin >= 0 & b$xmax <= w$rows$bp[b$row + 1]))
  key <- function(x) {
    k <- paste(x$rows$label[x$blocks$row + 1], x$blocks$start, x$blocks$letter)
    sort(k)
  }
  expect_equal(key(bandage_walk_rows(pggb, order = "shared")), key(w))
})

test_that("a bar on the reference's path is coloured by the reference position it covers", {
  w <- bandage_walk_rows(pggb)
  on <- w$runs[w$runs$kind == "on the reference's path", ]
  expect_false(anyNA(on$referenceStart))
  tiles <- bar_tiles(w$runs, max(w$rows$bp) / 600)
  expect_equal(tapply(tiles$xmax, tiles$row, max), tapply(w$runs$xmax, w$runs$row, max))
  expect_false(anyNA(tiles$position[tiles$kind == "on the reference's path"]))

  backwards <- data.frame(
    row = 0, xmin = 0, xmax = 100, bp = 100, kind = factor("on the reference's path"),
    referenceStart = 1000, reversed = TRUE
  )
  expect_true(all(diff(bar_tiles(backwards, 10)$position) < 0))
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
