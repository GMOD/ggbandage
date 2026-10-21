#' Each walk as a bar on its own bp
#'
#' The reference walk on the top row and every other walk below it, each a bar
#' of the sequence it carries between the reference nodes flanking the region.
#' A repeat expansion reads as bar length, which no node layout shows.
#' @inheritParams bandage_layout
#' @param haplotypes the walks to draw under the reference, by sample or
#'   `sample#haplotype`, every one when `NULL`. On a walk file, also the walks
#'   to cut
#' @param referencePath the reference walk, when it is not the one rank-0
#'   segments name or the first
#' @param order `"length"` puts the longest first; `"shared"` puts each row
#'   under the one it shares the most graph nodes with, a layout aid that says
#'   nothing about relatedness
#' @param join bp of unshared sequence a ribbon runs across; `NULL` for 1/2000
#'   of the longest bar
#' @return a `bandage_walk_rows`: `rows`, a row per walk with its `label`,
#'   `bp`, `readout` and `linked`, `FALSE` for a walk measured from one flank,
#'   which gets no ribbons or letters; `runs`, a row per stretch of a bar, `xmin` and `xmax`
#'   in bp from the left flank, with `kind` and, on the reference's path,
#'   `referenceStart` and `reversed`, and on a gap, the `cause` a walk file
#'   states: `missing`, `elsewhere` or `unknown`, else `outside`; and `links`, a row per ribbon from row
#'   `row` to the next, `a0`/`a1` along the upper bar and `b0`/`b1` along the
#'   lower, `b0 > b1` where the lower walks it backwards; and `blocks`, a row
#'   per stretch of a block of nodes off the reference's path that two or more
#'   rows walk, `letter` A for the block with the most bp over every visit.
#'   A block counts once a stretch of it reaches 1.2% of the longest bar,
#'   wide enough to draw and letter. Which rows are drawn decides the blocks:
#'   another row can split one.
#' @export
bandage_walk_rows <- function(gfa, region = NULL, haplotypes = NULL,
                              context = 1000, referencePath = NULL,
                              order = c("length", "shared"), join = NULL) {
  order <- match.arg(order)
  src <- graph_source(gfa, region, haplotypes, context)
  spec <- c(
    list(order = order),
    if (!is.null(src$region)) list(region = src$region),
    if (length(haplotypes)) list(haplotypes = as.list(haplotypes)),
    if (!is.null(referencePath)) list(referencePath = referencePath),
    if (!is.null(join)) list(join = join)
  )
  d <- engine()$call(
    "(text, name, spec) => JSON.stringify(bandage.walkRows(text, name, spec))",
    src$text, src$name, spec
  )
  d <- jsonlite::fromJSON(d)
  rows <- frame(d$rows)
  runs <- frame(d$runs)
  runs$xmin <- runs$start
  runs$xmax <- runs$start + runs$bp
  kind <- ifelse(runs$onReference, "on the reference's path", "off the reference's path")
  runs$kind <- factor(
    ifelse(runs$gap, gap_kinds[as.character(runs$cause)], kind),
    levels = c("on the reference's path", "off the reference's path", gap_kinds)
  )
  runs$label <- rows$label[runs$row + 1]
  rows$xmax <- rows$bp
  rows$readout <- ifelse(rows$linked, rows$readout, paste(rows$readout, "\u00b7 no ribbons"))
  blocks <- frame(d$blocks)
  big <- sort(unique(blocks$block[blocks$bp >= max(rows$bp) * letter_share]))
  blocks <- blocks[blocks$block %in% big, ]
  blocks$block <- match(blocks$block, big) - 1
  blocks$xmin <- blocks$start
  blocks$xmax <- blocks$start + blocks$bp
  blocks$letter <- block_letters(blocks$block)
  structure(
    list(
      rows = rows, runs = runs, links = frame(d$links), blocks = blocks,
      origin = d$origin, reference = d$reference
    ),
    class = "bandage_walk_rows"
  )
}

# What a walk file's cut says of a gap between two pieces of a walk, and
# "outside" for a gap from another source, which says nothing
gap_kinds <- c(
  missing = "not in the graph",
  elsewhere = "on nodes filed elsewhere",
  unknown = "gap, cause unknown",
  outside = "outside the extracted subgraph"
)

# the share of the longest bar a block's stretch needs to be drawn and lettered
letter_share <- 0.012

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
#' one shows them reversed. Charcoal is sequence on non-reference nodes,
#' which may still resemble the reference, as an extra repeat copy does. A
#' letter marks a block of non-reference nodes that two or more drawn rows
#' walk, the same letter wherever the block recurs, and the three largest
#' blocks are filled. White is sequence the extracted subgraph does not hold:
#' dashed where the graph holds it outside the subgraph, and for a cut from a
#' walk file, solid dark where a record break says the graph lacks it and
#' dotted where the file leaves it open. The readout says where a walk went
#' on nodes filed elsewhere in the file. Ribbons join the graph nodes
#' neighbouring rows share, violet where one row walks them backwards. Inside a repeat, the ribbons show one pairing of the copies that
#' keeps both rows in order, and a missing ribbon does not mean the rows share
#' nothing there.
#' @param object a `bandage_walk_rows`
#' @param ... unused
#' @param readouts write each bar's length and its difference from the
#'   reference past its end
#' @param ribbons join the graph nodes neighbouring rows share
#' @param hues `"viridis"`, or `"bandage"` for the Bandage view's position
#'   hues, as [scale_fill_bandage_position()] draws them, to set walk rows under
#'   a layout
#' @param layout the `bandage_layout` drawn over the rows: each row its walks
#'   lift in one flat colour gets a swatch of that colour beside its name
#' @exportS3Method ggplot2::autoplot
autoplot.bandage_walk_rows <- function(object, ..., readouts = TRUE, ribbons = TRUE,
                                       hues = c("viridis", "bandage"), layout = NULL) {
  hues <- match.arg(hues)
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
  off <- paste("off the", reference, "path")
  ribbon <- "ribbon: next row walks the same nodes"
  inverted <- "ribbon: next row walks them backwards"
  # a gap draws by whether the graph holds it, and the readout says where an
  # elsewhere part went
  plain$key <- ifelse(
    plain$kind == gap_kinds[["elsewhere"]], gap_kinds[["outside"]],
    ifelse(plain$kind %in% gap_kinds, plain$kind, off)
  )
  labels <- c(off, gap_kinds[c("outside", "missing", "unknown")], ribbon, inverted)
  keys <- stats::setNames(c("#3c4148", rep("white", 3), "#cfe0f2", "#b9abdb"), labels)
  outlines <- stats::setNames(
    c("#3c4148", "#9a9a9a", "#6e6e6e", "#9a9a9a", "#cfe0f2", "#b9abdb"), labels
  )
  dashes <- stats::setNames(c("solid", "22", "solid", "12", "solid", "solid"), labels)
  blocks <- object$blocks
  blocks$y <- y[blocks$row + 1]
  fills <- c("#d4785f", "#d9a94e", "#c98aa3")
  filled <- blocks[blocks$block < length(fills), ]
  filled$letter <- factor(filled$letter, levels = block_letters(seq_along(fills) - 1))
  lettered <- blocks[blocks$bp >= span * letter_share, ]

  links <- object$links
  if (!ribbons) {
    links <- links[0, ]
  }
  key <- ifelse(links$b0 > links$b1, inverted, ribbon)
  shown <- intersect(names(keys), c(plain$key, key))
  title <- paste(reference, "position, Mb")
  fill <- if (hues == "bandage") {
    scale_fill_bandage_position(title)
  } else {
    position_scale(ggplot2::scale_fill_viridis_c, title)
  }
  swatches <- row_swatches(rows, layout)
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
        colour = key, fill = I(keys[key]), linetype = I(dashes[key])
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
        colour = I("grey10")
      ),
      size = 2.6, fontface = "bold", show.legend = FALSE
    ) +
    ggplot2::scale_alpha_manual(
      paste("blocks off the", reference, "path that several rows walk:"),
      values = rep(1, length(fills)), drop = TRUE,
      guide = ggplot2::guide_legend(
        order = 3, override.aes = list(fill = fills[seq_along(levels(droplevels(filled$letter)))])
      )
    ) +
    fill +
    ggplot2::scale_colour_manual(
      NULL,
      values = outlines, breaks = shown,
      guide = ggplot2::guide_legend(
        order = 2, override.aes = list(
          fill = unname(keys[shown]), linewidth = 0.25, linetype = unname(dashes[shown])
        )
      )
    ) +
    ggplot2::scale_y_continuous(
      breaks = y, labels = rows$label, expand = ggplot2::expansion(add = 0.4)
    ) +
    ggplot2::scale_x_continuous(
      "kb from the left flank",
      labels = function(x) format(x / 1000, big.mark = ",", scientific = FALSE, trim = TRUE),
      expand = ggplot2::expansion(
        mult = c(if (nrow(swatches)) 0.045 else 0.01, if (readouts) 0.3 else 0.02)
      )
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
  if (nrow(swatches)) {
    p <- p + ggplot2::geom_rect(
      data = data.frame(swatches, y = y[swatches$row + 1]),
      ggplot2::aes(
        xmin = -span * 0.035, xmax = -span * 0.012,
        ymin = y - half, ymax = y + half, fill = I(colour)
      )
    )
  }
  if (readouts) {
    p <- p + ggplot2::geom_text(
      data = data.frame(x = rows$xmax + span * 0.01, y = y, label = rows$readout),
      ggplot2::aes(x = x, y = y, label = label),
      hjust = 0, size = 2.8, colour = "grey25"
    )
  }
  p
}

# The flat colour `layout` lifts each row's walk in, by name or by the walk
# the name's range was cut from
row_swatches <- function(rows, layout) {
  keys <- layout$keys
  if (is.null(keys$color)) {
    return(data.frame(row = integer(), colour = character()))
  }
  keys <- keys[nzchar(keys$color), ]
  origin <- function(name) sub(":[0-9]+-[0-9]+$", "", name)
  at <- match(rows$name, keys$name)
  at[is.na(at)] <- match(origin(rows$name), origin(keys$name))[is.na(at)]
  data.frame(row = rows$row, colour = keys$color[at])[!is.na(at), ]
}
