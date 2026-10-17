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

test_that("a server that ignores Range still yields the bytes asked for", {
  file <- paste0(index, ".segs.bed.gz")
  whole <- readBin(file, "raw", file.size(file))
  local_mocked_bindings(
    curl_fetch_memory = function(url, handle) {
      list(status_code = 200L, content = whole)
    },
    .package = "curl"
  )
  url <- "https://example.org/x.segs.bed.gz"
  for (range in list(c(0, 100), c(10, 20), c(5, -1), c(0, 1e6))) {
    expect_identical(
      url_range(url, range[1], range[2]),
      file_range(file, range[1], range[2])
    )
  }
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
