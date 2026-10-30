engine <- local({
  ctx <- NULL
  function() {
    if (is.null(ctx)) {
      if (engine_forked(loaded$pid)) {
        stop(
          "V8 hangs starting in a forked worker, such as parallel::mclapply()'s: ",
          "lay out in a socket cluster, such as parallel::makeCluster()'s",
          call. = FALSE
        )
      }
      fresh <- V8::v8()
      fresh$source(system.file("js", "bandage.js", package = "ggbandage"))
      ctx <<- fresh
    }
    ctx
  }
})

loaded <- new.env(parent = emptyenv())

.onLoad <- function(libname, pkgname) {
  loaded$pid <- Sys.getpid()
}

read_text <- function(path) paste(read_lines(path), collapse = "\n")

is_walk_file <- function(x) grepl("\\.walks\\.bed\\.gz$", bare_name(x))

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
      return(list(
        text = cut$gfa, name = region,
        region = core_region(region, cut$refName),
        skips = if (length(cut$skips$names)) cut$skips
      ))
    }
    return(list(text = cut_tabix(ctx, gfa, region), name = region, region = NULL))
  }
  list(
    text = read_text(gfa), name = basename(bare_name(gfa)),
    region = if (!is.null(region)) core_region(region)
  )
}

# The core reads a region as 0-based and half-open
core_region <- function(region, refName = parse_region(region)$refName) {
  locus <- parse_region(region)
  sprintf("%s:%.0f-%.0f", refName, locus$start, locus$end)
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
#'   index (the `.graph.json` manifest, a format 2 `.graph.bed.gz` file, a
#'   format 1 `.segs.bed.gz` file, or a local prefix of either); or of a
#'   gfa-to-tabix `--walks` file (`.walks.bed.gz`). An index or walk file
#'   needs `region`
#' @param layout `"force"`, `"auto"`, `"ordered"` or `"samplerows"`
#' @param walks walks (P/W lines) to lift out of the drawing, each named in
#'   full or by a prefix such as `"HG00097#1"` or `"HG00097"`, which lifts
#'   every walk it begins. Walks lifted together share one panel, one flat
#'   colour each, side by side where they share nodes. Once one of them
#'   passes a node twice, each draws a thread per pass
#' @param facet `"walk"` for a panel per walk
#' @param width the width in px the drawing is fit to, which decides whether
#'   strand arrows show
#' @param region a 1-based locus, as a genome browser writes it, such as
#'   `"GRCh38#0#chr6:31,000,001-31,100,000"`, `"chr6:31000001..31100000"` or
#'   one base, `"chr6:31,000,001"`. On an index or walk file, the
#'   part of the graph under it, fetched by range request; on a GFA, the region
#'   the core crops to
#' @param genes path or URL of a GFF3 or BED file of genes on the reference,
#'   plain, gzipped, or bgzipped with a `.tbi` or `.csi` index beside it, to
#'   pin on the backbone. [geom_bandage_genes()] draws them
#' @param gene_names the name `genes` gives each backbone contig it names
#'   otherwise, such as `c(chr6 = "NC_000006.12")`. A name differing only by a
#'   `chr` prefix needs none
#' @param haplotypes on a walk file, the `sample#haplotype` walks to cut, every
#'   one when `NULL`
#' @param context on a walk file, bp of reference kept past each end of `region`
#' @param frequencies each node's passes per haplotype, as a data frame of
#'   `name` and `frequency` such as [vcf_frequencies()] returns, or a numeric
#'   vector named by node. They override any `AF` tag and what the walks give,
#'   and `nodeWidth = "frequency"` draws them
#' @param ... other figure spec fields, such as `referencePath`,
#'   `colorScheme`, `contigThickness`, `quality`, `engine`
#'   (`"fmmm"`, the default, or `"stress"`), and `bubbleSpread` (`"auto"`, the
#'   default, which draws node length proportional to bp; `"open"` or `"wide"`,
#'   which lift short alleles; or `"compress"`, which pulls long and short
#'   nodes towards the mean), and `nodeWidth`: `"depth"`, the default, wider
#'   the more walks pass a node against the mean; `"frequency"`, as wide as
#'   the share of haplotypes that pass it, full width at 1; or `"uniform"`
#' @export
bandage_layout <- function(gfa, layout = "force", walks = NULL, facet = NULL,
                           width = 1000, region = NULL, genes = NULL,
                           gene_names = NULL, haplotypes = NULL,
                           context = 1000, frequencies = NULL, ...) {
  src <- graph_source(gfa, region, haplotypes, context)
  spec <- c(
    list(layout = layout, width = width),
    if (!is.null(src$region)) list(region = src$region),
    if (length(walks)) list(walks = as.list(walks)),
    if (!is.null(facet)) list(facet = facet),
    if (!is.null(frequencies)) list(frequencies = frequency_map(frequencies)),
    list(...)
  )
  json <- engine()$call(
    "(text, name, spec, genes) => bandage.figure(text, name, spec, genes).then(JSON.stringify)",
    src$text, src$name, spec, gene_source(genes, gene_names),
    await = TRUE
  )
  d <- jsonlite::fromJSON(json)
  warn_unmatched(d)
  if (!is.null(d$unbound)) {
    warning(unbound_genes(genes, d$unbound), call. = FALSE)
  }
  as_bandage_layout(d)
}

warn_unmatched <- function(d) {
  missing <- unlist(d$unmatched)
  if (length(missing)) {
    warning(
      sprintf(
        "no walk named %s; the graph has %s",
        paste(missing, collapse = ", "), listed(d$walkNames, 6)
      ),
      call. = FALSE
    )
  }
}

listed <- function(x, n) {
  paste0(paste(utils::head(x, n), collapse = ", "), if (length(x) > n) ", ...")
}

frequency_map <- function(x) {
  if (is.data.frame(x)) x <- stats::setNames(x$frequency, x$name)
  as.list(x)
}

gene_source <- function(genes, gene_names = NULL) {
  if (is.null(genes)) {
    return(NULL)
  }
  format <- if (grepl("\\.bed(\\.gz)?$", bare_name(genes), ignore.case = TRUE)) "bed" else "gff3"
  names <- if (length(gene_names)) list(refNames = as.list(gene_names))
  index <- index_of(genes)
  if (!is.null(index)) {
    return(c(list(file = genes, index = index, format = format), names))
  }
  c(list(text = read_text(genes), format = format), names)
}

unbound_genes <- function(genes, unbound) {
  has <- unbound$names
  sprintf(
    "no sequence in %s names %s%s. Give gene_names the file's name for each, as c(\"%s\" = \"%s\")",
    genes,
    paste(unbound$contigs, collapse = ", "),
    if (length(has)) paste("; it has", listed(has, 4)) else "",
    unbound$contigs[1],
    if (length(has)) has[1] else "NC_000006.12"
  )
}

cut_walks <- function(ctx, file, region, haplotypes, context) {
  ctx$call(
    "bandage.cutWalks",
    c(
      list(file = file, index = index_or_tbi(file), context = context),
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

# A table the engine sends as columns, keeping the columns of an empty one
frame <- function(x) {
  cols <- lapply(x, function(col) if (length(col)) unlist(col) else numeric())
  as.data.frame(cols, stringsAsFactors = FALSE)
}

# y down, as on screen, becomes y up, and the panels become a factor in the
# order the core placed them
as_bandage_layout <- function(d) {
  panels <- frame(d$panels)
  upright <- function(x, flip = "y") {
    for (col in flip) x[[col]] <- -x[[col]]
    if (!is.null(x$panel)) x$panel <- factor(x$panel, levels = panels$panel)
    x
  }

  info <- frame(d$nodeInfo)
  nodes <- upright(frame(d$nodes), c("y", "ny"))
  extra <- setdiff(names(info), "node")
  nodes[extra] <- info[match(nodes$node, info$node), extra]

  edges <- upright(frame(d$edges), c("y0", "cy0", "cy1", "y1", "ny", "ny1"))
  arrows <- upright(frame(d$arrows), c("y", "angle"))
  rows <- upright(frame(d$rowLabels))
  keys <- frame(d$keys)
  ranges <- frame(d$ranges)
  at <- match(keys$name, ranges$name)
  keys$contig <- as.character(ranges$contig)[at]
  keys$start <- as.numeric(ranges$start)[at]
  keys$end <- as.numeric(ranges$end)[at]
  threads <- frame(d$threadKeys)
  genes <- upright(frame(d$pins))
  exons <- upright(frame(d$exons))

  structure(
    list(
      nodes = nodes, edges = edges, arrows = arrows, rows = rows,
      panels = panels, keys = keys, threads = threads, genes = genes, exons = exons,
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
