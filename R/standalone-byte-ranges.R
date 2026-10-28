# ---
# repo: GMOD/ggbandage
# file: standalone-byte-ranges.R
# last-updated: 2026-10-28
# license: https://unlicense.org
# dependencies: standalone-v8-host.R
# imports: curl
# ---
#
# Byte ranges and lines of a local or remote file, for a JavaScript reader in
# V8 that asks R for every byte through console.r.call, and the 1-based
# locus a user writes as the 0-based range such a reader answers.

# a 1-based inclusive locus, as the genome browser writes it, to the 0-based
# half-open range the index answers
parse_region <- function(region) {
  m <- regmatches(
    region,
    regexec(
      "^\\s*([^:\\s]+):\\s*([0-9,]+)(?:\\s*(?:-|\\.\\.)\\s*([0-9,]+))?\\s*$",
      region,
      perl = TRUE
    )
  )[[1]]
  if (!length(m)) {
    stop(
      sprintf("\"%s\" is not a region like chr6:160,614,798-160,647,758", region),
      call. = FALSE
    )
  }
  num <- function(s) as.numeric(gsub(",", "", s))
  start <- num(m[[3]])
  end <- if (nzchar(m[[4]])) num(m[[4]]) else start
  if (start < 1 || end < start) {
    stop(
      sprintf("\"%s\" needs 1 <= start <= end, as a 1-based locus", region),
      call. = FALSE
    )
  }
  list(refName = m[[2]], start = start - 1, end = end)
}

is_remote <- function(location) is_url(location) && !startsWith(location, "file://")

# A local file's path, from a path or a file:// URL
local_path <- function(location) {
  if (!startsWith(location, "file://")) {
    return(location)
  }
  path <- utils::URLdecode(sub("[?#].*$", "", sub("^file://", "", location)))
  sub("^/([A-Za-z]:)", "\\1", path)
}

# A HEAD request fails on a presigned URL, which signs only GET, so a remote
# file's existence is asked with a GET of its first byte
exists_at <- function(location) {
  if (!is_remote(location)) {
    return(file.exists(local_path(location)))
  }
  handle <- curl::new_handle(range = "0-0")
  tryCatch(
    curl::curl_fetch_memory(location, handle)$status_code %in% c(200, 206, 416),
    error = function(e) FALSE
  )
}

# a bgzipped file's .tbi or .csi index, NULL when it has neither
index_of <- function(file) {
  for (ext in c(".tbi", ".csi")) {
    index <- beside(file, ext)
    if (exists_at(index)) {
      return(index)
    }
  }
  NULL
}

# the index a read needs, named as a .tbi in the error when there is none
index_or_tbi <- function(file) {
  index <- index_of(file)
  if (is.null(index)) beside(file, ".tbi") else index
}

# V8 calls this through console.r.call, so every argument arrives as a
# string; a negative length reads to the end
fetch_range <- function(location, position, length) {
  position <- as.numeric(position)
  length <- as.numeric(length)
  if (is_remote(location)) {
    url_range(location, position, length)
  } else {
    file_range(local_path(location), position, length)
  }
}

# How many bytes from `position` a read of `length` takes from `size`
range_bytes <- function(size, position, length) {
  left <- max(0, size - position)
  if (length < 0) left else min(length, left)
}

file_range <- function(path, position, length) {
  if (!file.exists(path)) {
    stop(sprintf("%s does not exist", path), call. = FALSE)
  }
  n <- range_bytes(file.size(path), position, length)
  if (n == 0) {
    return(raw())
  }
  con <- file(path, "rb")
  on.exit(close(con))
  seek(con, position)
  readBin(con, "raw", n)
}

# A server without range support answers 200 with the whole file, which the
# reader would take as the bytes it asked for, so url_range() cuts the range
# from that body and keeps it for the reads that follow
url_range <- function(url, position, length) {
  if (length == 0) {
    return(raw())
  }
  body <- whole_bodies$get(url)
  if (!is.null(body)) {
    return(body[position + seq_len(range_bytes(length(body), position, length))])
  }
  handle <- curl::new_handle()
  ranged <- length > 0 || position > 0
  if (ranged) {
    last <- if (length > 0) sprintf("%.0f", position + length - 1) else ""
    curl::handle_setopt(handle, range = sprintf("%.0f-%s", position, last))
  }
  res <- curl::curl_fetch_memory(url, handle)
  if (res$status_code == 416) {
    return(raw())
  }
  if (res$status_code >= 400) {
    stop(sprintf("HTTP %d reading %s", res$status_code, url), call. = FALSE)
  }
  if (ranged && res$status_code == 200) {
    whole_bodies$put(url, res$content)
    return(res$content[position + seq_len(range_bytes(length(res$content), position, length))])
  }
  res$content
}

# The whole bodies servers without range support sent, newest last, dropping
# the oldest past `limit` bytes in all
whole_bodies <- local({
  bodies <- list()
  limit <- 1e9
  list(
    get = function(url) bodies[[url]],
    put = function(url, body) {
      bodies[[url]] <<- body
      while (length(bodies) && sum(lengths(bodies)) > limit) {
        bodies[[1]] <<- NULL
      }
    },
    clear = function() bodies <<- list()
  )
})

# A file's lines, from a path or URL, plain or gzipped
read_lines <- function(path) {
  if (is_remote(path)) {
    local <- tempfile()
    on.exit(unlink(local))
    writeBin(url_range(path, 0, -1), local)
    path <- local
  }
  con <- gzfile(local_path(path))
  on.exit(close(con), add = TRUE, after = FALSE)
  readLines(con, warn = FALSE)
}
