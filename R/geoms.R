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
  n <- model$nodes
  n$ink <- ink(n$color, n$alpha, background)
  in_draw_order(n, "stroke")
}

edges_of <- function(model, background = "white") {
  e <- bezier_points(model$edges, model$meta$scaleX)
  e$ink <- ink(e$color, e$alpha, background)
  in_draw_order(e, "curve")
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
  default_aes = ggplot2::aes(colour = "grey30", linewidth = 1, alpha = NA, linetype = 1),
  draw_key = ggplot2::draw_key_path,
  draw_panel = function(data, panel_params, coord) {
    if (!nrow(data)) {
      return(grid::nullGrob())
    }
    d <- coord$transform(data[order(data$group), ], panel_params)
    first <- d[!duplicated(d$group), ]
    grid::polylineGrob(
      d$x, d$y, id = d$group, default.units = "native",
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
      x = x, y = y, group = draw,
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
