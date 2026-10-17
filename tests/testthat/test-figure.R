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
  expect_equal(unique(d$colour), "grey15")
})

test_that("a label's colour can be mapped or set", {
  g <- bandage_layout(pggb)
  mapped <- ggplot2::layer_data(
    ggplot2::ggplot(g) + geom_bandage_labels(ggplot2::aes(colour = depth))
  )
  expect_false("grey15" %in% mapped$colour)
  expect_no_warning(
    set <- ggplot2::layer_data(ggplot2::ggplot(g) + geom_bandage_labels(colour = "red"))
  )
  expect_equal(unique(set$colour), "red")
})

test_that("a gene lands on the backbone nodes under it", {
  g <- bandage_layout(rgfa, genes = test_path("testdata", "ecoli_genes.bed"))
  expect_equal(g$genes$gene, "geneA")
  expect_gt(nrow(g$exons), 0)
  expect_true(all(g$exons$node %in% g$nodes$node))
})

test_that("a gene file naming the backbone otherwise warns, and gene_names binds it", {
  bed <- tempfile(fileext = ".bed")
  on.exit(unlink(bed))
  writeLines("NC_000913.3\t994000\t998000\tgeneA\t0\t+", bed)
  expect_warning(
    g <- bandage_layout(rgfa, genes = bed),
    'names chr; it has NC_000913.3. Give gene_names .* c\\("chr" = "NC_000913.3"\\)'
  )
  expect_equal(nrow(g$genes), 0)
  g <- expect_no_warning(
    bandage_layout(rgfa, genes = bed, gene_names = c(chr = "NC_000913.3"))
  )
  expect_equal(g$genes$gene, "geneA")
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

test_that("walk rows with no ribbons or blocks keep their tables' columns", {
  gfa <- tempfile(fileext = ".gfa")
  on.exit(unlink(gfa))
  writeLines(c(
    "H\tVN:Z:1.1",
    paste0("S\t", 1:6, "\t", strrep("A", 10)),
    "L\t1\t+\t2\t+\t0M", "L\t2\t+\t3\t+\t0M", "L\t3\t+\t4\t+\t0M", "L\t4\t+\t5\t+\t0M",
    "L\t2\t+\t6\t+\t0M",
    "W\tref\t0\tchr\t0\t50\t>1>2>3>4>5",
    "W\tcut\t1\tc2\t0\t25\t>1>2>6"
  ), gfa)
  w <- bandage_walk_rows(gfa, region = "ref#0#chr:21-30")
  expect_equal(nrow(w$links), 0)
  expect_named(w$links, c("row", "a0", "a1", "b0", "b1"))
  expect_equal(nrow(w$blocks), 0)
  expect_true(all(c("row", "start", "bp", "block", "letter") %in% names(w$blocks)))
  expect_no_error(ggplot2::ggplot_gtable(ggplot2::ggplot_build(ggplot2::autoplot(w))))
})

test_that("a reference filed in pieces out of order flanks its rows as the core does", {
  gfa <- tempfile(fileext = ".gfa")
  on.exit(unlink(gfa))
  writeLines(c(
    paste0("S\t", 1:4, "\t", strrep("A", 10)),
    "L\t1\t+\t2\t+\t0M", "L\t2\t+\t3\t+\t0M", "L\t3\t+\t1\t+\t0M", "L\t1\t+\t4\t+\t0M",
    "W\tref\t0\tchr\t20\t50\t>3>1>4",
    "W\tref\t0\tchr\t0\t20\t>1>2",
    "W\thap\t1\tc\t0\t50\t>1>2>3>1>4"
  ), gfa)
  w <- bandage_walk_rows(gfa, region = "ref#0#chr:21-30")
  expect_true(all(w$rows$linked))
  expect_gt(nrow(w$links), 0)
})

test_that("a node the graph does not declare leaves the other blocks lettered", {
  gfa <- tempfile(fileext = ".gfa")
  on.exit(unlink(gfa))
  writeLines(c(
    paste0("S\t", 1:5, "\t", strrep("A", 10)),
    "L\t1\t+\t2\t+\t0M", "L\t2\t+\t3\t+\t0M", "L\t2\t+\t4\t+\t0M", "L\t4\t+\t3\t+\t0M",
    "L\t3\t+\t5\t+\t0M",
    "W\tref\t0\tchr\t0\t40\t>1>2>3>5",
    "W\ta\t1\tc\t0\t50\t>1>2>4>3>5",
    "W\tb\t1\tc\t0\t50\t>1>2>4>3>5",
    "W\tc\t1\tc\t0\t60\t>1>2>4>9>3>5"
  ), gfa)
  w <- bandage_walk_rows(gfa)
  expect_setequal(w$rows$label[w$blocks$row + 1], c("a#1", "b#1", "c#1"))
  expect_equal(unique(w$blocks$letter), "A")
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

test_that("a region is a 1-based locus on a GFA and a walk file alike", {
  expect_equal(
    graph_source(pggb, "K12#1#chr:1004501-1004961", NULL, 0)$region,
    "K12#1#chr:1004500-1004961"
  )
  expect_equal(
    graph_source(walk_file, "chr:1004501-1004961", NULL, 0)$region,
    "K12#1#chr:1004500-1004961"
  )
  g <- bandage_layout(walk_file, region = "chr:1004600-1004600", context = 50)
  expect_s3_class(g, "bandage_layout")
})

records <- test_path("testdata", "records.GRCh38.walks.bed.gz")

test_that("a gap in a walk row says what the walk file states of it", {
  w <- bandage_walk_rows(records, "chr1:1001-5000", context = 0)
  gaps <- w$runs[w$runs$gap, ]
  expect_equal(as.character(gaps$kind[gaps$label == "HG003#1"]), "on nodes filed elsewhere")
  expect_match(w$rows$readout[w$rows$label == "HG003#1"], "1.0 kb on nodes filed near chr1:9 kb$")
  # HG002's records break 500 bp and 800 bp either side of a third, which
  # visits no GRCh38 node, so the 700 bp between the breaks stay open
  expect_equal(
    as.character(gaps$kind[gaps$label == "HG002#1"]),
    c("not in the graph", "gap, cause unknown", "not in the graph")
  )
  expect_equal(gaps$bp[gaps$label == "HG002#1"], c(500, 700, 800))
  expect_no_error(ggplot2::ggplot_gtable(ggplot2::ggplot_build(ggplot2::autoplot(w))))
})

test_that("a gap a record break spans is not in the graph, and untagged gaps read as before", {
  gfa <- function(...) {
    f <- tempfile(fileext = ".gfa")
    writeLines(c(
      paste0("S\t", 1:5, "\t*\tLN:i:1000"),
      paste0("L\t", 1:4, "\t+\t", 2:5, "\t+\t0M"),
      "W\tGRCh38\t0\tchr1\t0\t5000\t>1>2>3>4>5", ...
    ), f)
    f
  }
  tagged <- bandage_walk_rows(gfa(
    "W\tHG002\t1\tchr1\t0\t2000\t>1>2\tws:Z:end\twe:Z:break,bp=1000",
    "W\tHG002\t1\tchr1\t3000\t5000\t>4>5\tws:Z:break,bp=1000\twe:Z:end"
  ), referencePath = "GRCh38#0#chr1")
  expect_equal(as.character(tagged$runs$kind[tagged$runs$gap]), "not in the graph")
  expect_match(tagged$rows$readout[2], "1.0 kb not in the graph$")
  plain <- bandage_walk_rows(gfa(
    "W\tHG002\t1\tchr1\t0\t2000\t>1>2",
    "W\tHG002\t1\tchr1\t3000\t5000\t>4>5"
  ), referencePath = "GRCh38#0#chr1")
  expect_equal(as.character(plain$runs$kind[plain$runs$gap]), "outside the extracted subgraph")
  expect_match(plain$rows$readout[2], "1.0 kb outside the extracted subgraph$")
})

test_that("a walk the graph lacks warns, naming the ones it has", {
  expect_warning(bandage_layout(pggb, walks = "K12"), "no walk named K12; the graph has K12#1")
})

test_that("the stress engine lays the graph out", {
  g <- bandage_layout(pggb, engine = "stress")
  expect_setequal(unique(g$nodes$node), unique(bandage_layout(pggb)$nodes$node))
})
