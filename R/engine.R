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

read_text <- function(path) {
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

is_walk_file <- function(x) grepl("\\.walks\\.bed\\.gz$", x)

# The graph as GFA text, its name, and the region a core reads it under: a
# GFA as it is, or the part of an index or walk file under `region`
graph_source <- function(gfa, region, haplotypes, context) {
  if (is_walk_file(gfa) || is_tabix_graph(gfa)) {
    if (is.null(region)) {
      stop("an index holds a whole genome's graph; give the `region` to draw")
    }
    ctx <- engine()
    if (is_walk_file(gfa)) {
      cut <- cut_walks(ctx, gfa, region, haplotypes, context)
      locus <- parse_region(region)
      return(list(
        text = cut$gfa, name = region,
        region = sprintf("%s:%.0f-%.0f", cut$refName, locus$start + 1, locus$end)
      ))
    }
    return(list(text = cut_tabix(ctx, gfa, region), name = region, region = NULL))
  }
  list(text = read_text(gfa), name = basename(gfa), region = region)
}

#' The GFA a figure is drawn from
#'
#' A GFA file as it is, or the part of a gfa-to-tabix index or walk file under
#' `region`, as GFA text. Write it out for another tool, such as ggtubemap's
#' `read_gfa()`.
#' @inheritParams bandage_layout
#' @return GFA text, one string
#' @export
bandage_gfa <- function(gfa, region = NULL, haplotypes = NULL, context = 1000) {
  graph_source(gfa, region, haplotypes, context)$text
}

#' Lay out a GFA graph with the Bandage engine
#'
#' @param gfa path or URL of a GFA file, plain or gzipped; of a gfa-to-tabix
#'   index (the `.graph.json` manifest, a `.segs.bed.gz` file, or the prefix of
#'   a local pair); or of a gfa-to-tabix `--walks` file (`.walks.bed.gz`). An
#'   index or walk file needs `region`
#' @param layout `"force"`, `"auto"`, `"ordered"` or `"samplerows"`
#' @param walks walk (P/W line) names to lift out of the drawing
#' @param facet `"walk"` for a panel per walk
#' @param width the width in px the drawing is fit to, which decides whether
#'   strand arrows show
#' @param region a locus such as `"GRCh38#0#chr6:31,000,000-31,100,000"`. On
#'   an index or walk file, the part of the graph under it, fetched by range
#'   request; on a GFA, the region the core crops to
#' @param genes path or URL of a GFF3 or BED file of genes on the reference,
#'   plain, gzipped, or bgzipped with a `.tbi` or `.csi` index beside it, to
#'   pin on the backbone. [geom_bandage_genes()] draws them
#' @param haplotypes on a walk file, the `sample#haplotype` walks to cut, every
#'   one when `NULL`
#' @param context on a walk file, bp of reference kept past each end of `region`
#' @param ... other figure spec fields, such as `referencePath`,
#'   `colorScheme`, `nodeWidth`, `contigThickness`, `quality`, and `engine`
#'   (`"fmmm"`, the default, or `"stress"`)
#' @export
bandage_layout <- function(gfa, layout = "force", walks = NULL, facet = NULL,
                           width = 1000, region = NULL, genes = NULL,
                           haplotypes = NULL, context = 1000, ...) {
  src <- graph_source(gfa, region, haplotypes, context)
  spec <- c(
    list(layout = layout, width = width),
    if (!is.null(src$region)) list(region = src$region),
    if (length(walks)) list(walks = as.list(walks)),
    if (!is.null(facet)) list(facet = facet),
    list(...)
  )
  json <- engine()$call(
    "(text, name, spec, genes) => bandage.figure(text, name, spec, genes).then(JSON.stringify)",
    src$text, src$name, spec, gene_source(genes),
    await = TRUE
  )
  d <- jsonlite::fromJSON(json)
  missing <- setdiff(walks, d$walkNames)
  if (length(missing)) {
    warning(
      sprintf(
        "no walk named %s; the graph has %s%s",
        paste(missing, collapse = ", "),
        paste(utils::head(d$walkNames, 6), collapse = ", "),
        if (length(d$walkNames) > 6) ", ..." else ""
      ),
      call. = FALSE
    )
  }
  as_bandage_layout(d)
}

gene_source <- function(genes) {
  if (is.null(genes)) {
    return(NULL)
  }
  format <- if (grepl("\\.bed(\\.gz)?$", genes, ignore.case = TRUE)) "bed" else "gff3"
  for (ext in c(".tbi", ".csi")) {
    index <- paste0(genes, ext)
    if (exists_at(index)) {
      return(list(file = genes, index = index, format = format))
    }
  }
  list(text = read_text(genes), format = format)
}

exists_at <- function(location) {
  if (!is_url(location)) {
    return(file.exists(location))
  }
  handle <- curl::new_handle(nobody = TRUE)
  tryCatch(
    curl::curl_fetch_memory(location, handle)$status_code < 400,
    error = function(e) FALSE
  )
}

cut_walks <- function(ctx, file, region, haplotypes, context) {
  ctx$call(
    "bandage.cutWalks",
    c(
      list(file = file, index = paste0(file, ".tbi"), context = context),
      if (length(haplotypes)) list(haplotypes = as.list(haplotypes)),
      parse_region(region)
    ),
    await = TRUE
  )
}

cut_tabix <- function(ctx, index, region) {
  ctx$call(
    "bandage.cutTabix",
    c(tabix_files(index), parse_region(region)),
    await = TRUE
  )
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
  keys <- frame(d$keys)
  genes <- upright(frame(d$pins))
  exons <- upright(frame(d$exons))

  structure(
    list(
      nodes = nodes, edges = edges, arrows = arrows, rows = rows,
      panels = panels, keys = keys, genes = genes, exons = exons,
      meta = d$meta
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
