is_tabix_graph <- function(x) {
  grepl("\\.graph\\.json$|\\.segs\\.bed\\.gz$", bare_name(x)) ||
    (!is_url(x) && file.exists(paste0(x, ".segs.bed.gz")))
}

# The file `name` names beside `path`, a URL's query and fragment kept
sibling <- function(path, name) {
  if (is_url(path)) {
    sub("[^/?#]*([?#].*)?$", paste0(name, "\\1"), path)
  } else {
    file.path(dirname(path), name)
  }
}

# the fine index's prefix: the manifest names it relative to itself
index_prefix <- function(x) {
  if (grepl("\\.graph\\.json$", bare_name(x))) {
    manifest <- jsonlite::fromJSON(rawToChar(fetch_range(x, 0, -1)))
    sibling(x, manifest$index)
  } else {
    sub("\\.segs\\.bed\\.gz(?=[?#]|$)", "", x, perl = TRUE)
  }
}

tabix_files <- function(x) {
  prefix <- index_prefix(x)
  segments <- beside(prefix, ".segs.bed.gz")
  links <- beside(prefix, ".links.bed.gz")
  list(
    segments = segments,
    segmentsIndex = index_or_tbi(segments),
    links = links,
    linksIndex = index_or_tbi(links)
  )
}
