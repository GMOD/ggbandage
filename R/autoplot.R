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
  keyed <- (nrow(object$keys) && !faceted) || ramp_keyed(object)
  genes <- if (nrow(object$genes)) geom_bandage_genes(key = if (!keyed) "exon")
  p <- ggplot2::ggplot(object) +
    geom_bandage_edges() +
    genes[1] +
    geom_bandage_nodes() +
    geom_bandage_arrows() +
    genes[2] +
    genes[3] +
    if (labels) geom_bandage_labels()
  if (nrow(object$keys)) {
    p <- p + if (faceted) geom_bandage_keys(text = FALSE) else key_guide(object)
  }
  p <- p +
    layout_key(object) +
    frequency_key(object) +
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
  if (nrow(object$keys) && !faceted) {
    p <- p + ggplot2::theme(legend.location = "plot")
  }
  if (!is.null(m$frequencyKey)) {
    p <- p + ggplot2::theme(legend.box = "vertical", legend.box.just = "left")
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
  if (nrow(object$keys) && !faceted) {
    class(p) <- c("bandage_plot", class(p))
  }
  p
}

ramp_keyed <- function(object) {
  m <- object$meta
  identical(m$colorScheme, "reference-position") && !is.null(m$referenceRamp) &&
    !nrow(object$keys)
}

# What the hues, the charcoal, the dashes and the orange mean, for a layout
# coloured by reference position; a lifted walk recolours the drawing and keys
# itself
layout_key <- function(object) {
  m <- object$meta
  if (!ramp_keyed(object)) {
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
    if (!is.null(m$deletionKey)) stats::setNames("#18181c", m$deletionKey),
    if (nrow(object$exons)) stats::setNames(EXON, "exon")
  )
  widths <- c("#3c4148" = 2.5, "#18181c" = 0.8, "#e8a200" = 2.5)[inks]
  lines <- stats::setNames(
    c("#3c4148" = "solid", "#18181c" = "22", "#e8a200" = "solid")[inks], names(inks)
  )
  guide <- ggplot2::guide_legend(
    order = 2, override.aes = list(alpha = 1, linewidth = unname(widths)),
    theme = ggplot2::theme(legend.key.width = grid::unit(30, "pt"))
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

# What a node's width means where it is as wide as its frequency
frequency_key <- function(object) {
  stops <- object$meta$frequencyKey
  if (is.null(stops)) {
    return(list())
  }
  nodes <- object$nodes
  key <- factor(rep(stops$label, each = 2), levels = stops$label)
  list(
    ggplot2::geom_path(
      ggplot2::aes(x = x, y = y, linewidth = key, group = key),
      data = data.frame(x = nodes$x[1], y = nodes$y[1], key = key),
      inherit.aes = FALSE, alpha = 0, colour = "#3c4148"
    ),
    ggplot2::scale_discrete_manual(
      "linewidth",
      name = "haplotypes passing a node",
      values = stats::setNames(px_linewidth(stops$widthPx), stops$label),
      guide = ggplot2::guide_legend(order = 3, override.aes = list(alpha = 1))
    )
  )
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
