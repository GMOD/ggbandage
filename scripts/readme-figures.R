# Draws man/figures from the hosted HPRC files: Rscript scripts/readme-figures.R
# The combination figures also need ggjbrowse and ggtubemap
devtools::load_all(quiet = TRUE)
library(ggplot2)
library(patchwork)

out <- function(name) file.path("man", "figures", name)
walks <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f2.GRCh38.walks.bed.gz"
index <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38.anchored.segs.bed.gz"
genes <- "https://jbrowse.org/ucsc/hg38/ncbiRefSeq.gff.gz"
kiv2 <- "chr6:160,616,004-160,646,753"
haplotypes <- c("HG00097#1", "HG00099#1", "HG00133#2", "HG01123#1", "HG02055#1")

g <- bandage_layout(
  walks,
  region = kiv2, haplotypes = haplotypes,
  walks = c("GRCh38#0#chr6", "HG00097#1#JBIRDD010000043.1"),
  facet = "walk"
)
ggsave(out("kiv2.png"), autoplot(g, ncol = 2), width = 10, height = 6)

rows <- bandage_walk_rows(walks, kiv2, haplotypes = haplotypes)
ggsave(out("kiv2-rows.png"), autoplot(rows), width = 10, height = 3.2)

g <- bandage_layout(index, region = kiv2, engine = "stress", genes = genes)
ggsave(out("kiv2-stress.png"), autoplot(g), width = 10, height = 4)

deletions <- c(
  RHD = "chr1:25,250,000-25,450,000",
  AMY1 = "chr1:103,540,000-103,780,000",
  C4 = "chr6:31,975,000-32,060,000",
  CYP2D6 = "chr22:42,115,000-42,155,000"
)
plots <- Map(
  function(gene, region) {
    autoplot(bandage_layout(index, region = region, engine = "stress")) +
      ggtitle(gene)
  },
  names(deletions), deletions
)
ggsave(out("deletions.png"), wrap_plots(plots, ncol = 2), width = 14, height = 5)

# Genes, walk rows and the graph of one cut
track <- ggjbrowse::jbrowse_features(
  genes, "chr6", 160616003, 160646753,
  index = paste0(genes, ".csi")
)
cut <- tempfile(fileext = ".gfa")
writeLines(bandage_gfa(walks, kiv2, haplotypes = haplotypes), cut)
lifted <- "HG00133#2#CM090065.1"
force <- bandage_layout(cut, walks = lifted, genes = genes)
stress <- bandage_layout(cut, walks = lifted, genes = genes, engine = "stress")
x <- c(rows$origin, max(rows$rows$xmax))
combined <- (autoplot(track) + coord_cartesian(xlim = x)) /
  (autoplot(rows, readouts = FALSE) + coord_cartesian(xlim = x)) /
  (autoplot(force) | autoplot(stress)) +
  plot_layout(heights = c(2, 2, 5))
ggsave(out("kiv2-combined.png"), combined, width = 12, height = 11)

# A tube map and the force layout of one short cut
str <- tempfile(fileext = ".gfa")
writeLines(
  bandage_gfa(
    walks, "chr6:160,653,940-160,654,130",
    haplotypes = c("CHM13#0", haplotypes), context = 0
  ),
  str
)
tm <- ggtubemap::tubemap_layout(
  ggtubemap::read_gfa(str, reference = "GRCh38#0#chr6"),
  node_width = "compressed"
)
g <- bandage_layout(str, walks = lifted, width = 600)
ggsave(
  out("str-tubemap.png"),
  autoplot(tm) / autoplot(g, labels = TRUE),
  width = 10, height = 8
)
