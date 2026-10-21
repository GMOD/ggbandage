# The core states widths in css px, 1/96 in, which is also R's lwd unit
px_linewidth <- function(px) px / ggplot2::.pt

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
  n <- slid_back(model$nodes, model$meta, c("x", "y"))
  n$ink <- ink(n$color, n$alpha, background)
  in_draw_order(n, "stroke")
}

edges_of <- function(model, background = "white") {
  e <- slid_back(model$edges, model$meta, c("x0", "y0", "cx0", "cy0", "cx1", "cy1", "x1", "y1"))
  e <- bezier_points(e, model$meta$scaleX)
  e$ink <- ink(e$color, e$alpha, background)
  in_draw_order(e, "curve")
}

# A lifted walk's lane back on its node's line, with the px it was slid off
# that line, so it slides the same px at whatever size the plot is drawn
slid_back <- function(d, meta, xy) {
  if (is.null(d$offset)) {
    d$slide_x <- d$slide_y <- numeric(nrow(d))
    return(d)
  }
  d$slide_x <- d$nx * d$offset
  d$slide_y <- d$ny * d$offset
  for (col in xy) {
    d[[col]] <- d[[col]] - if (startsWith(col, "x") || startsWith(col, "cx")) {
      d$slide_x / meta$scaleX
    } else {
      d$slide_y / meta$scaleY
    }
  }
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
      grid::unit(d$x, "native") + grid::unit(d$slide_x / 96, "inches"),
      grid::unit(d$y, "native") + grid::unit(d$slide_y / 96, "inches"),
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
#' (`depth`, `length`, `backbone`, `node`) to draw it your own way.
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
#' @inheritParams geom_bandage_nodes
#' @export
geom_bandage_edges <- function(mapping = NULL, data = NULL,
                               background = "white", ...) {
  path_layer(mapping, data, function(m) edges_of(m, background), ...)
}

path_layer <- function(mapping, data, pick, ...) {
  ggplot2::layer(
    geom = GeomBandagePath, stat = "identity", position = "identity",
    data = table_from(data, pick),
    mapping = with_defaults(mapping, ggplot2::aes(
      x = x, y = y, group = draw, slide_x = slide_x, slide_y = slide_y,
      colour = I(ink), linewidth = I(px_linewidth(width))
    )),
    inherit.aes = FALSE, show.legend = NA,
    params = list(...)
  )
}

GeomBandageArrow <- ggplot2::ggproto("GeomBandageArrow", ggplot2::Geom,
  required_aes = c("x", "y", "angle", "length", "halfwidth"),
  default_aes = ggplot2::aes(fill = "grey30", alpha = 1),
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
    n <- nrow(d)
    grid::polygonGrob(
      x = grid::unit(rep(d$x, each = 4), "npc") + grid::unit(as.vector(dx) / 96, "inches"),
      y = grid::unit(rep(d$y, each = 4), "npc") + grid::unit(as.vector(dy) / 96, "inches"),
      id = rep(seq_len(n), each = 4),
      gp = grid::gpar(col = NA, fill = ggplot2::alpha(d$fill, d$alpha))
    )
  }
)

# A node's label goes at the middle point of its longest stroke
label_points <- function(model) {
  n <- model$nodes
  if (!nrow(n)) {
    return(n)
  }
  key <- paste(n$panel, n$stroke)
  mid <- stats::ave(seq_along(key), key, FUN = function(i) i == i[ceiling(length(i) / 2)])
  reach <- stats::ave(n$x, key, FUN = function(x) diff(range(x))) +
    stats::ave(n$y, key, FUN = function(y) diff(range(y)))
  n <- n[mid == 1, ]
  n <- n[order(-reach[mid == 1]), ]
  n[!duplicated(paste(n$panel, n$node)), ]
}

#' Node names, at the middle of each node
#'
#' Labels each node once per panel, by default with its GFA name, longest
#' nodes first, dropping a label that would overlap one already drawn. Map
#' `label` to another column of the node table, such as `length`, to write
#' that instead.
#' @inheritParams geom_bandage_nodes
#' @param check_overlap drop a label that overlaps one drawn before it
#' @param size text size in mm
#' @export
geom_bandage_labels <- function(mapping = NULL, data = NULL,
                                check_overlap = TRUE, size = 2.6, ...) {
  ggplot2::layer(
    geom = ggplot2::GeomText, stat = "identity", position = "identity",
    data = table_from(data, label_points),
    mapping = with_defaults(mapping, ggplot2::aes(
      x = x, y = y, label = name, colour = I("grey15")
    )),
    inherit.aes = FALSE, show.legend = FALSE,
    params = list(check_overlap = check_overlap, size = size, ...)
  )
}

exons_of <- function(model, outline) {
  e <- model$exons
  if (!nrow(e)) {
    return(e)
  }
  width <- tapply(model$nodes$width, model$nodes$node, max)
  e$width <- width[e$node] + 2 * outline
  e
}

# Where two names would overlap, the longer gene keeps its name. A name takes
# about 7 px a character at the width the layout was fit to.
gene_labels <- function(model) {
  g <- model$genes
  if (!nrow(g)) {
    return(g)
  }
  g <- g[order(-g$bp), ]
  half <- (nchar(g$gene) * 7 + 12) / 2 / model$meta$scaleX
  tall <- 20 / model$meta$scaleY
  keep <- logical(nrow(g))
  for (i in seq_len(nrow(g))) {
    k <- which(keep)
    keep[i] <- !any(
      abs(g$x[k] - g$x[i]) < half[k] + half[i] & abs(g$y[k] - g$y[i]) < tall
    )
  }
  g[keep, ]
}

#' Genes pinned on the backbone
#'
#' Outlines each exon round the stretch of node that carries it, under the
#' nodes, and names each gene at its midpoint, as the Bandage view does; where
#' two names would overlap, the longer gene keeps its name. Needs
#' a layout made with `genes`; add it before [geom_bandage_nodes()] so the
#' nodes draw over the outline.
#' @inheritParams geom_bandage_nodes
#' @param outline px the outline reaches past each side of the node
#' @param colour the outline's colour
#' @return a list of two layers, the outlines and the names
#' @export
geom_bandage_genes <- function(data = NULL, outline = 3, colour = "#e8a200") {
  list(
    ggplot2::layer(
      geom = GeomBandagePath, stat = "identity", position = "identity",
      data = table_from(data, function(m) exons_of(m, outline)),
      mapping = ggplot2::aes(
        x = x, y = y, group = stretch, linewidth = I(px_linewidth(width))
      ),
      inherit.aes = FALSE, show.legend = FALSE,
      params = list(colour = colour)
    ),
    ggplot2::layer(
      geom = ggplot2::GeomLabel, stat = "identity", position = "identity",
      data = table_from(data, gene_labels),
      mapping = ggplot2::aes(x = x, y = y, label = gene),
      inherit.aes = FALSE, show.legend = FALSE,
      params = list(
        size = 3, fontface = "italic", colour = "#1c1c22", fill = "white",
        vjust = 1.6
      )
    )
  )
}

FADED <- "#a0a0a0"

# Each lifted walk's key, and unfaceted, a faded swatch for what no walk
# visits, then the key to the threads where walks draw a thread per pass
keys_of <- function(model) {
  k <- model$keys
  if (!nrow(k)) {
    return(k)
  }
  if (is.null(k$kind)) {
    k$kind <- "walk"
  }
  k$alpha <- 1
  if (nrow(model$panels) == 1) {
    k$panel <- NULL
    walks <- k[k$kind == "walk", ]
    faded <- walks[1, ]
    faded[] <- ""
    faded$kind <- "faded"
    faded$stops <- FADED
    faded$alpha <- 0.3
    faded$note <- paste("not on", if (nrow(walks) == 1) walks$walk else "these walks")
    k <- rbind(walks, faded, k[k$kind != "walk", ])
  } else {
    k$panel <- factor(k$panel, levels = model$panels$panel)
  }
  k
}

GeomBandageKey <- ggplot2::ggproto("GeomBandageKey", ggplot2::Geom,
  required_aes = c("stops", "label"),
  default_aes = ggplot2::aes(alpha = 1, kind = "walk"),
  extra_params = c("na.rm", "text"),
  draw_panel = function(data, panel_params, coord, text = TRUE) {
    if (!nrow(data)) {
      return(grid::nullGrob())
    }
    grid::gTree(keys = data, text = text, cl = "bandage_keys")
  }
)

# Laid out at draw time, when the panel's width is known, so a key that would
# run past the right edge starts a new line
#' @exportS3Method grid::makeContent
makeContent.bandage_keys <- function(x) {
  room <- grid::convertWidth(grid::unit(1, "npc"), "inches", valueOnly = TRUE) * 96
  grid::setChildren(x, key_grobs(x$keys, x$text, room)$grobs)
}

key_font <- grid::gpar(fontsize = 8.25, col = "grey15")

# Each key's bar and label from the top left, a new line wherever the next
# would pass `room` px. Without a device to measure on, a label takes 6.5 px
# a character.
key_grobs <- function(data, text, room, measure = TRUE) {
  px <- function(v) grid::unit(v / 96, "inches")
  grobs <- list()
  at <- 6
  line <- 0
  for (i in seq_len(nrow(data))) {
    colours <- strsplit(data$stops[i], ",", fixed = TRUE)[[1]]
    threads <- identical(data$kind[i], "passes")
    bar <- if (length(colours) > 1) 48 else 18
    fill <- if (length(colours) > 1) {
      grid::linearGradient(colours, x1 = 0, y1 = 0.5, x2 = 1, y2 = 0.5)
    } else if (!threads) {
      ggplot2::alpha(colours, data$alpha[i])
    }
    label <- if (text && nzchar(data$label[i])) {
      grid::textGrob(data$label[i], just = "left", gp = key_font)
    }
    wide <- bar + if (is.null(label)) {
      0
    } else if (measure) {
      5 + grid::convertWidth(grid::grobWidth(label), "inches", valueOnly = TRUE) * 96
    } else {
      5 + 6.5 * nchar(data$label[i])
    }
    if (at > 6 && at + wide > room) {
      at <- 6
      line <- line + 1
    }
    top <- grid::unit(1, "npc") - px(6 + 16 * line)
    grobs[[length(grobs) + 1]] <- if (threads) {
      grid::segmentsGrob(
        px(at), top - px(c(1, 4, 7)), px(at + bar), top - px(c(1, 4, 7)),
        gp = grid::gpar(col = "grey30", lwd = 2 * 72 / 96, lineend = "butt")
      )
    } else {
      grid::rectGrob(
        x = px(at), y = top, width = px(bar), height = px(8),
        just = c("left", "top"), gp = grid::gpar(col = NA, fill = fill)
      )
    }
    if (!is.null(label)) {
      grobs[[length(grobs) + 1]] <- grid::editGrob(
        label, x = px(at + bar + 5), y = top - px(4)
      )
    }
    at <- at + wide + 16
  }
  list(grobs = do.call(grid::gList, grobs), lines = line + 1)
}

# The keys as a legend over the plot, `room` px wide, which takes the lines
# it needs at any size the plot is drawn
key_guide <- function(model, room = 640) {
  keys <- keys_of(model)
  keys$label <- paste0(keys$walk, keys$note)
  laid <- key_grobs(keys, TRUE, room, measure = FALSE)
  ggplot2::guides(bandage_keys = ggplot2::guide_custom(
    grid::gTree(children = laid$grobs),
    width = grid::unit(room / 96, "inches"),
    height = grid::unit((6 + 16 * laid$lines) / 96, "inches"),
    position = "top"
  ))
}

#' Each lifted walk's colour bar, as the Bandage view's key draws it
#'
#' A bar of the walk's colour, or of the scale a shaded walk runs over, with
#' its name and its length against the reference, at the top left of the
#' panel. Unfaceted, a faded swatch follows for the rest of the graph.
#' @inheritParams geom_bandage_nodes
#' @param text write each walk's name and note beside its bar; faceted, the
#'   panel's title already does
#' @export
geom_bandage_keys <- function(data = NULL, text = TRUE) {
  ggplot2::layer(
    geom = GeomBandageKey, stat = "identity", position = "identity",
    data = table_from(data, keys_of),
    mapping = ggplot2::aes(
      stops = stops, label = paste0(walk, note), alpha = I(alpha), kind = kind
    ),
    inherit.aes = FALSE, show.legend = FALSE,
    params = list(text = text)
  )
}

#' Strand arrowheads, a fixed size at any zoom
#' @inheritParams geom_bandage_nodes
#' @export
geom_bandage_arrows <- function(mapping = NULL, data = NULL, ...) {
  ggplot2::layer(
    geom = GeomBandageArrow, stat = "identity", position = "identity",
    data = table_from(data, function(m) m$arrows),
    mapping = with_defaults(mapping, ggplot2::aes(
      x = x, y = y, angle = angle, length = length, halfwidth = halfWidth,
      fill = I(color), alpha = I(alpha)
    )),
    inherit.aes = FALSE, show.legend = FALSE,
    params = list(...)
  )
}
