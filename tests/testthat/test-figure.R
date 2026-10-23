pggb <- test_path("testdata", "ecoli_pggb_subgraph.gfa")
rgfa <- test_path("testdata", "ecoli_rgfa_slice.gfa.gz")
walk_file <- test_path("testdata", "ecoli_pggb.K12.walks.bed.gz")
lifted <- c("K12#1#chr:1004500-1004961", "IAI39#1#chr:2249412-2249872")

drawn_keys <- function(plot, width) {
  grDevices::pdf(NULL, width = width, height = 6)
  on.exit(grDevices::dev.off())
  gt <- ggplot2::ggplotGrob(plot)
  box <- gt$grobs[[which(gt$layout$name == "guide-box-top")]]
  find <- function(x) {
    if (inherits(x, "bandage_key_guide")) {
      return(x)
    }
    for (child in c(x$grobs, x$children)) {
      hit <- find(child)
      if (!is.null(hit)) {
        return(hit)
      }
    }
    NULL
  }
  key <- find(box)
  inches <- grid::convertHeight(grid::grobHeight(key), "inches", valueOnly = TRUE)
  room <- grid::convertWidth(grid::grobWidth(key), "inches", valueOnly = TRUE)
  grid::pushViewport(grid::viewport(width = grid::unit(room, "inches")))
  kids <- grid::makeContent(key)$children
  texts <- Filter(function(k) inherits(k, "text"), kids)
  y <- vapply(texts, function(k) -grid::convertY(k$y, "inches", valueOnly = TRUE), 0)
  x <- vapply(texts, function(k) grid::convertX(k$x, "inches", valueOnly = TRUE), 0)
  list(labels = unname(vapply(texts, function(k) k$label, "")[order(y, x)]), inches = inches, room = room)
}

test_that("the key names each lifted walk, then what no walk visits", {
  g <- bandage_layout(pggb, walks = lifted)
  k <- drawn_keys(ggplot2::autoplot(g), 8)
  expect_equal(k$labels, c(paste0(c("K12", "IAI39"), g$keys$note), "not on these walks"))
})

test_that("the key wraps to the width the plot is drawn at", {
  g <- bandage_layout(pggb, walks = lifted)
  narrow <- drawn_keys(ggplot2::autoplot(g), 3)
  wide <- drawn_keys(ggplot2::autoplot(g), 10)
  expect_gt(narrow$inches, wide$inches)
  expect_lt(narrow$room, 3)
  expect_equal(narrow$labels, wide$labels)
})

test_that("a panel's key that would run past its right edge starts a new line", {
  k <- data.frame(stops = "#000000", label = strrep("w", 20), alpha = 1)[rep(1, 3), ]
  grDevices::pdf(NULL)
  on.exit(grDevices::dev.off())
  grid::pushViewport(grid::viewport(width = grid::unit(3, "inches")))
  g <- grid::makeContent(grid::gTree(keys = k, text = TRUE, cl = "bandage_keys"))
  bars <- Filter(function(c) inherits(c, "rect"), g$children)
  expect_length(unique(vapply(bars, function(b) as.character(b$y), "")), 3)
})

repeat_gfa <- paste(
  "S\tv1\tAAAA", "S\tv2\tCC", "S\tv3\tGGG",
  "L\tv1\t+\tv2\t+\t0M", "L\tv2\t+\tv3\t+\t0M", "L\tv2\t+\tv1\t+\t0M",
  "W\tref\t0\tchr\t0\t9\t>v1>v2>v3", "W\tdup\t1\tchr\t0\t15\t>v1>v2>v1>v2>v3",
  sep = "\n"
)

test_that("a walk passing a node twice draws two threads there, and the key says so", {
  gfa <- tempfile(fileext = ".gfa")
  writeLines(repeat_gfa, gfa)
  g <- bandage_layout(gfa, walks = c("ref#0#chr", "dup#1#chr"), engine = "stress")
  p <- ggplot2::autoplot(g)
  v1 <- g$nodes[g$nodes$name == "v1" & !is.na(g$nodes$walk), ]
  threads <- tapply(v1$stroke, v1$walk, function(x) length(unique(x)))
  expect_equal(as.vector(threads), c(1, 2))
  expect_equal(drawn_keys(p, 8)$labels[4], "a thread per pass through a node")
})

placed_keys <- function(plot, width, height) {
  grDevices::pdf(NULL, width = width, height = height)
  on.exit(grDevices::dev.off())
  print(plot)
  grid::grid.force()
  found <- grid::grid.ls(print = FALSE, view = TRUE, fullNames = TRUE)
  names_of <- function(path) {
    sub("^[a-zA-Z]+\\[(.*)\\]$", "\\1", strsplit(path, "::", fixed = TRUE)[[1]])
  }
  at <- which(startsWith(found$name, "text[") & grepl("guide-box-top", found$gPath))
  do.call(rbind, lapply(at, function(i) {
    text <- grid::grid.get(do.call(grid::gPath, as.list(c(names_of(found$gPath[i]), names_of(found$name[i])))))
    grid::seekViewport(do.call(grid::vpPath, as.list(names_of(found$vpPath[i])[-1])))
    at <- grid::deviceLoc(text$x, text$y, valueOnly = TRUE)
    wide <- grid::convertWidth(grid::grobWidth(text), "inches", valueOnly = TRUE)
    data.frame(label = text$label, left = at$x, right = at$x + wide, y = at$y)
  }))
}

test_that("the key sits at the plot's top left and wraps inside it at any size", {
  gfa <- tempfile(fileext = ".gfa")
  writeLines(paste(repeat_gfa, "W\tthird\t1\tchr\t0\t9\t>v1>v2>v3", sep = "\n"), gfa)
  three <- bandage_layout(gfa, walks = c("ref#0#chr", "dup#1#chr", "third#1#chr"), engine = "stress")
  one <- bandage_layout(pggb, walks = lifted[1])
  for (g in list(one, three)) {
    want <- c(paste0(g$keys$walk, g$keys$note), keys_of(g)$note[-seq_len(nrow(g$keys))])
    for (width in c(4, 9, 12)) {
      for (height in c(3, 6)) {
        k <- placed_keys(ggplot2::autoplot(g), width, height)
        expect_setequal(k$label, want)
        expect_lt(min(k$left), 1.1)
        expect_lte(max(k$right), width)
        expect_gt(max(k$y), height - 0.3)
      }
    }
  }
  expect_gt(length(unique(placed_keys(ggplot2::autoplot(three), 4, 3)$y)), 1)
})

test_that("only a plot keyed by walks pins its layout, and not in a patchwork", {
  skip_if_not_installed("patchwork")
  p <- ggplot2::autoplot(bandage_layout(pggb, walks = lifted))
  expect_s3_class(p, "bandage_plot")
  pdf(NULL)
  on.exit(dev.off())
  expect_true(isTRUE(patchwork:::plot_table(p, "auto")$respect))
  expect_true(is.matrix(ggplot2::ggplotGrob(p)$respect))
  expect_false(inherits(ggplot2::autoplot(bandage_layout(pggb)), "bandage_plot"))
})

test_that("a walk row lifted in one flat colour gets a swatch of it", {
  g <- bandage_layout(pggb, walks = lifted)
  rows <- bandage_walk_rows(pggb)
  s <- row_swatches(rows$rows, g)
  expect_equal(s$colour, g$keys$color[match(rows$rows$name[s$row + 1], g$keys$name)])
  expect_length(s$row, 2)
  expect_equal(nrow(row_swatches(rows$rows, NULL)), 0)
})

test_that("a lane's link draws in its walk's colour, offset like its lane", {
  g <- bandage_layout(pggb, walks = lifted)
  d <- ggplot2::layer_data(ggplot2::autoplot(g), 1)
  lane <- toupper(d$colour) %in% toupper(g$keys$color)
  expect_true(any(lane))
  expect_true(all(is.finite(d$slide_x[lane]) & is.finite(d$slide_y[lane])))
  expect_true(any(abs(d$slide_x[lane]) + abs(d$slide_y[lane]) > 0))
})

test_that("walk-hued rows take their walk's flat colour, and need a layout", {
  g <- bandage_layout(pggb, walks = lifted)
  rows <- bandage_walk_rows(pggb)
  b <- ggplot2::ggplot_build(ggplot2::autoplot(rows, hues = "walk", layout = g))
  fills <- unique(unlist(lapply(b$data, function(d) d$fill)))
  expect_true(all(toupper(row_swatches(rows$rows, g)$colour) %in% toupper(fills)))
  expect_error(ggplot2::autoplot(rows, hues = "walk"), "layout")
})

test_that("walk-hued rows run a walk's progress ramp from the bar's start to its end", {
  progress <- lapply(lifted, function(w) list(walk = w, color = list(field = "progress")))
  g <- bandage_layout(pggb, walks = progress)
  rows <- bandage_walk_rows(pggb)
  inks <- walk_inks(rows$rows, g)
  expect_length(inks$row, 2)
  expect_equal(nrow(row_swatches(rows$rows, g)), 0)
  p <- ggplot2::autoplot(rows, hues = "walk", layout = g)
  at <- which(vapply(p$layers, function(l) "position" %in% names(l$data), TRUE))
  bar <- p$layers[[at]]$data
  bar <- bar[bar$row == 0, ]
  stops <- strsplit(inks$stops[inks$row == 0], ",")[[1]]
  near <- function(a, b) max(abs(grDevices::col2rgb(a) - grDevices::col2rgb(b))) < 8
  expect_true(near(bar$fill[1], stops[1]))
  expect_true(near(bar$fill[nrow(bar)], stops[length(stops)]))
})

test_that("a row's ramp runs over the stretch of contig its walk is lifted on, past the bar's flanks", {
  ink <- data.frame(contig = "c", start = 100, end = 300)
  row <- data.frame(bp = 100, backward = FALSE, contig = "c", contigStart = 150)
  expect_equal(ramp_along(ink, row, c(0, 100)), c(0.25, 0.75))
  row$backward <- TRUE
  row$contigStart <- 250
  expect_equal(ramp_along(ink, row, c(0, 100)), c(0.75, 0.25))
  row$contig <- "elsewhere"
  expect_equal(ramp_along(ink, row, c(0, 100)), c(1, 0))
})

test_that("a walk file cut with context starts each row's ramp where the drawing's reaches its flank", {
  region <- "chr:1004650-1004800"
  g <- bandage_layout(walk_file, region = region, context = 100, walks = list(
    list(walk = "K12", color = list(field = "progress"))
  ))
  rows <- bandage_walk_rows(walk_file, region, context = 100)
  inks <- walk_inks(rows$rows, g)
  r <- inks$row[1]
  along <- ramp_along(inks[1, ], rows$rows[r + 1, ], c(0, rows$rows$bp[r + 1]))
  expect_gt(along[1], 0.05)
  expect_lt(along[2], 0.95)
})

test_that("blocks past the three filled ones are keyed", {
  gfa <- tempfile(fileext = ".gfa")
  on.exit(unlink(gfa))
  ref <- paste0("r", 0:4)
  writeLines(c(
    paste0("S\t", ref, "\t", strrep("A", 1000)),
    paste0("S\ts", 1:4, "\t", strrep("C", 10)),
    paste0("S\tt", 1:4, "\t", strrep("G", 200)),
    paste0("L\tr", 0:3, "\t+\ts", 1:4, "\t+\t0M"), paste0("L\ts", 1:4, "\t+\tr", 1:4, "\t+\t0M"),
    paste0("L\tr", 0:3, "\t+\tt", 1:4, "\t+\t0M"), paste0("L\tt", 1:4, "\t+\tr", 1:4, "\t+\t0M"),
    paste0("P\tref#0#chr\t", paste0(c(rbind(ref[1:4], paste0("s", 1:4))), "+", collapse = ","), ",r4+\t*"),
    paste0("P\t", c("a#1#c", "b#1#c"), "\t", paste0(c(rbind(ref[1:4], paste0("t", 1:4))), "+", collapse = ","), ",r4+\t*")
  ), gfa)
  rows <- bandage_walk_rows(gfa)
  expect_equal(sort(unique(rows$blocks$letter)), LETTERS[1:4])
  colours <- ggplot2::ggplot_build(ggplot2::autoplot(rows))$plot$scales$get_scales("colour")
  expect_true(any(startsWith(colours$get_breaks(), "more shared blocks")))
})

test_that("rows a layout lifts take the name its key gives the walk", {
  rows <- data.frame(name = c("a#1#c:0-10", "b#1#c"), label = c("a#1", "b#1"))
  expect_equal(key_labels(rows, list(keys = data.frame(name = "a#1#c:5-9", walk = "a"))), c("a", "b#1"))
  expect_equal(key_labels(rows, NULL), rows$label)
})

ramp_rows <- function(walk) {
  gfa <- tempfile(fileext = ".gfa")
  writeLines(c(
    paste0("S\t", 1:4, "\t", strrep(c("A", "C", "G", "T"), c(10, 500, 500, 10))),
    "L\t1\t+\t2\t+\t0M", "L\t2\t+\t3\t+\t0M", "L\t3\t+\t4\t+\t0M", "L\t1\t+\t4\t+\t0M",
    "P\tref#0#chr\t1+,2+,3+,4+\t*", paste0("P\ta#1#c\t", walk, "\t*")
  ), gfa)
  progress <- lapply(c("ref#0#chr", "a#1#c"), function(w) list(walk = w, color = list(field = "progress")))
  g <- bandage_layout(gfa, walks = progress, engine = "stress")
  rows <- bandage_walk_rows(gfa, region = "chr:20-1000")
  unlink(gfa)
  list(rows = rows, plot = ggplot2::autoplot(rows, hues = "walk", layout = g))
}

test_that("walk-hued rows run the ramp from the bar's end for a walk read backwards", {
  r <- ramp_rows("4-,3-,2-,1-")
  expect_true(r$rows$rows$backward[r$rows$rows$name == "a#1#c"])
  at <- which(vapply(r$plot$layers, function(l) "position" %in% names(l$data), TRUE))
  bar <- r$plot$layers[[at]]$data
  bar <- bar[bar$row == r$rows$rows$row[r$rows$rows$name == "a#1#c"], ]
  lightness <- function(colour) sum(grDevices::col2rgb(colour))
  expect_lt(lightness(bar$fill[1]), lightness(bar$fill[nrow(bar)]))
})

test_that("walk-hued rows draw a progress ramp for a walk with no bp in the region", {
  r <- ramp_rows("1+,4+")
  expect_equal(r$rows$rows$bp[r$rows$rows$name == "a#1#c"], 0)
  expect_no_error(ggplot2::ggplot_build(r$plot))
})

test_that("walk-hued rows outline blocks and leave their fill to the walk", {
  gfa <- tempfile(fileext = ".gfa")
  on.exit(unlink(gfa))
  writeLines(c(
    paste0("S\t", 1:4, "\t", strrep(c("A", "A", "A", "C"), c(1000, 10, 1000, 200))),
    "L\t1\t+\t2\t+\t0M", "L\t2\t+\t3\t+\t0M", "L\t1\t+\t4\t+\t0M", "L\t4\t+\t3\t+\t0M",
    "P\tref#0#chr\t1+,2+,3+\t*", "P\ta#1#c\t1+,4+,3+\t*", "P\tb#1#c\t1+,4+,3+\t*"
  ), gfa)
  g <- bandage_layout(gfa, walks = c("ref#0#chr", "a#1#c", "b#1#c"), engine = "stress")
  rows <- bandage_walk_rows(gfa)
  expect_gt(nrow(rows$blocks), 0)
  b <- expect_no_warning(ggplot2::ggplot_build(ggplot2::autoplot(rows, hues = "walk", layout = g)))
  fills <- toupper(unlist(lapply(b$data, function(d) as.character(d$fill))))
  expect_false(any(fills %in% c("#D4785F", "#D9A94E", "#C98AA3", "#E8E8E8")))
})

test_that("walk-hued rows keep each bar unbroken, and strip it grey where it runs on the reference", {
  g <- bandage_layout(pggb, walks = lifted)
  rows <- bandage_walk_rows(pggb)
  p <- ggplot2::autoplot(rows, hues = "walk", layout = g)
  at <- which(vapply(p$layers, function(l) all(c("key", "kind", "xmin") %in% names(l$data)), TRUE))
  plain <- p$layers[[at]]$data
  drawn <- ggplot2::layer_data(p, at)
  swatch <- row_swatches(rows$rows, g)
  off <- startsWith(plain$key, "grey above") & plain$row %in% swatch$row
  expect_true(any(off))
  expect_true(all(is.na(drawn$colour[off])))
  bar <- p$layers[[which(vapply(p$layers, function(l) "position" %in% names(l$data), TRUE))]]$data
  hued <- bar$row %in% swatch$row
  expect_true(any(hued & bar$kind == "off the reference's path"))
  expect_equal(
    toupper(bar$fill[hued]),
    toupper(swatch$colour[match(bar$row[hued], swatch$row)])
  )
  strips <- p$layers[[which(vapply(p$layers, function(l) identical(l$aes_params$fill, STRIP_FILL), TRUE))]]$data
  on <- bar[bar$kind == "on the reference's path" & bar$row > 0, ]
  expect_equal(paste(strips$row, strips$xmin), paste(on$row, on$xmin))
  legend <- p$scales$get_scales("colour")$guide$params$override.aes$fill
  expect_equal(legend[1], STRIP_FILL)
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
  g$exons <- g$exons[0, ]
  expect_no_error(ggplot2::ggplot_build(autoplot(g)))
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

test_that("haplotypes picks a GFA's rows by sample or sample#haplotype", {
  w <- bandage_walk_rows(pggb, haplotypes = c("IAI39", "Sakai#1"))
  expect_setequal(w$rows$label, c("K12", "IAI39", "Sakai"))
  expect_equal(w$rows$label[1], "K12")
  expect_true(all(w$links$row < 2))
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

test_that("a block too narrow to draw gets no letter", {
  gfa <- tempfile(fileext = ".gfa")
  on.exit(unlink(gfa))
  block <- function(n) {
    writeLines(c(
      paste0("S\t", 1:4, "\t", strrep(c("A", "A", "A", "C"), c(1000, 10, 1000, n))),
      "L\t1\t+\t2\t+\t0M", "L\t2\t+\t3\t+\t0M", "L\t1\t+\t4\t+\t0M", "L\t4\t+\t3\t+\t0M",
      "P\tref#0#chr\t1+,2+,3+\t*",
      "P\ta#1#c\t1+,4+,3+\t*",
      "P\tb#1#c\t1+,4+,3+\t*"
    ), gfa)
    bandage_walk_rows(gfa)$blocks
  }
  expect_equal(nrow(block(10)), 0)
  expect_equal(unique(block(200)$letter), "A")
})

# GRCh38's C4A and C4B as syng folds them: the reference walks 2 and 3 twice
collapsed_repeat <- function() {
  gfa <- tempfile(fileext = ".gfa")
  writeLines(c(
    paste0("S\t", 1:4, "\t", strrep("A", c(100, 10, 20, 100))),
    "L\t1\t+\t2\t+\t0M", "L\t2\t+\t3\t+\t0M", "L\t3\t+\t2\t+\t0M", "L\t3\t+\t4\t+\t0M",
    "P\tref#0#chr\t1+,2+,3+,2+,3+,4+\t*",
    "P\ta#1#c\t1+,2+,3+,2+,3+,2+,3+,4+\t*"
  ), gfa)
  gfa
}

test_that("a reference walking a collapsed repeat twice keeps one smooth row", {
  gfa <- collapsed_repeat()
  on.exit(unlink(gfa))
  w <- bandage_walk_rows(gfa)
  on <- w$runs[w$runs$row == 0 & w$runs$onReference, ]
  expect_equal(nrow(on), 1)
  expect_no_error(ggplot2::ggplot_build(ggplot2::autoplot(w, hues = "bandage")))
})

test_that("rows with nothing off the reference's path and no ribbons draw without a warning", {
  gfa <- collapsed_repeat()
  on.exit(unlink(gfa))
  w <- bandage_walk_rows(gfa)
  expect_no_warning(ggplot2::ggplot_build(ggplot2::autoplot(w, ribbons = FALSE, hues = "bandage")))
})

test_that("a layout coloured by position keys its hues, and says which nodes take a first visit's", {
  gfa <- collapsed_repeat()
  on.exit(unlink(gfa))
  p <- ggplot2::autoplot(bandage_layout(gfa))
  built <- ggplot2::ggplot_build(p)
  expect_match(p$labels$caption, "walks 2 nodes more than once")
  expect_false(is.null(built$plot$scales$get_scales("fill")))
  lifted <- ggplot2::autoplot(bandage_layout(pggb, walks = lifted))
  expect_null(lifted$labels$caption)
  expect_null(ggplot2::ggplot_build(lifted)$plot$scales$get_scales("fill"))
})

test_that("Bandage's position hues run red to magenta at the view's saturation", {
  hues <- bandage_hues()
  expect_equal(hues[1], "#D92626")
  expect_equal(grDevices::col2rgb(hues[length(hues)])[, 1], c(red = 217, green = 38, blue = 217))
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

test_that("a walk file cut keeps the haplotypes asked for, and names its sequences for one it lacks", {
  w <- bandage_walk_rows(walk_file, "chr:1004500-1004961", haplotypes = "IAI39", context = 0)
  expect_setequal(w$rows$sample, c("K12", "IAI39"))
  expect_error(
    bandage_layout(walk_file, region = "chrZ:1-100"),
    "no sequence chrZ on K12; it holds K12#1#chr"
  )
})

test_that("a walk the file abridged cuts in full, as from a file that did not", {
  abridged <- test_path("testdata", "ecoli_pggb_abridged.K12.walks.bed.gz")
  expect_match(readLines(gzfile(abridged)), "\tabridged\t", all = FALSE)
  rows <- function(file) {
    w <- bandage_walk_rows(file, "chr:1004500-1004961", context = 0)$rows
    w[order(w$name), c("name", "bp", "complete")]
  }
  expect_equal(rows(abridged), rows(walk_file), ignore_attr = TRUE)
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
  expect_warning(bandage_layout(pggb, walks = "K1"), "no walk named K1; the graph has K12#1")
})

test_that("the stress engine lays the graph out", {
  g <- bandage_layout(pggb, engine = "stress")
  expect_setequal(unique(g$nodes$node), unique(bandage_layout(pggb)$nodes$node))
})
