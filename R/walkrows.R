#' Each walk as a bar on its own bp
#'
#' The reference walk on the top row and every other walk below it, each a bar
#' of the sequence it carries between the reference nodes flanking the region.
#' A repeat expansion reads as bar length, which no node layout shows.
#' @inheritParams bandage_layout
#' @param referencePath the reference walk, when it is not the one rank-0
#'   segments name or the first
#' @param order `"length"` puts the longest first; `"shared"` puts each row
#'   under the one it shares the most graph nodes with, a layout aid that says
#'   nothing about relatedness
#' @param join bp of unshared sequence a ribbon runs across; `NULL` for 1/2000
#'   of the longest bar
#' @return a `bandage_walk_rows`: `rows`, a row per walk with its `label`,
#'   `bp` and `readout`; `runs`, a row per stretch of a bar, `xmin` and `xmax`
#'   in bp from the left flank, with `kind` and, on the reference's path,
#'   `referenceStart` and `reversed`; and `links`, a row per ribbon from row
#'   `row` to the next, `a0`/`a1` along the upper bar and `b0`/`b1` along the
#'   lower, `b0 > b1` where the lower walks it backwards; and `blocks`, a row
#'   per stretch of a block of nodes off the reference's path that two or more
#'   rows walk, `letter` A for the block with the most bp over every visit.
#'   Which rows are drawn decides the blocks: another row can split one.
#' @export
bandage_walk_rows <- function(gfa, region = NULL, haplotypes = NULL,
                              context = 1000, referencePath = NULL,
                              order = c("length", "shared"), join = NULL) {
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
  runs <- as.data.frame(lapply(d$runs, function(col) {
    if (is.list(col)) vapply(col, function(v) if (is.null(v)) NA_real_ else v, 0) else col
  }))
  runs$xmin <- runs$start
  runs$xmax <- runs$start + runs$bp
  runs$kind <- factor(
    ifelse(runs$gap, "outside the cut", ifelse(runs$onReference, "on the reference's path", "off the reference's path")),
    levels = c("on the reference's path", "off the reference's path", "outside the cut")
  )
  runs$label <- rows$label[runs$row + 1]
  rows$xmax <- rows$bp
  blocks <- as.data.frame(d$blocks)
  blocks$xmin <- blocks$start
  blocks$xmax <- blocks$start + blocks$bp
  blocks$letter <- block_letters(blocks$block)
  structure(
    list(
      rows = rows, runs = runs, links = as.data.frame(d$links), blocks = blocks,
      origin = d$origin, reference = d$reference
    ),
    class = "bandage_walk_rows"
  )
}

block_letters <- function(i) {
  ifelse(i < 26, LETTERS[i %% 26 + 1], paste0(LETTERS[pmax(1, i %/% 26)], LETTERS[i %% 26 + 1]))
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

# Each bar as tiles `tile` bp wide, about a px, each of the kind covering
# most of it, so a SNP's allele off the path draws no sliver. A tile on the
# path takes the reference position of its longest piece: a mean of pieces
# from far apart would name a position the walk never covers there.
bar_tiles <- function(runs, tile) {
  first <- floor(runs$xmin / tile)
  n <- pmax(1, ceiling(runs$xmax / tile) - first)
  i <- rep(seq_len(nrow(runs)), n)
  at <- first[i] + sequence(n) - 1
  from <- pmax(runs$xmin[i], at * tile)
  to <- pmin(runs$xmax[i], (at + 1) * tile)
  mid <- (from + to) / 2 - runs$xmin[i]
  pieces <- data.frame(
    row = runs$row[i], at = at, bp = pmax(0, to - from), kind = runs$kind[i],
    position = runs$referenceStart[i] +
      ifelse(runs$reversed[i], runs$bp[i] - mid, mid)
  )
  pieces <- pieces[pieces$bp > 0, ]
  cover <- stats::aggregate(bp ~ row + at + kind, pieces, sum)
  cover <- cover[order(cover$row, cover$at, -cover$bp), ]
  tiles <- cover[!duplicated(cover[c("row", "at")]), c("row", "at", "kind")]
  on <- pieces[pieces$kind == "on the reference's path", ]
  on <- on[order(on$row, on$at, -on$bp), ]
  on <- on[!duplicated(on[c("row", "at")]), c("row", "at", "position")]
  tiles <- merge(tiles, on, all.x = TRUE)
  ends <- stats::aggregate(xmax ~ row, runs, max)
  tiles$xmin <- tiles$at * tile
  tiles$xmax <- pmin((tiles$at + 1) * tile, ends$xmax[match(tiles$row, ends$row)])
  tiles[order(tiles$row, tiles$at), c("row", "xmin", "xmax", "kind", "position")]
}

#' Walk rows as the Bandage view draws them
#'
#' A bar per walk on an axis of bp from the left flank, the walk's label on y
#' and its readout past the bar's end. Sequence on the reference's path takes
#' the colour of the reference position it covers, so a duplicated stretch of
#' the reference shows the same colours wherever it recurs and an inverted
#' one shows them reversed. Light grey is sequence on nodes the reference does
#' not walk, which may still resemble it, as an extra repeat copy does. A
#' letter marks a block of those nodes that two or more drawn rows walk, the
#' same letter wherever the block recurs, and the three largest blocks are
#' filled. White is contig the walk leaves the cut for. Ribbons join the
#' graph nodes neighbouring rows share, orange where one row walks them
#' backwards. Inside a repeat, the ribbons show one pairing of the copies that
#' keeps both rows in order, and a missing ribbon does not mean the rows share
#' nothing there.
#' @param object a `bandage_walk_rows`
#' @param ... unused
#' @param readouts write each bar's length and its difference from the
#'   reference past its end
#' @param ribbons join the graph nodes neighbouring rows share
#' @exportS3Method ggplot2::autoplot
autoplot.bandage_walk_rows <- function(object, ..., readouts = TRUE, ribbons = TRUE) {
  rows <- object$rows
  reference <- rows$sample[1]
  half <- 0.2
  y <- nrow(rows) - rows$row
  span <- max(rows$xmax)
  all <- bar_tiles(object$runs, span / 600)
  all$y <- y[all$row + 1]
  on <- all$kind == "on the reference's path"
  tiles <- all[on, ]
  plain <- all[!on, ]
  breaks <- diff(which(!on)) != 1 | diff(plain$row) != 0 | diff(as.integer(plain$kind)) != 0
  stretch <- cumsum(c(TRUE, breaks))[seq_len(nrow(plain))]
  plain <- data.frame(
    y = tapply(plain$y, stretch, `[`, 1),
    xmin = tapply(plain$xmin, stretch, min),
    xmax = tapply(plain$xmax, stretch, max),
    kind = tapply(as.character(plain$kind), stretch, `[`, 1)
  )
  off <- paste("on nodes", reference, "does not walk")
  plain$key <- ifelse(plain$kind == "outside the cut", "outside the cut", off)
  labels <- c(off, "outside the cut", "same graph nodes", "same nodes, inverted")
  keys <- stats::setNames(c("#e8e8e8", "white", "#d5dae1", "#f2b48e"), labels)
  outlines <- stats::setNames(c("#b5b5b5", "#9a9a9a", "#d5dae1", "#f2b48e"), labels)
  blocks <- object$blocks
  blocks$y <- y[blocks$row + 1]
  fills <- c("#b2182b", "#1a1a1a", "#f4a6c8")
  filled <- blocks[blocks$block < length(fills), ]
  filled$letter <- factor(filled$letter, levels = block_letters(seq_along(fills) - 1))
  lettered <- blocks[blocks$bp >= span * 0.012, ]

  links <- object$links
  if (!ribbons) {
    links <- links[0, ]
  }
  key <- ifelse(links$b0 > links$b1, "same nodes, inverted", "same graph nodes")
  shown <- intersect(names(keys), c(plain$key, key))
  p <- ggplot2::ggplot()
  if (nrow(links)) {
    top <- y[links$row + 1] - half
    bottom <- top - 1 + 2 * half
    p <- p + ggplot2::geom_polygon(
      data = data.frame(
        id = rep(seq_len(nrow(links)), each = 4),
        x = c(rbind(links$a0, links$a1, links$b1, links$b0)),
        y = c(rbind(top, top, bottom, bottom)),
        key = rep(key, each = 4)
      ),
      ggplot2::aes(x = x, y = y, group = id, colour = key, fill = I(keys[key])),
      linewidth = 0.1
    )
  }
  p <- p +
    ggplot2::geom_rect(
      data = tiles,
      ggplot2::aes(xmin = xmin, xmax = xmax, ymin = y - half, ymax = y + half, fill = position)
    ) +
    ggplot2::geom_rect(
      data = plain,
      ggplot2::aes(
        xmin = xmin, xmax = xmax, ymin = y - half, ymax = y + half,
        colour = key, fill = I(keys[key])
      ),
      linewidth = 0.25
    ) +
    ggplot2::geom_rect(
      data = blocks[blocks$block >= length(fills), ],
      ggplot2::aes(xmin = xmin, xmax = xmax, ymin = y - half, ymax = y + half),
      fill = "#e8e8e8", colour = "#7a7a7a", linewidth = 0.25
    ) +
    ggplot2::geom_rect(
      data = filled,
      ggplot2::aes(
        xmin = xmin, xmax = xmax, ymin = y - half, ymax = y + half,
        alpha = letter, fill = I(fills[block + 1])
      )
    ) +
    ggplot2::geom_text(
      data = lettered,
      ggplot2::aes(
        x = (xmin + xmax) / 2, y = y, label = letter,
        colour = I(ifelse(block < 2, "white", "grey15"))
      ),
      size = 2.6, fontface = "bold", show.legend = FALSE
    ) +
    ggplot2::scale_alpha_manual(
      paste0("the same off-", reference, " nodes, wherever they recur:"),
      values = rep(1, length(fills)), drop = TRUE,
      guide = ggplot2::guide_legend(
        order = 3, override.aes = list(fill = fills[seq_along(levels(droplevels(filled$letter)))])
      )
    ) +
    ggplot2::scale_fill_viridis_c(
      paste(reference, "position, Mb"),
      n.breaks = 3,
      labels = function(x) format(x / 1e6, nsmall = 2, trim = TRUE),
      guide = ggplot2::guide_colourbar(
        order = 1, barwidth = grid::unit(120, "pt"), barheight = grid::unit(8, "pt"),
        title.position = "top"
      )
    ) +
    ggplot2::scale_colour_manual(
      NULL,
      values = outlines, breaks = shown,
      guide = ggplot2::guide_legend(
        order = 2, override.aes = list(fill = unname(keys[shown]), linewidth = 0.25)
      )
    ) +
    ggplot2::scale_y_continuous(
      breaks = y, labels = rows$label, expand = ggplot2::expansion(add = 0.4)
    ) +
    ggplot2::scale_x_continuous(
      "kb from the left flank",
      labels = function(x) format(x / 1000, big.mark = ",", scientific = FALSE, trim = TRUE),
      expand = ggplot2::expansion(mult = c(0.01, if (readouts) 0.3 else 0.02))
    ) +
    ggplot2::labs(y = NULL) +
    ggplot2::theme_minimal(base_size = 10) +
    ggplot2::theme(
      plot.background = ggplot2::element_rect(fill = "white", colour = NA),
      panel.grid.major.y = ggplot2::element_blank(),
      panel.grid.minor = ggplot2::element_blank(),
      axis.title.x = ggplot2::element_text(size = 9, colour = "grey30"),
      legend.position = "top",
      legend.justification = "left",
      legend.box = "vertical",
      legend.box.just = "left",
      legend.spacing.y = grid::unit(2, "pt"),
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
