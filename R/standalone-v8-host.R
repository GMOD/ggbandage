# ---
# repo: GMOD/ggbandage
# file: standalone-v8-host.R
# last-updated: 2026-10-28
# license: https://unlicense.org
# ---
#
# Helpers for a package that runs a JavaScript engine in V8 and hands it
# files by path or URL. ggbandage, ggtubemap and ggjbrowse import this file
# with usethis::use_standalone("GMOD/ggbandage", "v8-host", ref = <sha>).

is_url <- function(path) grepl("^[A-Za-z][A-Za-z0-9+.-]*://", path)

# A path or URL as its extension reads, a URL's query and fragment aside
bare_name <- function(file) {
  if (is_url(file)) sub("[?#].*$", "", file) else file
}

# The file beside `file` that its name and `suffix` name, a URL's query and
# fragment kept after it, as a token-signed URL's index carries the same
# token; a local path's `?` and `#` are part of its name
beside <- function(file, suffix) {
  if (!is_url(file)) {
    return(paste0(file, suffix))
  }
  sub("^([^?#]*)", paste0("\\1", suffix), file)
}

# Whether this process is a worker that parallel forked, where V8 hangs
# starting, even when the package loaded only after the fork
forked <- function() {
  is_child <- get0("isChild", asNamespace("parallel"))
  !is.null(is_child) && is_child()
}

# Whether V8 would hang starting here: in a forked worker, or in any process
# but `pid`, the one the package's .onLoad recorded
engine_forked <- function(pid) {
  !identical(Sys.getpid(), pid) || forked()
}
