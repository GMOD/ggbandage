#' The graph as the Bandage view draws it
#'
#' Edges, nodes and arrowheads at the view's colours on white, the background
#' the geoms mix faded ink with, the node lengths the view writes, a panel per
#' walk when faceted, the genes pinned on the backbone, the view's key at the
#' top, and a reference bp axis under the layouts whose x is reference bp.
#' Plain links lie under the nodes and links that skip reference sequence over
#' them, so a deletion is never hidden under the nodes it skips. Every piece is
#' an ordinary ggplot2 layer, scale or theme, so `+` changes any of it.
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
    geom_bandage_edges(deletion = FALSE) +
    genes[1] +
    geom_bandage_nodes() +
    geom_bandage_edges(deletion = TRUE) +
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
        hjust = 0, lineheight = 1.1, margin = ggplot2::margin(b = 4)
      ),
      panel.spacing = grid::unit(12, "pt")
    )
  if (keyed) {
    p <- p + ggplot2::theme(legend.location = "plot")
  }
  if (!m$pixelRows) {
    p <- p + ggplot2::coord_fixed(ratio = m$scaleY / m$scaleX, clip = "off")
  }
  if (faceted && !nrow(object$rows)) {
    p <- p + ggplot2::scale_y_continuous(
      expand = ggplot2::expansion(mult = 0.05, add = c(0, 24 / m$scaleY))
    )
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
