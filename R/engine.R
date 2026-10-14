engine <- local({
  ctx <- NULL
  function() {
    if (is.null(ctx)) {
      fresh <- V8::v8()
      fresh$source(system.file("js", "bandage.js", package = "ggbandage"))
      ctx <<- fresh
    }
    ctx
  }
})

read_gfa <- function(path) {
  if (is_url(path)) {
    local <- tempfile()
    on.exit(unlink(local))
    writeBin(url_range(path, 0, -1), local)
    path <- local
  }
  con <- gzfile(path)
  on.exit(close(con), add = TRUE, after = FALSE)
  paste(readLines(con, warn = FALSE), collapse = "\n")
}

#' Lay out a GFA graph with the Bandage engine
#'
#' @param gfa path or URL of a GFA file, plain or gzipped, or of a
#'   gfa-to-tabix index: the `.graph.json` manifest, a `.segs.bed.gz` file, or
#'   the prefix of a local pair. An index needs `region`
#' @param layout `"force"`, `"auto"`, `"ordered"` or `"samplerows"`
#' @param walks walk (P/W line) names to lift out of the drawing
#' @param facet `"walk"` for a panel per walk
#' @param width the width in px the drawing is fit to, which decides whether
#'   strand arrows show
#' @param region a locus such as `"GRCh38#0#chr6:31,000,000-31,100,000"`. On
#'   an index, the part of the graph under it, fetched by range request; on a
#'   GFA, the region the core crops to
#' @param ... other figure spec fields, such as `referencePath`,
#'   `colorScheme`, `nodeWidth`, `contigThickness`, `quality`, `engine`
#' @export
bandage_layout <- function(gfa, layout = "force", walks = NULL, facet = NULL,
                           width = 1000, region = NULL, ...) {
  if (grepl("\\.walks\\.bed\\.gz$", gfa)) {
    stop("a gfa-to-tabix --walks file is not read yet", call. = FALSE)
  }
  tabix <- is_tabix_graph(gfa)
  if (tabix && is.null(region)) {
    stop("an index holds a whole genome's graph; give the `region` to draw")
  }
  spec <- c(
    list(layout = layout, width = width),
    if (!tabix && !is.null(region)) list(region = region),
    if (length(walks)) list(walks = as.list(walks)),
    if (!is.null(facet)) list(facet = facet),
    list(...)
  )
  ctx <- engine()
  ctx$assign("gfaText", if (tabix) cut_tabix(ctx, gfa, region) else read_gfa(gfa))
  ctx$assign("gfaName", if (tabix) region else basename(gfa))
  ctx$assign("spec", spec)
  on.exit(ctx$eval("gfaText = null"))
  json <- ctx$eval(
    "bandage.gfaFigureData(gfaText, gfaName, spec).then(JSON.stringify)",
    await = TRUE
  )
  as_bandage_layout(jsonlite::fromJSON(json))
}

cut_tabix <- function(ctx, index, region) {
  ctx$assign("cut", c(tabix_files(index), parse_region(region)))
  ctx$eval("bandage.cutTabix(cut)", await = TRUE)
}

# y down, as on screen, becomes y up, and the panels become a factor in the
# order the core placed them
as_bandage_layout <- function(d) {
  frame <- function(x) {
    cols <- lapply(x, function(col) if (length(col)) unlist(col) else numeric())
    as.data.frame(cols, stringsAsFactors = FALSE)
  }
  panels <- frame(d$panels)
  upright <- function(x, flip = "y") {
    for (col in flip) x[[col]] <- -x[[col]]
    if (!is.null(x$panel)) x$panel <- factor(x$panel, levels = panels$panel)
    x
  }

  info <- frame(d$nodeInfo)
  nodes <- upright(frame(d$nodes))
  extra <- setdiff(names(info), "node")
  nodes[extra] <- info[match(nodes$node, info$node), extra]

  edges <- upright(frame(d$edges), c("y0", "cy0", "cy1", "y1"))
  arrows <- upright(frame(d$arrows), c("y", "angle"))
  rows <- upright(frame(d$rowLabels))

  structure(
    list(
      nodes = nodes, edges = edges, arrows = arrows, rows = rows,
      panels = panels, meta = d$meta
    ),
    class = "bandage_layout"
  )
}

#' @export
print.bandage_layout <- function(x, ...) {
  cat(sprintf(
    "<bandage_layout> %d nodes, %d edge curves, %d panel(s), %s\n",
    length(unique(x$nodes$node)), length(unique(x$edges$edge)),
    nrow(x$panels), x$meta$generator
  ))
  invisible(x)
}
