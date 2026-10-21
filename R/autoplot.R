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
    p <- p + if (faceted) geom_bandage_keys(text = FALSE) else key_guide(object)
  }
  p <- p +
    layout_key(object) +
    ggplot2::theme_void() +
    ggplot2::theme(
      plot.background = ggplot2::element_rect(fill = "white", colour = NA),
      plot.margin = ggplot2::margin(8, 8, 8, 8),
      legend.position = "bottom",
      legend.justification = "left",
      legend.margin = ggplot2::margin(l = 20),
      legend.title = ggplot2::element_text(size = 9, colour = "grey30"),
      legend.text = ggplot2::element_text(size = 9),
      plot.caption = ggplot2::element_text(size = 8, colour = "grey30", hjust = 0),
      plot.caption.position = "plot",
      strip.text = ggplot2::element_text(
        hjust = 0, lineheight = 1.1, margin = ggplot2::margin(b = 4)
      ),
      panel.spacing = grid::unit(12, "pt")
    )
  if (!m$pixelRows) {
    p <- p + ggplot2::coord_fixed(ratio = m$scaleY / m$scaleX)
  }
  if (faceted && !nrow(object$rows)) {
    # room over each panel for its key bar, 24 px at the width it was fit to
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

# What the hues, the charcoal and the dashes mean, for a layout coloured by
# reference position; a lifted walk recolours the drawing and keys itself
layout_key <- function(object) {
  m <- object$meta
  if (!identical(m$colorScheme, "reference-position") || is.null(m$referenceRamp) ||
    nrow(object$keys)) {
    return(list())
  }
  reference <- if (is.null(m$referenceName)) "the reference" else m$referenceName
  nodes <- object$nodes
  ramp <- data.frame(
    x = nodes$x[1], y = nodes$y[1],
    position = c(m$referenceRamp$start, m$referenceRamp$end)
  )
  inks <- c(
    if (!all(nodes$backbone)) stats::setNames("#3c4148", paste("off the", reference, "path")),
    if (isTRUE(m$deletions > 0)) {
      stats::setNames("#18181c", paste(reference, "sequence a link skips"))
    }
  )
  widths <- c("#3c4148" = 2.5, "#18181c" = 0.8)[inks]
  lines <- stats::setNames(c("#3c4148" = "solid", "#18181c" = "22")[inks], names(inks))
  guide <- ggplot2::guide_legend(
    order = 2, override.aes = list(alpha = 1, linewidth = unname(widths))
  )
  revisited <- unique(nodes$node[nodes$referenceVisits > 1])
  list(
    ggplot2::geom_point(
      ggplot2::aes(x = x, y = y, fill = position),
      data = ramp, inherit.aes = FALSE, alpha = 0
    ),
    scale_fill_bandage_position(paste(reference, "position, Mb")),
    if (length(inks)) {
      list(
        ggplot2::geom_path(
          ggplot2::aes(x = x, y = y, colour = key, linetype = key, group = key),
          data = data.frame(
            x = nodes$x[1], y = nodes$y[1], key = rep(names(inks), each = 2)
          ),
          inherit.aes = FALSE, alpha = 0
        ),
        ggplot2::scale_colour_manual(NULL, values = inks, breaks = names(inks), guide = guide),
        ggplot2::scale_linetype_manual(
          NULL,
          values = lines, breaks = names(inks), guide = ggplot2::guide_legend(order = 2)
        )
      )
    },
    if (length(revisited)) {
      ggplot2::labs(caption = sprintf(
        "%s walks %s nodes more than once, and each takes its first visit's colour.\nA node walked only in a later copy takes that copy's colour",
        reference, format(length(revisited), big.mark = ",")
      ))
    }
  )
}
