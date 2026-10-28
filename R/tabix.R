is_tabix_graph <- function(x) {
  grepl("\\.graph\\.json$|\\.segs\\.bed\\.gz$", x) ||
    (!is_url(x) && file.exists(paste0(x, ".segs.bed.gz")))
}

sibling <- function(path, name) {
  if (is_url(path)) {
    paste0(sub("[^/]*$", "", bare_name(path)), name)
  } else {
    file.path(dirname(path), name)
  }
}

# the fine index's prefix: the manifest names it relative to itself
index_prefix <- function(x) {
  if (grepl("\\.graph\\.json$", x)) {
    manifest <- jsonlite::fromJSON(rawToChar(fetch_range(x, 0, -1)))
    sibling(x, manifest$index)
  } else {
    sub("\\.segs\\.bed\\.gz$", "", x)
  }
}

tabix_files <- function(x) {
  prefix <- index_prefix(x)
  segments <- paste0(prefix, ".segs.bed.gz")
  links <- paste0(prefix, ".links.bed.gz")
  list(
    segments = segments,
    segmentsIndex = index_or_tbi(segments),
    links = links,
    linksIndex = index_or_tbi(links)
  )
}
