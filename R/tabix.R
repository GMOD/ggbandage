index_suffix <- "\\.(graph|segs)\\.bed\\.gz(?=[?#]|$)"

is_tabix_graph <- function(x) {
  grepl("\\.graph\\.json$|\\.(graph|segs)\\.bed\\.gz$", bare_name(x)) ||
    (!is_url(x) && any(file.exists(paste0(x, c(".graph.bed.gz", ".segs.bed.gz")))))
}

# The file `name` names beside `path`, a URL's query and fragment kept
sibling <- function(path, name) {
  if (is_url(path)) {
    sub("[^/?#]*([?#].*)?$", paste0(name, "\\1"), path)
  } else {
    file.path(dirname(path), name)
  }
}

# The fine index's prefix and format: 2 for one .graph.bed.gz, 1 for a
# .segs.bed.gz and .links.bed.gz pair. A manifest names its index relative to
# itself; a local prefix takes format 2 where both exist
index_source <- function(x) {
  name <- bare_name(x)
  if (grepl("\\.graph\\.json$", name)) {
    manifest <- jsonlite::fromJSON(rawToChar(fetch_range(x, 0, -1)))
    format <- if (is.null(manifest$format)) 1 else manifest$format
    list(prefix = sibling(x, manifest$index), format = format)
  } else if (grepl(index_suffix, name, perl = TRUE)) {
    list(
      prefix = sub(index_suffix, "", x, perl = TRUE),
      format = if (grepl("\\.graph\\.bed\\.gz$", name)) 2 else 1
    )
  } else {
    list(prefix = x, format = if (file.exists(paste0(x, ".graph.bed.gz"))) 2 else 1)
  }
}

tabix_files <- function(x) {
  src <- index_source(x)
  if (!src$format %in% 1:2) {
    stop(x, " names a format ", src$format, " index; ggbandage reads formats 1 and 2")
  }
  if (src$format == 2) {
    graph <- beside(src$prefix, ".graph.bed.gz")
    return(list(graph = graph, graphIndex = index_or_tbi(graph)))
  }
  segments <- beside(src$prefix, ".segs.bed.gz")
  links <- beside(src$prefix, ".links.bed.gz")
  list(
    segments = segments,
    segmentsIndex = index_or_tbi(segments),
    links = links,
    linksIndex = index_or_tbi(links)
  )
}
