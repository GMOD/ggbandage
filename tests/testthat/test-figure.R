pggb <- test_path("testdata", "ecoli_pggb_subgraph.gfa")
rgfa <- test_path("testdata", "ecoli_rgfa_slice.gfa.gz")
walk_file <- test_path("testdata", "ecoli_pggb.K12.walks.gz")
lifted <- c("K12#1#chr:1004500-1004961", "IAI39#1#chr:2249412-2249872")

# bandage-core leaves out a site drawn under 3 px: its own nodes and links and
# the reference between where it attaches, as drawn. The force layout floors
# a node at 5 units and gives a link a fixed length, so at the default 1000 by
# 800 px every site of the E. coli subgraph is drawn longer than that. A
# thumbnail a fifth that size draws its sixteen 1 bp alleles, the two-node
# site 13+,15+ and the skip 37 over the 1 bp node 29+ under it, and leaves
# those 18 nodes and 1 skip out
thumbnail <- function(...) bandage_layout(pggb, ..., width = 200, height = 160)

drawn_keys <- function(plot, width, side = "top") {
  grDevices::pdf(NULL, width = width, height = 6)
  on.exit(grDevices::dev.off())
  gt <- ggplot2::ggplotGrob(plot)
  box <- gt$grobs[[which(gt$layout$name == paste0("guide-box-", side))]]
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
  list(labels = unname(vapply(texts, function(k) k$label, "")), inches = inches, room = room)
}

# The words of bandage-core's key in the order the key writes them: each
# entry's bold name, its words and the stretch under it
key_words <- function(g) {
  k <- key_rows(g)
  words <- c(rbind(k$strong, k$text, k$under))
  words[nzchar(words)]
}

test_that("the key is bandage-core's graph key: each lifted walk, what the lift fades, the thickness ends, the skip drawn", {
  g <- bandage_layout(pggb, walks = lifted, small_sites = "nodes")
  k <- drawn_keys(ggplot2::autoplot(g), 8)
  expect_equal(k$labels, key_words(g))
  expect_equal(utils::head(k$labels, 3), c("K12", "IAI39", "other haplotypes"))
  expect_true(all(c("Node thickness", "short skip") %in% k$labels))
})

test_that("under compress the key says node lengths are not to scale", {
  note <- "node lengths compressed, not to scale"
  g <- bandage_layout(pggb, walks = lifted, bubbleSpread = "compress")
  expect_true(note %in% g$graph_key$text)
  expect_true(note %in% drawn_keys(ggplot2::autoplot(g), 8)$labels)
  plain <- bandage_layout(pggb, walks = lifted)
  expect_false(note %in% plain$graph_key$text)
  expect_false(note %in% drawn_keys(ggplot2::autoplot(plain), 8)$labels)
  unlifted <- bandage_layout(pggb, bubbleSpread = "compress")
  expect_true(note %in% drawn_keys(ggplot2::autoplot(unlifted), 8)$labels)
})

test_that("the key ends with what the drawing leaves out as too small, bare or faceted, and says nothing once small sites are drawn", {
  line <- "18 nodes and 1 skip under 5 bp not drawn"
  bare <- thumbnail(walks = lifted)
  expect_equal(bare$graph_key$text[bare$graph_key$section == "too-small"], line)
  expect_equal(utils::tail(drawn_keys(ggplot2::autoplot(bare), 8)$labels, 1), line)
  faceted <- thumbnail(walks = lifted, facet = "walk")
  expect_equal(utils::tail(drawn_keys(ggplot2::autoplot(faceted), 8, "bottom")$labels, 1), line)
  drawn <- thumbnail(walks = lifted, small_sites = "nodes")
  expect_false("too-small" %in% drawn$graph_key$section)
  expect_false(any(grepl("not drawn$", drawn_keys(ggplot2::autoplot(drawn), 8)$labels)))
  full <- bandage_layout(pggb, walks = lifted)
  expect_false("too-small" %in% full$graph_key$section)
  expect_equal(nrow(full$sites), 0)
})

test_that("small sites are left out by default and listed in the sites table, and small_sites = \"nodes\" draws every node", {
  hidden <- thumbnail(walks = lifted)
  expect_equal(hidden$meta$smallSites$mode, "hidden")
  expect_equal(nrow(hidden$sites), 18)
  expect_equal(hidden$sites$links[hidden$sites$nodes == ""], "37")
  expect_equal(hidden$sites$links[hidden$sites$nodes == "38+"], "50,51")
  expect_true(all(hidden$sites$refName == "K12#1#chr"))
  expect_false("38+" %in% hidden$nodes$node)
  expect_false(any(c(37, 50, 51) %in% hidden$edges$edge))
  drawn <- thumbnail(walks = lifted, small_sites = "nodes")
  expect_null(drawn$meta$smallSites)
  expect_equal(nrow(drawn$sites), 0)
  expect_named(drawn$sites, names(hidden$sites))
  expect_true("38+" %in% drawn$nodes$node)
  expect_true(all(c(37, 50, 51) %in% drawn$edges$edge))
  expect_error(bandage_layout(pggb, small_sites = "ticks"), "should be one of")
})

test_that("nothing is drawn on a folded site: no node, link, arrowhead, label or exon outline, and no exon on a node only the lanes cross", {
  bed <- tempfile(fileext = ".bed")
  on.exit(unlink(bed))
  writeLines("chr\t1004670\t1004700\tgeneB\t0\t+", bed)
  folded <- function(g) unlist(strsplit(g$sites$nodes, ",", fixed = TRUE))
  lanes_only <- function(g) unlist(strsplit(g$sites$laneNodes, ",", fixed = TRUE))
  skips <- function(g) as.numeric(unlist(strsplit(g$sites$links, ",", fixed = TRUE)))
  outlined <- function(g) unique(exons_of(g, 3)$node)
  # a lifted lane across a folded site runs along it as one stroke, which
  # figure data gives the walk's own link there
  plain_links <- function(g) g$edges$edge[is.na(g$edges$walk)]
  for (walks in list(NULL, lifted)) {
    g <- thumbnail(walks = walks, genes = bed, nodeLengths = TRUE)
    expect_length(folded(g), 18)
    expect_true("38+" %in% folded(g))
    expect_false(any(folded(g) %in% c(g$nodes$node, g$arrows$node, g$labels$item, outlined(g))))
    expect_false(any(skips(g) %in% c(plain_links(g), g$arrows$edge)))
    p <- ggplot2::autoplot(g)
    # after the faded layer's three path layers and the plain links under the nodes
    exon_layer <- which(vapply(p$layers, function(l) inherits(l$geom, "GeomBandagePath"), TRUE))[5]
    expect_equal(nrow(ggplot2::layer_data(p, exon_layer)), nrow(exons_of(g, 3)))
  }
  expect_true(all(c("29+", "30+") %in% lanes_only(g)))
  expect_false(any(lanes_only(g) %in% g$nodes$node))
  expect_false(any(lanes_only(g) %in% outlined(g)))
  expect_true("28+" %in% outlined(g))
  drawn <- thumbnail(walks = lifted, genes = bed, small_sites = "nodes")
  expect_true(all(c("29+", "30+") %in% outlined(drawn)))
})

# The thumbnail leaves out 18 of the 54 nodes and 37 of the 72 links: two
# links each of the 16 one-node sites, four of 13+,15+ and the skip
test_that("printed, a layout counts the nodes and links it draws and says what it leaves out", {
  hidden <- thumbnail()
  expect_equal(
    utils::capture.output(print(hidden)),
    c(
      sprintf("<bandage_layout> 36 nodes and 35 links drawn, 1 panel(s), %s", hidden$meta$generator),
      '18 nodes and 1 skip under 5 bp not drawn; small_sites = "nodes" draws them'
    )
  )
  drawn <- thumbnail(small_sites = "nodes")
  expect_equal(
    utils::capture.output(print(drawn)),
    sprintf("<bandage_layout> 54 nodes and 72 links drawn, 1 panel(s), %s", drawn$meta$generator)
  )
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
  k <- key_entry(text = strrep("w", 20), swatch = "swatch")[rep(1, 3), ]
  k$colour <- "#000000"
  grDevices::pdf(NULL)
  on.exit(grDevices::dev.off())
  grid::pushViewport(grid::viewport(width = grid::unit(3, "inches")))
  g <- grid::makeContent(grid::gTree(keys = k, text = TRUE, cl = "bandage_keys"))
  bars <- Filter(function(c) inherits(c, "rect"), g$children)
  expect_length(unique(vapply(bars, function(b) as.character(b$y), "")), 3)
})

test_that("a thickness group's name starts a new line with its first entry, not ending the line before", {
  k <- rbind(
    key_entry(text = strrep("w", 20), swatch = "swatch"),
    key_entry(strong = "Node thickness"),
    key_entry(text = strrep("w", 20), swatch = "swatch")
  )
  k$colour <- "#000000"
  grDevices::pdf(NULL)
  on.exit(grDevices::dev.off())
  lines <- function(inches) {
    grid::pushViewport(grid::viewport(width = grid::unit(inches, "inches")))
    on.exit(grid::popViewport())
    g <- grid::makeContent(grid::gTree(keys = k, text = TRUE, cl = "bandage_keys"))
    texts <- Filter(function(c) inherits(c, "text"), g$children)
    y <- vapply(texts, function(t) as.character(t$y), "")
    stats::setNames(match(y, unique(y)), vapply(texts, function(t) t$label, ""))
  }
  heading <- function(l) l[["Node thickness"]]
  after <- function(l) l[[3]]
  one <- lines(8)
  expect_equal(unname(one), c(1, 1, 1))
  wide <- width_px(grid::grobWidth(grid::textGrob(strrep("w", 20), gp = key_font))) + 23
  name <- width_px(grid::grobWidth(grid::textGrob("Node thickness", gp = key_bold)))
  split <- lines((6 + wide + 16 + name + 16 + wide - 10) / 96)
  expect_equal(heading(split), 2)
  expect_equal(after(split), 2)
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
  expect_true("a thread per pass through a node" %in% drawn_keys(p, 8)$labels)
})

by_pass <- function(...) list("ref#0#chr", list(walk = "dup#1#chr", color = list(field = "pass"), ...))

# The fills a walk-hued row draws between two offsets along its bar
row_fill <- function(rows, layout, label) {
  p <- ggplot2::autoplot(rows, hues = "walk", layout = layout)
  at <- which(vapply(p$layers, function(l) "ink" %in% names(l$data), TRUE))[1]
  bar <- p$layers[[at]]$data
  bar <- bar[rows$rows$label[bar$row + 1] == label, ]
  middle <- (bar$xmin + bar$xmax) / 2
  function(from, to) unique(toupper(bar$fill[middle > from & middle < to]))
}

test_that("a walk lifted by pass has each pass named on the graph in its colour, keyed, and its heads keyed", {
  gfa <- tempfile(fileext = ".gfa")
  on.exit(unlink(gfa))
  writeLines(repeat_gfa, gfa)
  g <- bandage_layout(gfa, walks = by_pass(), engine = "stress")
  expect_equal(g$passes$text, c("pass 1 \u00b7 6 bp", "pass 2 \u00b7 6 bp"))
  expect_equal(c(g$passes$start, g$passes$end), c(0, 6, 6, 12))
  named <- g$labels[g$labels$kind == "pass", ]
  expect_equal(named$text, c("pass 1", "pass 2"))
  expect_equal(named$color, g$passes$color)
  p <- ggplot2::autoplot(g)
  drawn <- Filter(function(d) "label" %in% names(d) && nrow(d) > 0, ggplot2::ggplot_build(p)$data)
  expect_length(drawn, 1)
  expect_equal(drawn[[1]]$label, named$text)
  expect_equal(as.character(drawn[[1]]$colour), g$passes$color)
  keyed <- drawn_keys(p, 8)$labels
  expect_true(all(c(g$passes$text, "the way the walk runs") %in% keyed))
  layers <- vapply(p$layers, function(l) class(l$geom)[1], "")
  leaders <- ggplot2::layer_data(p, utils::tail(which(layers == "GeomSegment"), 1))
  expect_equal(c(leaders$xend, leaders$yend), c(named$x2, named$y2))
  expect_equal(as.character(leaders$colour), g$passes$color)
  dots <- ggplot2::layer_data(p, which(layers == "GeomPoint"))
  expect_equal(c(dots$x, dots$y), c(named$x2, named$y2))
  expect_equal(as.character(dots$colour), g$passes$color)
  heads <- key_rows(g)[key_rows(g)$swatch == "heads", ]
  grDevices::pdf(NULL)
  on.exit(grDevices::dev.off(), add = TRUE)
  expect_s3_class(swatch_grob(heads, 6, grid::unit(0.5, "npc")), "segments")
})

test_that("the edge marks' swatch is an up and a down triangle", {
  g <- swatch_grob(key_entry(swatch = "overrun"), 0, grid::unit(0.5, "npc"))
  expect_s3_class(g, "polygon")
  y <- grid::convertY(g$y, "npc", valueOnly = TRUE) - 0.5
  expect_equal(sign(y), c(-1, -1, 1, 1, 1, -1))
})

# bandage-core marks 21 of the 23 heads of the repeat lifted by pass halo,
# each wider than its lane
test_that("a head the layout marks halo stands on a white halo drawn under every head, and figure data must say which", {
  gfa <- tempfile(fileext = ".gfa")
  on.exit(unlink(gfa))
  writeLines(repeat_gfa, gfa)
  g <- bandage_layout(gfa, walks = by_pass(), engine = "stress")
  expect_equal(nrow(g$arrows), 23)
  expect_equal(sum(g$arrows$halo), 21)
  grDevices::pdf(NULL)
  on.exit(grDevices::dev.off(), add = TRUE)
  drawn <- function(g) {
    p <- ggplot2::ggplot(g) + geom_bandage_arrows()
    b <- ggplot2::ggplot_build(p)
    grob <- GeomBandageArrow$draw_panel(b$data[[1]], b$layout$panel_params[[1]], b$layout$coord)
    grob$children
  }
  haloed <- drawn(g)
  expect_length(haloed, 2)
  expect_equal(haloed[[1]]$gp$col, "white")
  expect_equal(haloed[[1]]$gp$lwd, 3)
  expect_equal(length(unique(haloed[[1]]$id)), 21)
  expect_equal(length(unique(haloed[[2]]$id)), 23)
  g$arrows$halo <- logical(nrow(g$arrows))
  bare <- drawn(g)
  expect_length(bare, 1)
  expect_true(is.na(bare[[1]]$gp$col))
  g$arrows$halo <- NULL
  expect_error(drawn(g), "halo")
})

test_that("a walk's passes take the names given them, one name or many, and a graph where it steps no node twice the passes stated", {
  gfa <- tempfile(fileext = ".gfa")
  on.exit(unlink(gfa))
  writeLines(repeat_gfa, gfa)
  named <- bandage_layout(gfa, walks = by_pass(passNames = c("first", "second")), engine = "stress")
  expect_equal(named$labels$text[named$labels$kind == "pass"], c("first", "second"))
  expect_equal(named$passes$text, c("first \u00b7 6 bp", "second \u00b7 6 bp"))
  stated <- function(spans, names) {
    bandage_layout(pggb, walks = list(list(walk = "K12", color = list(field = "pass"), passes = spans, passNames = names)))$passes
  }
  named_as <- function(passes) sub(" \u00b7 .*", "", passes$text)
  expect_equal(named_as(stated(data.frame(start = c(0, 200), end = c(200, 400)), c("a", "b"))), c("a", "b"))
  expect_equal(named_as(stated(data.frame(start = 0, end = 200), "only")), "only")
  expect_equal(nrow(bandage_layout(pggb, walks = "K12")$passes), 0)
})

test_that("the pass bar draws the walk in its own colour, each pass's stretches in the pass's, under a bracket and a name", {
  gfa <- tempfile(fileext = ".gfa")
  on.exit(unlink(gfa))
  writeLines(repeat_gfa, gfa)
  g <- bandage_layout(gfa, walks = by_pass(), engine = "stress")
  built <- ggplot2::ggplot_build(bandage_pass_bar(g))
  ground <- built$data[[1]]
  expect_equal(c(ground$xmin, ground$xmax), c(0, 15))
  expect_equal(as.character(ground$fill), g$keys$stops[g$keys$walk == "dup"])
  stretches <- built$data[[2]]
  expect_equal(stretches$xmin, c(0, 6))
  expect_equal(stretches$xmax, c(6, 12))
  expect_equal(as.character(stretches$fill), g$passes$color)
  brackets <- built$data[[4]]
  expect_equal(brackets$x, c(0, 0, 6, 6, 6, 6, 12, 12))
  expect_equal(as.character(unique(brackets$colour)), g$passes$color)
  expect_equal(nrow(built$data[[3]]), 0)
  expect_equal(built$data[[5]]$label, g$passes$text)
  expect_equal(built$data[[5]]$x, c(3, 9))
  narrow <- ggplot2::ggplot_build(bandage_pass_bar(bandage_layout(gfa, walks = by_pass(), engine = "stress", width = 150)))
  expect_equal(narrow$data[[5]]$label, g$passes$text[1])
  expect_equal(built$plot$scales$get_scales("x")$name, "bp along dup")
  expect_error(bandage_pass_bar(bandage_layout(pggb, walks = "K12")), "lifts no walk")
})

test_that("the pass bar marks each pass's own stretches, dots the gaps between them and names the pass over its longest where the name has room", {
  runs <- data.frame(
    walk = "w", pass = c(0, 0, 1, 2, 0, 1, 2), color = c("a", "a", "b", "c", "a", "b", "c"),
    start = c(0, 50.5, 60, 100, 300, 310, 320), end = c(50, 60, 100, 102, 310, 320, 321)
  )
  passes <- data.frame(walk = "w", pass = 0:2, text = c("a", "a long name", "c"), color = c("a", "b", "c"))
  marks <- pass_marks(runs, passes, 600, "w", 1)
  expect_equal(marks$own$pass, c(0, 0, 1, 1, 2, 2))
  expect_equal(marks$own$start, c(0, 300, 60, 310, 100, 320))
  expect_equal(marks$own$end, c(60, 310, 100, 320, 102, 321))
  expect_equal(marks$between$start, c(60, 100, 102))
  expect_equal(marks$between$end, c(300, 310, 320))
  expect_equal(marks$between$color, c("a", "b", "c"))
  expect_equal(marks$names$text, c("a", "a long name"))
  expect_equal(marks$names$x, c(30, 80))
  expect_equal(pass_marks(runs[1, ], passes[1, ], 600, "w", 1)$names$x, 25)
  passes$text[1] <- strrep("w", 20)
  expect_equal(pass_marks(runs[1, ], passes[1, ], 600, "w", 1)$names$x, 20 * PASS_NAME_CHAR_PX / 2 + 2)
})

test_that("a walk-hued row of a walk lifted by pass takes each pass's colour where the threads do", {
  gfa <- tempfile(fileext = ".gfa")
  on.exit(unlink(gfa))
  writeLines(repeat_gfa, gfa)
  g <- bandage_layout(gfa, walks = by_pass(), engine = "stress")
  fill <- row_fill(bandage_walk_rows(gfa), g, "dup#1")
  expect_equal(fill(0, 6), toupper(g$passes$color[1]))
  expect_equal(fill(6, 12), toupper(g$passes$color[2]))
  expect_equal(fill(12, 15), toupper(g$keys$stops[g$keys$field == "pass"]))
})

test_that("a backward row finds its walk's passes by contig position", {
  gfa <- tempfile(fileext = ".gfa")
  on.exit(unlink(gfa))
  writeLines(c(
    "S\ts1\t*\tLN:i:1000", "S\ts2\t*\tLN:i:500", "S\tr\t*\tLN:i:200",
    "S\tu\t*\tLN:i:3000", "S\ts5\t*\tLN:i:1000",
    "L\ts1\t+\ts2\t+\t0M", "L\ts2\t+\tr\t+\t0M", "L\tr\t+\tr\t+\t0M",
    "L\tr\t+\tu\t+\t0M", "L\tu\t+\ts5\t+\t0M",
    "P\tref#0#chr1\ts1+,s2+,r+,u+,s5+\t*", "P\thap#1#ctg\ts5-,u-,r-,r-,s2-,s1-\t*"
  ), gfa)
  g <- bandage_layout(gfa, walks = list(list(walk = "hap#1", color = list(field = "pass"))))
  rows <- bandage_walk_rows(gfa, region = "chr1:1200-4500")
  expect_true(rows$rows$backward[rows$rows$label == "hap"])
  fill <- row_fill(rows, g, "hap")
  own <- toupper(g$keys$stops[g$keys$field == "pass"])
  expect_equal(fill(0, 490), own)
  expect_equal(fill(510, 690), toupper(g$passes$color[2]))
  expect_equal(fill(710, 890), toupper(g$passes$color[1]))
  expect_equal(fill(910, 3900), own)
})

test_that("pass stretches a hairline apart join, and those of another pass or further apart do not", {
  runs <- data.frame(
    walk = "w", pass = c(0, 0, 0, 1, 1), color = c("a", "a", "a", "b", "b"),
    start = c(0, 11, 40, 51, 60), end = c(10, 20, 50, 59, 70)
  )
  joined <- joined_runs(runs, 2)
  expect_equal(joined$start, c(0, 40, 51))
  expect_equal(joined$end, c(20, 50, 70))
  expect_equal(joined$pass, c(0, 0, 1))
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
    want <- key_words(g)
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

test_that("only a plot with a key at its top pins its layout, and not in a patchwork", {
  skip_if_not_installed("patchwork")
  p <- ggplot2::autoplot(bandage_layout(pggb, walks = lifted))
  expect_s3_class(p, "bandage_plot")
  pdf(NULL)
  on.exit(dev.off())
  expect_true(isTRUE(patchwork:::plot_table(p, "auto")$respect))
  expect_true(is.matrix(ggplot2::ggplotGrob(p)$respect))
  expect_true(inherits(ggplot2::autoplot(bandage_layout(pggb)), "bandage_plot"))
  faceted <- bandage_layout(pggb, walks = lifted, facet = "walk")
  expect_false(inherits(ggplot2::autoplot(faceted), "bandage_plot"))
})

test_that("a walk row lifted in one flat colour gets a swatch of it", {
  g <- bandage_layout(pggb, walks = lifted)
  rows <- bandage_walk_rows(pggb)
  s <- row_swatches(rows$rows, g)
  expect_equal(s$colour, g$keys$color[match(rows$rows$name[s$row + 1], g$keys$name)])
  expect_length(s$row, 2)
  expect_equal(nrow(row_swatches(rows$rows, NULL)), 0)
})

test_that("a link turning strand against the reference is painted over the nodes with the skips, and the rest under them", {
  g <- bandage_layout(pggb, small_sites = "nodes")
  skips <- unique(g$edges$edge[g$edges$deletion])
  plain <- unique(g$edges$edge[!g$edges$deletion])
  expect_gt(length(skips), 0)
  painted <- function(g, over) {
    picked <- geom_bandage_edges(data = g, over_nodes = over)$data
    p <- ggplot2::autoplot(g)
    paths <- which(vapply(p$layers, function(l) inherits(l$geom, "GeomBandagePath"), TRUE))
    drawn <- ggplot2::layer_data(p, if (over) utils::tail(paths, 1) else paths[4])
    expect_equal(nrow(drawn), nrow(picked))
    unique(picked$edge)
  }
  expect_setequal(painted(g, TRUE), skips)
  expect_setequal(painted(g, FALSE), plain)
  g$edges$turn <- g$edges$edge == plain[1]
  expect_setequal(painted(g, TRUE), c(skips, plain[1]))
  expect_setequal(painted(g, FALSE), plain[-1])
  g$edges$turn <- NULL
  expect_error(painted(g, TRUE), "turn")
})

# The reference steps B against its id; alt joins A to C against C's, a link
# bandage-core paints over the nodes for turning strand against the reference.
# The force layout lays A, B and C end to end on one line, and links 0 and 1
# along them, so core paints those over the nodes too.
test_that("figure data's turn puts a link turning strand against the reference over the nodes", {
  gfa <- tempfile(fileext = ".gfa")
  on.exit(unlink(gfa))
  writeLines(c(
    "S\tA\tAAAA", "S\tB\tCCCC", "S\tC\tGGGG",
    "L\tA\t+\tB\t-\t0M", "L\tB\t-\tC\t+\t0M", "L\tA\t+\tC\t-\t0M",
    "W\tref\t0\tchr\t0\t12\t>A<B>C", "W\talt\t1\tchr\t0\t8\t>A<C"
  ), gfa)
  g <- bandage_layout(gfa, small_sites = "nodes")
  expect_equal(unique(g$edges$edge[g$edges$turn]), 2)
  expect_equal(unique(g$edges$edge[g$edges$along]), c(0, 1))
  expect_equal(unique(geom_bandage_edges(data = g, over_nodes = TRUE)$data$edge), c(0, 1, 2))
  expect_equal(nrow(geom_bandage_edges(data = g, over_nodes = FALSE)$data), 0)
  g$edges$along <- FALSE
  expect_equal(unique(geom_bandage_edges(data = g, over_nodes = TRUE)$data$edge), 2)
  expect_setequal(unique(geom_bandage_edges(data = g, over_nodes = FALSE)$data$edge), c(0, 1))
})

# bandage-core paints a plain link over the nodes where their ink would hide
# it: on the rGFA slice's stress layout, link 201's ends lie apart along them
test_that("a plain link figure data marks along is painted over the nodes, and figure data must say which", {
  g <- bandage_layout(rgfa, layout = "stress")
  expect_equal(unique(g$edges$edge[g$edges$along]), 201)
  expect_false(any(with(g$edges[g$edges$edge == 201, ], deletion | turn)))
  painted <- function(g, over) {
    picked <- geom_bandage_edges(data = g, over_nodes = over)$data
    p <- ggplot2::autoplot(g)
    paths <- which(vapply(p$layers, function(l) inherits(l$geom, "GeomBandagePath"), TRUE))
    drawn <- ggplot2::layer_data(p, if (over) utils::tail(paths, 1) else paths[4])
    expect_equal(nrow(drawn), nrow(picked))
    unique(picked$edge)
  }
  expect_true(201 %in% painted(g, TRUE))
  expect_false(201 %in% painted(g, FALSE))
  g$edges$along <- NULL
  expect_error(painted(g, TRUE), "along")
})

tails <- test_path("testdata", "tails.GRCh38.walks.gz")

# HG002 leaves the reference after node 1 for 30 and 31 and comes back at 8,
# past the cut chr1:1-1000, so no drawn link meets 31's far end
test_that("a tail's free end no drawn link meets ends in a dark tab with no notch, keyed, and figure data must say which", {
  g <- bandage_layout(tails, region = "chr1:1-1000", context = 0)
  expect_equal(g$arrows$node[g$arrows$runsOn], "31+")
  expect_equal(toupper(g$arrows$color[g$arrows$runsOn]), "#18181C")
  keys <- key_rows(g)
  expect_equal(keys$swatch[keys$text == "graph runs on past what is drawn"], "overhang")
  built <- function(g) ggplot2::ggplot_build(ggplot2::ggplot(g) + geom_bandage_arrows())$data[[1]]
  d <- built(g)
  off <- head_outline(d)
  tab <- which(d$runs_on)
  expect_length(tab, 1)
  expect_equal(off$dx[3, tab], (off$dx[2, tab] + off$dx[4, tab]) / 2)
  expect_equal(off$dy[3, tab], (off$dy[2, tab] + off$dy[4, tab]) / 2)
  heads <- head_outline(transform(d, runs_on = FALSE))
  expect_false(isTRUE(all.equal(heads$dx[3, tab], (heads$dx[2, tab] + heads$dx[4, tab]) / 2)))
  g$arrows$runsOn <- NULL
  expect_error(built(g), "runsOn")
})

# A lift fades what is off its walks. bandage-core paints those rows opaque
# into one layer under everything else and lays the layer down once at its
# alpha: over the background, each faded row opaque in its colour mixed with
# the background, drawn before every row the lift keeps
test_that("what a lift fades is drawn first, one layer under the rest, opaque in its colour mixed with the background", {
  g <- bandage_layout(pggb, walks = lifted)
  expect_equal(sum(g$nodes$faded), 178)
  expect_equal(sum(g$edges$faded), 18)
  p <- ggplot2::autoplot(g)
  layer_rows <- function(i) nrow(ggplot2::layer_data(p, i))
  faded_rows <- c(
    nrow(geom_bandage_edges(data = g, over_nodes = FALSE, faded = TRUE)$data),
    nrow(geom_bandage_nodes(data = g, faded = TRUE)$data),
    nrow(geom_bandage_edges(data = g, over_nodes = TRUE, faded = TRUE)$data)
  )
  expect_equal(faded_rows[2], 178)
  expect_equal(vapply(1:3, layer_rows, 1), faded_rows)
  expect_equal(layer_rows(5), nrow(geom_bandage_edges(data = g, over_nodes = FALSE, faded = FALSE)$data))
  expect_equal(layer_rows(6), nrow(geom_bandage_nodes(data = g, faded = FALSE)$data))
  n <- ggplot2::layer_data(p, 2)
  expect_equal(unique(n$colour), ink("#a0a0a0", 0.3, "white"))
  heads <- g
  heads$arrows$faded[1] <- TRUE
  heads$arrows$alpha[1] <- 0.3
  h <- geom_bandage_arrows(data = heads, faded = TRUE)$data
  expect_equal(c(h$color, h$alpha), c(ink(g$arrows$color[1], 0.3, "white"), 1))
  g$nodes$faded <- NULL
  expect_error(geom_bandage_nodes(data = g)$data, "faded")
})

test_that("a lane's link draws in its walk's colour, offset like its lane", {
  g <- bandage_layout(pggb, walks = lifted)
  d <- ggplot2::layer_data(ggplot2::ggplot(g) + geom_bandage_edges(over_nodes = FALSE, faded = FALSE))
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
  key <- row_inks(rows$rows, g)$key
  expect_equal(sum(!is.na(key)), 2)
  expect_equal(nrow(row_swatches(rows$rows, g)), 0)
  p <- ggplot2::autoplot(rows, hues = "walk", layout = g)
  at <- which(vapply(p$layers, function(l) "position" %in% names(l$data), TRUE))
  bar <- p$layers[[at]]$data
  bar <- bar[bar$row == 0, ]
  stops <- strsplit(g$keys$stops[key[1]], ",")[[1]]
  near <- function(a, b) max(abs(grDevices::col2rgb(a) - grDevices::col2rgb(b))) < 8
  expect_true(near(bar$fill[1], stops[1]))
  expect_true(near(bar$fill[nrow(bar)], stops[length(stops)]))
})

test_that("bandage-core runs a row's ramp over the stretch of contig its walk is lifted on, past the bar's flanks", {
  layout <- list(keys = data.frame(
    name = "a#1#c", walk = "a", color = "", stops = "#000000,#ffffff", field = "progress",
    contig = "c", start = 100, end = 300
  ))
  rows <- data.frame(name = "a#1#c", bp = 100, backward = FALSE, contig = "c", contigStart = 150)
  forward <- row_inks(rows, layout, c(0L, 0L), c(0, 100))$colour
  rows$backward <- TRUE
  rows$contigStart <- 250
  expect_equal(row_inks(rows, layout, c(0L, 0L), c(100, 0))$colour, forward)
  rows$contig <- "elsewhere"
  expect_equal(row_inks(rows, layout, c(0L, 0L), c(0, 100))$colour, c("#ffffff", "#000000"))
  rows$contig <- NA
  rows$contigStart <- NA
  rows$backward <- FALSE
  expect_equal(row_inks(rows, layout, c(0L, 0L), c(0, 100))$colour, c("#000000", "#ffffff"))
  lightness <- function(colour) sum(grDevices::col2rgb(colour))
  expect_gt(lightness(forward[1]), 0)
  expect_lt(lightness(forward[2]), 3 * 255)
  expect_lt(lightness(forward[1]), lightness(forward[2]))
})

test_that("a walk file cut with context starts each row's ramp where the drawing's reaches its flank", {
  region <- "chr:1004650-1004800"
  g <- bandage_layout(walk_file, region = region, context = 100, walks = list(
    list(walk = "K12", color = list(field = "progress"))
  ))
  rows <- bandage_walk_rows(walk_file, region, context = 100)
  key <- row_inks(rows$rows, g)$key
  r <- which(!is.na(key))[1]
  stops <- strsplit(g$keys$stops[key[r]], ",")[[1]]
  ends <- row_inks(rows$rows, g, rows$rows$row[c(r, r)], c(0, rows$rows$bp[r]))$colour
  lightness <- function(colour) sum(grDevices::col2rgb(colour))
  expect_lt(lightness(ends[1]), lightness(stops[1]) - 10)
  expect_gt(lightness(ends[2]), lightness(stops[length(stops)]) + 10)
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

test_that("bandage-core finds a row's key by the walk's name without the cut's range", {
  rows <- data.frame(
    name = c("a#1#c:0-10", "b#1#c"), bp = 10, backward = FALSE, contig = "c", contigStart = 0
  )
  keys <- data.frame(
    name = "a#1#c:5-9", walk = "a", color = "#123456", stops = "#123456", field = "walk",
    contig = "c", start = 5, end = 9
  )
  expect_equal(row_inks(rows, list(keys = keys))$key, c(1L, NA))
  expect_equal(row_inks(rows, NULL)$key, c(NA_integer_, NA_integer_))
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

test_that("faceted, a panel's bar stands above the panel's top edge, off the drawing, at any size", {
  g <- bandage_layout(pggb, walks = lifted, facet = "walk")
  p <- ggplot2::autoplot(g)
  expect_identical(p$coordinates$clip, "off")
  grDevices::pdf(NULL)
  on.exit(grDevices::dev.off())
  bar <- function(text) {
    key <- GeomBandageKey$draw_panel(transform(keys_of(g)[1, ], ink = colour), NULL, NULL, text = text)
    rect <- Filter(function(c) inherits(c, "rect"), grid::makeContent(key)$children)[[1]]
    grid::convertY(rect$y, "inches", valueOnly = TRUE) - grid::convertY(grid::unit(1, "npc"), "inches", valueOnly = TRUE)
  }
  expect_gt(bar(FALSE) - 4 / 96, 0)
  expect_lt(bar(TRUE), 0)
})

test_that("faceted, one key below the panels names the shading, then the graph's key", {
  g <- bandage_layout(pggb, walks = lifted, facet = "walk")
  expect_equal(ggplot2::autoplot(g)$theme$legend.location, "plot")
  guide <- ggplot2::autoplot(g)$guides$guides$bandage_keys
  expect_equal(guide$params$position, "bottom")
  expect_equal(guide$params$grob$keys$text, c("each walk, start to end", key_rows(g)$text))
  expect_true("other haplotypes" %in% g$graph_key$text)
  expect_false(any(nzchar(g$graph_key$strong)))
})

# R walks three reference nodes; A leaves it for a 75 kb loop the cut did not
# load, a placeholder, and comes back
unloaded_gfa <- paste(
  "S\tr1\t*\tLN:i:20000", "S\tr2\t*\tLN:i:30000", "S\tr3\t*\tLN:i:25000",
  "S\tp1\t*\tLN:i:75000\tnl:i:1",
  "L\tr1\t+\tr2\t+\t0M", "L\tr2\t+\tr3\t+\t0M", "L\tr1\t+\tp1\t+\t0M", "L\tp1\t+\tr3\t+\t0M",
  "W\tR\t0\tchr\t0\t75000\t>r1>r2>r3", "W\tA\t1\tchr\t0\t120000\t>r1>p1>r3",
  sep = "\n"
)

test_that("walk rows draw a stretch the cut did not load hollow, key it as the graph does and say its row is not compared", {
  gfa <- tempfile(fileext = ".gfa")
  on.exit(unlink(gfa))
  writeLines(unloaded_gfa, gfa)
  w <- bandage_walk_rows(gfa)
  expect_equal(as.character(w$runs$kind[w$runs$row == 1]), c("on the reference's path", "nodes not shown", "on the reference's path"))
  expect_equal(w$rows$readout, c("75 kb", "120 kb (+45 kb) \u00b7 not compared"))
  g <- bandage_layout(gfa, walks = c("R", "A"))
  expect_equal(c(w$not_loaded$fill, w$not_loaded$rim), c(g$meta$inks$placeholderFill, g$meta$inks$placeholderRim))
  built <- ggplot2::ggplot_build(autoplot(w))
  hollow <- Filter(function(d) nrow(d) == 1 && !is.na(d$colour[1]) && "xmin" %in% names(d), built$data)
  expect_length(hollow, 1)
  expect_equal(c(hollow[[1]]$xmin, hollow[[1]]$xmax), c(20000, 95000), tolerance = 0.01)
  expect_equal(as.character(hollow[[1]]$fill), w$not_loaded$fill)
  expect_equal(hollow[[1]]$colour, w$not_loaded$rim)
  expect_equal(as.vector(built$plot$scales$get_scales("colour")$get_breaks()), "nodes not shown")
})

test_that("a placeholder's length is labelled as the Bandage view labels it, every node's with nodeLengths", {
  gfa <- tempfile(fileext = ".gfa")
  on.exit(unlink(gfa))
  writeLines(unloaded_gfa, gfa)
  g <- bandage_layout(gfa, layout = "auto", referencePath = "R", nodeLengths = FALSE)
  expect_equal(g$labels$kind, "placeholder")
  expect_equal(g$labels$text, "75 kb")
  drawn <- ggplot2::layer_data(ggplot2::autoplot(g), length(ggplot2::autoplot(g)$layers) - 3)
  expect_equal(drawn$label, "75 kb")
  expect_true("nodes not shown" %in% g$graph_key$text)
  every <- bandage_layout(gfa, layout = "auto", referencePath = "R", nodeLengths = TRUE)
  expect_equal(every$labels$kind[1], "placeholder")
  expect_setequal(every$labels$text, c("75 kb", "30 kb", "25 kb", "20 kb"))
})

# Three haplotypes leave the reference at one point for 300, 500 and 700 bp
# the cut did not load, which the anchored layout lays on one spot
one_spot_gfa <- c(
  paste0("S\tr1\t", strrep("A", 2000)),
  paste0("S\tr2\t", strrep("C", 2000)),
  "L\tr1\t+\tr2\t+\t0M",
  "W\tref\t0\tchr\t0\t4000\t>r1>r2",
  unlist(Map(function(i, bp) {
    c(
      sprintf("S\tp%d\t*\tLN:i:%d\tnl:i:1", i, bp),
      sprintf("L\tr1\t+\tp%d\t+\t0M", i),
      sprintf("L\tp%d\t+\tr2\t+\t0M", i),
      sprintf("W\th%d\t1\tchr\t0\t%d\t>r1>p%d>r2", i, 4000 + bp, i)
    )
  }, 0:2, c(300, 500, 700)))
)

# The box bandage-core keeps clear for a label, in its px: a node's length in
# 10 px text on a 13 px line (graphLabels.ts), a gene's name in 11 px text
# with 4 px round it (overlayLabels.ts)
core_box <- function(kind, text) {
  length <- kind %in% c("length", "placeholder")
  data.frame(
    w = ifelse(length, nchar(text) * 5.7 + 6, nchar(text) * 6.2 + 8),
    h = ifelse(length, 13, 11 + 2 * 4)
  )
}

# The plot drawn with its panel `width` px wide and room for it below, its
# panel's px for each of the layout's px, and each label it draws as the px
# its backing takes
drawn_labels <- function(p, g) {
  panel_px <- function(device_width) {
    grDevices::pdf(NULL, width = device_width, height = 2 * device_width)
    on.exit(grDevices::dev.off())
    grid::grid.draw(ggplot2::ggplotGrob(p))
    grid::grid.force()
    vps <- grid::grid.ls(viewports = TRUE, grobs = FALSE, print = FALSE)$name
    grid::seekViewport(grep("^panel[.-]", vps, value = TRUE)[1])
    width_px(grid::unit(1, "npc"))
  }
  around <- 8 - panel_px(8) / 96
  device_width <- g$meta$width / 96 + around
  grDevices::pdf(NULL, width = device_width, height = 2 * device_width)
  on.exit(grDevices::dev.off())
  built <- ggplot2::ggplot_build(p)
  gt <- ggplot2::ggplot_gtable(built)
  backed <- list()
  find <- function(x) {
    if (inherits(x$children$box, "roundrect")) {
      backed[[length(backed) + 1]] <<- data.frame(
        text = x$children[[2]]$children[[1]]$label,
        w = width_px(x$children$box$width),
        h = grid::convertHeight(x$children$box$height, "inches", valueOnly = TRUE) * 96
      )
    }
    for (child in x$children) find(child)
  }
  find(gt$grobs[[which(startsWith(gt$layout$name, "panel"))[1]]])
  x_range <- built$layout$panel_params[[1]]$x.range
  list(
    scale = panel_px(device_width) / diff(x_range) / g$meta$scaleX,
    labels = do.call(rbind, backed)
  )
}

test_that("laid out at the size its panel is drawn at, each length and gene name is drawn the size bandage-core left room for", {
  g <- bandage_layout(
    rgfa, genes = test_path("testdata", "ecoli_genes.bed"), nodeLengths = TRUE,
    width = 400, height = 300
  )
  drawn <- drawn_labels(autoplot(g), g)
  expect_equal(drawn$scale, 1, tolerance = 0.01)
  placed <- g$labels[g$labels$kind %in% c("length", "gene"), ]
  expect_setequal(placed$kind, c("length", "gene"))
  backing <- drawn$labels[match(placed$text, drawn$labels$text), ]
  room <- core_box(placed$kind, placed$text) * drawn$scale
  expect_true(all(backing$w <= room$w * 1.1 & backing$w >= room$w * 0.7))
  expect_true(all(backing$h <= room$h))
})

test_that("placeholders on one spot take one length, the longest, and the key counts the rest under nodes not shown", {
  gfa <- tempfile(fileext = ".gfa")
  on.exit(unlink(gfa))
  writeLines(one_spot_gfa, gfa)
  g <- bandage_layout(gfa, layout = "auto", nodeLengths = FALSE)
  expect_equal(g$labels$text[g$labels$kind == "placeholder"], "700 bp")
  drawn <- ggplot2::layer_data(ggplot2::autoplot(g), length(ggplot2::autoplot(g)$layers) - 3)
  expect_equal(drawn$label, "700 bp")
  note <- "2 unlabelled, 500 bp or less each"
  expect_equal(g$graph_key$under[g$graph_key$text == "nodes not shown"], note)
  expect_true(note %in% drawn_keys(ggplot2::autoplot(g), 8)$labels)
})

test_that("a gene lands on the backbone nodes under it", {
  g <- bandage_layout(rgfa, genes = test_path("testdata", "ecoli_genes.bed"))
  expect_equal(g$genes$gene, "geneA")
  expect_gt(nrow(g$exons), 0)
  expect_true(all(g$exons$node %in% g$nodes$node))
  g$exons <- g$exons[0, ]
  expect_no_error(ggplot2::ggplot_build(autoplot(g)))
})

test_that("the exon outline and the gene's name take bandage-core's exon gold, the name its place and leader", {
  g <- bandage_layout(rgfa, genes = test_path("testdata", "ecoli_genes.bed"))
  guides <- function(p) names(p$guides$guides)
  expect_true("bandage_genes" %in% guides(ggplot2::ggplot(g) + geom_bandage_genes()))
  expect_false("bandage_genes" %in% guides(ggplot2::ggplot(g) + geom_bandage_genes(key = NULL)))
  p <- ggplot2::ggplot(g) + geom_bandage_genes(key = NULL)
  outline <- ggplot2::layer_data(p, 1)
  leader <- ggplot2::layer_data(p, 2)
  name <- ggplot2::layer_data(p, 3)
  expect_equal(unique(outline$colour), g$meta$inks$exon)
  expect_equal(g$meta$inks$exon, core_exon())
  gene <- g$labels[g$labels$kind == "gene", ]
  expect_equal(name$label, gene$text)
  expect_equal(c(name$x, name$y), c(gene$x, gene$y))
  expect_equal(nrow(leader), sum(!is.na(gene$x1)))
  expect_equal(unique(name$colour), g$meta$inks$exon)
  # a BED line with no blocks is one exon, the whole gene
  expect_equal(g$graph_key$text[g$graph_key$section == "exon"], "gene")
  expect_equal(g$graph_key$color[g$graph_key$section == "exon"], g$meta$inks$exon)
})

test_that("the key drops the exon outline once the layout's exons are dropped", {
  g <- bandage_layout(rgfa, genes = test_path("testdata", "ecoli_genes.bed"))
  outlined <- sum(key_rows(g)$swatch == "outline")
  expect_gt(outlined, 0)
  g$exons <- g$exons[0, ]
  expect_equal(sum(key_rows(g)$swatch == "outline"), outlined - 1)
})

test_that("each gene is named as bandage-core names it: a pin with no label, as an accession beside a symbol, is outlined and not named", {
  bed <- tempfile(fileext = ".bed")
  on.exit(unlink(bed))
  writeLines(c("chr\t1004520\t1004560\tgeneB\t0\t+", "chr\t1004600\t1004650\tLOC105378878\t0\t+"), bed)
  g <- bandage_layout(pggb, genes = bed)
  expect_equal(g$genes$gene, c("geneB", "LOC105378878"))
  expect_equal(g$genes$label, c("geneB", NA))
  expect_true("LOC105378878" %in% g$exons$gene)
  named <- ggplot2::layer_data(ggplot2::ggplot(g) + geom_bandage_genes(key = NULL), 3)
  expect_equal(named$label, "geneB")
  expect_equal(c(named$x, named$y), unlist(g$labels[g$labels$kind == "gene", c("x", "y")], use.names = FALSE))
})

test_that("a gene dropped from the layout's genes goes unnamed", {
  g <- bandage_layout(rgfa, genes = test_path("testdata", "ecoli_genes.bed"))
  names_drawn <- function(g) nrow(ggplot2::layer_data(ggplot2::ggplot(g) + geom_bandage_genes(key = NULL), 3))
  expect_equal(names_drawn(g), 1)
  g$genes <- g$genes[g$genes$gene != "geneA", ]
  expect_equal(names_drawn(g), 0)
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

test_that("haplotypes picks a walk named without its range, as walks does, and warns on one matching none", {
  expect_warning(
    w <- bandage_walk_rows(pggb, haplotypes = c("IAI39#1#chr", "nope")),
    "no walk named nope; the graph has K12#1#chr"
  )
  expect_equal(w$rows$label, c("K12", "IAI39"))
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

test_that("a layout coloured by position keys its ramp by the reference's name and span, and no ramp while walks are lifted", {
  p <- ggplot2::autoplot(bandage_layout(pggb))
  k <- drawn_keys(p, 8)$labels
  expect_match(k[1], "^position on ")
  expect_match(k[2], "^[0-9,]+-[0-9,]+ \\(")
  expect_null(p$labels$caption)
  lifted <- bandage_layout(pggb, walks = lifted)
  expect_false("ramp" %in% lifted$graph_key$section)
})

test_that("the key's skip rows are bandage-core's, drawn as dashes and a short plain stroke", {
  g <- bandage_layout(pggb, width = 4000)
  skips <- g$graph_key[g$graph_key$section == "skips", ]
  expect_gt(nrow(skips), 0)
  grDevices::pdf(NULL)
  on.exit(grDevices::dev.off())
  grobs <- key_grobs(key_rows(g), TRUE, 2000)$grobs
  lines <- Filter(function(x) inherits(x, "segments") && identical(x$gp$lwd, px_linewidth(2) * ggplot2::.pt), grobs)
  expect_equal(length(lines) > 0, any(skips$dashed))
})

test_that("autoplot draws plain links, then nodes, then the links that skip reference sequence, then arrowheads", {
  p <- ggplot2::autoplot(bandage_layout(pggb, width = 4000))
  drawn <- function(layer) {
    t <- layer$layer_data(p$data)
    if ("curve" %in% names(t)) {
      ifelse(t$deletion, "skip", "link")
    } else if ("stroke" %in% names(t)) {
      rep("node", nrow(t))
    } else if ("halfWidth" %in% names(t)) {
      rep("arrow", nrow(t))
    }
  }
  expect_equal(rle(unlist(lapply(unname(p$layers), drawn)))$values, c("link", "node", "skip", "arrow"))
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

test_that("walk steps cover each walk end to end, a row per pass", {
  s <- bandage_walk_steps(test_path("testdata", "records.GRCh38.gfa"))
  expect_equal(max(s$end[s$walk == "GRCh38#0#chr1:0-10000"]), 10000)
  expect_equal(max(s$end[s$walk == "HG002#1#chr1:0-2000"]), 2000)
  expect_equal(s$start[-1][s$step[-1] > 1], s$end[-nrow(s)][s$step[-1] > 1])

  gfa <- tempfile(fileext = ".gfa")
  writeLines(c("S\ta\t*\tLN:i:10", "S\tb\tACGTA", "P\tloop\ta+,b+,a+\t*"), gfa)
  loop <- bandage_walk_steps(gfa)
  expect_equal(loop$pass, c(0, 0, 1))
  expect_equal(loop$start, c(0, 10, 15))

  writeLines(c("S\ta\t*", "S\tb\tACGT", "P\th:0-4\ta+,z+\t*", "P\th:4-8\tb+,a+\t*", "P\tq\t\t*"), gfa)
  pieces <- bandage_walk_steps(gfa)
  expect_equal(pieces$walk, c("h:0-4", "h:0-4", "h:4-8", "h:4-8"))
  expect_equal(pieces$end, c(0, 0, 4, 4))
  expect_equal(pieces$pass, c(0, 0, 0, 1))
})

test_that("a block's nodes are those off the reference under its stretch of the first forward row", {
  rows <- list(
    reference = "ref#0#c",
    rows = data.frame(
      row = 0:2, name = c("ref#0#c", "h1#1#c", "h2#1#c"), contigStart = c(0, 100, 0),
      linked = TRUE, backward = c(FALSE, FALSE, TRUE)
    ),
    blocks = data.frame(row = c(2, 1), xmin = c(0, 10), xmax = c(5, 30), letter = "A")
  )
  steps <- data.frame(
    walk = c(rep("ref#0#c:0-20", 2), rep("h1#1#c:100-140", 4)),
    node = c("r1", "r2", "r1", "b1", "b2", "r2"),
    start = c(0, 10, 0, 10, 20, 30), end = c(10, 20, 10, 20, 30, 40)
  )
  expect_equal(block_nodes(rows, steps), data.frame(letter = "A", node = c("b1", "b2")))

  split <- list(
    reference = "ref[0-30]",
    rows = data.frame(row = 0:1, name = c("ref[0-30]", "h1[100-120]"), contigStart = c(0, 100), linked = TRUE, backward = FALSE),
    blocks = data.frame(row = 1, xmin = c(0, 30), xmax = c(10, 40), letter = "A")
  )
  pieces <- data.frame(
    walk = c("ref[0-30]", "h1[100-120]", "h1[100-120]", "h1[120-140]", "h1[120-140]"),
    node = c("r1", "b1", "r1", "x", "b2"),
    start = c(0, 0, 10, 0, 10), end = c(30, 10, 20, 10, 20)
  )
  expect_equal(block_nodes(split, pieces)$node, c("b1", "b2"))

  # a bar that starts 50 bp into the window has its blocks' stretches counted
  # from there
  shifted <- rows
  shifted$rows$offset <- c(0, 50, 0)
  shifted$blocks$xmin <- shifted$blocks$xmin + c(0, 50)
  shifted$blocks$xmax <- shifted$blocks$xmax + c(0, 50)
  expect_equal(block_nodes(shifted, steps), data.frame(letter = "A", node = c("b1", "b2")))
})

test_that("a walk file cuts the walks under a region", {
  region <- "chr:1004500-1004961"
  gfa <- bandage_gfa(walk_file, region, context = 0)
  expect_match(gfa, "\nW\t")
  w <- bandage_walk_rows(walk_file, region, context = 0)
  expect_setequal(w$rows$sample, bandage_walk_rows(pggb)$rows$sample)
  expect_s3_class(bandage_layout(walk_file, region = region), "bandage_layout")
})

test_that("a walk file cut keeps the browser readers' context unless given one", {
  region <- "chr:1004700-1004750"
  cut <- bandage_gfa(walk_file, region)
  expect_identical(cut, bandage_gfa(walk_file, region, context = 1000))
  expect_false(identical(cut, bandage_gfa(walk_file, region, context = 0)))
})

test_that("a walk file cut keeps the haplotypes asked for, and names its sequences for one it lacks", {
  w <- bandage_walk_rows(walk_file, "chr:1004500-1004961", haplotypes = "IAI39", context = 0)
  expect_setequal(w$rows$sample, c("K12", "IAI39"))
  expect_error(
    bandage_layout(walk_file, region = "chrZ:1-100"),
    "no sequence chrZ on K12; it holds K12#1#chr"
  )
})

test_that("a walk file of format 7 asks for a rebuild", {
  old <- test_path("testdata", "ecoli_pggb_format7.K12.walks.gz")
  expect_error(
    bandage_walk_rows(old, "chr:1004500-1004961"),
    "format 7; .* rebuild it with gfa-to-tabix 5.0 or later"
  )
})

test_that("a walk the file abridged cuts in full, as from a file that did not", {
  abridged <- test_path("testdata", "ecoli_pggb_abridged.K12.walks.gz")
  expect_match(readLines(gzfile(abridged)), "\tabridged\t", all = FALSE)
  rows <- function(file) {
    w <- bandage_walk_rows(file, "chr:1004500-1004961", context = 0)$rows
    w[order(w$name), c("name", "bp", "linked")]
  }
  expect_equal(rows(abridged), rows(walk_file), ignore_attr = TRUE)
})

test_that("a region is a 1-based locus on a GFA and a walk file alike", {
  expect_equal(
    graph_source(pggb, "K12#1#chr:1004501-1004961", NULL, 0)$region,
    "K12#1#chr:1004500-1004961"
  )
  expect_equal(
    graph_source(walk_file, "chr:1004501-1004961", NULL, 0)$source$walks[c("refName", "start", "end")],
    list(refName = "chr", start = 1004500, end = 1004961)
  )
  g <- bandage_layout(walk_file, region = "chr:1004600-1004600", context = 50)
  expect_s3_class(g, "bandage_layout")
})

records <- test_path("testdata", "records.GRCh38.walks.gz")

test_that("a gap in a walk row says what the walk file's departures state of it", {
  w <- bandage_walk_rows(records, "chr1:1001-5000", context = 0)
  gaps <- w$runs[w$runs$gap, ]
  expect_equal(as.character(gaps$kind[gaps$label == "HG003#1"]), "not drawn")
  expect_match(w$rows$readout[w$rows$label == "HG003#1"], "1.0 kb not drawn \\(last seen near chr1:2 kb\\)$")
  # HG002 leaves GRCh38 after 2 kb and rejoins it at 3 kb, with 2 kb of its
  # own: 1.3 kb between its W lines, and 700 bp on a node the cut did not
  # read, in an order the file does not state, so one gap holds both
  expect_equal(
    as.character(gaps$kind[gaps$label == "HG002#1"]),
    "not drawn or left out of graph"
  )
  expect_equal(gaps$bp[gaps$label == "HG002#1"], 2000)
  expect_equal(
    w$rows$readout[w$rows$label == "HG002#1"],
    "5.0 kb (+1.0 kb), of which 1.3 kb left out of graph, 700 bp own sequence not drawn"
  )
  expect_no_error(ggplot2::ggplot_gtable(ggplot2::ggplot_build(ggplot2::autoplot(w))))
})

test_that("a layout of a walk file keys a walk by what its departures state", {
  g <- bandage_layout(records, region = "chr1:1001-5000", walks = "HG002#1", context = 0)
  expect_equal(g$keys$note, ", 1.3 kb left out of graph, 700 bp own sequence not drawn")
})

link_lines <- function(gfa) grep("^L\t", strsplit(gfa, "\n", fixed = TRUE)[[1]], value = TRUE)

test_that("a walk file cut lists the links its haplotypes walk unless asked for more", {
  cut <- function(...) bandage_gfa(records, "chr1:1-10000", haplotypes = "HG002#1", context = 0, ...)
  expect_equal(graph_source(records, "chr1:1-10000", "HG002#1", 0)$source$walks$links, "walked")
  expect_identical(cut(), cut(links = "walked"))
  unset <- graph_source(records, "chr1:1-10000", "HG002#1", 0)$source$walks
  unset$links <- NULL
  expect_identical(engine()$call("bandage.cutWalks", unset, await = TRUE), cut())
})

test_that("links = \"between\" adds the links another haplotype takes between the cut's nodes", {
  cut <- function(links) bandage_gfa(records, "chr1:1-10000", haplotypes = "HG002#1", context = 0, links = links)
  expect_equal(graph_source(records, "chr1:1-10000", "HG002#1", 0, "between")$source$walks$links, "between")
  walked <- link_lines(cut("walked"))
  between <- link_lines(cut("between"))
  only_hg003_walks <- c("L\t3\t+\t19\t+\t0M", "L\t20\t+\t4\t+\t0M")
  expect_setequal(setdiff(between, walked), only_hg003_walks)
  expect_length(setdiff(walked, between), 0)
  drawn <- function(links) {
    bandage_layout(
      records, region = "chr1:1-10000", haplotypes = "HG002#1", context = 0,
      small_sites = "nodes", links = links
    )
  }
  expect_setequal(drawn("between")$nodes$name, drawn("walked")$nodes$name)
  expect_gt(length(unique(drawn("between")$edges$edge)), length(unique(drawn("walked")$edges$edge)))
})

test_that("links takes graph-walks' two words and no other, and walk rows and steps take none", {
  expect_error(bandage_gfa(records, "chr1:1-10000", links = "all"), "should be one of")
  expect_error(bandage_layout(records, region = "chr1:1-10000", links = "none"), "should be one of")
  expect_error(bandage_layout(pggb, links = "none"), "should be one of")
  expect_false("links" %in% names(formals(bandage_walk_rows)))
  expect_false("links" %in% names(formals(bandage_walk_steps)))
})

test_that("the rows' axis counts in bp, kb or Mb by the longest bar", {
  axis <- function(w) ggplot2::autoplot(w)$scales$get_scales("x")
  short <- axis(bandage_walk_rows(pggb))
  expect_equal(short$name, "bp from the left flank")
  expect_equal(short$labels(c(0, 200, 400)), c("0", "200", "400"))
  long <- axis(bandage_walk_rows(records, "chr1:1001-5000", context = 0))
  expect_equal(long$name, "kb from the left flank")
  expect_equal(long$labels(c(0, 2000, 4000)), c("0", "2", "4"))
  expect_equal(axis_unit(3e6), list(name = "Mb", bp = 1e6))
})

test_that("the room past the bars fits the readout reaching furthest", {
  rows <- data.frame(xmax = c(100, 50), readout = c("1 kb", strrep("x", 80)))
  expect_equal(readout_room(rows, 100), 0.3)
  rows$xmax[2] <- 100
  rows$readout[2] <- strrep("x", 50)
  expect_equal(readout_room(rows, 100), 0.01 + 50 * 0.007)
  rows$readout[2] <- strrep("x", 200)
  expect_equal(readout_room(rows, 100), 0.5)
})

test_that("a readout with too little room wraps between two parts, or is cut by whole parts and says so", {
  text <- "7.0 kb, of which 1.3 kb left out of graph \u00b7 contig ends inside the window \u00b7 no ribbons"
  expect_equal(fit_readout(text, 200, nchar), text)
  expect_equal(
    fit_readout(text, 50, nchar),
    "7.0 kb, of which 1.3 kb left out of graph\ncontig ends inside the window \u00b7 no ribbons"
  )
  expect_equal(
    fit_readout("31 kb \u00b7 placement choice \u00b7 contig ends inside the window", 28, nchar),
    "31 kb \u00b7 placement choice \u00b7 \u2026"
  )
  expect_equal(fit_readout(text, 12, nchar), "7.0 kb, \u2026")
  expect_equal(fit_readout(text, 0, nchar), "7.0 kb, \u2026")
  expect_equal(fit_readout("31 kb", 3, nchar), "31 kb")
  expect_equal(fit_readout("120 kb (+45 kb) \u00b7 not compared", 5, nchar), "120 kb (+45 kb) \u00b7 \u2026")
})

test_that("no readout is drawn past the plot's right edge, however narrow the plot", {
  w <- bandage_walk_rows(records, "chr1:1001-5000", context = 0)
  expect_gt(max(nchar(w$rows$readout)), 60)
  readouts <- function(inches) {
    grDevices::pdf(NULL, width = inches, height = 4)
    on.exit(grDevices::dev.off())
    gt <- ggplot2::ggplotGrob(autoplot(w))
    panel <- gt$grobs[[which(gt$layout$name == "panel")]]
    key <- Filter(function(c) inherits(c, "bandage_readouts"), panel$children)[[1]]
    wide <- inches - sum(grid::convertWidth(gt$widths[-unique(gt$layout$l[gt$layout$name == "panel"])], "inches", valueOnly = TRUE))
    grid::pushViewport(grid::viewport(width = grid::unit(wide, "inches")))
    text <- grid::makeContent(key)$children[[1]]
    ends <- grid::convertWidth(text$x, "inches", valueOnly = TRUE) +
      vapply(strsplit(text$label, "\n"), function(lines) {
        max(c(0, vapply(lines, function(l) grid::convertWidth(grid::grobWidth(grid::textGrob(l, gp = text$gp)), "inches", valueOnly = TRUE), 0)))
      }, 0)
    list(label = text$label, over = max(ends) - wide)
  }
  expect_equal(readouts(14)$label, w$rows$readout)
  narrow <- readouts(5)
  expect_lte(narrow$over, 0)
  expect_false(identical(narrow$label, w$rows$readout))
})

# REF walks seven 1 kb nodes, DEL >1>6>7, INS >1>8>6>7 through a 2 kb node of
# its own, and SNP >1>2>3>5>6>7, so none steps on chr1:3000-4000
stepless <- test_path("testdata", "stepless.REF.walks.gz")

test_that("a haplotype with no step on the reference across the window draws as a stepless row", {
  w <- bandage_walk_rows(stepless, "chr1:3201-3800", context = 0)
  expect_equal(w$rows$label, c("REF#0", "DEL#1", "INS#1", "SNP#1"))
  expect_equal(w$rows$stepless, c(FALSE, TRUE, TRUE, TRUE))
  expect_equal(w$rows$offReferenceBp, c(0, 0, 2000, 0))
  gaps <- w$runs[w$runs$row > 0, ]
  expect_equal(as.character(gaps$kind), rep("no step on the reference", 3))
  expect_equal(gaps$xmax - gaps$xmin, rep(w$rows$bp[1], 3))
  expect_equal(w$rows$xmax, rep(w$rows$bp[1], 4))
  expect_equal(w$rows$readout[-1], c(
    "no step on REF across 4 kb · 0 bp of its own",
    "no step on REF across 4 kb · 2 kb of its own",
    "no step on REF across 1 kb · 0 bp of its own"
  ))
  expect_equal(bandage_walk_rows(stepless, "chr1:3201-3800", "DEL", context = 0)$rows$label, c("REF#0", "DEL#1"))
  expect_no_error(ggplot2::ggplot_gtable(ggplot2::ggplot_build(ggplot2::autoplot(w))))
})

test_that("a gap in a GFA's walk is outside the extracted subgraph, whatever its W lines' tags", {
  gfa <- function(...) {
    f <- tempfile(fileext = ".gfa")
    writeLines(c(
      paste0("S\t", 1:5, "\t*\tLN:i:1000"),
      paste0("L\t", 1:4, "\t+\t", 2:5, "\t+\t0M"),
      "W\tGRCh38\t0\tchr1\t0\t5000\t>1>2>3>4>5", ...
    ), f)
    f
  }
  plain <- bandage_walk_rows(gfa(
    "W\tHG002\t1\tchr1\t0\t2000\t>1>2",
    "W\tHG002\t1\tchr1\t3000\t5000\t>4>5"
  ), referencePath = "GRCh38#0#chr1")
  expect_equal(as.character(plain$runs$kind[plain$runs$gap]), "out of view")
  expect_match(plain$rows$readout[2], "1.0 kb out of view$")
  tagged <- bandage_walk_rows(gfa(
    "W\tHG002\t1\tchr1\t0\t2000\t>1>2\tws:Z:end\twe:Z:break,bp=1000",
    "W\tHG002\t1\tchr1\t3000\t5000\t>4>5\tws:Z:break,bp=1000\twe:Z:end"
  ), referencePath = "GRCh38#0#chr1")
  expect_equal(tagged$runs, plain$runs)
})

test_that("a walk the graph lacks warns, naming the ones it has", {
  expect_warning(bandage_layout(pggb, walks = "K1"), "no walk named K1; the graph has K12#1")
})

test_that("the stress engine lays the graph out", {
  g <- bandage_layout(pggb, engine = "stress")
  expect_setequal(unique(g$nodes$node), unique(bandage_layout(pggb)$nodes$node))
})

test_that("a walk file whose directory states another file is refused by its size", {
  dir <- tempfile()
  dir.create(dir)
  on.exit(unlink(dir, recursive = TRUE))
  copy <- file.path(dir, "ecoli_pggb.K12.walks.gz")
  file.copy(walk_file, copy)
  file.copy(paste0(walk_file, ".idx"), paste0(copy, ".idx"))
  con <- file(copy, "ab")
  writeBin(as.raw(0), con)
  close(con)
  expect_error(
    bandage_walk_rows(copy, "chr:1004500-1004961"),
    sprintf("directory states %d bytes, the data holds %d", file.size(walk_file), file.size(copy))
  )
  expect_error(bandage_walk_rows(file.path(dir, "nowhere.K12.walks.gz"), "chr:1-100"), "nowhere.K12.walks.gz.idx does not exist")
})
