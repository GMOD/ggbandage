#' Each walk as a bar on its own bp
#'
#' The reference walk on the top row and every other walk below it, each a bar
#' of the sequence it carries between the reference nodes flanking the region.
#' A repeat expansion reads as bar length, which no node layout shows. On a
#' walk file, a haplotype with no step on the reference across the window
#' draws as a stepless row under the reference's bar, its readout stating the
#' stretch of reference between its departure's ends and its own bp there.
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
#'   `bp`, `readout`, `backward`, `TRUE` where the bar reads the walk from its
#'   end, `linked`, `FALSE` for a walk measured from one flank, which gets
#'   no ribbons or letters, `stepless`, `TRUE` for a haplotype with no step on
#'   the reference across the window, whose `offReferenceBp` is its own bp
#'   between its departure's ends, and `placementChoice`, `TRUE` where an end
#'   of one of its departures lies on a node the reference passes more than
#'   once, so which pass it takes was the walk file writer's choice; `runs`, a
#'   row per stretch of a bar, `xmin` and `xmax` in bp from the left flank,
#'   with `kind` and, on the reference's path, `referenceStart` and
#'   `reversed`, and on a gap, the `cause` a walk-file cut states:
#'   `missing`, `elsewhere`, `own`, `mixed`, `unread` or `departure`, else
#'   `outside`; `causes`, the words bandage-core gives each
#'   cause, which a gap's `kind` takes. A stretch whose nodes the cut did not
#'   load has the `kind` `nodes not shown`, and its row, which ribbons and
#'   blocks leave out, ends its readout `not compared`;
#'   and `links`, a row per ribbon from row
#'   `row` to the next, `a0`/`a1` along the upper bar and `b0`/`b1` along the
#'   lower, `b0 > b1` where the lower walks it backwards; and `blocks`, a row
#'   per stretch of a block of nodes off the reference's path that two or more
#'   rows walk, `letter` A for the block with the most bp over every visit.
#'   A block counts once a stretch of it reaches 1.2% of the longest bar,
#'   wide enough to draw and letter. Which rows are drawn decides the blocks:
#'   another row can split one.
#' @export
bandage_walk_rows <- function(gfa, region = NULL, haplotypes = NULL,
                              context = NULL, referencePath = NULL,
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
    "(source, name, spec) => bandage.walkRows(source, name, spec).then(JSON.stringify)",
    src$source, src$name, spec,
    await = TRUE
  )
  d <- jsonlite::fromJSON(d)
  warn_unmatched(d)
  rows <- frame(d$rows)
  runs <- frame(d$runs)
  causes <- unlist(d$causes)
  runs$xmin <- runs$start
  runs$xmax <- runs$start + runs$bp
  not_loaded <- d$notLoaded
  kind <- ifelse(
    runs$unloaded, not_loaded$text,
    ifelse(runs$onReference, ON_PATH, OFF_PATH)
  )
  runs$kind <- factor(
    ifelse(runs$gap, causes[as.character(runs$cause)], kind),
    levels = c(ON_PATH, OFF_PATH, causes, not_loaded$text)
  )
  runs$label <- rows$label[runs$row + 1]
  rows$xmax <- rows$end
  rows$end <- NULL
  rows$readout <- paste0(
    rows$readout,
    ifelse(
      !rows$linked, paste0(PART, "no ribbons"),
      ifelse(rows$unloadedBp > 0, paste0(PART, not_loaded$notCompared), "")
    )
  )
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
      causes = causes, not_loaded = not_loaded, origin = d$origin, reference = d$reference
    ),
    class = "bandage_walk_rows"
  )
}

# Room past the longest bar for the readouts, as a share of it: 30%, or what
# the readout reaching furthest takes at about 0.7% a character, which fits a
# figure 10 in wide, up to half. A readout with less room than it needs wraps
# or is cut as it is drawn
readout_room <- function(rows, span) {
  reach <- (rows$xmax / span + 0.01 + nchar(rows$readout) * 0.007) - 1
  min(0.5, max(0.3, reach))
}

PART <- " \u00b7 "
ELLIPSIS <- "\u2026"

# A readout as it fits `room`, by `measure`: whole; or on two lines, broken
# between two of its parts where the longer line comes out shortest; or cut
# by whole parts from the end, closed with an ellipsis, as bandage-core's
# walk rows cut one, down to its total, which stands whatever the room
fit_readout <- function(text, room, measure) {
  fits <- function(lines) all(vapply(lines, measure, 0) <= room)
  if (fits(text)) {
    text
  } else {
    at <- gregexpr(paste0(PART, "|, "), text)[[1]]
    wraps <- lapply(seq_along(at)[at > 0], function(k) {
      comma <- attr(at, "match.length")[k] == 2
      c(substring(text, 1, at[k] - 1 + comma), substring(text, at[k] + attr(at, "match.length")[k]))
    })
    wraps <- Filter(fits, wraps)
    if (length(wraps)) {
      longer <- vapply(wraps, function(lines) max(vapply(lines, measure, 0)), 0)
      paste(wraps[[which.min(longer)]], collapse = "\n")
    } else {
      parts <- strsplit(text, PART, fixed = TRUE)[[1]]
      kept <- rev(seq_len(length(parts) - 1))
      total <- sub(", of which .*", "", parts[1])
      cuts <- vapply(kept, function(k) paste(c(parts[seq_len(k)], ELLIPSIS), collapse = PART), "")
      shortest <- if (total != parts[1]) {
        paste0(total, ", ", ELLIPSIS)
      } else if (length(parts) > 1) {
        paste0(total, PART, ELLIPSIS)
      } else {
        text
      }
      c(Filter(fits, cuts), shortest)[1]
    }
  }
}

GeomBandageReadout <- ggplot2::ggproto("GeomBandageReadout", ggplot2::Geom,
  required_aes = c("x", "y", "label"),
  default_aes = ggplot2::aes(colour = "grey25", size = 2.8),
  draw_key = ggplot2::draw_key_text,
  draw_panel = function(data, panel_params, coord, gap = 6) {
    if (nrow(data)) {
      grid::gTree(readouts = coord$transform(data, panel_params), gap = gap, cl = "bandage_readouts")
    } else {
      grid::nullGrob()
    }
  }
)

#' @exportS3Method grid::makeContent
makeContent.bandage_readouts <- function(x) {
  d <- x$readouts
  font <- grid::gpar(fontsize = d$size[1] * ggplot2::.pt, lineheight = 0.9)
  measure <- function(text) width_px(grid::grobWidth(grid::textGrob(text, gp = font)))
  wide <- width_px(grid::unit(1, "npc"))
  room <- wide * (1 - d$x) - x$gap
  lines <- vapply(seq_len(nrow(d)), function(i) fit_readout(d$label[i], room[i], measure), "")
  grid::setChildren(x, grid::gList(grid::textGrob(
    lines, grid::unit(d$x, "npc") + px(x$gap), grid::unit(d$y, "npc"),
    hjust = 0, gp = grid::gpar(col = d$colour, fontsize = font$fontsize, lineheight = font$lineheight)
  )))
}

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

#' Walk-row block letters, on the graph
#'
#' Letters each block that [autoplot()] letters on walk rows at the block's
#' node furthest from the middle of the drawing, so block A in the rows can be
#' found in the graph above them. Add it to the plot of a [bandage_layout()]
#' of the same graph. It finds a block's nodes on a row that reads its walk
#' forwards, so a block that only backward rows walk gets no letter.
#' @param rows a [bandage_walk_rows()] result
#' @param steps [bandage_walk_steps()] of the same graph, with the rows'
#'   haplotypes
#' @param size text size in mm
#' @export
geom_bandage_blocks <- function(rows, steps, size = 4) {
  nodes <- block_nodes(rows, steps)
  ggplot2::layer(
    geom = ggplot2::GeomLabel, stat = "identity", position = "identity",
    data = function(plot_data) block_spots(layout_of(plot_data), nodes),
    mapping = ggplot2::aes(x = x, y = y, label = letter),
    inherit.aes = FALSE, show.legend = FALSE,
    params = list(size = size, fontface = "bold", colour = "grey15", fill = "white")
  )
}

# The nodes off the reference's path under each block, read from every
# stretch of it on the first row that walks it forwards. A row's bp count from
# contigStart on its contig, and a step's from the start its piece's name
# gives, or 0
block_nodes <- function(rows, steps) {
  base <- walk_base(steps$walk)
  reference <- steps$node[base == walk_base(rows$reference)]
  forward <- rows$rows[rows$rows$linked & !rows$rows$backward, c("row", "name", "contigStart")]
  blocks <- merge(rows$blocks, forward, by = "row")
  blocks <- blocks[blocks$row == stats::ave(blocks$row, blocks$letter, FUN = min), ]
  middle <- walk_origin(steps$walk) + (steps$start + steps$end) / 2
  found <- lapply(seq_len(nrow(blocks)), function(i) {
    b <- blocks[i, ]
    x <- middle - b$contigStart
    under <- base == walk_base(b$name) & x >= b$xmin & x <= b$xmax & !(steps$node %in% reference)
    data.frame(letter = rep(b$letter, sum(under)), node = steps$node[under])
  })
  nodes <- do.call(rbind, c(list(data.frame(letter = character(), node = character())), found))
  nodes[!duplicated(nodes), ]
}

block_spots <- function(model, nodes) {
  all <- slid_back(model$nodes, model$meta, "x", "y")
  n <- merge(all, nodes, by.x = "name", by.y = "node")
  n <- n[order(-((n$x - stats::median(all$x))^2 + (n$y - stats::median(all$y))^2)), ]
  n[!duplicated(paste(n$panel, n$letter)), ]
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
  on <- pieces[pieces$kind == ON_PATH, ]
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
#' A bar per walk on an axis of bp from the left flank, in bp, kb or Mb by the
#' longest bar, the walk's label on y
#' and its readout past the bar's end. Sequence on the reference's path takes
#' the colour of the reference position it covers, so a duplicated stretch of
#' the reference shows the same colours wherever it recurs and an inverted
#' one shows them reversed. Charcoal is sequence on non-reference nodes,
#' which may still resemble the reference, as an extra repeat copy does. A
#' letter marks a block of non-reference nodes that two or more drawn rows
#' walk, the same letter wherever the block recurs, and the three largest
#' blocks are filled and the rest grey, except under `hues = "walk"`, which
#' outlines every block. A hollow grey box is a stretch whose nodes the cut
#' did not load, drawn as the graph draws its placeholder. White is sequence
#' the extracted subgraph does not hold:
#' dashed where the graph holds it outside the subgraph, and for a cut from a
#' walk file, solid dark where a departure says the graph lacks it or the
#' haplotype has no step on the reference across the window, and dotted where
#' it is the walk's own sequence the cut did not read. The readout says where
#' a walk went on nodes filed elsewhere in the file, and "placement choice"
#' where a departure's place was the walk file writer's choice. Ribbons join the graph nodes
#' neighbouring rows share, violet where one row walks them backwards. Inside
#' a repeat, the ribbons show one pairing of the copies that keeps both rows in
#' order, and a missing ribbon does not mean the rows share nothing there.
#' @param object a `bandage_walk_rows`
#' @param ... unused
#' @param readouts write each bar's length and its difference from the
#'   reference past its end. A readout longer than the room beside its bar
#'   goes onto two lines, or is cut at the end and closed with an ellipsis
#' @param ribbons join the graph nodes neighbouring rows share
#' @param hues `"viridis"`; `"bandage"` for the Bandage view's position
#'   hues, as [scale_fill_bandage_position()] draws them, to set walk rows under
#'   a layout coloured by position; or `"walk"` for each row in the colours
#'   `layout` lifts its walk in, a flat colour or a progress ramp, to set rows
#'   under walks lifted together. A ramp takes each bp of the bar the colour the
#'   drawing gives that contig position, so it starts past the ramp's first
#'   colour where the cut reaches beyond the flank. A grey
#'   strip above a row marks where its walk runs on the reference's path
#' @param layout the `bandage_layout` drawn above the rows. A row whose walk
#'   the layout lifts takes the name the layout's key gives it, and a swatch
#'   beside it where the walk is one flat colour; `hues = "walk"` takes the
#'   row's colours from there
#' @exportS3Method ggplot2::autoplot
autoplot.bandage_walk_rows <- function(object, ..., readouts = TRUE, ribbons = TRUE,
                                       hues = c("viridis", "bandage", "walk"), layout = NULL) {
  hues <- match.arg(hues)
  walk_hued <- hues == "walk"
  rows <- object$rows
  span <- max(rows$xmax)
  unit <- axis_unit(span)
  all <- bar_tiles(object$runs, span / 600)
  inks <- row_inks(rows, layout, all$row, (all$xmin + all$xmax) / 2)
  if (walk_hued && all(is.na(inks$colour))) {
    stop(
      'hues = "walk" needs a `layout` that lifts the rows\' walks in flat colours or progress ramps',
      call. = FALSE
    )
  }
  swatches <- row_swatches(rows, if (!walk_hued) layout, inks$key)
  keyed <- !is.na(inks$key)
  rows$label[keyed] <- layout$keys$walk[inks$key[keyed]]
  reference <- rows$sample[1]
  half <- 0.2
  y <- nrow(rows) - rows$row
  bar <- function(...) ggplot2::aes(xmin = xmin, xmax = xmax, ymin = y - half, ymax = y + half, ...)
  all$y <- y[all$row + 1]
  all$ink <- inks$colour
  on <- all$kind == ON_PATH
  marks <- rows_key(reference, object$causes, object$not_loaded, walk_hued)

  tiles <- all[on | (walk_hued & all$kind == OFF_PATH), ]
  tiles$fill <- ifelse(is.na(tiles$ink), "#9A9A9A", tiles$ink)
  plain <- tile_stretches(all[!on, ], which(!on))
  plain$key <- ifelse(
    plain$kind == object$causes[["elsewhere"]], object$causes[["outside"]],
    ifelse(plain$kind %in% names(marks$fill), plain$kind, marks$off)
  )
  plain$fill <- ifelse(walk_hued & plain$key == marks$off, NA, marks$fill[plain$key])

  blocks <- object$blocks
  blocks$y <- y[blocks$row + 1]
  fills <- if (walk_hued) character() else c("#d4785f", "#d9a94e", "#c98aa3")
  filled <- blocks[blocks$block < length(fills), ]
  filled$letter <- factor(filled$letter, levels = block_letters(seq_along(fills) - 1))
  others <- blocks[blocks$block >= length(fills), ]
  others$key <- rep(marks$more, nrow(others))
  lettered <- blocks[blocks$bp >= span * letter_share, ]

  links <- if (ribbons) object$links else object$links[0, ]
  shown <- intersect(names(marks$fill), c(plain$key, ribbon_key(links), others$key))
  strips <- all[walk_hued & on & all$row > 0 & marks$off %in% shown, c("row", "y", "xmin", "xmax")]
  rise <- if (nrow(strips)) STRIP_GAP + STRIP_HEIGHT else 0

  title <- paste(reference, "position, Mb")
  position_fill <- if (walk_hued) {
    NULL
  } else if (hues == "bandage") {
    scale_fill_bandage_position(title)
  } else {
    position_scale(ggplot2::scale_fill_viridis_c, title)
  }
  outline <- if (length(shown)) {
    ggplot2::scale_colour_manual(
      NULL,
      values = marks$outline, breaks = shown,
      guide = ggplot2::guide_legend(
        order = 2, nrow = if (length(shown) > 4) 2, byrow = TRUE, override.aes = list(
          fill = unname(marks$fill[shown]), linewidth = 0.25, linetype = unname(marks$dash[shown])
        )
      )
    )
  }
  ribbon_layer <- if (nrow(links)) {
    ggplot2::geom_polygon(
      data = ribbon_corners(links, y, half, rise),
      ggplot2::aes(x = x, y = y, group = id, colour = key, fill = I(marks$fill[key])),
      linewidth = 0.1
    )
  }
  swatch_layer <- if (nrow(swatches)) {
    ggplot2::geom_rect(
      data = data.frame(swatches, y = y[swatches$row + 1]),
      ggplot2::aes(
        xmin = -span * 0.035, xmax = -span * 0.012,
        ymin = y - half, ymax = y + half, fill = I(colour)
      )
    )
  }
  readout_layer <- if (readouts) {
    ggplot2::layer(
      geom = GeomBandageReadout, stat = "identity", position = "identity",
      data = data.frame(x = rows$xmax, y = y, label = rows$readout),
      mapping = ggplot2::aes(x = x, y = y, label = label),
      inherit.aes = FALSE, show.legend = FALSE
    )
  }
  ggplot2::ggplot() +
    ribbon_layer +
    ggplot2::geom_rect(data = tiles, if (walk_hued) bar(fill = I(fill)) else bar(fill = position)) +
    ggplot2::geom_rect(
      data = strips,
      ggplot2::aes(xmin = xmin, xmax = xmax, ymin = y + half + STRIP_GAP, ymax = y + half + rise),
      fill = STRIP_FILL
    ) +
    ggplot2::geom_rect(
      data = plain, bar(colour = key, fill = I(fill), linetype = I(marks$dash[key])),
      linewidth = 0.25
    ) +
    ggplot2::geom_rect(data = others, bar(colour = key), fill = marks$fill[[marks$more]], linewidth = 0.25) +
    ggplot2::geom_rect(data = filled, bar(alpha = letter, fill = I(fills[block + 1]))) +
    ggplot2::geom_text(
      data = lettered,
      ggplot2::aes(x = (xmin + xmax) / 2, y = y, label = letter, colour = I("grey10")),
      size = 2.6, fontface = "bold", show.legend = FALSE
    ) +
    ggplot2::scale_alpha_manual(
      paste("blocks off the", reference, "path that several rows walk:"),
      values = rep(1, length(fills)), drop = TRUE,
      guide = ggplot2::guide_legend(
        order = 3, override.aes = list(fill = fills[seq_along(levels(droplevels(filled$letter)))])
      )
    ) +
    position_fill +
    outline +
    ggplot2::scale_y_continuous(
      breaks = y, labels = rows$label, expand = ggplot2::expansion(add = 0.4)
    ) +
    ggplot2::scale_x_continuous(
      paste(unit$name, "from the left flank"),
      labels = function(x) format(x / unit$bp, big.mark = ",", scientific = FALSE, trim = TRUE),
      expand = ggplot2::expansion(
        mult = c(if (nrow(swatches)) 0.045 else 0.01, if (readouts) readout_room(rows, span) else 0.02)
      )
    ) +
    ggplot2::labs(y = NULL) +
    ggplot2::coord_cartesian(clip = "off") +
    rows_theme() +
    swatch_layer +
    readout_layer
}

ON_PATH <- "on the reference's path"
OFF_PATH <- "off the reference's path"
RIBBON <- "ribbon: next row walks the same nodes"
INVERTED <- "ribbon: next row walks them backwards"

# Neighbouring tiles of one row and kind as one stretch. `at` is each tile's
# place among all the bars' tiles, so a tile left out between two parts them
tile_stretches <- function(tiles, at) {
  parts <- diff(at) != 1 | diff(tiles$row) != 0 | diff(as.integer(tiles$kind)) != 0
  stretch <- cumsum(c(TRUE, parts))[seq_len(nrow(tiles))]
  data.frame(
    row = tapply(tiles$row, stretch, `[`, 1),
    y = tapply(tiles$y, stretch, `[`, 1),
    xmin = tapply(tiles$xmin, stretch, min),
    xmax = tapply(tiles$xmax, stretch, max),
    kind = tapply(as.character(tiles$kind), stretch, `[`, 1)
  )
}

# The rows' key in the order it is drawn, as each entry's `fill`, `outline`
# and `dash` by its label. `off` names sequence off the reference's path, or
# under walk hues the grey strip over sequence on it, and `more` the shared
# blocks past the filled ones
rows_key <- function(reference, causes, not_loaded, walk_hued) {
  off <- paste(if (walk_hued) "grey above: on the" else "off the", reference, "path")
  more <- if (walk_hued) "outlined: a block several rows walk" else "more shared blocks"
  entry <- function(label, fill, outline, dash = "solid") data.frame(label, fill, outline, dash)
  entries <- rbind(
    entry(off, if (walk_hued) STRIP_FILL else CHARCOAL, if (walk_hued) NA else CHARCOAL),
    entry(causes[["outside"]], "white", "#9a9a9a", "22"),
    entry(causes[["missing"]], "white", "#6e6e6e"),
    entry(causes[["departure"]], "white", "#6e6e6e"),
    entry(causes[["own"]], "white", "#9a9a9a", "12"),
    entry(causes[["mixed"]], "white", "#6e6e6e", "12"),
    entry(causes[["unread"]], "white", "#6e6e6e", "22"),
    entry(not_loaded$text, not_loaded$fill, not_loaded$rim),
    entry(RIBBON, "#cfe0f2", "#cfe0f2"),
    entry(INVERTED, "#b9abdb", "#b9abdb"),
    entry(more, if (walk_hued) NA else "#e8e8e8", "#7a7a7a")
  )
  by_label <- function(column) stats::setNames(entries[[column]], entries$label)
  list(off = off, more = more, fill = by_label("fill"), outline = by_label("outline"), dash = by_label("dash"))
}

ribbon_key <- function(links) ifelse(links$b0 > links$b1, INVERTED, RIBBON)

# Each ribbon's four corners, from the foot of its upper bar to the top of the
# lower one, `rise` higher where the lower bar carries a strip
ribbon_corners <- function(links, y, half, rise) {
  top <- y[links$row + 1] - half
  bottom <- top - 1 + 2 * half + rise
  data.frame(
    id = rep(seq_len(nrow(links)), each = 4),
    x = c(rbind(links$a0, links$a1, links$b1, links$b0)),
    y = c(rbind(top, top, bottom, bottom)),
    key = rep(ribbon_key(links), each = 4)
  )
}

rows_theme <- function() {
  list(
    ggplot2::theme_minimal(base_size = 10),
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
  )
}

# The unit an axis `span` bp long counts in
axis_unit <- function(span) {
  if (span < 2000) {
    list(name = "bp", bp = 1)
  } else if (span < 2e6) {
    list(name = "kb", bp = 1000)
  } else {
    list(name = "Mb", bp = 1e6)
  }
}

STRIP_FILL <- "#8c8c8c"
STRIP_GAP <- 0.03
STRIP_HEIGHT <- 0.06

# A swatch beside each row whose walk the layout lifts in one flat colour
row_swatches <- function(rows, layout, key = row_inks(rows, layout)$key) {
  keyed <- !is.na(key) & !is.null(layout$keys)
  colour <- rep("", nrow(rows))
  colour[keyed] <- layout$keys$color[key[keyed]]
  data.frame(row = rows$row, colour = colour)[nzchar(colour), ]
}

# Columns as JSON, a missing value as null, for bandage-core's tables
columns_json <- function(x) {
  V8::JS(jsonlite::toJSON(x, dataframe = "columns", na = "null", digits = NA))
}

# Which key names each row's walk, `key`, and the colour bandage-core's walk
# rows give `x` bp along bar `row`, `colour`: the lifted walk's flat colour,
# or its progress ramp at the contig position `x` covers, NA on a row no
# lifted walk inks
row_inks <- function(rows, layout, row = integer(), x = numeric()) {
  inks <- if (is.null(layout$keys)) {
    list(key = NULL, color = NULL)
  } else {
    engine()$call(
      "bandage.walkRowInks",
      columns_json(layout$keys[c("name", "stops", "field", "contig", "start", "end")]),
      columns_json(rows[c("name", "bp", "contig", "contigStart", "backward")]),
      columns_json(data.frame(row = row, offset = x))
    )
  }
  list(
    key = if (length(inks$key)) as.integer(inks$key) + 1L else rep(NA_integer_, nrow(rows)),
    colour = if (length(inks$color)) as.character(inks$color) else rep(NA_character_, length(row))
  )
}
