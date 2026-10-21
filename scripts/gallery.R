# Draws gallery/*.png from hosted files, and writes docs/gallery.md
# and the README's gallery table from the same code:
#   Rscript scripts/gallery.R            every figure
#   Rscript scripts/gallery.R c4_stress  one figure, and the docs

definitions <- list(
  walks = 'walks <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f5.GRCh38.walks.bed.gz"',
  index = 'index <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38.anchored.segs.bed.gz"',
  genes = 'genes <- "https://jbrowse.org/ucsc/hg38/ncbiRefSeq.gff.gz"',
  kiv2 = 'kiv2 <- "chr6:160,616,004-160,646,753"',
  five = 'five <- c("HG00097#1", "HG00099#1", "HG00133#2", "HG01123#1", "HG02055#1")',
  twelve = paste(
    'twelve <- c(',
    '  "CHM13#0",',
    '  paste0(rep(c("HG00097", "HG00099", "HG00126", "HG00128", "HG00133", "HG002"), each = 2), "#", 1:2)',
    ')',
    sep = "\n"
  ),
  syng = 'syng <- "https://raw.githubusercontent.com/GMOD/jbrowse-plugin-graphgenomeviewer/main/test_data/syng/c4.syng.gfa.gz"'
)

standalone <- function(code) {
  uses <- function(pattern) grepl(pattern, code, perl = TRUE)
  needed <- Filter(function(name) uses(sprintf("(?<![.\\w])%s(?![.\\w])(?!\\s*=)", name)), names(definitions))
  libraries <- c(
    "library(ggbandage)",
    if (uses("ggplot|guides\\(|element_text|margin\\(|scale_|coord_|theme")) "library(ggplot2)",
    if (uses("wrap_plots|plot_layout|\\) / ")) "library(patchwork)"
  )
  paste(c(libraries, "", unlist(definitions[needed]), if (length(needed)) "", code), collapse = "\n")
}

figure <- function(id, title, locus, alt, code, width = 10, height = 6, note = NULL,
                   readme = TRUE) {
  list(
    id = id, title = title, locus = locus, alt = alt, code = code,
    width = width, height = height, note = note, readme = readme
  )
}

figures <- list(
  figure(
    "kiv2_stress", "KIV-2 against a straight GRCh38 backbone, with LPA's exons", "chr6:160,616,004-160,646,753",
    "Stress layout of the KIV-2 array from the hosted index: GRCh38 drawn straight and coloured by position, LPA's exons outlined in orange, non-reference nodes in grey hanging below, and dashed arches where haplotypes skip reference sequence",
    r"(g <- bandage_layout(index, region = kiv2, engine = "stress", genes = genes)
ggplot(g) +
  geom_bandage_edges() +
  geom_bandage_genes() +
  geom_bandage_nodes(aes(colour = I(ifelse(backbone, color, "grey70")))) +
  coord_fixed() +
  theme_void())",
    width = 8, height = 4.4, readme = TRUE
  ),
  figure(
    "kiv2_walks", "LPA's KIV-2 repeat, a panel per walk", "chr6:160,616,004-160,646,753",
    "Force-directed layout of the KIV-2 array cut from the walk file for HG00097, GRCh38 and HG00097 each lifted in a separate panel and shaded yellow to red along its length: HG00097 walks one 22 kb loop that GRCh38 skips, and the panel titles give HG00097 55 kb and GRCh38 32.8 kb, each span the region plus 1 kb of flank either side",
    r"(g <- bandage_layout(
  walks,
  region = kiv2, haplotypes = "HG00097#1",
  walks = c("GRCh38", "HG00097#1"),
  facet = "walk"
)
autoplot(g, ncol = 2))",
    height = 4
  ),
  figure(
    "kiv2_overlay", "Three KIV-2 haplotypes overlaid", "chr6:160,616,004-160,646,753",
    "Force-directed KIV-2 array with three walks lifted together, each shaded along its own length from light to mid-tone: GRCh38 light to mid grey, HG00133#1 cyan to blue, 116 kb longer, and HG00097#1 yellow to red-orange, 22.2 kb longer. Where walks share nodes their lanes run side by side. HG00097#1 alone runs the loop at the top, and HG00133#1 alone runs the large loop below and the small loops at the right. Walk rows below give each haplotype's length",
    r"(haps <- c("HG00133#1", "HG00097#1")
progress <- lapply(c("GRCh38", haps), function(w) list(walk = w, color = list(field = "progress")))
g <- bandage_layout(walks, region = kiv2, haplotypes = haps, walks = progress, genes = genes)
rows <- bandage_walk_rows(walks, kiv2, haplotypes = haps)
autoplot(g) / autoplot(rows, ribbons = FALSE) + plot_layout(heights = c(2.5, 1)))",
    width = 8, height = 9, readme = TRUE
  ),
  figure(
    "cfh_overlay", "CFHR3 and CFHR1 deleted in one of three walks", "chr1:196,640,001-196,900,000",
    "Force-directed CFH locus with GRCh38, HG00097#1 and HG02055#1 lifted together, each coloured red to magenta by GRCh38 position, and walk rows below in the same hues. The three walks share each position's hue, so their lanes read as one band. HG02055#1, 84.5 kb shorter, takes the dashed deletion edge under the loop through CFHR3 and CFHR1, and its row jumps from green to blue there",
    r"(cfh <- "chr1:196,640,001-196,900,000"
haps <- c("HG00097#1", "HG02055#1")
hued <- lapply(c("GRCh38", haps), function(w) list(walk = w, color = list(field = "reference", scheme = "rainbow")))
g <- bandage_layout(walks, region = cfh, haplotypes = haps, walks = hued, genes = genes)
rows <- bandage_walk_rows(walks, cfh, haplotypes = haps)
autoplot(g) / autoplot(rows, ribbons = FALSE, hues = "bandage") + plot_layout(heights = c(1.5, 1)))",
    width = 9, height = 5
  ),
  figure(
    "kiv2_rows", "KIV-2 copy number as walk rows", "chr6:160,616,004-160,646,753",
    "Walk rows at KIV-2 on a bp-from-flank axis: between the flanking reference nodes GRCh38 spans 31 kb and HG00133#2 164 kb, and the extra copies, on non-reference nodes, fall into three blocks: A, 68 kb walked by HG02055#1 and HG00133#2; B, 22 kb walked by four haplotypes; and C, 5.5 kb walked by two",
    r"(rows <- bandage_walk_rows(walks, kiv2, haplotypes = five)
autoplot(rows))",
    height = 4.4
  ),
  figure(
    "amylase_rows", "Amylase copy number in twelve haplotypes", "chr1:103,540,000-103,780,000",
    "Walk rows over the salivary amylase genes, each bar coloured by the GRCh38 position it covers: the haplotypes span 146 kb to 475 kb, HG00128#1 walks the stretch near 103.72 Mb twice, so its green recurs, five haplotypes walk much of the non-reference block A twice, and HG00097#1 has a 19 kb stretch the graph lacks, drawn as an open box",
    r"(rows <- bandage_walk_rows(walks, "chr1:103,540,000-103,780,000", haplotypes = twelve)
autoplot(rows))",
    height = 6, readme = TRUE
  ),
  figure(
    "c4_stress", "C4A and C4B in the stress layout", "chr6:31,978,000-32,040,000",
    "Stress layout of the complement C4 genes in the MHC, GRCh38 drawn straight, its C4A and C4B the long forms: non-reference sequence hangs in loops below C4A and C4B, and a dashed arch from inside C4A to inside C4B skips one module of C4, CYP21A1P and TNXA",
    r"(g <- bandage_layout(
  index,
  region = "chr6:31,978,000-32,040,000", engine = "stress", genes = genes
)
autoplot(g))",
    height = 2.6
  ),
  figure(
    "deletions", "RHD and CYP2D6 gene deletions as arches", "RHD, CYP2D6",
    "RHD and CYP2D6 in the stress layout, one above the other, GRCh38 straight and genes named: in each, a dashed arch spans the whole gene, the route of haplotypes that skip it, and non-reference sequence hangs in grey",
    r"(deletions <- c(
  RHD = "chr1:25,250,000-25,450,000",
  CYP2D6 = "chr22:42,118,000-42,136,000"
)
plots <- Map(
  function(gene, region) {
    g <- bandage_layout(index, region = region, engine = "stress", genes = genes)
    ggplot(g) +
      geom_bandage_edges() +
      geom_bandage_genes() +
      geom_bandage_nodes(aes(colour = I(ifelse(backbone, color, "grey70")))) +
      coord_fixed(clip = "off") +
      labs(title = gene, subtitle = region) +
      theme_void() +
      theme(plot.title = element_text(face = "italic"), plot.margin = margin(4, 12, 4, 12))
  },
  names(deletions), deletions
)
wrap_plots(plots, ncol = 1, heights = c(1, 2.5)))",
    height = 5.2
  ),
  figure(
    "syng_c4", "C4 as a syng graph from impg", "chr6:31,972,047-32,055,647",
    "Force-directed syng graph of C4 from 90 haplotypes: a ring coloured red to magenta along GRCh38, whose two C4 copies share its nodes, with blue specks where only the second copy goes. Under it, walk rows for three samples in the same hues: GRCh38 is one smooth gradient over 84 kb, HG02080's 51 kb haplotype has one copy and HG01978's 116 kb haplotype three, each copy in the colours of the GRCh38 copy it continues",
    r"(g <- bandage_layout(syng)
rows <- bandage_walk_rows(syng, haplotypes = c("HG02080", "HG00735", "HG01978"))
(autoplot(g) + guides(fill = "none")) /
  autoplot(rows, ribbons = FALSE, hues = "bandage") +
  plot_layout(heights = c(2.5, 1)))",
    width = 9, height = 8.5,
    note = c(
      "[impg](https://github.com/pangenome/impg) builds a",
      "[syng](https://github.com/richarddurbin/syng) graph with no alignment step;",
      "[build.sh](https://github.com/GMOD/jbrowse-plugin-graphgenomeviewer/blob/main/test_data/syng/build.sh)",
      "in jbrowse-plugin-graphgenomeviewer cuts this one from odgi's C4 test haplotypes.",
      "",
      "- GRCh38 has C4A and C4B, two copies of a 32.7 kb module, and syng puts both on",
      "  one copy's nodes: GRCh38 walks the ring twice, and a haplotype's copy count is",
      "  how often it goes round",
      "- A layout node takes its first visit's colour, so the ring shows C4A's hues. The",
      "  blue specks are nodes GRCh38 walks only in C4B, where C4B differs from C4A",
      "- A walk row follows each copy to the GRCh38 copy it continues, and switches where",
      "  it walks a node only C4A or only C4B holds: HG00735#1's second copy starts on",
      "  C4A's own sequence, so it takes C4A's hues",
      "- `hues = \"bandage\"` gives the rows the layout's hues. Ribbons are off, since",
      "  the rows share almost every node"
    )
  ),
  figure(
    "syng_overlay", "C4's HERV-K loop in three syng walks", "chr6:31,972,047-32,055,647",
    "The syng graph of C4 with three walks lifted together, one flat colour each and a thread for every pass through a node: round the ring, outside in, GRCh38 in charcoal draws two threads, HG01978#2 in blue three, its extra C4 copy, and HG01952#1 in orange two. Charcoal and blue threads run round the loop at the left, and the orange ones cut across it. Walk rows below, in the key's order, each in its walk's colour and paler off the GRCh38 path, give the lengths: GRCh38 84 kb, HG01978#2 116 kb and HG01952#1 71 kb",
    r"(haps <- c("HG01978#2", "HG01952#1")
g <- bandage_layout(syng, walks = c("grch38", haps))
rows <- bandage_walk_rows(syng, haplotypes = haps)
autoplot(g) / autoplot(rows, ribbons = FALSE, hues = "walk", layout = g) + plot_layout(heights = c(2.5, 1)))",
    width = 7, height = 8.5,
    note = c(
      "- The ring holds every C4 copy's sequence once, so a walk with more copies goes",
      "  round it more often. Each walk draws a thread per pass: GRCh38 two round the",
      "  ring, and HG01978#2 three, its extra 32.7 kb. The rows show that as a longer bar",
      "- Each row takes its walk's colour in the drawing, paler where it leaves the GRCh38 path",
      "- The loop at the left is the HERV-K in C4's intron 9, which makes a C4 long.",
      "  GRCh38's C4A and C4B both contain it, and both of HG01952#1's copies lack it"
    )
  ),
  figure(
    "syng_ramp", "C4's HERV-K loop with each walk on a position ramp", "chr6:31,972,047-32,055,647",
    "The syng graph of C4 with GRCh38, HG01978#2 and HG01952#1 lifted together and drawn as a thread per pass through a node, every thread coloured red to magenta by the GRCh38 position its node covers, and walk rows below in the same hues. Every thread shares its node's hue, so the gaps between lanes tell the walks apart. Round the ring seven threads run in groups of two, three and two, the key's order outside in, so HG01978#2 draws one more than GRCh38 and HG01952#1. Five threads run round the loop at the left, the 6.5 kb HERV-K of C4's long form. HG01978#2's row is 32.7 kb longer than GRCh38's and HG01952#1's 12.7 kb shorter",
    r"(haps <- c("HG01978#2", "HG01952#1")
hued <- lapply(c("grch38", haps), function(w) list(walk = w, color = list(field = "reference", scheme = "rainbow")))
g <- bandage_layout(syng, walks = hued)
rows <- bandage_walk_rows(syng, haplotypes = haps)
autoplot(g) / autoplot(rows, ribbons = FALSE, hues = "bandage") + plot_layout(heights = c(2.5, 1)))",
    width = 8, height = 8.5,
    note = c(
      "- Each thread takes the hue of the GRCh38 position its node covers, as the rows",
      "  below do, so drawing and rows share one scale, and every pass through a node",
      "  takes the same hue. The gaps between lanes tell the walks apart: the lanes run",
      "  in the key's order, outside in, and HG01978#2 draws three threads round the",
      "  ring where GRCh38 draws two, one 32.7 kb copy more",
      "- The loop at the left is the HERV-K in C4's intron 9, which makes a C4 long.",
      "  GRCh38's C4A and C4B both contain it, and both of HG01952#1's copies lack it"
    )
  ),
  figure(
    "syng_kiv2", "KIV-2 copy number in a syng graph", "chr6:160,616,004-160,646,753",
    "Force-directed syng graph of KIV-2 from 21 HPRC haplotypes: the repeat units fold onto one ring coloured along GRCh38, with dashed grey loops of sequence GRCh38 lacks. Under it, walk rows in the same hues: GRCh38 spans 33 kb, and five haplotypes span 38 kb to 177 kb, each repeating the ring's colours once per extra 5.5 kb unit",
    r"(kiv2_syng <- system.file("extdata", "kiv2.syng.gfa.gz", package = "ggbandage")
g <- bandage_layout(kiv2_syng)
rows <- bandage_walk_rows(kiv2_syng, haplotypes = c("HG00658#2", "NA18976#1", "HG02451#1", "NA18970#2", "NA18508#2"))
(autoplot(g) + guides(fill = "none")) /
  autoplot(rows, ribbons = FALSE, hues = "bandage") +
  plot_layout(heights = c(2.5, 1)))",
    width = 9, height = 8.5,
    note = c(
      "The KIV-2, amylase and RHD syng graphs are region-specific pangenomes.",
      "`scripts/build-syng-region.sh` cuts each region from the HPRC walk file to find",
      "each haplotype's contig span, fetches those spans from GenBank, and builds the",
      "graph with [impg](https://github.com/pangenome/impg). ggbandage ships the",
      "graphs in `inst/extdata`.",
      "",
      "- Syng folds every KIV-2 unit onto one ring, so a haplotype's copy count is how",
      "  often its walk goes round",
      "- The haplotypes differ in steps of about 5.5 kb, one unit each"
    )
  ),
  figure(
    "syng_amy", "Amylase copy number in a syng graph", "chr1:103,540,000-103,780,000",
    "Force-directed syng graph of the salivary amylase genes from 16 HPRC haplotypes, coloured along GRCh38, its copies folded onto shared loops. Under it, walk rows: GRCh38 spans 242 kb, HG00706#1 148 kb, HG02965#1 336 kb and HG01106#2 430 kb, and HG02080#1 matches GRCh38's length but walks the non-reference blocks A and B",
    r"(amy_syng <- system.file("extdata", "amy.syng.gfa.gz", package = "ggbandage")
g <- bandage_layout(amy_syng)
rows <- bandage_walk_rows(amy_syng, haplotypes = c("HG00706#1", "HG02080#1", "HG02965#1", "HG01106#2"))
(autoplot(g) + guides(fill = "none")) /
  autoplot(rows, ribbons = FALSE, hues = "bandage") +
  plot_layout(heights = c(2.5, 1)))",
    width = 9, height = 8.5,
    note = c(
      "- The haplotypes come in four lengths 94 kb apart, 148, 242, 336 and 430 kb, one",
      "  amylase repeat unit each",
      "- HG01106#2 repeats GRCh38's cyan and blue stretch, and HG00706#1 lacks one copy"
    )
  ),
  figure(
    "syng_rhd", "RHD deletion and duplication in a syng graph", "chr1:25,250,000-25,450,000",
    "Force-directed syng graph of RHD from 19 HPRC haplotypes, coloured along GRCh38, with a grey edge where deleted haplotypes jump past RHD. Under it, walk rows: GRCh38 spans 202 kb, HG01258#2 132 kb, jumping from red to green, and HG01106#1 272 kb, repeating RHD's orange to green hues",
    r"(rhd_syng <- system.file("extdata", "rhd.syng.gfa.gz", package = "ggbandage")
g <- bandage_layout(rhd_syng)
rows <- bandage_walk_rows(rhd_syng, haplotypes = c("HG01258#2", "HG02451#2", "HG01106#1"))
(autoplot(g) + guides(fill = "none")) /
  autoplot(rows, ribbons = FALSE, hues = "bandage") +
  plot_layout(heights = c(2.5, 1)))",
    width = 9, height = 8.5,
    note = c(
      "- The Rhesus boxes either side of RHD share their nodes, so GRCh38 walks them",
      "  twice",
      "- Six of the 18 other haplotypes span about 132 kb. They walk the boxes once and",
      "  skip RHD, the deletion that most often makes blood RhD-negative",
      "- HG01106#1 walks the boxes three times and has a second RHD"
    )
  ),
  figure(
    "own_colours", "Your own colours: KIV-2 nodes by walk passes", "chr6:160,616,004-160,646,753",
    "The KIV-2 array cut from the walk file, force-directed and drawn with plain ggplot2 layers: grey edges, and each node coloured by how many times the cut's walks pass through it, light for once to dark for six",
    r"(g <- bandage_layout(walks, region = kiv2, haplotypes = five)
ggplot(g) +
  geom_bandage_edges(aes(colour = I("grey80"))) +
  geom_bandage_nodes(aes(colour = depth)) +
  scale_colour_viridis_c(
    "walk passes through node",
    option = "mako", direction = -1, end = 0.85, breaks = 1:6
  ) +
  coord_fixed() +
  theme_void() +
  theme(legend.position = "bottom"))",
    width = 6.5, height = 6.5
  )
)

draw <- function(f) {
  started <- Sys.time()
  p <- eval(parse(text = standalone(f$code)), new.env())
  ggplot2::ggsave(
    file.path("gallery", paste0(f$id, ".png")), p,
    width = f$width, height = f$height, dpi = 150, bg = "white"
  )
  message(sprintf("%s %.1f s", f$id, as.numeric(Sys.time() - started, units = "secs")))
}

docs <- function() {
  out <- c(
    "# Gallery",
    "",
    "Every snippet runs on its own. `scripts/gallery.R` draws them all.",
    "",
    "## The data files",
    "",
    "| Variable | File | How it was made |",
    "| --- | --- | --- |",
    "| `walks` | HPRC v2.1 GRCh38 walk file | `gfa-to-tabix hprc-v2.1-mc-grch38.gfa.gz --walks --refs GRCh38,CHM13 -o hprc-v2.1-mc-grch38-f5`, as in [Hosting your own graph](https://jbrowse.org/jb2/docs/tutorials/pangenome_prepare_graph/). `f5` is the walk file format, gfa-to-tabix's format 5 |",
    "| `index` | HPRC v2.1 GRCh38 segment index | `gfa-to-tabix hprc-v2.1-mc-grch38.sv.gfa.gz --layout anchored -o hprc-v2.1-mc-grch38.anchored`. `anchored` is the layout: every node filed under the reference interval its bubble hangs from |",
    "| `genes` | UCSC hg38 ncbiRefSeq GFF3, bgzipped and tabix-indexed | Hosted by JBrowse, used as is |",
    "| `syng` | C4 syng graph from 90 haplotypes | [build.sh](https://github.com/GMOD/jbrowse-plugin-graphgenomeviewer/blob/main/test_data/syng/build.sh) runs [impg](https://github.com/pangenome/impg) on odgi's C4 test haplotypes |",
    "",
    "The HPRC graphs are the files behind the",
    "[JBrowse HPRC tutorial](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc/).",
    "[Your own pangenome](../README.md#your-own-pangenome) has the steps for another graph."
  )
  for (f in figures) {
    out <- c(
      out, "", paste("##", f$title), "", paste0("`", f$locus, "`"), "",
      if (!is.null(f$note)) c(f$note, ""),
      sprintf("![%s](../gallery/%s.png)", f$alt, f$id), "",
      "```r", standalone(f$code), "```"
    )
  }
  writeLines(out, file.path("docs", "gallery.md"))
}

anchor <- function(title) {
  gsub(" ", "-", gsub("[^a-z0-9 -]", "", tolower(title)))
}

readme <- function() {
  cell <- function(f) {
    sprintf(
      '<td width="25%%"><a href="docs/gallery.md#%s"><img src="gallery/%s.png" alt="%s" width="100%%"></a><br>%s</td>',
      anchor(f$title), f$id, f$alt, f$title
    )
  }
  cards <- Filter(function(f) f$readme, figures)
  rows <- split(cards, ceiling(seq_along(cards) / 4))
  table <- c(
    "<table>",
    vapply(rows, function(r) paste0("<tr>", paste(vapply(r, cell, ""), collapse = ""), "</tr>"), ""),
    "</table>"
  )
  text <- readLines("README.md")
  from <- which(text == "<!-- gallery -->")
  to <- which(text == "<!-- /gallery -->")
  writeLines(c(text[seq_len(from)], table, text[to:length(text)]), "README.md")
}

devtools::load_all(quiet = TRUE)
dir.create("gallery", showWarnings = FALSE)
wanted <- commandArgs(TRUE)
for (f in figures) {
  if (!length(wanted) || f$id %in% wanted) draw(f)
}
docs()
readme()
