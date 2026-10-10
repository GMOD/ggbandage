#' The graph as the Bandage view draws it
#'
#' Edges, nodes and arrowheads at the view's colours, a panel per lifted walk,
#' and a reference bp axis under the layouts whose x is reference bp. Every
#' piece is an ordinary ggplot2 layer, scale or theme, so `+` changes any of
#' it.
#' @param object a `bandage_layout`
#' @param ... unused
#' @param ncol panels across, for a faceted layout
#' @exportS3Method ggplot2::autoplot
autoplot.bandage_layout <- function(object, ..., ncol = NULL) {
  m <- object$meta
  p <- ggplot2::ggplot(object) +
    geom_bandage_edges() +
    geom_bandage_nodes() +
    geom_bandage_arrows() +
    ggplot2::theme_void(base_size = 11) +
    ggplot2::theme(
      plot.margin = ggplot2::margin(8, 8, 8, 8),
      strip.text = ggplot2::element_text(
        hjust = 0, lineheight = 1.1, margin = ggplot2::margin(b = 4)
      ),
      panel.spacing = grid::unit(12, "pt")
    )
  if (!m$pixelRows) {
    p <- p + ggplot2::coord_fixed(ratio = m$scaleY / m$scaleX)
  }
  if (nrow(object$panels) > 1) {
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
