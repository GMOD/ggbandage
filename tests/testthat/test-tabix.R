pggb <- test_path("testdata", "ecoli_pggb_subgraph.gfa")
index <- test_path("testdata", "ecoli_pggb")
rgfa_index <- test_path("testdata", "ecoli_rgfa.segs.bed.gz")

test_that("a window over a whole index draws the graph the GFA does", {
  whole <- bandage_layout(pggb)
  cut <- bandage_layout(index, region = "K12#1#chr:1004500-1004961")
  bare <- function(g) sub("[+-]$", "", unique(g$nodes$node))
  expect_setequal(bare(cut), bare(whole))
  expect_equal(length(unique(cut$edges$edge)), length(unique(whole$edges$edge)))
})

test_that("a window cuts the graph to what lies under it", {
  g <- bandage_layout(
    rgfa_index,
    layout = "auto",
    region = "K12#1#chr:993,301-1,000,000"
  )
  expect_setequal(
    sub("[+-]$", "", unique(g$nodes$node)),
    c("s322", "s323", "s324", "s325", "s1727", "s1728")
  )
})

test_that("a sequence name finds the PanSN name that ends with it", {
  g <- bandage_layout(index, region = "chr:1004500-1004961")
  expect_s3_class(g, "bandage_layout")
})

test_that("a manifest names its index relative to itself", {
  dir <- tempfile()
  dir.create(dir)
  on.exit(unlink(dir, recursive = TRUE))
  file.copy(Sys.glob(paste0(index, "*")), dir)
  manifest <- file.path(dir, "x.graph.json")
  writeLines('{"schema": 1, "index": "ecoli_pggb"}', manifest)
  g <- bandage_layout(manifest, region = "K12#1#chr:1004500-1004961")
  expect_s3_class(g, "bandage_layout")
})

test_that("a URL's query, as a signed URL carries, stays on every file read beside it", {
  skip_on_os("windows")
  url <- function(path) paste0("file://", normalizePath(path), "?token=1")
  walks <- test_path("testdata", "ecoli_pggb.K12.walks.bed.gz")
  expect_s3_class(
    bandage_layout(url(walks), region = "chr:1004500-1004961"),
    "bandage_layout"
  )
  segs <- url(paste0(index, ".segs.bed.gz"))
  expect_match(tabix_files(segs)$links, "\\.links\\.bed\\.gz\\?token=1$")
  expect_match(tabix_files(segs)$linksIndex, "\\.links\\.bed\\.gz\\.tbi\\?token=1$")
  expect_s3_class(
    bandage_layout(segs, region = "K12#1#chr:1004500-1004961"),
    "bandage_layout"
  )
  expect_equal(
    sibling("https://host/d/x.graph.json?token=1", "sub/idx"),
    "https://host/d/sub/idx?token=1"
  )
  gfa <- graph_source(url(test_path("testdata", "ecoli_pggb_subgraph.gfa")), NULL, NULL, 0)
  expect_equal(gfa$name, "ecoli_pggb_subgraph.gfa")
})

test_that("an index without a region, or with one it lacks, says so", {
  expect_error(bandage_layout(index), "region")
  expect_error(bandage_layout(index, region = "chrZ:1-100"), "not in the index")
  expect_error(bandage_layout(index, region = "chr"), "not a region")
})

test_that("a missing index file is named in the error, and the engine recovers", {
  expect_error(
    bandage_layout("nowhere/x.segs.bed.gz", region = "chr:1-100"),
    "nowhere/x.segs.bed.gz.tbi does not exist"
  )
  expect_s3_class(
    bandage_layout(index, region = "chr:1004500-1004961"),
    "bandage_layout"
  )
})

test_that("a contig-layout index draws what the anchored one does, one hop out", {
  region <- "K12#1#chr:1004500-1004961"
  bare <- function(g) sub("[+-]$", "", unique(g$nodes$node))
  expect_setequal(
    bare(bandage_layout(test_path("testdata", "ecoli_contig"), region = region)),
    bare(bandage_layout(index, region = region))
  )
})

test_that("an index with a .csi in place of a .tbi reads the same", {
  region <- "K12#1#chr:1004500-1004961"
  expect_equal(
    bandage_layout(test_path("testdata", "ecoli_pggb_csi"), region = region)$nodes,
    bandage_layout(index, region = region)$nodes
  )
})

test_that("a byte range reads the same from a file and from a URL", {
  skip_on_os("windows")
  file <- paste0(index, ".segs.bed.gz")
  url <- paste0("file://", normalizePath(file))
  for (range in list(c(0, 100), c(10, 20), c(0, -1), c(5, -1))) {
    expect_identical(
      url_range(url, range[1], range[2]),
      file_range(file, range[1], range[2])
    )
  }
})

test_that("a server that ignores Range is read once, and yields the bytes asked for", {
  file <- paste0(index, ".segs.bed.gz")
  whole <- readBin(file, "raw", file.size(file))
  fetched <- 0
  local_mocked_bindings(
    curl_fetch_memory = function(url, handle) {
      fetched <<- fetched + 1
      list(status_code = 200L, content = whole)
    },
    .package = "curl"
  )
  whole_bodies$clear()
  url <- "https://example.org/x.segs.bed.gz"
  for (range in list(c(0, 100), c(10, 20), c(5, -1), c(0, 1e6))) {
    expect_identical(
      url_range(url, range[1], range[2]),
      file_range(file, range[1], range[2])
    )
  }
  expect_equal(fetched, 1)
  whole_bodies$clear()
})

test_that("a remote file's existence is asked with a one-byte GET, which a presigned URL allows", {
  asked <- NULL
  local_mocked_bindings(
    curl_fetch_memory = function(url, handle) {
      asked <<- curl::handle_data(handle)
      list(status_code = if (grepl("vcf.gz.tbi", url, fixed = TRUE)) 206L else 403L, content = raw(1))
    },
    .package = "curl"
  )
  expect_equal(index_of("https://example.org/x.vcf.gz?token=1"), "https://example.org/x.vcf.gz.tbi?token=1")
  expect_null(index_of("https://example.org/x.vcf"))
  expect_false(isTRUE(asked$nobody))
})

test_that("a file:// URL reads as its local path, with or without a query", {
  file <- paste0(index, ".segs.bed.gz")
  url <- paste0("file://", normalizePath(file), "?v=1")
  expect_identical(fetch_range(url, "10", "20"), file_range(file, 10, 20))
  expect_error(fetch_range("/no/such.gz", 0, 10), "does not exist")
})

test_that("the engine refuses to start in a process other than the one that loaded it", {
  expect_false(engine_forked(Sys.getpid()))
  expect_true(engine_forked(Sys.getpid() + 1L))
})

test_that("a forked worker refuses to start the engine, and inherits a started one", {
  skip_on_os("windows")
  engine()
  in_fork <- function(f) parallel::mccollect(parallel::mcparallel(f()))[[1]]
  expect_equal(in_fork(function() engine()$eval("1 + 1")), "2")
  expect_match(in_fork(function() {
    assign("ctx", NULL, envir = environment(engine))
    tryCatch(engine(), error = conditionMessage)
  }), "forked worker")
})

test_that("a range past the end of a file is empty or short, never an error", {
  file <- paste0(index, ".segs.bed.gz")
  size <- file.size(file)
  expect_length(file_range(file, 0, 1e6), size)
  expect_length(file_range(file, size - 10, 1e6), 10)
  expect_length(file_range(file, size + 5, 100), 0)
  expect_length(file_range(file, 3, 0), 0)
})

test_that("a region parses from the browser's 1-based locus", {
  expect_equal(
    parse_region("GRCh38#0#chr6:31,000,001-31,100,000"),
    list(refName = "GRCh38#0#chr6", start = 31000000, end = 31100000)
  )
  expect_error(parse_region("chr6:0-100"), "1 <= start <= end")
  expect_error(parse_region("chr6:500-100"), "1 <= start <= end")
  expect_equal(parse_region("chr6:7-7")[c("start", "end")], list(start = 6, end = 7))
  expect_equal(parse_region("chr6:7")[c("start", "end")], list(start = 6, end = 7))
  expect_equal(
    parse_region(" chr6:1,001..2,000 ")[c("start", "end")],
    list(start = 1000, end = 2000)
  )
})

test_that("the bundle's TextDecoder reads long ASCII runs and UTF-8 alike", {
  ctx <- engine()
  text <- paste0(strrep("a", 9000), "é∑\U0001F600", strrep("b", 10))
  expect_identical(
    ctx$call("s => new TextDecoder().decode(new TextEncoder().encode(s))", text),
    text
  )
  expect_identical(
    ctx$eval("new TextDecoder().decode(new Uint8Array([0x61, 0xff, 0x62]))"),
    "a�b"
  )
})
