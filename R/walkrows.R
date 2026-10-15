#' Each walk as a bar on its own bp
#'
#' The reference walk on the top row and every other walk below it, longest
#' first, each a bar of the sequence it carries through the region: blue
#' where it follows the reference's path, purple off it, and grey for what the
#' cut left out. A repeat expansion reads as bar length, which no node layout
#' shows.
#' @inheritParams bandage_layout
#' @param referencePath the reference walk, when it is not the one rank-0
#'   segments name or the first
#' @return a `bandage_walk_rows`: `rows`, a row per walk with its `label`,
#'   `bp` and `readout`, and `runs`, a row per stretch of a bar with its
#'   `xmin`, `xmax` and `kind`
#' @export
bandage_walk_rows <- function(gfa, region = NULL, haplotypes = NULL,
                              context = 1000, referencePath = NULL) {
  src <- graph_source(gfa, region, haplotypes, context)
  spec <- c(
    if (!is.null(src$region)) list(region = src$region),
    if (!is.null(referencePath)) list(referencePath = referencePath)
  )
  d <- engine()$call(
    "(text, name, spec) => JSON.stringify(bandage.walkRows(text, name, spec))",
    src$text, src$name, if (length(spec)) spec else stats::setNames(list(), character())
  )
  d <- jsonlite::fromJSON(d)
  rows <- as.data.frame(d$rows, stringsAsFactors = FALSE)
  runs <- as.data.frame(lapply(d$runs, function(col) {
    if (is.list(col)) vapply(col, function(v) if (is.null(v)) NA_real_ else v, 0) else col
  }))
  runs$xmin <- d$origin + runs$start
  runs$xmax <- runs$xmin + runs$bp
  runs$kind <- factor(
    ifelse(runs$gap, "outside the cut", ifelse(runs$onReference, "on reference", "off reference")),
    levels = names(walk_row_colours)
  )
  runs$label <- rows$label[match(runs$row, rows$row)]
  rows$xmax <- d$origin + rows$bp
  structure(
    list(rows = rows, runs = runs, origin = d$origin, reference = d$reference),
    class = "bandage_walk_rows"
  )
}

walk_row_colours <- c(
  "on reference" = "#2f8fd6",
  "off reference" = "#8e3fbf",
  "outside the cut" = "#bdbdbd"
)

#' @export
print.bandage_walk_rows <- function(x, ...) {
  cat(sprintf(
    "<bandage_walk_rows> %d walks against %s, %s bp to %s bp\n",
    nrow(x$rows), x$reference,
    format(min(x$rows$bp), big.mark = ","), format(max(x$rows$bp), big.mark = ",")
  ))
  invisible(x)
}

#' @exportS3Method ggplot2::fortify
fortify.bandage_walk_rows <- function(model, data, ...) model$runs

#' Walk rows as the Bandage view draws them
#'
#' A bar per walk on a bp axis that starts where the region does, the walk's
#' label on y and its readout past the bar's end.
#' @param object a `bandage_walk_rows`
#' @param ... unused
#' @param readouts write each bar's length and its difference from the
#'   reference past its end
#' @exportS3Method ggplot2::autoplot
autoplot.bandage_walk_rows <- function(object, ..., readouts = TRUE) {
  rows <- object$rows
  levels <- rev(rows$label)
  runs <- object$runs
  runs$label <- factor(runs$label, levels = levels)
  rows$label <- factor(rows$label, levels = levels)
  span <- max(rows$xmax) - object$origin
  p <- ggplot2::ggplot(runs) +
    ggplot2::geom_rect(
      ggplot2::aes(
        xmin = xmin, xmax = xmax, fill = kind,
        ymin = as.integer(label) - 0.35, ymax = as.integer(label) + 0.35
      )
    ) +
    ggplot2::scale_fill_manual(values = walk_row_colours, name = NULL, drop = TRUE) +
    ggplot2::scale_y_continuous(
      breaks = seq_along(levels), labels = levels, expand = ggplot2::expansion(add = 0.6)
    ) +
    ggplot2::scale_x_continuous(
      labels = function(x) format(x, big.mark = ",", scientific = FALSE, trim = TRUE),
      expand = ggplot2::expansion(mult = c(0.01, if (readouts) 0.3 else 0.02))
    ) +
    ggplot2::labs(x = NULL, y = NULL) +
    ggplot2::theme_minimal(base_size = 10) +
    ggplot2::theme(
      plot.background = ggplot2::element_rect(fill = "white", colour = NA),
      panel.grid.major.y = ggplot2::element_blank(),
      panel.grid.minor = ggplot2::element_blank(),
      legend.position = "top",
      legend.justification = "left"
    )
  if (readouts) {
    p <- p + ggplot2::geom_text(
      data = rows,
      ggplot2::aes(x = xmax + span * 0.01, y = as.integer(label), label = readout),
      hjust = 0, size = 2.8, colour = "grey25"
    )
  }
  p
}
