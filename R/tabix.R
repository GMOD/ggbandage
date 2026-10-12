is_url <- function(x) grepl("^https?://", x)

is_tabix_graph <- function(x) {
  grepl("\\.graph\\.json$|\\.segs\\.bed\\.gz$", x) ||
    (!is_url(x) && file.exists(paste0(x, ".segs.bed.gz")))
}

sibling <- function(path, name) {
  if (is_url(path)) {
    paste0(sub("[^/]*$", "", path), name)
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
  list(
    segments = paste0(prefix, ".segs.bed.gz"),
    segmentsIndex = paste0(prefix, ".segs.bed.gz.tbi"),
    links = paste0(prefix, ".links.bed.gz"),
    linksIndex = paste0(prefix, ".links.bed.gz.tbi")
  )
}

# a 1-based inclusive locus, as the genome browser writes it, to the 0-based
# half-open range the index answers
parse_region <- function(region) {
  m <- regmatches(
    region,
    regexec("^\\s*([^:\\s]+):([0-9,]+)-([0-9,]+)\\s*$", region, perl = TRUE)
  )[[1]]
  if (!length(m)) {
    stop(sprintf("\"%s\" is not a region like chr6:160,614,798-160,647,758", region))
  }
  num <- function(s) as.numeric(gsub(",", "", s))
  list(refName = m[[2]], start = num(m[[3]]) - 1, end = num(m[[4]]))
}

# V8 calls these through console.r.call, so every argument arrives as a string
fetch_range <- function(location, position, length) {
  position <- as.numeric(position)
  length <- as.numeric(length)
  if (is_url(location)) {
    url_range(location, position, length)
  } else {
    file_range(location, position, length)
  }
}

file_range <- function(path, position, length) {
  if (!file.exists(path)) stop(sprintf("%s does not exist", path), call. = FALSE)
  con <- file(path, "rb")
  on.exit(close(con))
  if (length < 0) length <- file.size(path) - position
  seek(con, position)
  readBin(con, "raw", length)
}

url_range <- function(url, position, length) {
  handle <- curl::new_handle()
  if (length >= 0 || position > 0) {
    last <- if (length >= 0) as.character(position + length - 1) else ""
    curl::handle_setheaders(
      handle,
      Range = sprintf("bytes=%.0f-%s", position, last)
    )
  }
  res <- curl::curl_fetch_memory(url, handle)
  if (res$status_code >= 400) {
    stop(sprintf("HTTP %d reading %s", res$status_code, url))
  }
  res$content
}

file_size <- function(location) {
  if (is_url(location)) {
    handle <- curl::new_handle(nobody = TRUE)
    res <- curl::curl_fetch_memory(location, handle)
    as.numeric(curl::parse_headers_list(res$headers)[["content-length"]])
  } else {
    file.size(location)
  }
}
