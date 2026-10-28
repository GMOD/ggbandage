sites <- test_path("testdata", "sites.vcf")
pggb <- test_path("testdata", "ecoli_pggb_subgraph.gfa")

frequency_of <- function(f) stats::setNames(f$frequency, f$name)

test_that("a node's frequency sums its alleles' frequencies times their passes", {
  f <- frequency_of(vcf_frequencies(sites))
  # AF; the reference takes 0.5, and the second ALT passes node 3 twice
  expect_equal(f[c("1", "2", "3")], c("1" = 1, "2" = 0.5, "3" = 0.75))
  # AC / AN, and node 4 ends both sites at 1
  expect_equal(f[c("4", "5", "6")], c("4" = 1, "5" = 0.75, "6" = 0.25))
  # three called alleles, two of them ALT
  expect_equal(f[c("7", "8", "9")], c("7" = 1, "8" = 1 / 3, "9" = 1))
})

test_that("an AF given as `.` falls back to the called genotypes", {
  record <- c(
    "chr1", "10", ".", "A", "G", ".", ".", "AT=>1>2>4,>1>3>4;AF=.;LV=0",
    "GT", "0|1", "1|1"
  )
  expect_silent(f <- site_frequencies(record))
  expect_equal(f[c("2", "3")], c("2" = 0.25, "3" = 0.75))
})

test_that("a nested site's alleles count only through its parent's", {
  f <- frequency_of(vcf_frequencies(sites))
  expect_equal(f[["2"]], 0.5)
  expect_equal(f[["5"]], 0.75)
})

test_that("a region keeps the sites under it, read by index or from the whole file", {
  plain <- vcf_frequencies(sites, "chr1:40-60")
  expect_setequal(plain$name, c("4", "5", "6", "7"))
  expect_equal(vcf_frequencies(paste0(sites, ".gz"), "chr1:40-60"), plain)
})

test_that("frequencies widen the nodes they name, and the node table carries them", {
  name <- bandage_layout(pggb)$nodes$name[1]
  g <- bandage_layout(
    pggb,
    nodeWidth = "frequency",
    frequencies = data.frame(name = name, frequency = 0.25)
  )
  expect_equal(unique(g$nodes$frequency[g$nodes$name == name]), 0.25)
  expect_equal(unique(g$nodes$width[g$nodes$name == name]), 6 * 0.25)
  expect_equal(g$meta$frequencyKey$label, c("100%", "50%", "10%"))
  expect_no_error(ggplot2::ggplot_build(ggplot2::autoplot(g)))
})

test_that("with no walks to count, the node table's frequency is NA", {
  g <- bandage_layout(test_path("testdata", "ecoli_rgfa_slice.gfa.gz"))
  expect_true(all(is.na(g$nodes$frequency)))
  expect_null(g$meta$frequencyKey)
})
