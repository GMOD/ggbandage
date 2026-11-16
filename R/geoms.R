# The core states widths in css px, 1/96 in, which is also R's lwd unit
px_linewidth <- function(px) px / ggplot2::.pt

px <- function(v) grid::unit(v / 96, "inches")

width_px <- function(u) grid::convertWidth(u, "inches", valueOnly = TRUE) * 96

#' @exportS3Method ggplot2::fortify
fortify.bandage_layout <- function(model, data, ...) {
  structure(nodes_of(model), bandage = model)
}

layout_of <- function(data) {
  model <- attr(data, "bandage")
  if (is.null(model)) {
    stop("a bandage geom needs ggplot(<bandage_layout>) or data = <bandage_layout>")
  }
  model
}

# what a layer draws from: its own `data`, or the plot's bandage_layout
table_from <- function(data, pick) {
  if (inherits(data, "bandage_layout")) {
    return(pick(data))
  }
  if (is.null(data)) {
    return(function(plot_data) pick(layout_of(plot_data)))
  }
  data
}

with_defaults <- function(mapping, defaults) {
  defaults[names(mapping)] <- mapping
  defaults
}

# The canvas strokes all of one faded colour as one path, so where faded
# strokes overlap they do not darken. Separate translucent paths would, so a
# faded colour is mixed with the background instead.
ink <- function(color, alpha, background) {
  bg <- as.vector(grDevices::col2rgb(background)) / 255
  mixed <- bg + (grDevices::col2rgb(color) / 255 - bg) * rep(alpha, each = 3)
  grDevices::rgb(t(mixed))
}

# Faded strokes go under lifted ones, as the canvas paints them. A stroke's
# index repeats in every panel, and one may be faded in one panel and lifted
# in the next.
in_draw_order <- function(d, id) {
  key <- paste(as.integer(d$panel), d[[id]])
  d$draw <- match(key, unique(key[order(d$alpha, d[[id]])]))
  d[order(d$draw), ]
}

nodes_of <- function(model, background = "white") {
  n <- slid_back(model$nodes, model$meta, "x", "y")
  n$ink <- ink(n$color, n$alpha, background)
  in_draw_order(n, "stroke")
}

edges_of <- function(model, background = "white") {
  e <- slid_back(model$edges, model$meta, c("x0", "cx0"), c("y0", "cy0"))
  e <- slid_back(e, model$meta, c("cx1", "x1"), c("cy1", "y1"), end = "1")
  e <- bezier_points(e, model$meta$scaleX)
  e$ink <- ink(e$color, e$alpha, background)
  in_draw_order(e, "curve")
}

# slid_back takes a lane's px offset off its data coordinates and
# GeomBandagePath adds it back in px, so lanes keep their spacing at any size
slid_back <- function(d, meta, x, y, end = "") {
  offset <- d[[paste0("offset", end)]]
  slide_x <- d[[paste0("nx", end)]] * offset
  slide_y <- d[[paste0("ny", end)]] * offset
  for (col in x) d[[col]] <- d[[col]] - slide_x / meta$scaleX
  for (col in y) d[[col]] <- d[[col]] - slide_y / meta$scaleY
  d[[paste0("slide_x", end)]] <- slide_x
  d[[paste0("slide_y", end)]] <- slide_y
  d
}

# A curve gets a point every few px of its control polygon at the fit scale,
# so the many short links draw as two points and a long loop stays smooth
bezier_points <- function(e, scale) {
  if (!nrow(e)) {
    return(e)
  }
  reach <- abs(e$cx0 - e$x0) + abs(e$cy0 - e$y0) + abs(e$cx1 - e$cx0) +
    abs(e$cy1 - e$cy0) + abs(e$x1 - e$cx1) + abs(e$y1 - e$cy1)
  steps <- pmin(32, pmax(2, ceiling(reach * scale / 3)))
  i <- rep(seq_len(nrow(e)), steps)
  t <- (sequence(steps) - 1) / (steps[i] - 1)
  u <- 1 - t
  b0 <- u^3
  b1 <- 3 * u^2 * t
  b2 <- 3 * u * t^2
  b3 <- t^3
  out <- e[i, setdiff(names(e), c("x0", "y0", "cx0", "cy0", "cx1", "cy1", "x1", "y1"))]
  out$x <- b0 * e$x0[i] + b1 * e$cx0[i] + b2 * e$cx1[i] + b3 * e$x1[i]
  out$y <- b0 * e$y0[i] + b1 * e$cy0[i] + b2 * e$cy1[i] + b3 * e$y1[i]
  out$slide_x <- (b0 + b1) * e$slide_x[i] + (b2 + b3) * e$slide_x1[i]
  out$slide_y <- (b0 + b1) * e$slide_y[i] + (b2 + b3) * e$slide_y1[i]
  out
}

# A path per group, each one colour and width, as one polyline grob in group
# order. GeomPath asks every group whether it is constant, which over the
# tens of thousands of strokes in a graph is most of the drawing time.
GeomBandagePath <- ggplot2::ggproto("GeomBandagePath", ggplot2::Geom,
  required_aes = c("x", "y"),
  default_aes = ggplot2::aes(
    colour = "grey30", linewidth = 1, alpha = NA, linetype = 1,
    slide_x = 0, slide_y = 0
  ),
  draw_key = ggplot2::draw_key_path,
  draw_panel = function(data, panel_params, coord) {
    if (!nrow(data)) {
      return(grid::nullGrob())
    }
    d <- coord$transform(data[order(data$group), ], panel_params)
    first <- d[!duplicated(d$group), ]
    grid::polylineGrob(
      grid::unit(d$x, "native") + px(d$slide_x),
      grid::unit(d$y, "native") + px(d$slide_y),
      id = d$group,
      gp = grid::gpar(
        col = ggplot2::alpha(first$colour, first$alpha),
        lwd = first$linewidth * ggplot2::.pt,
        lty = first$linetype,
        lineend = "round", linejoin = "round"
      )
    )
  }
)

#' Graph nodes as thick paths
#'
#' By default each node takes the colour, opacity and width the Bandage view
#' gives it. Map `colour`, `alpha` or `linewidth` to a column of the node table
#' (`depth`, `frequency`, `length`, `backbone`, `node`, `position`) to draw it
#' your own way. `frequency` is the node's passes per haplotype, `NA` with
#' neither walks nor `frequencies` to give it. `position` is the reference bp
#' at the node's middle. An allele takes the midpoint of its flanks, and a node
#' nothing links to the reference has `NA`.
#' @param mapping aesthetics that override the defaults
#' @param data a `bandage_layout`, or `NULL` for the plot's
#' @param background what faded ink is mixed with, the plot's background
#' @param ... passed to [ggplot2::layer()] params
#' @export
geom_bandage_nodes <- function(mapping = NULL, data = NULL,
                               background = "white", ...) {
  path_layer(mapping, data, function(m) nodes_of(m, background), ...)
}

#' Graph edges as their Bezier curves
#'
#' A link that skips reference sequence, dashed or short and solid, or that
#' reads one reference node as the reference does and the next against it, is
#' the only mark of what it joins, so draw it over the nodes it meets: plain
#' links with `over_nodes = FALSE` before [geom_bandage_nodes()], and these
#' with `over_nodes = TRUE` after it, as [autoplot()][autoplot.bandage_layout]
#' and the Bandage view do.
#' @inheritParams geom_bandage_nodes
#' @param over_nodes `TRUE` for only the links the Bandage view paints over the
#'   nodes, those whose rows have `deletion` or `turn`, `FALSE` for only the
#'   rest, `NULL` for all
#' @export
geom_bandage_edges <- function(mapping = NULL, data = NULL,
                               background = "white", over_nodes = NULL, ...) {
  path_layer(mapping, data, function(m) {
    e <- edges_of(m, background)
    if (is.null(over_nodes)) e else e[painted_over(e) == over_nodes, ]
  }, ...)
}

# A core whose figure data has no turn column marks no link as turning
painted_over <- function(e) if (is.null(e$turn)) e$deletion else e$deletion | e$turn

# ggplot2 keys a layer under any legend whose aesthetic it maps, I() or not,
# so the default inks would stroke solid over every key's own swatch
path_layer <- function(mapping, data, pick, ...) {
  mapping <- with_defaults(mapping, ggplot2::aes(
    x = x, y = y, group = draw, slide_x = slide_x, slide_y = slide_y,
    colour = I(ink), linewidth = I(px_linewidth(width))
  ))
  asis <- vapply(mapping, function(q) {
    e <- rlang::quo_get_expr(q)
    is.call(e) && identical(e[[1]], quote(I))
  }, TRUE)
  ggplot2::layer(
    geom = GeomBandagePath, stat = "identity", position = "identity",
    data = table_from(data, pick),
    mapping = mapping,
    inherit.aes = FALSE, show.legend = ifelse(asis, FALSE, NA),
    params = list(...)
  )
}

GeomBandageArrow <- ggplot2::ggproto("GeomBandageArrow", ggplot2::Geom,
  required_aes = c("x", "y", "angle", "length", "halfwidth"),
  default_aes = ggplot2::aes(fill = "grey30", alpha = 1, halo = FALSE),
  draw_key = ggplot2::draw_key_polygon,
  draw_panel = function(data, panel_params, coord) {
    if (!nrow(data)) {
      return(grid::nullGrob())
    }
    d <- coord$transform(data, panel_params)
    ux <- cos(d$angle)
    uy <- sin(d$angle)
    notch <- d$length * 0.75
    # tip, left barb, notch, right barb, in px off the tip
    dx <- rbind(0, -ux * d$length - uy * d$halfwidth, -ux * notch, -ux * d$length + uy * d$halfwidth)
    dy <- rbind(0, -uy * d$length + ux * d$halfwidth, -uy * notch, -uy * d$length - ux * d$halfwidth)
    heads <- function(rows, gp) {
      grid::polygonGrob(
        x = grid::unit(rep(d$x[rows], each = 4), "native") + px(as.vector(dx[, rows])),
        y = grid::unit(rep(d$y[rows], each = 4), "native") + px(as.vector(dy[, rows])),
        id = rep(seq_along(rows), each = 4),
        gp = gp
      )
    }
    haloed <- which(d$halo)
    grid::gTree(children = do.call(grid::gList, c(
      if (length(haloed)) {
        list(heads(haloed, grid::gpar(col = "white", fill = NA, lwd = 2 * HEAD_HALO_PX, linejoin = "round")))
      },
      list(heads(seq_len(nrow(d)), grid::gpar(col = NA, fill = ggplot2::alpha(d$fill, d$alpha))))
    )))
  }
)

# px of white each side of a head's outline, under a head wider than its lane
HEAD_HALO_PX <- 1.5

# css px of text as ggplot2's size, in mm
px_size <- function(px) px * 72 / 96 / ggplot2::.pt

SIZE_INK <- "#18181c"
GENE_INK <- "#1c1c22"

# The labels of `kinds` the core placed, the leaders drawn first; `pick`
# gives the table a column the label's mapping reads
placed_labels <- function(data, kinds, ink, params, mapping = ggplot2::aes(),
                          pick = function(m, l) l) {
  labels <- function(m) pick(m, m$labels[m$labels$kind %in% kinds, ])
  list(
    ggplot2::layer(
      geom = ggplot2::GeomSegment, stat = "identity", position = "identity",
      data = table_from(data, function(m) {
        l <- labels(m)
        l[!is.na(l$x1), ]
      }),
      mapping = ggplot2::aes(x = x1, y = y1, xend = x2, yend = y2),
      inherit.aes = FALSE, show.legend = FALSE,
      params = list(colour = ink, alpha = 0.6, linewidth = px_linewidth(0.8))
    ),
    ggplot2::layer(
      geom = ggplot2::GeomLabel, stat = "identity", position = "identity",
      data = table_from(data, labels),
      mapping = with_defaults(mapping, ggplot2::aes(x = x, y = y, label = text, size = I(px_size(size)))),
      inherit.aes = FALSE, show.legend = FALSE,
      params = c(list(label.padding = grid::unit(1.5, "pt"), label.r = grid::unit(2, "pt")), params)
    )
  )
}

#' Node lengths and pass names, where the Bandage view writes them
#'
#' Each placeholder's length, the bp of a stretch the cut did not load, and
#' every node's where the layout was made with `nodeLengths = TRUE`, on a pale
#' backing at the place the Bandage view gives it, with a leader to its loop
#' where the label stands off. A walk lifted by pass has each pass named in
#' the pass's colour beside one of its threads, with a leader in that colour
#' to a dot on the thread.
#' [autoplot()][autoplot.bandage_layout] adds it.
#' @inheritParams geom_bandage_nodes
#' @return the leaders and the labels of the lengths, then the leaders, the
#'   dots and the names of the passes, five layers
#' @export
geom_bandage_labels <- function(data = NULL) {
  c(
    placed_labels(
      data, c("placeholder", "length"), SIZE_INK,
      list(colour = SIZE_INK, fill = ggplot2::alpha("white", 0.8), border.colour = NA)
    ),
    pass_labels(data)
  )
}

# A pass's name as bandage-core's figure writes it: a leader in the pass's
# colour from the name to a dot on the pass's thread, and the name in that
# colour on a white chip ringed in it
pass_labels <- function(data) {
  passes <- table_from(data, function(m) m$labels[m$labels$kind == "pass", ])
  list(
    ggplot2::layer(
      geom = ggplot2::GeomSegment, stat = "identity", position = "identity",
      data = passes,
      mapping = ggplot2::aes(x = x1, y = y1, xend = x2, yend = y2, colour = I(color)),
      inherit.aes = FALSE, show.legend = FALSE,
      params = list(linewidth = px_linewidth(1))
    ),
    ggplot2::layer(
      geom = ggplot2::GeomPoint, stat = "identity", position = "identity",
      data = passes,
      mapping = ggplot2::aes(x = x2, y = y2, colour = I(color)),
      inherit.aes = FALSE, show.legend = FALSE,
      params = list(size = PASS_DOT_PX / ggplot2::.pt, stroke = 0, shape = 16)
    ),
    ggplot2::layer(
      geom = ggplot2::GeomLabel, stat = "identity", position = "identity",
      data = passes,
      mapping = ggplot2::aes(x = x, y = y, label = text, size = I(px_size(size)), colour = I(color)),
      inherit.aes = FALSE, show.legend = FALSE,
      params = list(
        label.padding = grid::unit(1.5, "pt"), label.r = grid::unit(2, "pt"),
        fill = ggplot2::alpha("white", 0.9), fontface = "bold"
      )
    )
  )
}

# a filled circle of pch 16 is as wide in px as its fontsize in pt, which
# ggplot2 takes as size times .pt
PASS_DOT_PX <- 4

# The exon gold, the core's own where the caller gives no colour
inked <- function(colour) {
  function(m, table) {
    table$ink <- rep(if (is.null(colour)) m$meta$inks$exon else colour, nrow(table))
    table
  }
}

# An exon's stretch is outlined only on a node the drawing strokes
exons_of <- function(model, outline) {
  e <- model$exons
  width <- tapply(model$nodes$width, model$nodes$node, max)
  e$width <- as.numeric(width[e$node]) + 2 * outline
  e[!is.na(e$width), ]
}

#' Genes pinned on the backbone
#'
#' Outlines each exon round the stretch of node that carries it, under the
#' nodes, on the nodes the drawing strokes, and names each gene where the
#' Bandage view places its name, with a leader to its pin. Needs a layout made with `genes`; add it before
#' [geom_bandage_nodes()] so the nodes draw over the outline. A gene whose
#' row is dropped from the layout's `genes` goes unnamed, and one dropped
#' from its `exons` unoutlined.
#' @inheritParams geom_bandage_nodes
#' @param outline px the outline reaches past each side of the node
#' @param colour the outline's colour, the Bandage view's exon gold when `NULL`
#' @param key the legend entry naming the outline, or `NULL` for none
#' @return the outlines, the names' leaders and the names, and the outline's
#'   legend entry
#' @export
geom_bandage_genes <- function(data = NULL, outline = 3, colour = NULL,
                               key = "exon") {
  ink <- inked(colour)
  c(
    list(ggplot2::layer(
      geom = GeomBandagePath, stat = "identity", position = "identity",
      data = table_from(data, function(m) ink(m, exons_of(m, outline))),
      mapping = ggplot2::aes(
        x = x, y = y, group = stretch, linewidth = I(px_linewidth(width)), colour = I(ink)
      ),
      inherit.aes = FALSE, show.legend = FALSE
    )),
    placed_labels(
      data, "gene", GENE_INK,
      list(text.colour = GENE_INK, fill = ggplot2::alpha("white", 0.85), fontface = "italic"),
      ggplot2::aes(colour = I(ink)),
      function(m, labels) ink(m, labels[labels$item %in% m$genes$gene, ])
    ),
    if (!is.null(key)) {
      list(ggplot2::guides(bandage_genes = exon_key(if (is.null(colour)) core_exon() else colour, key)))
    }
  )
}

core_exon <- function() engine()$get("bandage.EXON_COLOR")

exon_key <- function(colour, label) {
  text <- grid::textGrob(
    label,
    x = px(23), just = "left", gp = grid::gpar(fontsize = 9, col = "grey15")
  )
  outline <- grid::roundrectGrob(
    x = px(1), width = px(16), height = px(10), just = "left", r = grid::unit(4 / 16, "snpc"),
    gp = grid::gpar(col = colour, fill = NA, lwd = px_linewidth(2) * ggplot2::.pt)
  )
  ggplot2::guide_custom(
    grid::grobTree(outline, text),
    width = px(23) + grid::grobWidth(text), height = px(14), order = 9
  )
}

CHARCOAL <- "#3c4148"

# The graph's key as bandage-core's graphKey states it, an entry a row, each
# thickness group's entries after its name, less the exon outline's where the
# layout's exons have been dropped
key_rows <- function(model) {
  k <- model$graph_key
  k <- k[k$section != "exon" | nrow(model$exons) > 0, ]
  if (!nrow(k)) {
    return(empty_key())
  }
  rows <- data.frame(
    strong = k$strong, text = k$text, under = k$under, swatch = k$swatch,
    colour = k$color, alpha = k$alpha, stops = k$stops,
    px = as.numeric(k$px), dashed = as.logical(k$dashed),
    rim = k$rim, rim_px = as.numeric(k$rimPx),
    stringsAsFactors = FALSE
  )
  headed <- which(k$group %in% c("Node thickness", "Link thickness") & !duplicated(k$group))
  heads <- if (length(headed)) key_entry(strong = k$group[headed]) else empty_key()
  out <- rbind(rows, heads)
  out[order(c(seq_len(nrow(rows)), headed - 0.5)), ]
}

# Entries of the key's columns, a swatch's colours where it has any
key_entry <- function(strong = "", text = "", swatch = "", stops = "") {
  data.frame(
    strong = strong, text = text, under = "", swatch = swatch, colour = "", alpha = 1,
    stops = stops, px = NA_real_, dashed = FALSE, rim = "", rim_px = NA_real_
  )
}

empty_key <- function() {
  data.frame(
    strong = character(), text = character(), under = character(), swatch = character(),
    colour = character(), alpha = numeric(), stops = character(), px = numeric(),
    dashed = logical(), rim = character(), rim_px = numeric()
  )
}

# Each lifted walk's bar, faceted one a panel, with its name and note
walk_bars <- function(model) {
  k <- model$keys
  if (!nrow(k)) {
    return(cbind(empty_key(), panel = character()))
  }
  shades <- grepl(",", k$stops, fixed = TRUE)
  data.frame(
    strong = k$walk, text = k$note, under = k$scale, swatch = ifelse(shades, "scale", "swatch"),
    colour = ifelse(shades, "", k$stops), alpha = 1, stops = ifelse(shades, k$stops, ""),
    px = NA_real_, dashed = FALSE, rim = "", rim_px = NA_real_,
    panel = factor(k$panel, levels = model$panels$panel)
  )
}

keys_of <- function(model) {
  if (nrow(model$panels) > 1) walk_bars(model) else key_rows(model)
}

GeomBandageKey <- ggplot2::ggproto("GeomBandageKey", ggplot2::Geom,
  required_aes = c("swatch", "text"),
  default_aes = ggplot2::aes(
    strong = "", under = "", ink = "", alpha = 1, stops = "", px = NA,
    dashed = FALSE, rim = "", rim_px = NA
  ),
  extra_params = c("na.rm", "text"),
  draw_panel = function(data, panel_params, coord, text = TRUE) {
    if (!nrow(data)) {
      return(grid::nullGrob())
    }
    names(data)[names(data) == "ink"] <- "colour"
    grid::gTree(keys = data, text = text, top = if (text) 6 else -BAR_RISE, cl = "bandage_keys")
  }
)

# px a panel's unlabelled bar stands above the panel's top edge, under the
# panel's title and off the drawing
BAR_RISE <- 14

#' @exportS3Method grid::makeContent
makeContent.bandage_keys <- function(x) {
  top <- if (is.null(x$top)) 6 else x$top
  grid::setChildren(x, key_grobs(x$keys, x$text, width_px(grid::unit(1, "npc")), top)$grobs)
}

key_font <- grid::gpar(fontsize = 8.25, col = "grey15")
key_bold <- grid::gpar(fontsize = 8.25, col = "grey15", fontface = "bold")

# px a swatch takes along the line: a scale's or a thickness's bar, a mark's
# square, or nothing for a note
swatch_px <- function(swatch) {
  ifelse(swatch %in% c("scale", "width"), 48, ifelse(nzchar(swatch), 18, 0))
}

# One entry's swatch at `at` px along the line whose middle is `mid`
swatch_grob <- function(k, at, mid) {
  ink <- function(colour = k$colour, alpha = k$alpha) ggplot2::alpha(colour, alpha)
  lwd <- function(px) px_linewidth(px) * ggplot2::.pt
  x <- function(px) px(at + px)
  switch(k$swatch,
    scale = grid::rectGrob(
      x(0), mid, px(48), px(8), just = "left",
      gp = grid::gpar(col = NA, fill = grid::linearGradient(
        strsplit(k$stops, ",", fixed = TRUE)[[1]], x1 = 0, y1 = 0.5, x2 = 1, y2 = 0.5
      ))
    ),
    swatch = grid::rectGrob(x(0), mid, px(18), px(8), just = "left", gp = grid::gpar(col = NA, fill = ink())),
    chip = grid::rectGrob(x(4), mid, px(10), px(10), just = "left", gp = grid::gpar(col = NA, fill = ink())),
    width = grid::rectGrob(x(0), mid, px(48), px(k$px), just = "left", gp = grid::gpar(col = NA, fill = ink())),
    hollow = grid::roundrectGrob(
      x(1), mid, px(16), px(8), just = "left", r = grid::unit(0.5, "snpc"),
      gp = grid::gpar(col = k$rim, fill = ink(), lwd = lwd(k$rim_px))
    ),
    line = if (isTRUE(k$dashed)) {
      grid::segmentsGrob(x(0), mid, x(18), mid, gp = grid::gpar(col = ink(), lwd = lwd(2), lty = "22", lineend = "butt"))
    } else {
      grid::segmentsGrob(x(5), mid, x(13), mid, gp = grid::gpar(col = ink(), lwd = lwd(1.5), lineend = "butt"))
    },
    outline = grid::roundrectGrob(
      x(1), mid, px(16), px(10), just = "left", r = grid::unit(0.4, "snpc"),
      gp = grid::gpar(col = ink(), fill = NA, lwd = lwd(2))
    ),
    halo = grid::segmentsGrob(x(5), mid, x(13), mid, gp = grid::gpar(col = ink(alpha = 0.35), lwd = lwd(8), lineend = "round")),
    threads = grid::segmentsGrob(
      x(0), mid + px(c(3, 0, -3)), x(18), mid + px(c(3, 0, -3)),
      gp = grid::gpar(col = ink(), lwd = lwd(1.5), lineend = "butt")
    ),
    heads = grid::segmentsGrob(
      x(0), mid, x(c(9, 18)), mid,
      arrow = grid::arrow(angle = 25, length = px(5), type = "closed"),
      gp = grid::gpar(col = ink(), fill = ink(), lwd = lwd(1.5), lineend = "butt", linejoin = "mitre")
    ),
    overhang = grid::polygonGrob(
      x = x(c(0, 8, 8, 18, 10, 10)), y = mid + px(c(0, 5, -5, 0, 5, -5)), id = rep(1:2, each = 3),
      gp = grid::gpar(col = NA, fill = SIZE_INK)
    )
  )
}

# One entry's words as grobs, and the px it takes along its line
entry_words <- function(k, text) {
  said <- function(words, font) if (text && nzchar(words)) grid::textGrob(words, just = "left", gp = font)
  wide_of <- function(g) if (is.null(g)) 0 else width_px(grid::grobWidth(g))
  bar <- swatch_px(k$swatch)
  e <- list(
    bar = bar, gap = if (bar > 0) 5 else 0,
    strong = said(k$strong, key_bold), words = said(k$text, key_font), under = said(k$under, key_font)
  )
  e$strong_px <- wide_of(e$strong)
  spoken <- e$strong_px + wide_of(e$words)
  e$wide <- max(bar + if (spoken > 0) e$gap + spoken else 0, wide_of(e$under))
  e$heads <- bar == 0 && !is.null(e$strong) && is.null(e$words)
  e
}

# The entries laid along lines across `room` px from `top` px under the
# viewport's top edge, a new line where the next would run past it, or where
# a group's name would end a line with its first entry on the next; a line
# holding a stretch under an entry is two tall
key_grobs <- function(data, text, room, top = 6) {
  entries <- lapply(seq_len(nrow(data)), function(i) entry_words(data[i, ], text))
  grobs <- list()
  at <- 6
  tall <- 16
  for (i in seq_along(entries)) {
    e <- entries[[i]]
    led <- if (e$heads && i < length(entries)) 16 + entries[[i + 1]]$wide else 0
    if (at > 6 && at + e$wide + led > room) {
      at <- 6
      top <- top + tall + 4
      tall <- 16
    }
    mid <- grid::unit(1, "npc") - px(top + 4)
    placed <- list(
      if (e$bar > 0) swatch_grob(data[i, ], at, mid),
      if (!is.null(e$strong)) grid::editGrob(e$strong, x = px(at + e$bar + e$gap), y = mid),
      if (!is.null(e$words)) grid::editGrob(e$words, x = px(at + e$bar + e$gap + e$strong_px), y = mid),
      if (!is.null(e$under)) grid::editGrob(e$under, x = px(at), y = mid - px(16))
    )
    grobs <- c(grobs, Filter(Negate(is.null), placed))
    if (!is.null(e$under)) tall <- 32
    at <- at + e$wide + 16
  }
  list(grobs = do.call(grid::gList, grobs), height = top + tall)
}

KEY_INSET <- (8 + 8 + 20) * 96 / 72

key_guide <- function(model, position = "top", keys = key_rows(model)) {
  ggplot2::guides(bandage_keys = ggplot2::guide_custom(
    grid::gTree(keys = keys, text = TRUE, cl = c("bandage_key_guide", "bandage_keys")),
    position = position
  ))
}

# Faceted, each panel's bar goes unlabelled under its title, so a key below
# the panels names the shading, then the graph's key: what the panels fade
# and the skips
facet_key_guide <- function(model) {
  shades <- unique(model$keys$stops[grepl(",", model$keys$stops, fixed = TRUE)])
  keys <- rbind(
    if (length(shades) == 1) key_entry(text = "each walk, start to end", swatch = "scale", stops = shades),
    key_rows(model)
  )
  if (nrow(keys)) key_guide(model, "bottom", keys)
}

key_room <- function() {
  max(60, width_px(grid::unit(1, "npc")) - KEY_INSET)
}

#' @exportS3Method grid::widthDetails
widthDetails.bandage_key_guide <- function(x) px(key_room())

#' @exportS3Method grid::heightDetails
heightDetails.bandage_key_guide <- function(x) {
  px(6 + key_grobs(x$keys, TRUE, key_room())$height)
}

#' Each lifted walk's colour bar, as the Bandage view's key draws it
#'
#' A bar of the walk's colour, or of the scale a shaded walk runs over, with
#' its name and what it leaves out, at the top left of the panel; unfaceted,
#' the rest of the graph's key follows.
#' @inheritParams geom_bandage_nodes
#' @param text write each entry's words beside its bar; faceted, the panel's
#'   title already does. A bar without its words stands just above the panel,
#'   clear of the drawing, so it needs a coord with `clip = "off"` and room
#'   under the panel's title, as [autoplot()][autoplot.bandage_layout] gives it
#' @export
geom_bandage_keys <- function(data = NULL, text = TRUE) {
  ggplot2::layer(
    geom = GeomBandageKey, stat = "identity", position = "identity",
    data = table_from(data, keys_of),
    mapping = ggplot2::aes(
      swatch = swatch, text = text, strong = strong, under = under, ink = colour,
      alpha = I(alpha), stops = stops, px = px, dashed = dashed, rim = rim, rim_px = rim_px
    ),
    inherit.aes = FALSE, show.legend = FALSE,
    params = list(text = text)
  )
}

#' Strand arrowheads, a fixed size at any zoom
#'
#' A head wider than its lane stands on a white halo, as the Bandage view
#' draws it, where the layout's `arrows` table marks it `halo`.
#' @inheritParams geom_bandage_nodes
#' @export
geom_bandage_arrows <- function(mapping = NULL, data = NULL, ...) {
  ggplot2::layer(
    geom = GeomBandageArrow, stat = "identity", position = "identity",
    data = table_from(data, function(m) haloed_heads(m$arrows)),
    mapping = with_defaults(mapping, ggplot2::aes(
      x = x, y = y, angle = angle, length = length, halfwidth = halfWidth,
      fill = I(color), alpha = I(alpha), halo = halo
    )),
    inherit.aes = FALSE, show.legend = FALSE,
    params = list(...)
  )
}

# A core whose figure data has no halo column puts no head on a halo
haloed_heads <- function(arrows) {
  arrows$halo <- if (is.null(arrows$halo)) logical(nrow(arrows)) else arrows$halo
  arrows
}
