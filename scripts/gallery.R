# Draws gallery/*.png from hosted files, and writes docs/gallery.md
# and the README's gallery table from the same code:
#   Rscript scripts/gallery.R            every figure
#   Rscript scripts/gallery.R c4_stress  one figure, and the docs
#   Rscript scripts/gallery.R --check    fails on a snippet calling a function
#                                        that doesn't exist, or on stale docs

definitions <- list(
  walks = 'walks <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38.GRCh38.walks.gz"',
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
    if (uses("ggplot|guides\\(|element_text|margin\\(|scale_|coord_|theme")) "library(ggplot2)",
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
    "Force-directed CFH locus with GRCh38, HG00097 and HG02055 lifted together, each shaded along its own length: GRCh38 grey, HG00097 cyan to blue and HG02055 pink to plum. GRCh38 and HG00097 run the loop through CFHR3 and CFHR1, and HG02055 alone takes the deletion edge under it, its lane drawn solid along the edge. Walk rows below, each on its walk's ramp, give the lengths, GRCh38 and HG00097 260 kb and HG02055 176 kb, and the ribbons from HG00097 down to HG02055 break across the 85 kb HG02055 lacks",
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
    "Walk rows at KIV-2 on a bp-from-flank axis: between the flanking reference nodes GRCh38 spans 31 kb and HG00133#2 164 kb, and the extra copies, on non-reference nodes, fall into three blocks: A, 68 kb walked by HG02055#1 and HG00133#2; B, 22 kb walked by four haplotypes; and C, 5.5 kb walked by two",
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
    "amylase_rows", "Amylase haplotypes from 146 to 475 kb", "chr1:103,540,000-103,780,000",
    "Walk rows over the salivary amylase genes for GRCh38 and seven haplotypes, each bar coloured by the GRCh38 position it covers: against GRCh38's 240 kb the haplotypes span 146 kb to 475 kb. HG00128#1 and HG002#1 walk the non-reference block A twice, CHM13 and HG00097#2 once, HG00099#1 and HG00097#1 walk block C in its place, and HG00097#1 has a 19 kb stretch the graph lacks, drawn as an open box",
    r"(amylase <- c("HG00128#1", "CHM13#0", "HG00097#2", "HG002#1", "HG00099#1", "HG00097#1", "HG00099#2")
rows <- bandage_walk_rows(walks, "chr1:103,540,000-103,780,000", haplotypes = amylase)
autoplot(rows))",
    width = 9, height = 5, readme = TRUE
  ),
  figure(
    "cyp2d6_stress", "CYP2D6 deletion as an arch over the gene", "chr22:42,118,000-42,136,000",
    "Stress layout of CYP2D6 from the hosted index, GRCh38 drawn straight and coloured by position from NDUFA6-DT to CYP2D7, exons outlined in gold: a dashed arch spans CYP2D6, the route of haplotypes that skip the gene, and non-reference sequence hangs in charcoal loops above and below",
    r"(g <- bandage_layout(index, region = "chr22:42,118,000-42,136,000", engine = "stress", genes = genes)
autoplot(g))",
    width = 9, height = 5, readme = TRUE
  ),
  figure(
    "kiv2_overlay", "KIV-2 expansions as extra loops", "chr6:160,616,004-160,646,753",
    "Force-directed KIV-2 array with GRCh38, HG00133 and HG00097 lifted together, each shaded along its own length from light to mid-tone: GRCh38 grey, HG00133 cyan to blue, 133 kb longer, and HG00097 yellow to red-orange, 22.4 kb longer. GRCh38 runs straight in along 30 kb of flank from either side to a knot of loops at the array. Where walks share nodes their lanes run side by side. All three walks run the loops at the top, HG00133 and HG00097 run the loop at the lower right together, and HG00133 alone runs the loop at the lower left. Walk rows below, each on its walk's ramp under a grey strip where it runs on the GRCh38 path, give the lengths: GRCh38 31 kb, HG00133 164 kb and HG00097 53 kb, with block A outlined in both. A boxed letter A sits at the tip of the lower right loop, the block's nodes in the graph",
    r"(haps <- c("HG00133#2", "HG00097#1")
progress <- lapply(c("GRCh38", haps), function(w) list(walk = w, color = list(field = "progress")))
g <- bandage_layout(walks, region = kiv2, haplotypes = haps, walks = progress, context = 30000, bubbleSpread = "compress")
rows <- bandage_walk_rows(walks, kiv2, haplotypes = haps)
steps <- bandage_walk_steps(walks, kiv2, haplotypes = haps)
(autoplot(g) + geom_bandage_blocks(rows, steps)) / autoplot(rows, ribbons = FALSE, hues = "walk", layout = g) + plot_layout(heights = c(1.6, 1)))",
    width = 7, height = 6.5, readme = TRUE,
    note = c(
      "- `geom_bandage_blocks()` letters each block of the walk rows on the graph, at",
      "  the block's node furthest from the middle, so block A in the rows is the",
      "  lower right loop. It finds the block's nodes from `bandage_walk_steps()`",
      "- `context = 30000` keeps 30 kb of GRCh38 past each end of the region, so the",
      "  reference runs in straight before it reaches the array",
      "- `bubbleSpread = \"compress\"` pulls node lengths towards the mean, so HG00133's",
      "  extra copies no longer dwarf the rest. Loop size stops tracking bp, so read",
      "  lengths off the walk rows below"
    )
  ),
  figure(
    "syng_rhd", "RHD deletion and duplication in an impg syng graph", "chr1:25,250,000-25,450,000",
    "Force-directed syng graph of RHD from 19 HPRC haplotypes with RHD, TMEM50A and RHCE labelled and three walks lifted: grch38 in dark grey, HG01258#2 in purple, and HG01106#1 coloured by its pass through each node, orange the first time, blue the second and green the third. Round the loop at the top, labelled RHD, run a grey grch38 thread, an orange first-pass thread and a blue thread labelled second pass, HG01106#1's second RHD. A short green thread labelled third pass runs through the Rhesus box at the left. HG01258#2 skips the RHD loop and runs straight on to TMEM50A and RHCE. A strip below shows HG01106#1's 272 kb by pass, orange except blue from 85 to 155 kb and green to 160 kb, and walk rows give grch38 202 kb, HG01106#1 272 kb and HG01258#2 132 kb",
    r"(rhd_syng <- system.file("extdata", "rhd.syng.gfa.gz", package = "ggbandage")
dup <- "HG01106#1"
del <- "HG01258#2"
passes <- c("first pass" = "#D55E00", "second pass" = "#0072B2", "third pass" = "#009E73")
lifted <- list(
  list(walk = "grch38", color = list(field = "walk", scheme = "grey")),
  list(walk = dup),
  list(walk = del, color = list(field = "walk", scheme = "purple"))
)
g <- bandage_layout(rhd_syng, walks = lifted, genes = genes)
g$genes <- g$genes[g$genes$gene %in% c("RHD", "TMEM50A", "RHCE"), ]
g$exons <- g$exons[0, ]
mine <- g$nodes$walk %in% 1
g$nodes$pass_name <- ifelse(mine, names(passes)[pmax(0, g$nodes$pass, na.rm = TRUE) + 1], NA)
g$nodes$color[mine] <- passes[g$nodes$pass_name[mine]]
reach <- (g$nodes$x - stats::median(g$nodes$x))^2 + (g$nodes$y - stats::median(g$nodes$y))^2
later <- g$nodes[mine & g$nodes$pass_name != "first pass", ][order(-reach[mine & g$nodes$pass_name != "first pass"]), ]
later <- later[!duplicated(later$pass_name), ]
steps <- bandage_walk_steps(rhd_syng)
steps <- steps[startsWith(steps$walk, paste0(dup, "#")), ]
steps$kb <- floor((steps$start + steps$end) / 2000)
cover <- stats::aggregate(cbind(bp = end - start) ~ kb + pass, steps, sum)
cover <- cover[order(cover$kb, -cover$bp), ]
cover <- cover[!duplicated(cover$kb), ]
cover$pass <- names(passes)[cover$pass + 1]
rows <- bandage_walk_rows(rhd_syng, haplotypes = c(dup, del))
along <- ggplot(cover) +
  geom_rect(aes(xmin = kb, xmax = kb + 1, ymin = 0, ymax = 1, fill = pass)) +
  scale_fill_manual(NULL, values = passes) +
  scale_y_continuous(NULL, breaks = NULL) +
  labs(x = sprintf("kb along %s, coloured by its pass through each node", dup)) +
  theme_minimal(10) +
  theme(panel.grid = element_blank(), legend.position = "top")
autoplot(g) + guides(bandage_keys = "none") +
  geom_label(aes(x, y, label = pass_name, colour = I(passes[pass_name])), data = later, size = 3.2, fontface = "bold", fill = "white", hjust = 1.05) +
  along + autoplot(rows, ribbons = FALSE, hues = "walk", layout = g) +
  plot_layout(ncol = 1, heights = c(5, 0.35, 1.2)))",
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
      "- The snippet colours HG01106#1 by its pass through each node, in the graph and",
      "  in the strip. From 85 to 160 kb, HG01106#1 walks nodes it walked earlier. That",
      "  stretch is close to the 69 kb by which HG01106#1 is longer than grch38, and",
      "  holds a second RHD, the blue thread round the RHD loop, and a third pass",
      "  through the Rhesus box",
      "- `bandage_walk_steps()` gives the pass of each step for the strip, and the",
      "  layout's node table gives the pass of each thread for the graph",
      "- Six of the 18 other haplotypes span about 132 kb. They walk the boxes once and",
      "  skip RHD, the deletion that most often makes blood RhD-negative. HG01258#2, in",
      "  purple, is one"
    )
  ),
  figure(
    "c4_two_graphs", "C4 in two graph builders, the same haplotype in each", "chr6:31,972,047-32,055,647",
    "Two graphs over one strip. The strip shows HG01978#2's 116 kb split into three solid colours, copy 1 orange from 8.5 to 41 kb, copy 2 blue to 74 kb and copy 3 green to 107 kb, with dark grey flanks. Left, titled Minigraph-Cactus lays the three copies out in a line, the HPRC walk file's C4 with GRCh38 in grey: copy 1 is an orange loop off GRCh38's path at the lower left, copy 2 runs blue from C4A over the hump, and copy 3 runs green from C4B to the right. Right, titled syng folds them onto one ring, the impg syng graph: orange, blue and green threads run side by side round one ring that also carries the C4A and C4B labels, each thread labelled with its copy",
    r"(c4 <- "chr6:31,972,047-32,055,647"
hap <- "HG01978#2"
copies <- c("copy 1" = "#D55E00", "copy 2" = "#0072B2", "copy 3" = "#009E73")
lift <- function(reference) list(list(walk = reference, color = list(field = "walk", scheme = "grey")), list(walk = hap))
mc <- bandage_layout(walks, region = c4, haplotypes = hap, walks = lift("GRCh38"), genes = genes)
sy <- bandage_layout(syng, walks = lift("grch38"), genes = genes)
mc_steps <- bandage_walk_steps(walks, c4, haplotypes = hap)
sy_steps <- bandage_walk_steps(syng)
mc_steps <- mc_steps[startsWith(mc_steps$walk, paste0(hap, "#")), ]
sy_steps <- sy_steps[startsWith(sy_steps$walk, paste0(hap, "#")), ]
ring <- sy_steps$node %in% sy_steps$node[sy_steps$pass > 0]
breaks <- c(min(sy_steps$start[ring]), min(sy_steps$start[sy_steps$pass == 1]), min(sy_steps$start[sy_steps$pass == 2]), max(sy_steps$end[sy_steps$pass == 2]))
painted <- function(g, steps, title) {
  shift <- (max(steps$end) - max(sy_steps$end)) / 2
  steps$copy <- as.character(cut((steps$start + steps$end) / 2 - shift, breaks, labels = names(copies), right = FALSE))
  mine <- g$nodes$walk %in% 1
  at <- match(paste(g$nodes$name, pmax(0, g$nodes$pass, na.rm = TRUE)), paste(steps$node, steps$pass))
  g$nodes$copy <- ifelse(mine, steps$copy[at], NA)
  g$nodes$start <- steps$start[at]
  g$nodes$color[mine] <- ifelse(is.na(g$nodes$copy[mine]), "#3a3a3a", copies[g$nodes$copy[mine]])
  g$genes <- g$genes[g$genes$gene %in% c("C4A", "C4B"), ]
  g$exons <- g$exons[0, ]
  spots <- do.call(rbind, lapply(seq_along(copies), function(k) {
    own <- g$nodes[g$nodes$copy %in% names(copies)[k], ]
    own[which.min(abs(own$start - stats::quantile(own$start, k / 4))), ]
  }))
  autoplot(g) + guides(bandage_keys = "none") + ggtitle(title) +
    geom_label(aes(x, y, label = copy, colour = I(copies[copy])), data = spots, size = 3.4, fontface = "bold", fill = "white")
}
along <- ggplot(data.frame(copy = names(copies), start = breaks[1:3], end = breaks[2:4])) +
  annotate("rect", xmin = 0, xmax = max(sy_steps$end) / 1000, ymin = 0, ymax = 1, fill = "#3a3a3a") +
  geom_rect(aes(xmin = start / 1000, xmax = end / 1000, ymin = 0, ymax = 1, fill = I(copies[copy]))) +
  geom_text(aes((start + end) / 2000, 0.5, label = copy), colour = "white", fontface = "bold", size = 3.4) +
  scale_y_continuous(NULL, breaks = NULL) +
  labs(x = "kb along HG01978#2", title = "HG01978#2, coloured by C4 copy in both graphs") +
  theme_minimal(10) +
  theme(panel.grid = element_blank())
graphs <- painted(mc, mc_steps, "Minigraph-Cactus lays the three copies out in a line") | painted(sy, sy_steps, "syng folds them onto one ring")
(graphs + plot_layout(widths = c(1.3, 1))) / along + plot_layout(heights = c(6, 0.6)))",
    width = 14, height = 7, readme = TRUE,
    note = c(
      "- The left graph is cut from the HPRC Minigraph-Cactus walk file, and the right",
      "  is the syng graph of [C4 copies as threads](#c4-copies-as-threads-round-an-impg-syng-graph)",
      "- The snippet finds HG01978#2's three C4 copies in the syng graph, where each is",
      "  one pass round the ring, and colours the same bp of HG01978#2 in both graphs",
      "  and in the strip below",
      "- `bandage_walk_steps()` gives each step's bp along its walk and its pass, which",
      "  joins the step to the layout's thread for that pass",
      "- In the Minigraph-Cactus graph, copy 1 is a loop off GRCh38's path, copy 2",
      "  starts at GRCh38's C4A and copy 3 at its C4B. In the syng graph, all three are",
      "  passes round the ring, which GRCh38 runs twice",
      "- The Minigraph-Cactus cut keeps about 1 kb of flank past each end, so the",
      "  snippet centres that walk on the syng walk before matching bp",
      "- The snippet turns off each graph's key, since side by side each key would",
      "  run into the other column"
    )
  ),
  figure(
    "gstm1_core", "Core, shell and cloud at GSTM1", "chr1:109,665,000-109,715,000",
    "The GSTM1 locus cut from the walk file with all HPRC haplotypes, force-directed, each node coloured by the share of haplotypes through it: core, 95% or more, charcoal; shell, 5 to 95%, blue; cloud, under 5%, orange. A pale green band under the nodes marks GRCh38's path, from GSTM4 and GSTM2 round the GSTM1 loop to GSTM5. GSTM4, GSTM2 and GSTM5 run as thick charcoal strands flecked with orange specks of rare variants. GSTM1's loop, labelled 16%, and the non-reference loop beside it, labelled 19%, are blue shell, and a small orange loop hangs off the second. The grey dashed edge past both loops, off the green band, is labelled 66%. The caption says the percentages are shares of HPRC haplotypes and that a dashed edge skips part of GRCh38's path, and a bar below splits the graph's bp into 43% core, 34 kb, 47% shell, 37 kb, and 9% cloud, 7 kb",
    r"(gstm1 <- "chr1:109,665,000-109,715,000"
g <- bandage_layout(walks, region = gstm1, genes = genes)
classes <- c("cloud, under 5%" = "#e8a33d", "shell, 5 to 95%" = "#3b8bc2", "core, 95% or more" = "grey25")
share <- function(frequency) cut(frequency, c(-Inf, 0.05, 0.95, Inf), labels = names(classes))
nodes <- g$nodes[!duplicated(g$nodes$name), ]
bp <- aggregate(length ~ class, transform(nodes, class = share(frequency)), sum)
loops <- g$nodes[g$nodes$frequency > 0.05 & g$nodes$frequency < 0.5 & g$nodes$length > 400, ]
loops <- loops[!duplicated(loops$depth), ]
rows <- bandage_walk_rows(walks, gstm1)$rows
dashed <- g$edges[g$edges$deletion, ]
reach <- tapply(abs(dashed$x1 - dashed$x0) + abs(dashed$y1 - dashed$y0), dashed$edge, sum)
gap <- dashed[dashed$edge == names(which.max(reach)), ]
gap <- gap[ceiling(nrow(gap) / 2), ]
gap$share <- mean(rows$bp[-1] < rows$bp[1] - 9000)
graph <- ggplot(g) +
  geom_path(aes(x, y, group = interaction(node, stroke)), data = g$nodes[g$nodes$backbone, ], colour = "#cfe8c6", linewidth = 6, lineend = "round") +
  geom_bandage_edges(aes(colour = I("grey80"))) +
  geom_bandage_genes(outline = 0, key = NULL) +
  geom_bandage_nodes(aes(colour = share(frequency))) +
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
      "- Cloud sequence shows as specks along every strand and makes up 9% of the bp",
      "- The labels give the share of haplotypes on each route: 16% walk GSTM1's loop,",
      "  19% the loop beside it and 66% the dashed edge, and two haplotypes walk both",
      "  loops. The snippet counts the dashed edge's haplotypes from their walk rows,",
      "  which run about 18 kb shorter than GRCh38's",
      "- ggbandage dashes an edge that skips part of GRCh38's path, so which edges are",
      "  dashed depends on the reference. GRCh38 contains GSTM1, which most haplotypes",
      "  lack, and against a reference without GSTM1 the dashed edge would be the",
      "  common route and the GSTM1 loop an insertion"
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
      "  and three for HG01978, whose third pass is its extra 32.7 kb",
      "- HG01978's row is 32.7 kb longer than grch38's, the length of that copy",
      "- The layout shades each walk light to dark along its length, in the drawing",
      "  and in its row, so a darker thread is a later pass round the ring",
      "- The loop at the left is the HERV-K in C4's intron 9, which makes a C4 long.",
      "  GRCh38's C4A and C4B both contain it, and both of HG01952#1's copies lack it"
    )
  ),
  figure(
    "own_colours", "Your own colours: GSTM1, missing from two thirds of haplotypes", "chr1:109,665,000-109,715,000",
    "The GSTM1 locus cut from the walk file with all 464 HPRC haplotypes, force-directed and drawn with plain ggplot2 layers: grey edges, exons outlined in orange, and each node coloured and sized by the share of haplotypes through it. GSTM4, GSTM2 and GSTM5 run as thick black strands that every haplotype walks. GSTM1 hangs off them as a thin pale loop labelled 16%, beside a second pale loop of non-reference sequence labelled 19%, and most haplotypes take the grey dashed edge that skips both. Small pale specks along the black strands are small variants",
    r"(gstm1 <- "chr1:109,665,000-109,715,000"
g <- bandage_layout(walks, region = gstm1, genes = genes)
loops <- g$nodes[g$nodes$frequency > 0.05 & g$nodes$frequency < 0.5 & g$nodes$length > 400, ]
loops <- loops[!duplicated(loops$depth), ]
share <- "share of HPRC haplotypes"
ggplot(g) +
  geom_bandage_edges(aes(colour = I("grey80"))) +
  geom_bandage_genes() +
  geom_bandage_nodes(aes(colour = frequency, linewidth = frequency)) +
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
      "- Of 465 walks, 71 run GRCh38's GSTM1 loop, 84 the non-reference loop beside it,",
      "  2 both, and 308 neither, taking the dashed deletion edge.",
      "- A walk through either loop spans 60.6 kb, and one taking the deletion 42.2 kb.",
      "  The 18 kb between them is the GSTM1 deletion, so the second loop is most likely",
      "  GSTM1 too, a copy the graph did not align to GRCh38's."
    )
  ),
  figure(
    "kiv2_walks", "LPA's KIV-2 repeat, a panel per walk", "chr6:160,616,004-160,646,753",
    "Force-directed layout of the KIV-2 array cut from the walk file for HG00097, GRCh38 and HG00097 each lifted in a separate panel and shaded yellow to red along its length: HG00097 walks one 22 kb loop that GRCh38 skips, drawn faded in GRCh38's panel, and a short grey dashed link at the loop's base skips GRCh38 sequence that both walks take. The panel titles give HG00097 113 kb and GRCh38 90.8 kb, each span the region plus 30 kb of flank either side, and a key below the panels names the shading, the faded nodes and the dashes",
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
    "Stress layout of the complement C4 genes in the MHC, GRCh38 drawn straight, its C4A and C4B the long forms: non-reference sequence hangs in loops below C4A and C4B, and a dashed arch from inside C4A to inside C4B skips one module of C4, CYP21A1P and TNXA",
    r"(g <- bandage_layout(
  index,
  region = "chr6:31,978,000-32,040,000", engine = "stress", genes = genes
)
autoplot(g))",
    height = 2.6
  ),
  figure(
    "ugt2b17_frequency", "UGT2B17's deletion, each node as wide as its frequency", "chr4:68,500,000-68,680,000",
    "Force-directed UGT2B17 locus cut from the walk file with all 464 haplotypes, GRCh38 coloured by position and each node drawn as wide as the share of haplotypes that pass it: the flank through UGT2B15 at the right draws full width, the loop through UGT2B17 half width, and a dashed edge under the loop skips it. Off-reference alleles hang along the loop as dark specks, most a hairline wide. Text inside the loop gives 51% of haplotypes walking it and 49% taking the dashed edge, and a key gives the widths of 100%, 50% and 10%",
    r"(ugt2b17 <- "chr4:68,500,000-68,680,000"
g <- bandage_layout(walks, region = ugt2b17, genes = genes, nodeWidth = "frequency", contigThickness = 10)
share <- median(g$nodes$frequency[g$nodes$node %in% g$exons$node[g$exons$gene == "UGT2B17"]])
loop <- g$nodes[abs(g$nodes$frequency - share) < 0.01, ]
autoplot(g) +
  annotate(
    "text", x = mean(range(loop$x)), y = mean(range(loop$y)), size = 3.5, colour = "grey15",
    label = sprintf("%s of haplotypes walk the UGT2B17 loop,\nand %s take the dashed edge past it", scales::percent(share), scales::percent(1 - share))
  ))",
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
    "| `walks` | HPRC v2.1 GRCh38 walk file | `gfa-to-tabix hprc-v2.1-mc-grch38.gfa --walks --refs GRCh38 -o hprc-v2.1-mc-grch38`, as in [Hosting your own graph](https://jbrowse.org/jb2/docs/tutorials/pangenome_prepare_graph/), with gfa-to-tabix 4.0, which writes walk format 7: the `.walks.gz` with its `.idx` directory, recording every place a haplotype leaves GRCh38 and rejoins it as a departure |",
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

# The functions a snippet calls that no attached package defines
unresolved <- function(f) {
  body <- as.call(c(as.name("{"), as.list(parse(text = standalone(f$code)))))
  called <- codetools::findGlobals(eval(call("function", NULL, body)), merge = FALSE)$functions
  missing <- called[!vapply(called, exists, TRUE)]
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
