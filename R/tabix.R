is_url <- function(x) grepl("^(https?|ftp|file)://", x)

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
  segments <- paste0(prefix, ".segs.bed.gz")
  links <- paste0(prefix, ".links.bed.gz")
  list(
    segments = segments,
    segmentsIndex = index_or_tbi(segments),
    links = links,
    linksIndex = index_or_tbi(links)
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
    stop(
      sprintf("\"%s\" is not a region like chr6:160,614,798-160,647,758", region),
      call. = FALSE
    )
  }
  num <- function(s) as.numeric(gsub(",", "", s))
  start <- num(m[[3]])
  end <- num(m[[4]])
  if (start < 1 || end < start) {
    stop(
      sprintf("\"%s\" needs 1 <= start <= end, as a 1-based locus", region),
      call. = FALSE
    )
  }
  list(refName = m[[2]], start = start - 1, end = end)
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
  if (!file.exists(path)) {
    stop(sprintf("%s does not exist", path), call. = FALSE)
  }
  left <- max(0, file.size(path) - position)
  n <- if (length < 0) left else min(length, left)
  if (n == 0) return(raw())
  con <- file(path, "rb")
  on.exit(close(con))
  seek(con, position)
  readBin(con, "raw", n)
}

# A server without range support answers 200 with the whole file, which the
# reader would take as the bytes it asked for, so the range is cut from that
url_range <- function(url, position, length) {
  if (length == 0) return(raw())
  handle <- curl::new_handle()
  ranged <- length > 0 || position > 0
  if (ranged) {
    last <- if (length > 0) sprintf("%.0f", position + length - 1) else ""
    curl::handle_setopt(handle, range = sprintf("%.0f-%s", position, last))
  }
  res <- curl::curl_fetch_memory(url, handle)
  if (res$status_code == 416) return(raw())
  if (res$status_code >= 400) {
    stop(sprintf("HTTP %d reading %s", res$status_code, url), call. = FALSE)
  }
  if (ranged && res$status_code == 200) {
    left <- max(0, length(res$content) - position)
    n <- if (length < 0) left else min(length, left)
    return(res$content[position + seq_len(n)])
  }
  res$content
}
