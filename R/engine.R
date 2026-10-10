engine <- local({
  ctx <- NULL
  function() {
    if (is.null(ctx)) {
      ctx <<- V8::v8()
      ctx$source(system.file("js", "bandage.js", package = "ggbandage"))
    }
    ctx
  }
})

read_gfa <- function(path) {
  con <- gzfile(path)
  on.exit(close(con))
  paste(readLines(con, warn = FALSE), collapse = "\n")
}

#' Lay out a GFA graph with the Bandage engine
#'
#' @param gfa path to a GFA file, plain or gzipped
#' @param layout `"force"`, `"auto"`, `"ordered"` or `"samplerows"`
#' @param walks walk (P/W line) names to lift out of the drawing
#' @param facet `"walk"` for a panel per walk
#' @param width the width in px the drawing is fit to, which decides whether
#'   strand arrows show
#' @param ... other figure spec fields, such as `region`, `referencePath`,
#'   `colorScheme`, `nodeWidth`, `contigThickness`, `quality`, `engine`
#' @export
bandage_layout <- function(gfa, layout = "force", walks = NULL, facet = NULL,
                           width = 1000, ...) {
  spec <- c(
    list(layout = layout, width = width),
    if (length(walks)) list(walks = as.list(walks)),
    if (!is.null(facet)) list(facet = facet),
    list(...)
  )
  ctx <- engine()
  ctx$assign("gfaText", read_gfa(gfa))
  ctx$assign("spec", spec, auto_unbox = TRUE)
  json <- ctx$eval(
    sprintf(
      "bandage.gfaFigureData(gfaText, %s, spec).then(JSON.stringify)",
      jsonlite::toJSON(basename(gfa), auto_unbox = TRUE)
    ),
    await = TRUE
  )
  as_bandage_layout(jsonlite::fromJSON(json, simplifyVector = TRUE))
}

# y down, as on screen, becomes y up, and the panels become a factor in the
# order the core placed them
as_bandage_layout <- function(d) {
  frame <- function(x) {
    cols <- lapply(x, function(col) if (length(col)) unlist(col) else numeric())
    as.data.frame(cols, stringsAsFactors = FALSE)
  }
  panels <- frame(d$panels)
  panel_factor <- function(p) factor(p, levels = panels$panel)
  info <- frame(d$nodeInfo)

  nodes <- frame(d$nodes)
  nodes$y <- -nodes$y
  nodes$panel <- panel_factor(nodes$panel)
  nodes <- cbind(nodes, info[match(nodes$node, info$node), -1, drop = FALSE])

  edges <- frame(d$edges)
  for (col in c("y0", "cy0", "cy1", "y1")) edges[[col]] <- -edges[[col]]
  edges$panel <- panel_factor(edges$panel)

  arrows <- frame(d$arrows)
  arrows$y <- -arrows$y
  arrows$angle <- -arrows$angle
  arrows$panel <- panel_factor(arrows$panel)

  rows <- frame(d$rowLabels)
  rows$y <- -rows$y

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
