# Draws gallery/*.png from hosted files, and writes docs/gallery.md
# and the README's gallery table from the same code:
#   Rscript scripts/gallery.R            every figure
#   Rscript scripts/gallery.R c4_stress  one figure, and the docs
#   Rscript scripts/gallery.R --check    fails on a snippet calling a function
#                                        that doesn't exist, or on stale docs

definitions <- list(
  walks = 'walks <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f8.GRCh38.walks.gz"',
  index = 'index <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38.anchored.graph.bed.gz"',
  genes = 'genes <- "https://jbrowse.org/ucsc/hg38/ncbiRefSeq.gff.gz"',
  kiv2 = 'kiv2 <- "chr6:160,616,004-160,646,753"',
  five = 'five <- c("HG00097#1", "HG00099#1", "HG00133#2", "HG01123#1", "HG02055#1")',
  syng = 'syng <- "https://raw.githubusercontent.com/GMOD/jbrowse-plugin-graphgenomeviewer/main/test_data/syng/c4.syng.gfa.gz"'
)

standalone <- function(code) {
  uses <- function(pattern) grepl(pattern, code, perl = TRUE)
  needed <- Filter(function(name) uses(sprintf("(?<![.\\w])%s(?![.\\w])(?!\\s*=)", name)), names(definitions))
  libraries <- c(
    "library(ggbandage)",
    if (uses("ggplot|guides\\(|element_text|margin\\(|scale_|coord_|theme|annotate\\(|geom_(?!bandage)|labs\\(|aes\\(")) "library(ggplot2)",
    if (uses("wrap_plots|plot_layout|\\) / ")) "library(patchwork)"
  )
  paste(c(libraries, "", unlist(definitions[needed]), if (length(needed)) "", code), collapse = "\n")
}

figure <- function(id, title, locus, alt, code, width = 10, height = 6, note = NULL,
                   readme = FALSE) {
  list(
    id = id, title = title, locus = locus, alt = alt, code = code,
    width = width, height = height, note = note, readme = readme
  )
}

figures <- list(
  figure(
    "cfh_overlay", "CFHR3 and CFHR1 deleted in one haplotype", "chr1:196,640,001-196,900,000",
    "Force-directed CFH locus with GRCh38, HG00097 and HG02055 lifted together, each shaded along its own length: GRCh38 grey, HG00097 cyan to blue and HG02055 pink to plum. GRCh38 and HG00097 run the loop through CFHR3 and CFHR1, and HG02055 alone takes the edge under it that skips both genes, its lane drawn along the edge. Walk rows below, each on its walk's ramp, give the lengths, GRCh38 and HG00097 260 kb and HG02055 175 kb, and the ribbons from HG00097 down to HG02055 break across the 85 kb HG02055 lacks",
    r"(cfh <- "chr1:196,640,001-196,900,000"
haps <- c("HG00097#1", "HG02055#1")
schemes <- c(GRCh38 = "grey", "HG00097#1" = "blue", "HG02055#1" = "purple")
progress <- lapply(names(schemes), function(w) list(walk = w, color = list(field = "progress", scheme = schemes[[w]])))
g <- bandage_layout(walks, region = cfh, haplotypes = haps, walks = progress, genes = genes)
rows <- bandage_walk_rows(walks, cfh, haplotypes = haps)
autoplot(g) / autoplot(rows, hues = "walk", layout = g) + plot_layout(heights = c(1, 1.2)))",
    width = 9, height = 5, readme = TRUE
  ),
  figure(
    "kiv2_rows", "KIV-2 copy number as walk rows", "chr6:160,616,004-160,646,753",
    "Walk rows at KIV-2 on a bp-from-flank axis: between the flanking reference nodes GRCh38 spans 31 kb and HG00133#2 164 kb, and the non-reference sequence several rows share falls into three blocks: A, walked by HG02055#1 and HG00133#2; B, walked by four haplotypes; and C, walked by two. HG02055#1 walks block A in place of nearly all of GRCh38's array",
    r"(rows <- bandage_walk_rows(walks, kiv2, haplotypes = five)
autoplot(rows) +
  theme(legend.position = "inside", legend.position.inside = c(1, 0), legend.justification.inside = c(1, 0)))",
    width = 9, height = 5, readme = TRUE,
    note = c(
      "- GRCh38 is the shortest row, and 462 of the 463 HPRC haplotypes in the walk",
      "  file are longer than GRCh38 here"
    )
  ),
  figure(
    "amylase_rows", "Amylase haplotypes from 146 to 474 kb", "chr1:103,540,000-103,780,000",
    "Walk rows over the salivary amylase genes for GRCh38 and seven haplotypes, each bar coloured by the GRCh38 position it covers: across the region, against GRCh38's 240 kb, the haplotypes span 146 kb to 474 kb. HG00128#1 walks the non-reference block A twice, HG002#1 once in full and most of it a second time, and CHM13 and HG00097#2 once. HG00099#1 and HG00097#1 walk no block A; nearer the left they walk block C, which replaces a shorter stretch of GRCh38, and 19 kb of HG00097#1 is left out of the graph, drawn as an open box",
    r"(amylase <- c("HG00128#1", "CHM13#0", "HG00097#2", "HG002#1", "HG00099#1", "HG00097#1", "HG00099#2")
rows <- bandage_walk_rows(walks, "chr1:103,540,000-103,780,000", haplotypes = amylase)
autoplot(rows))",
    width = 9, height = 5, readme = TRUE
  ),
  figure(
    "cyp2d6_stress", "CYP2D6 deletion as an arch over the gene", "chr22:42,118,000-42,136,000",
    "Stress layout of CYP2D6 from the hosted index, GRCh38 drawn straight and coloured by position from NDUFA6-DT to CYP2D7, exons outlined in gold: a dashed arch spans CYP2D6, the route of haplotypes that skip the gene, a small dashed arch at the left skips a short stretch of GRCh38, and non-reference sequence hangs in charcoal loops above and below",
    r"(g <- bandage_layout(index, region = "chr22:42,118,000-42,136,000", engine = "stress", genes = genes)
autoplot(g))",
    width = 9, height = 5, readme = TRUE
  ),
  figure(
    "kiv2_overlay", "KIV-2 expansions as loops off GRCh38", "chr6:160,616,004-160,646,753",
    "Force-directed KIV-2 array with GRCh38, HG00133 and HG00097 lifted together, each shaded along its own length from light to mid-tone: GRCh38 grey, HG00133 cyan to blue and HG00097 yellow to red-orange. GRCh38 runs straight from left to right, and where walks share nodes their lanes run side by side. HG00133 and HG00097 share one narrow loop near the right, with a boxed letter A at its tip, the nodes of block A. Of the three walks shown, only HG00133 runs the long loop at the right and the small loop near the left, sequence GRCh38 and HG00097 lack. Minigraph-Cactus stores copies beyond GRCh38's as new sequence rather than as extra turns round one copy, so the expansion shows in the loops' length and in the rows below, not in the number of loops. Walk rows below, each on its walk's ramp under a grey strip where it runs on the GRCh38 path, give the lengths: GRCh38 31 kb, HG00133 164 kb and HG00097 53 kb, with block A outlined in both",
    r"(haps <- c("HG00133#2", "HG00097#1")
progress <- lapply(c("GRCh38", haps), function(w) list(walk = w, color = list(field = "progress")))
g <- bandage_layout(walks, region = kiv2, haplotypes = haps, walks = progress, context = 30000)
rows <- bandage_walk_rows(walks, kiv2, haplotypes = haps)
steps <- bandage_walk_steps(walks, kiv2, haplotypes = haps)
(autoplot(g) + geom_bandage_blocks(rows, steps)) / autoplot(rows, ribbons = FALSE, hues = "walk", layout = g) + plot_layout(heights = c(1.6, 1)))",
    width = 7, height = 6.5, readme = TRUE,
    note = c(
      "- `geom_bandage_blocks()` letters each block of the walk rows on the graph, at",
      "  the block's node furthest from the middle, so block A in the rows is the",
      "  loop HG00133 and HG00097 share. It finds the block's nodes from",
      "  `bandage_walk_steps()`",
      "- `context = 30000` keeps 30 kb of GRCh38 past each end of the region, so the",
      "  reference runs in straight before it reaches the array",
      "- Minigraph-Cactus stores copies beyond GRCh38's as new sequence rather than as",
      "  extra turns round one copy, so read an expansion from a loop's length and the",
      "  rows below, not from the number of loops",
      "- A loop is longer where the walk carries more sequence, but not to scale with",
      "  GRCh38's line, so read lengths off the rows"
    )
  ),
  figure(
    "syng_rhd", "RHD deletion and duplication in an impg syng graph", "chr1:25,250,000-25,450,000",
    "Force-directed syng graph of RHD with RHD, TMEM50A and RHCE labelled and three walks lifted: grch38 in dark grey, HG01258#2 in purple, and HG01106#1 in blue, coloured by pass wherever it steps a node again, pass 1 orange, pass 2 pink and pass 3 amber, with arrowheads along its lane pointing the way it runs. Round the loop at the top, labelled RHD, run a grey grch38 thread and HG01106#1's orange pass 1 and pink pass 2 threads side by side. Pass 1 is labelled where the loop meets the threads to RHCE, pass 2 at the left where the walks come in, and pass 3, a short amber thread, beside it. HG01258#2 skips the RHD loop and runs down past TMEM50A and round to RHCE. A bar below shows HG01106#1 along its 272 kb under a bracket for each pass, orange from 10 to 80 kb, pink to 150 kb, a short amber stretch after it, and blue for the rest. Walk rows give grch38 202 kb, HG01106#1 272 kb and HG01258#2 132 kb",
    r"(rhd_syng <- system.file("extdata", "rhd.syng.gfa.gz", package = "ggbandage")
dup <- "HG01106#1"
del <- "HG01258#2"
lifted <- list(
  list(walk = "grch38", color = list(field = "walk", scheme = "grey")),
  list(walk = dup, color = list(field = "pass")),
  list(walk = del, color = list(field = "walk", scheme = "purple"))
)
g <- bandage_layout(rhd_syng, walks = lifted, genes = genes)
g$genes <- g$genes[g$genes$gene %in% c("RHD", "TMEM50A", "RHCE"), ]
g$exons <- g$exons[0, ]
rows <- bandage_walk_rows(rhd_syng, haplotypes = c(dup, del))
autoplot(g) / bandage_pass_bar(g) / autoplot(rows, ribbons = FALSE, hues = "walk", layout = g) +
  plot_layout(heights = c(5, 0.6, 1.2)))",
    width = 8, height = 8, readme = TRUE,
    note = c(
      "The RHD syng graph is a region-specific pangenome.",
      "`scripts/build-syng-region.sh` cuts the region from the HPRC walk file to find",
      "each haplotype's contig span, fetches those spans from GenBank, and builds the",
      "graph with [impg](https://github.com/pangenome/impg). ggbandage ships it in",
      "`inst/extdata`.",
      "",
      "- The Rhesus boxes either side of RHD share many of their nodes, so GRCh38",
      "  walks them twice",
      "- `color = list(field = \"pass\")` colours HG01106#1 wherever it steps a node",
      "  again, by the trip it is on. A pass starts where the walk comes back to a node",
      "  it stepped earlier, and `bandage_pass_bar()` draws the passes along the walk",
      "- HG01106#1 walks the RHD loop twice, on passes 1 and 2 of about 70 kb each, so",
      "  it has a second RHD. Pass 2 is close to the 69 kb by which HG01106#1 is",
      "  longer than grch38",
      "- Pass 3 is a short third trip through the Rhesus box",
      "- A pass is a trip round nodes the graph shares between copies, so three passes",
      "  do not mean three copies of a gene",
      "- Six of the 18 other haplotypes span about 132 kb. They walk the boxes once and",
      "  skip RHD, the deletion that most often makes blood RhD-negative. HG01258#2, in",
      "  purple, is one"
    )
  ),
  figure(
    "c4_two_graphs", "C4 in two graph builders, the same haplotype in each", "chr6:31,972,047-32,055,647",
    "Two graphs over one bar. The bar shows HG01978#2 along its 116 kb in blue, under a bracket for each C4 copy, copy 1 orange from 8.5 to 41 kb, copy 2 pink to 74 kb and copy 3 amber to 107 kb. Left, titled Minigraph-Cactus lays the three copies out in a line, the HPRC walk file's C4 with GRCh38 in grey: copy 1 is an orange loop off GRCh38's path at the lower left, labelled beside it, copy 2 starts pink on the loop's last stretch and runs along GRCh38's line past C4A, and copy 3 runs amber on along it past C4B to the right, with arrowheads pointing the way the walk runs. Right, titled syng folds them onto one ring, the impg syng graph: orange, pink and amber threads run side by side round one ring that also carries the C4A and C4B labels, each thread labelled with its copy, and the walk's flanks leave the ring in blue",
    r"(c4 <- "chr6:31,972,047-32,055,647"
hap <- "HG01978#2"
lift <- function(reference, ...) {
  list(
    list(walk = reference, color = list(field = "walk", scheme = "grey")),
    list(walk = hap, color = list(field = "pass"), passNames = paste("copy", 1:3), ...)
  )
}
sy <- bandage_layout(syng, walks = lift("grch38"), genes = genes)
mc_steps <- bandage_walk_steps(walks, c4, haplotypes = hap)
mc_bp <- max(mc_steps$end[startsWith(mc_steps$walk, paste0(hap, "#"))])
flank <- (mc_bp - with(sy$keys[sy$keys$walk == hap, ], end - start)) / 2
copies <- sy$passes[c("start", "end")] + flank
mc <- bandage_layout(walks, region = c4, haplotypes = hap, walks = lift("GRCh38", passes = copies), genes = genes)
drawn <- function(g, title) {
  g$genes <- g$genes[g$genes$gene %in% c("C4A", "C4B"), ]
  g$exons <- g$exons[0, ]
  autoplot(g) + guides(bandage_keys = "none") + ggtitle(title)
}
graphs <- drawn(mc, "Minigraph-Cactus lays the three copies out in a line") | drawn(sy, "syng folds them onto one ring")
(graphs + plot_layout(widths = c(1.3, 1))) / bandage_pass_bar(sy) + plot_layout(heights = c(6, 0.8)))",
    width = 14, height = 7, readme = TRUE,
    note = c(
      "- The left graph is cut from the HPRC Minigraph-Cactus walk file, and the right",
      "  is the syng graph of [C4 copies as threads](#c4-copies-as-threads-round-an-impg-syng-graph)",
      "- In the syng graph each C4 copy is one pass round the ring, so",
      "  `color = list(field = \"pass\")` finds HG01978#2's three copies there, and",
      "  `passNames` names them",
      "- In the Minigraph-Cactus graph each copy has nodes of its own, so HG01978#2",
      "  steps no node twice there and has no passes to find. The snippet states them",
      "  through `passes`, handing it the syng graph's `sy$passes` in bp along the",
      "  walk, so the same bp of HG01978#2 take the same colour in both graphs",
      "- The Minigraph-Cactus cut keeps about 1 kb of flank past each end, so the",
      "  snippet shifts the passes by that flank",
      "- `bandage_pass_bar()` draws the copies along the walk",
      "- In the Minigraph-Cactus graph, copy 1 is a loop off GRCh38's path, and the",
      "  loop's last stretch is the start of copy 2, which runs on along GRCh38's line.",
      "  In the syng graph, all three are passes round the ring, which GRCh38 runs twice",
      "- The snippet turns off each graph's key, since side by side each key would",
      "  run into the other column"
    )
  ),
  figure(
    "gstm1_core", "Core, shell and cloud at GSTM1", "chr1:109,665,000-109,715,000",
    "The GSTM1 locus cut from the walk file with all HPRC haplotypes, force-directed, each node coloured by the share of haplotypes through it: core, 95% or more, charcoal; shell, 5 to 95%, blue; cloud, under 5%, orange. A pale green band under the nodes marks GRCh38's path, from GSTM4 and GSTM2 round the GSTM1 loop to GSTM5. GSTM4, GSTM2 and GSTM5 run as thick charcoal strands flecked with orange specks of rare variants. GSTM1's loop, labelled 16%, and the non-reference loop beside it, labelled 19%, are blue shell, and a small orange loop hangs off the second. The grey dashed edge, off the green band, skips GSTM1's loop and lands where the second loop hangs, and is labelled 84%. The caption says the percentages are shares of HPRC haplotypes and that a dashed edge skips part of GRCh38's path, and a bar below splits the graph's bp into 43% core, 34 kb, 47% shell, 37 kb, and 9% cloud, 7 kb",
    r"(gstm1 <- "chr1:109,665,000-109,715,000"
g <- bandage_layout(walks, region = gstm1, genes = genes)
classes <- c("cloud, under 5%" = "#e8a33d", "shell, 5 to 95%" = "#3b8bc2", "core, 95% or more" = "grey25")
share <- function(frequency) cut(frequency, c(-Inf, 0.05, 0.95, Inf), labels = names(classes))
nodes <- g$nodes[!duplicated(g$nodes$name), ]
bp <- aggregate(length ~ class, transform(nodes, class = share(frequency)), sum)
loops <- g$nodes[g$nodes$frequency > 0.05 & g$nodes$frequency < 0.5 & g$nodes$length > 400, ]
loops <- loops[!duplicated(loops$depth), ]
runs <- bandage_walk_rows(walks, gstm1)$runs
on <- runs[runs$onReference, ]
jump <- c(on$referenceStart[-1] - on$referenceStart[-nrow(on)] - on$bp[-nrow(on)], 0) * c(on$row[-1] == on$row[-nrow(on)], FALSE)
dashed <- g$edges[g$edges$deletion, ]
reach <- tapply(abs(dashed$x1 - dashed$x0) + abs(dashed$y1 - dashed$y0), dashed$edge, sum)
gap <- dashed[dashed$edge == names(which.max(reach)), ]
gap <- gap[ceiling(nrow(gap) / 2), ]
gap$share <- length(unique(on$row[jump == max(jump)])) / (length(unique(runs$row)) - 1)
graph <- ggplot(g) +
  geom_path(aes(x, y, group = interaction(node, stroke)), data = g$nodes[g$nodes$backbone, ], colour = "#cfe8c6", linewidth = 6, lineend = "round") +
  geom_bandage_edges(aes(colour = I("grey80")), deletion = FALSE) +
  geom_bandage_genes(outline = 0, key = NULL) +
  geom_bandage_nodes(aes(colour = share(frequency))) +
  geom_bandage_edges(aes(colour = I("grey80")), deletion = TRUE) +
  geom_label(aes(x, y, label = scales::percent(frequency, 1)), data = loops, size = 3.2, fill = "white", linewidth = 0) +
  geom_label(aes(x0, y0, label = scales::percent(share, 1)), data = gap, size = 3.2, fill = "white", linewidth = 0, vjust = 1.4) +
  scale_colour_manual("share of HPRC haplotypes", values = classes) +
  labs(caption = "Percentages are shares of HPRC haplotypes. The pale green band is GRCh38's path, and a dashed edge skips part of it") +
  coord_fixed() +
  theme_void() +
  theme(legend.position = "top", plot.caption = element_text(hjust = 0.5, size = 10))
split <- ggplot(bp, aes(length / sum(length), "", fill = class)) +
  geom_col(width = 0.6) +
  geom_text(
    aes(label = sprintf("%s\n%.0f kb", scales::percent(length / sum(length), 1), length / 1000)),
    position = position_stack(vjust = 0.5), colour = "white", size = 3, lineheight = 0.9
  ) +
  scale_fill_manual(values = classes, guide = "none") +
  scale_x_continuous(labels = scales::label_percent(), expand = c(0, 0)) +
  labs(x = "share of the graph's bp", y = NULL) +
  theme_minimal(10) +
  theme(panel.grid = element_blank())
graph / split + plot_layout(heights = c(5, 1)))",
    width = 8, height = 5.5, readme = TRUE,
    note = c(
      "- Pangenome studies call sequence core when nearly every genome has it, shell",
      "  when some do and cloud when few do. The snippet classes each node by",
      "  `frequency`, the share of haplotypes through it",
      "- Cloud sequence makes up 9% of the bp, most of it the small orange loop off the",
      "  second loop; the rest shows as specks along the strands",
      "- The labels give the share of haplotypes on each route: 16% walk GSTM1's loop",
      "  and 84% the dashed edge. Most of the 19% on the second loop reach it by the",
      "  dashed edge, and the rest of the dashed edge's haplotypes walk neither loop",
      "- The snippet counts the dashed edge's haplotypes from their walk rows: a row",
      "  takes it where one stretch on GRCh38's path jumps straight to the next across",
      "  the most GRCh38 sequence any row skips",
      "- ggbandage dashes an edge that skips part of GRCh38's path, so which edges are",
      "  dashed depends on the reference. GRCh38 walks the GSTM1 loop, which most",
      "  haplotypes skip by the dashed edge, and against a reference without GSTM1 the",
      "  dashed edge would be the common route and the GSTM1 loop an insertion"
    )
  ),
  figure(
    "syng_overlay", "C4 copies as threads round an impg syng graph", "chr6:31,972,047-32,055,647",
    "The syng graph of C4 with three walks lifted together, each shaded light to dark along its own length, grch38#chr6 grey, HG01978#2 cyan to blue and HG01952#1 peach to rust, and a thread for every pass through a node: round the ring, outside in, grch38#chr6 draws two threads, HG01978#2 three, its extra C4 copy, and HG01952#1 two, each pass darker than the one before. Grey and blue threads run round the HERV-K loop at the left, and the orange ones cut across it. Walk rows below, each on its walk's ramp under a grey strip where it runs on the grch38 path, give the lengths: grch38#chr6 84 kb, HG01978#2 116 kb and HG01952#1 71 kb",
    r"(haps <- c("HG01978#2", "HG01952#1")
schemes <- c(grch38 = "grey", "HG01978#2" = "blue", "HG01952#1" = "orange")
progress <- lapply(names(schemes), function(w) list(walk = w, color = list(field = "progress", scheme = schemes[[w]])))
g <- bandage_layout(syng, walks = progress)
rows <- bandage_walk_rows(syng, haplotypes = haps)
autoplot(g) / autoplot(rows, ribbons = FALSE, hues = "walk", layout = g) + plot_layout(heights = c(3, 1)))",
    width = 7, height = 8,
    note = c(
      "[impg](https://github.com/pangenome/impg) builds a",
      "[syng](https://github.com/richarddurbin/syng) graph of C4 from 90 haplotypes",
      "with no alignment step;",
      "[build.sh](https://github.com/GMOD/jbrowse-plugin-graphgenomeviewer/blob/main/test_data/syng/build.sh)",
      "in jbrowse-plugin-graphgenomeviewer cuts it from odgi's C4 test haplotypes.",
      "",
      "- The ring holds every C4 copy's sequence once, so a walk with more copies goes",
      "  round it more often. The layout draws a thread for each pass, two for grch38",
      "  and three for HG01978, whose third pass is its extra copy",
      "- HG01978's row is 33 kb longer than grch38's, the length of that copy",
      "- The layout shades each walk light to dark along its length, in the drawing",
      "  and in its row, so a darker thread is a later pass round the ring",
      "- The loop at the left is the HERV-K in C4's intron 9, which makes a C4 long.",
      "  GRCh38's C4A and C4B both contain it, and both of HG01952#1's copies lack it"
    )
  ),
  figure(
    "own_colours", "Your own colours: GSTM1 and the edge most haplotypes take past it", "chr1:109,665,000-109,715,000",
    "The GSTM1 locus cut from the walk file with all HPRC haplotypes, force-directed and drawn with plain ggplot2 layers: grey edges, exons outlined in orange, and each node coloured and sized by the share of haplotypes through it. GSTM4, GSTM2 and GSTM5 run as thick black strands that nearly every haplotype walks. GSTM1 hangs off them as a thin pale loop labelled 16%, beside a second pale loop of non-reference sequence labelled 19%, and most haplotypes take the grey dashed edge that skips GSTM1's loop and lands where the second loop hangs. Small pale specks along the black strands are small variants",
    r"(gstm1 <- "chr1:109,665,000-109,715,000"
g <- bandage_layout(walks, region = gstm1, genes = genes)
loops <- g$nodes[g$nodes$frequency > 0.05 & g$nodes$frequency < 0.5 & g$nodes$length > 400, ]
loops <- loops[!duplicated(loops$depth), ]
share <- "share of HPRC haplotypes"
ggplot(g) +
  geom_bandage_edges(aes(colour = I("grey80")), deletion = FALSE) +
  geom_bandage_genes() +
  geom_bandage_nodes(aes(colour = frequency, linewidth = frequency)) +
  geom_bandage_edges(aes(colour = I("grey80")), deletion = TRUE) +
  geom_label(aes(x, y, label = scales::percent(frequency, 1)), data = loops, size = 3, fill = "white", linewidth = 0) +
  scale_colour_viridis_c(share, option = "mako", direction = -1, end = 0.9, labels = scales::label_percent()) +
  scale_linewidth(share, range = c(0.4, 3.5), labels = scales::label_percent()) +
  guides(colour = guide_legend(order = 1), linewidth = guide_legend(order = 1)) +
  labs(caption = "A dashed edge skips GRCh38 sequence. Specks along a strand are small variants that some haplotypes carry") +
  coord_fixed() +
  theme_void() +
  theme(legend.position = "bottom", legend.title = element_text(size = 9), plot.caption = element_text(hjust = 0.5)))",
    width = 7, height = 4.5,
    note = c(
      "- Colour and width both show `frequency`, the share of the cut's haplotypes",
      "  through a node: `depth` over the haplotype count.",
      "- Of 465 walks, 71 run GRCh38's GSTM1 loop, 84 the non-reference loop beside it",
      "  and 2 both. The 84 reach the second loop by the dashed edge, and the other 308",
      "  take the dashed edge and walk neither loop.",
      "- Across the region, a walk through one of the loops is 18 kb longer than one",
      "  that walks neither, the length of GRCh38's GSTM1 loop, so the second loop is most",
      "  likely GSTM1 too, a copy the graph did not align to GRCh38's.",
      "- The snippet draws the edges that skip GRCh38 sequence after the nodes, as",
      "  `autoplot()` does, so none hides under the nodes it skips."
    )
  ),
  figure(
    "kiv2_walks", "LPA's KIV-2 repeat, a panel per walk", "chr6:160,616,004-160,646,753",
    "Force-directed layout of the KIV-2 array cut from the walk file for HG00097, GRCh38 and HG00097 each lifted in a separate panel and shaded yellow to red along its length: HG00097 walks one loop of sequence GRCh38 does not have, drawn faded in GRCh38's panel. The panel titles give GRCh38 90.8 kb and HG00097 113 kb, each the region plus flank either side, and a key below the panels names the shading, the faded nodes, the node thickness and a skip too short to dash",
    r"(g <- bandage_layout(
  walks,
  region = kiv2, haplotypes = "HG00097#1", context = 30000,
  walks = c("GRCh38", "HG00097#1"),
  facet = "walk"
)
autoplot(g, ncol = 2))",
    height = 3.5
  ),
  figure(
    "kiv2_stress", "KIV-2 against a straight GRCh38 backbone, with LPA's exons", "chr6:160,616,004-160,646,753",
    "Stress layout of the KIV-2 array from the hosted index: GRCh38 drawn straight and coloured by position, LPA's exons outlined in orange, non-reference nodes in charcoal hanging below in two tiers, node lengths compressed so the longest insertion draws as a bar shorter than the array, and dashed arches where haplotypes skip reference sequence",
    r"(g <- bandage_layout(index, region = kiv2, engine = "stress", genes = genes, bubbleSpread = "compress")
autoplot(g))",
    width = 9, height = 3.2
  ),
  figure(
    "c4_stress", "C4A and C4B in the stress layout", "chr6:31,978,000-32,040,000",
    "Stress layout of the complement C4 genes in the MHC, GRCh38 drawn straight: non-reference sequence hangs in loops below C4A and C4B, and a dashed arch from inside C4A to inside C4B skips one module of C4, CYP21A1P and TNXA",
    r"(g <- bandage_layout(
  index,
  region = "chr6:31,978,000-32,040,000", engine = "stress", genes = genes
)
autoplot(g))",
    height = 2.6
  ),
  figure(
    "ugt2b17_frequency", "UGT2B17's deletion, each node as wide as its frequency", "chr4:68,500,000-68,680,000",
    "Force-directed UGT2B17 locus cut from the walk file with all 464 haplotypes, GRCh38 coloured by position and each node drawn as wide as the share of haplotypes that pass it: the flank through UGT2B15 at the right draws full width, the loop through UGT2B17 half width, and a dashed edge under the loop skips it. Off-reference alleles hang along the loop as dark specks, most a hairline wide. A caption under the graph gives 51% of haplotypes walking the loop and 49% taking the dashed edge, and a key gives the widths of 100%, 50% and 10%",
    r"(ugt2b17 <- "chr4:68,500,000-68,680,000"
g <- bandage_layout(walks, region = ugt2b17, genes = genes, nodeWidth = "frequency", contigThickness = 10)
share <- median(g$nodes$frequency[g$nodes$node %in% g$exons$node[g$exons$gene == "UGT2B17"]])
autoplot(g) +
  labs(caption = sprintf("%s of haplotypes walk the UGT2B17 loop, and %s take the dashed edge past it", scales::percent(share), scales::percent(1 - share))) +
  theme(plot.caption = element_text(size = 10, hjust = 0.5)))",
    width = 8, height = 5,
    note = c(
      "- Nearly every haplotype walks the flanks, which draw full width. Half the haplotypes",
      "  lack UGT2B17, so its loop draws half as wide, and the dashed deletion edge is",
      "  the other half's route.",
      "- `vcf_frequencies()` reads the same widths from a VCF's `AT` allele paths:",
      "  HPRC's own `hprc-v2.1-mc-grch38.raw.vcf.gz`, or a cohort genotyped with",
      "  `vg call`. Pass its table to `bandage_layout(frequencies = )`."
    )
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

docs_text <- function() {
  out <- c(
    "# Gallery",
    "",
    "Every snippet runs on its own. `scripts/gallery.R` draws them all.",
    "",
    "## The data files",
    "",
    "| Variable | File | How it was made |",
    "| --- | --- | --- |",
    "| `walks` | HPRC v2.1 GRCh38 walk file | `gfa-to-tabix hprc-v2.1-mc-grch38.gfa --walks --refs GRCh38 -o hprc-v2.1-mc-grch38`, as in [Hosting your own graph](https://jbrowse.org/jb2/docs/tutorials/pangenome_prepare_graph/), with gfa-to-tabix 5.0, which writes walk format 8: the `.walks.gz` with its `.idx` directory, recording every place a haplotype leaves GRCh38 and rejoins it as a departure |",
    "| `index` | HPRC v2.1 GRCh38 segment index | `gfa-to-tabix hprc-v2.1-mc-grch38.sv.gfa.gz --layout anchored -o hprc-v2.1-mc-grch38.anchored`, with gfa-to-tabix 2.0.0, which writes format 2: nodes and links in one `.graph.bed.gz`. `anchored` is the layout: every node filed under the reference interval its bubble hangs from |",
    "| `genes` | UCSC hg38 ncbiRefSeq GFF3, bgzipped and tabix-indexed | Hosted by JBrowse, used as is |",
    "| `syng` | C4 syng graph from 90 haplotypes | [build.sh](https://github.com/GMOD/jbrowse-plugin-graphgenomeviewer/blob/main/test_data/syng/build.sh) runs [impg](https://github.com/pangenome/impg) on odgi's C4 test haplotypes |",
    "",
    "The HPRC graphs are the files behind the",
    "[JBrowse HPRC tutorial](https://jbrowse.org/jb2/docs/tutorials/pangenome_hprc/).",
    "[Region-specific pangenomes](../README.md#region-specific-pangenomes) has the steps for another graph."
  )
  more <- FALSE
  for (f in figures) {
    if (!f$readme && !more) {
      out <- c(out, "", "## More examples", "", "Narrower cases, and other ways to draw the same loci.")
      more <- TRUE
    }
    out <- c(
      out, "", paste(if (f$readme) "##" else "###", f$title), "", paste0("`", f$locus, "`"), "",
      if (!is.null(f$note)) c(f$note, ""),
      sprintf("![%s](../gallery/%s.png)", f$alt, f$id), "",
      "```r", standalone(f$code), "```"
    )
  }
  out
}

anchor <- function(title) {
  gsub(" ", "-", gsub("[^a-z0-9 -]", "", tolower(title)))
}

readme_text <- function() {
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
  c(text[seq_len(from)], table, text[to:length(text)])
}

# The functions a snippet calls that neither R's default packages nor the
# libraries the snippet itself loads define
unresolved <- function(f) {
  code <- standalone(f$code)
  loaded <- regmatches(code, gregexpr("(?<=library\\()[^)]+", code, perl = TRUE))[[1]]
  defined <- unlist(lapply(c(loaded, "base", "stats", "utils", "graphics", "grDevices", "methods"), getNamespaceExports))
  body <- as.call(c(as.name("{"), as.list(parse(text = code))))
  called <- codetools::findGlobals(eval(call("function", NULL, body)), merge = FALSE)$functions
  missing <- setdiff(called, defined)
  if (length(missing)) sprintf("%s calls %s", f$id, paste(missing, collapse = ", "))
}

check <- function() {
  library(ggplot2)
  library(patchwork)
  stale <- function(path, text) {
    joined <- function(lines) paste(lines, collapse = "\n")
    if (joined(readLines(path)) != joined(text)) paste(path, "is stale: run scripts/gallery.R")
  }
  problems <- c(
    unlist(lapply(figures, unresolved)),
    stale(file.path("docs", "gallery.md"), docs_text()),
    stale("README.md", readme_text())
  )
  if (length(problems)) {
    message(paste(problems, collapse = "\n"))
    quit(status = 1)
  }
  message(sprintf("%d snippets resolve, and the docs are current", length(figures)))
}

pkgload::load_all(quiet = TRUE)
wanted <- commandArgs(TRUE)
if (identical(wanted, "--check")) {
  check()
} else {
  dir.create("gallery", showWarnings = FALSE)
  for (f in figures) {
    if (!length(wanted) || f$id %in% wanted) draw(f)
  }
  writeLines(docs_text(), file.path("docs", "gallery.md"))
  writeLines(readme_text(), "README.md")
}
