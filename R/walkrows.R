#' Each walk as a bar on its own bp
#'
#' The reference walk on the top row and every other walk below it, each a bar
#' of the sequence it carries through the region. A repeat expansion reads as
#' bar length, which no node layout shows. [autoplot()] colours each stretch
#' of a bar by the first row down that carries it, so an extra copy has one
#' colour in every row that has it, and draws a ribbon wherever neighbouring
#' rows share sequence.
#' @inheritParams bandage_layout
#' @param referencePath the reference walk, when it is not the one rank-0
#'   segments name or the first
#' @param order `"shared"` puts each row under the one it shares the most
#'   sequence with; `"length"` puts the longest first
#' @param join bp of unshared sequence a stretch or ribbon runs across;
#'   `NULL` for 1/2000 of the longest bar
#' @return a `bandage_walk_rows`: `rows`, a row per walk with its `label`,
#'   `bp` and `readout`; `runs`, a row per stretch of a bar with its `xmin`,
#'   `xmax` and `source`, the label of the first row that carries it; and
#'   `links`, a row per ribbon from row `row` to the next, `a0`/`a1` along the
#'   upper bar and `b0`/`b1` along the lower, `b0 > b1` where the lower walks
#'   it backwards
#' @export
bandage_walk_rows <- function(gfa, region = NULL, haplotypes = NULL,
                              context = 1000, referencePath = NULL,
                              order = c("shared", "length"), join = NULL) {
  order <- match.arg(order)
  src <- graph_source(gfa, region, haplotypes, context)
  spec <- c(
    list(order = order),
    if (!is.null(src$region)) list(region = src$region),
    if (!is.null(referencePath)) list(referencePath = referencePath),
    if (!is.null(join)) list(join = join)
  )
  d <- engine()$call(
    "(text, name, spec) => JSON.stringify(bandage.walkRows(text, name, spec))",
    src$text, src$name, spec
  )
  d <- jsonlite::fromJSON(d)
  rows <- as.data.frame(d$rows, stringsAsFactors = FALSE)
  runs <- as.data.frame(d$spans)
  runs$xmin <- d$origin + runs$start
  runs$xmax <- runs$xmin + runs$bp
  runs$source <- factor(
    ifelse(runs$source < 0, "outside the cut", rows$label[runs$source + 1]),
    levels = c(rows$label, "outside the cut")
  )
  runs$label <- rows$label[runs$row + 1]
  links <- as.data.frame(d$links)
  if (nrow(links)) {
    ends <- c("a0", "a1", "b0", "b1")
    links[ends] <- links[ends] + d$origin
    links$source <- factor(rows$label[links$source + 1], levels = levels(runs$source))
  }
  rows$xmax <- d$origin + rows$bp
  structure(
    list(rows = rows, runs = runs, links = links, origin = d$origin, reference = d$reference),
    class = "bandage_walk_rows"
  )
}

# The reference recedes, and each row that first carries some sequence takes
# the next hue, top down
walk_row_colours <- function(sources, reference) {
  hues <- c(
    "#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300",
    "#6250d6", "#e34948"
  )
  rows <- setdiff(sources, c(reference, "outside the cut"))
  c(
    stats::setNames("#b3bcc6", reference),
    stats::setNames(rep_len(hues, length(rows)), rows),
    "outside the cut" = "#e4e4e4"
  )
}

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
#' label on y and its readout past the bar's end, and ribbons between
#' neighbouring bars where they share sequence.
#' @param object a `bandage_walk_rows`
#' @param ... unused
#' @param readouts write each bar's length and its difference from the
#'   reference past its end
#' @param ribbons join the stretches neighbouring rows share
#' @exportS3Method ggplot2::autoplot
autoplot.bandage_walk_rows <- function(object, ..., readouts = TRUE, ribbons = TRUE) {
  rows <- object$rows
  half <- 0.2
  y <- nrow(rows) - rows$row
  runs <- object$runs
  runs$y <- y[runs$row + 1]
  used <- levels(droplevels(runs$source))
  span <- max(rows$xmax) - object$origin
  p <- ggplot2::ggplot(runs)
  links <- object$links
  if (ribbons && nrow(links)) {
    top <- y[links$row + 1] - half
    bottom <- top - 1 + 2 * half
    ribbon <- data.frame(
      id = rep(seq_len(nrow(links)), each = 4),
      x = c(rbind(links$a0, links$a1, links$b1, links$b0)),
      y = c(rbind(top, top, bottom, bottom)),
      source = rep(links$source, each = 4)
    )
    p <- p + ggplot2::geom_polygon(
      data = ribbon,
      ggplot2::aes(x = x, y = y, group = id, fill = source),
      alpha = 0.3, colour = NA, show.legend = FALSE
    )
  }
  p <- p +
    ggplot2::geom_rect(
      ggplot2::aes(xmin = xmin, xmax = xmax, ymin = y - half, ymax = y + half, fill = source)
    ) +
    ggplot2::scale_fill_manual(
      values = walk_row_colours(used, rows$label[1]), breaks = used,
      name = "first carried by"
    ) +
    ggplot2::scale_y_continuous(
      breaks = y, labels = rows$label, expand = ggplot2::expansion(add = 0.4)
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
      legend.justification = "left",
      legend.title = ggplot2::element_text(size = 9, colour = "grey30"),
      legend.key.size = grid::unit(10, "pt")
    )
  if (readouts) {
    p <- p + ggplot2::geom_text(
      data = data.frame(x = rows$xmax + span * 0.01, y = y, label = rows$readout),
      ggplot2::aes(x = x, y = y, label = label),
      hjust = 0, size = 2.8, colour = "grey25"
    )
  }
  p
}
