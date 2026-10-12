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

test_that("a region parses from the browser's 1-based locus", {
  expect_equal(
    parse_region("GRCh38#0#chr6:31,000,001-31,100,000"),
    list(refName = "GRCh38#0#chr6", start = 31000000, end = 31100000)
  )
})
