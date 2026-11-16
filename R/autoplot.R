#' The graph as the Bandage view draws it
#'
#' Edges, nodes and arrowheads at the view's colours on white, the background
#' the geoms mix faded ink with, the node lengths the view writes, a panel per
#' walk when faceted, the genes pinned on the backbone, the view's key at the
#' top, and a reference bp axis under the layouts whose x is reference bp.
#' Plain links lie under the nodes, and links that skip reference sequence or
#' turn strand against it over them, so neither is hidden under the nodes it
#' meets. Every piece is an ordinary ggplot2 layer, scale or theme, so `+`
#' changes any of it.
#' @param object a `bandage_layout`
#' @param ... unused
#' @param ncol panels across, for a faceted layout
#' @exportS3Method ggplot2::autoplot
autoplot.bandage_layout <- function(object, ..., ncol = NULL) {
  m <- object$meta
  faceted <- nrow(object$panels) > 1
  keyed <- !faceted && nrow(key_rows(object)) > 0
  genes <- if (nrow(object$genes)) geom_bandage_genes(key = NULL)
  p <- ggplot2::ggplot(object) +
    geom_bandage_edges(over_nodes = FALSE) +
    genes[1] +
    geom_bandage_nodes() +
    geom_bandage_edges(over_nodes = TRUE) +
    geom_bandage_arrows() +
    genes[2:3] +
    geom_bandage_labels()
  if (faceted) {
    p <- p + geom_bandage_keys(text = FALSE) + facet_key_guide(object)
  } else if (keyed) {
    p <- p + key_guide(object)
  }
  p <- p +
    ggplot2::theme_void() +
    ggplot2::theme(
      plot.background = ggplot2::element_rect(fill = "white", colour = NA),
      plot.margin = ggplot2::margin(8, 8, 8, 8),
      legend.position = "bottom",
      legend.justification = "left",
      legend.margin = ggplot2::margin(l = 20),
      legend.title = ggplot2::element_text(size = 9, colour = "grey30"),
      legend.text = ggplot2::element_text(size = 9),
      strip.text = ggplot2::element_text(
        hjust = 0, lineheight = 1.1,
        margin = ggplot2::margin(b = 4 + (BAR_RISE + 2) * 72 / 96)
      ),
      panel.spacing = grid::unit(12, "pt")
    )
  if (keyed || faceted) {
    p <- p + ggplot2::theme(legend.location = "plot")
  }
  p <- p + if (m$pixelRows) {
    ggplot2::coord_cartesian(clip = "off")
  } else {
    ggplot2::coord_fixed(ratio = m$scaleY / m$scaleX, clip = "off")
  }
  if (faceted) {
    panels <- object$panels
    titles <- stats::setNames(
      paste0(
        panels$panel, panels$key,
        ifelse(nzchar(panels$range), paste0("\n", panels$range), "")
      ),
      panels$panel
    )
    p <- p + ggplot2::facet_wrap(
      ggplot2::vars(panel),
      ncol = ncol,
      labeller = ggplot2::as_labeller(titles)
    )
  }
  if (m$referenceAxis) {
    p <- p +
      ggplot2::scale_x_continuous(
        name = m$referenceName,
        labels = function(x) format(x, big.mark = ",", scientific = FALSE, trim = TRUE)
      ) +
      ggplot2::theme(
        axis.text.x = ggplot2::element_text(size = 9, colour = "grey30"),
        axis.ticks.x = ggplot2::element_line(colour = "grey60"),
        axis.ticks.length.x = grid::unit(3, "pt"),
        axis.title.x = ggplot2::element_text(size = 10, margin = ggplot2::margin(t = 4)),
        axis.line.x = ggplot2::element_line(colour = "grey60")
      )
  }
  if (nrow(object$rows)) {
    p <- p +
      ggplot2::scale_y_continuous(
        name = NULL, breaks = object$rows$y, labels = object$rows$label
      ) +
      ggplot2::theme(
        axis.text.y = ggplot2::element_text(
          size = 9, colour = "grey20", hjust = 1, margin = ggplot2::margin(r = 6)
        )
      )
  }
  if (keyed) {
    class(p) <- c("bandage_plot", class(p))
  }
  p
}

#' @exportS3Method ggplot2::ggplot_build
ggplot_build.bandage_plot <- function(plot, ...) {
  built <- NextMethod()
  class(built) <- c("bandage_built", class(built))
  built
}

#' @exportS3Method ggplot2::ggplot_gtable
ggplot_gtable.bandage_built <- function(data) pinned_top_left(NextMethod())

#' @exportS3Method patchwork::plot_table
plot_table.bandage_plot <- function(x, guides) {
  class(x) <- setdiff(class(x), "bandage_plot")
  NextMethod()
}

pinned_top_left <- function(gt) {
  if (!isTRUE(gt$respect)) {
    return(gt)
  }
  panels <- gt$layout[startsWith(gt$layout$name, "panel"), ]
  around <- gt$layout$l < min(panels$l) & gt$layout$r > max(panels$r)
  gt <- gtable::gtable_add_cols(gt, grid::unit(1e-6, "null"), 1)
  gt <- gtable::gtable_add_cols(gt, grid::unit(1e-6, "null"), ncol(gt) - 1)
  gt <- gtable::gtable_add_rows(gt, grid::unit(1e-6, "null"), nrow(gt) - 1)
  gt$layout$l[around] <- pmin(gt$layout$l[around], 2)
  gt$layout$r[around] <- pmax(gt$layout$r[around], ncol(gt) - 1)
  respect <- matrix(0L, nrow(gt), ncol(gt))
  respect[cbind(panels$t, panels$l + 1)] <- 1L
  gt$respect <- respect
  gt
}

#' A walk lifted by pass, along its own length
#'
#' A bar for each walk a layout lifts with `color = list(field = "pass")`, in
#' the walk's own colour, each stretch on a node it steps again in the colour
#' of the pass it is on. Over the bar, a line over each of a pass's stretches,
#' a dotted hairline joining them, and the pass's name, with the bp it steps
#' again, over its longest stretch where it does not run into a name already
#' written along a bar as wide as the layout's `width`, as bandage-core's
#' figure draws it. Stack it under the layout's plot with patchwork, as
#' `autoplot(g) / bandage_pass_bar(g)`.
#' @param layout a `bandage_layout` that lifts a walk by pass
#' @return a ggplot
#' @export
bandage_pass_bar <- function(layout) {
  passes <- layout$passes
  if (!nrow(passes)) {
    stop(
      'the layout lifts no walk that steps a node again by pass; lift one as list(walk = , color = list(field = "pass"))',
      call. = FALSE
    )
  }
  walks <- unique(passes$walk)
  key <- layout$keys[match(walks, layout$keys$walk), ]
  bp <- key$end - key$start
  unit <- axis_unit(max(bp))
  at <- function(walk) length(walks) + 1 - match(walk, walks)
  bp_per_px <- max(bp) / (layout$meta$width - 2 * PASS_BAR_SIDE_PX)
  runs <- joined_runs(layout$pass_runs, bp_per_px)
  marks <- pass_marks(layout$pass_runs, passes, bp, walks, bp_per_px)
  half <- 0.18
  rise <- half + 0.12
  leg <- 0.08
  ggplot2::ggplot() +
    ggplot2::geom_rect(
      data = data.frame(y = at(walks), bp = bp, colour = key$stops),
      ggplot2::aes(xmin = 0, xmax = bp, ymin = y - half, ymax = y + half, fill = I(colour))
    ) +
    ggplot2::geom_rect(
      data = data.frame(runs, y = at(runs$walk)),
      ggplot2::aes(xmin = start, xmax = end, ymin = y - half, ymax = y + half, fill = I(color))
    ) +
    ggplot2::geom_segment(
      data = data.frame(marks$between, y = at(marks$between$walk) + rise + leg),
      ggplot2::aes(x = start, xend = end, y = y, yend = y, colour = I(color)),
      linewidth = px_linewidth(0.75), linetype = "12"
    ) +
    ggplot2::geom_path(
      data = data.frame(
        x = c(rbind(marks$own$start, marks$own$start, marks$own$end, marks$own$end)),
        y = rep(at(marks$own$walk), each = 4) + rise + c(0, leg, leg, 0),
        id = rep(seq_len(nrow(marks$own)), each = 4),
        colour = rep(marks$own$color, each = 4)
      ),
      ggplot2::aes(x = x, y = y, group = id, colour = I(colour)),
      linewidth = px_linewidth(1.5)
    ) +
    ggplot2::geom_text(
      data = data.frame(marks$names, y = at(marks$names$walk)),
      ggplot2::aes(x = x, y = y + rise + leg + 0.06, label = text, colour = I(color)),
      size = 3, fontface = "bold", vjust = 0
    ) +
    ggplot2::scale_x_continuous(
      paste(unit$name, "along", if (length(walks) == 1) walks else "each walk"),
      labels = function(x) format(x / unit$bp, big.mark = ",", scientific = FALSE, trim = TRUE),
      expand = ggplot2::expansion(mult = 0.01)
    ) +
    ggplot2::scale_y_continuous(
      NULL,
      breaks = if (length(walks) > 1) at(walks) else NULL, labels = if (length(walks) > 1) walks else NULL,
      limits = c(1 - half - 0.05, length(walks) + rise + 0.45), expand = c(0, 0)
    ) +
    ggplot2::coord_cartesian(clip = "off") +
    ggplot2::theme_minimal(base_size = 10) +
    ggplot2::theme(
      plot.background = ggplot2::element_rect(fill = "white", colour = NA),
      panel.grid = ggplot2::element_blank(),
      axis.title.x = ggplot2::element_text(size = 9, colour = "grey30")
    )
}

# The bar runs the layout's width less this at each side, as bandage-core's
# does, which measures its names and joins in px along it
PASS_BAR_SIDE_PX <- 12
# a name's px a letter, in the bar's 11 px type
PASS_NAME_CHAR_PX <- 6.2

# Each pass's own stretches, those a hair apart as one; the gaps between
# them, dotted; and the pass's name over its longest stretch, kept inside the
# bar and left off where it would run into a name already placed, the passes
# in order
pass_marks <- function(runs, passes, bp, walks, bp_per_px) {
  own <- joined_runs(runs[order(match(runs$walk, walks), runs$pass, runs$start), ], bp_per_px)
  same <- own$walk[-1] == own$walk[-nrow(own)] & own$pass[-1] == own$pass[-nrow(own)]
  between <- data.frame(
    walk = own$walk[-1][same], color = own$color[-1][same],
    start = own$end[-nrow(own)][same], end = own$start[-1][same]
  )
  named <- data.frame(walk = character(), text = character(), color = character(), x = numeric(), half = numeric())
  for (i in seq_len(nrow(passes))) {
    mine <- own[own$walk == passes$walk[i] & own$pass == passes$pass[i], ]
    if (nrow(mine)) {
      longest <- which.max(mine$end - mine$start)
      half <- (nchar(passes$text[i]) * PASS_NAME_CHAR_PX / 2 + 2) * bp_per_px
      x <- min(max((mine$start[longest] + mine$end[longest]) / 2, half), bp[match(passes$walk[i], walks)] - half)
      placed <- named[named$walk == passes$walk[i], ]
      if (all(x + half <= placed$x - placed$half | x - half >= placed$x + placed$half)) {
        named[nrow(named) + 1, ] <- list(passes$walk[i], passes$text[i], passes$color[i], x, half)
      }
    }
  }
  list(own = own, between = between, names = named)
}

# Stretches of one walk and pass nearer than `gap` bp as one, so the hairline
# between two neighbouring nodes does not show the bar under them
joined_runs <- function(runs, gap) {
  parts <- c(
    TRUE,
    runs$walk[-1] != runs$walk[-nrow(runs)] | runs$pass[-1] != runs$pass[-nrow(runs)] |
      runs$start[-1] - runs$end[-nrow(runs)] >= gap
  )
  stretch <- cumsum(parts)
  first <- !duplicated(stretch)
  data.frame(
    walk = runs$walk[first], pass = runs$pass[first], color = runs$color[first],
    start = runs$start[first], end = as.vector(tapply(runs$end, stretch, max))
  )
}
