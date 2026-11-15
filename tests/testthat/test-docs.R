root <- test_path("..", "..")
docs <- c(
  file.path(root, c("README.md", file.path("docs", "gallery.md"))),
  list.files(file.path(root, "vignettes"), "\\.Rmd$", full.names = TRUE)
)

test_that("the README, gallery and vignettes read the format 8 HPRC walk file", {
  skip_if_not(all(file.exists(docs)), "the docs are outside the installed package")
  text <- unlist(lapply(docs, readLines))
  hosted <- regmatches(text, regexpr("https://jbrowse\\.org/demos/hprc/[^\"`]*\\.walks\\.gz", text))
  expect_identical(
    unique(hosted),
    "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f8.GRCh38.walks.gz"
  )
})
