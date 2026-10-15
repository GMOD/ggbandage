#' The graph as the Bandage view draws it
#'
#' Edges, nodes and arrowheads at the view's colours on white, the background
#' the geoms mix faded ink with, each lifted walk's colour bar, a panel per
#' walk when faceted, the genes pinned on the backbone, and a reference bp axis
#' under the layouts whose x is reference bp. Every piece is an ordinary
#' ggplot2 layer, scale or theme, so `+` changes any of it.
#' @param object a `bandage_layout`
#' @param ... unused
#' @param ncol panels across, for a faceted layout
#' @param labels name each node, with [geom_bandage_labels()]
#' @exportS3Method ggplot2::autoplot
autoplot.bandage_layout <- function(object, ..., ncol = NULL, labels = FALSE) {
  m <- object$meta
  faceted <- nrow(object$panels) > 1
  genes <- if (nrow(object$genes)) geom_bandage_genes()
  p <- ggplot2::ggplot(object) +
    geom_bandage_edges() +
    genes[1] +
    geom_bandage_nodes() +
    geom_bandage_arrows() +
    genes[2] +
    if (labels) geom_bandage_labels()
  if (nrow(object$keys)) {
    p <- p + geom_bandage_keys(text = !faceted)
  }
  p <- p +
    ggplot2::theme_void() +
    ggplot2::theme(
      plot.background = ggplot2::element_rect(fill = "white", colour = NA),
      plot.margin = ggplot2::margin(8, 8, 8, 8),
      strip.text = ggplot2::element_text(
        hjust = 0, lineheight = 1.1, margin = ggplot2::margin(b = 4)
      ),
      panel.spacing = grid::unit(12, "pt")
    )
  if (!m$pixelRows) {
    p <- p + ggplot2::coord_fixed(ratio = m$scaleY / m$scaleX)
  }
  if (nrow(object$keys) && !nrow(object$rows)) {
    # room over the drawing for the key bars, 24 px at the width it was fit to
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
  p
}
