#' Each node's frequency from a graph VCF
#'
#' Turns a VCF whose alleles are paths through the graph into the passes per
#' haplotype through each node, for `bandage_layout(frequencies = )`.
#'
#' - **In:** a VCF with each allele's path in `INFO/AT`, as `vg deconstruct`
#'   writes for a graph's own haplotypes, and as `vg call` writes for a
#'   genotyped cohort
#' - **Out:** a node's frequency is the sum, over the alleles that pass it, of
#'   each allele's frequency times its passes. A node on every allele of a site
#'   gets 1; a node only a 5% allele passes twice gets 0.1
#' - An allele's frequency is `AF`, else `AC / AN`, else its share of the
#'   called genotypes. The reference allele takes the rest
#' - Where the VCF has `LV`, only top-level sites (`LV=0`) count, because a
#'   nested site's frequencies are within its parent's alleles and the
#'   parent's paths already pass its nodes
#' - A node in several sites, such as one two sites share as an end, takes its
#'   largest frequency
#'
#' Node ids in `AT` are the base-level graph's, so they match the nodes of a
#' cut from a walk file or a GBZ, not the segments of an rGFA index.
#' @param vcf path or URL of the VCF, plain or gzipped. A bgzipped VCF with a
#'   `.tbi` or `.csi` beside it is read only under `region`
#' @param region a 1-based locus, such as `"chr4:68,500,000-68,680,000"`; the
#'   whole file when `NULL`
#' @return a data frame of `name`, the node id, and `frequency`
#' @export
vcf_frequencies <- function(vcf, region = NULL) {
  records <- vcf_records(vcf, region)
  per_site <- lapply(records, site_frequencies)
  name <- unlist(lapply(per_site, names))
  frequency <- unlist(per_site, use.names = FALSE)
  if (!length(name)) {
    return(data.frame(name = character(), frequency = numeric()))
  }
  most <- tapply(frequency, name, max)
  data.frame(name = names(most), frequency = as.numeric(most), row.names = NULL)
}

vcf_records <- function(vcf, region) {
  index <- if (!is.null(region)) index_of(vcf)
  text <- if (is.null(index)) {
    read_text(vcf)
  } else {
    engine()$call(
      "bandage.indexedLines",
      c(list(file = vcf, index = index), parse_region(region)),
      await = TRUE
    )
  }
  lines <- strsplit(text, "\n", fixed = TRUE)[[1]]
  lines <- lines[nzchar(lines) & !startsWith(lines, "#")]
  records <- strsplit(lines, "\t", fixed = TRUE)
  if (is.null(index) && !is.null(region)) {
    locus <- parse_region(region)
    keep <- vapply(records, function(r) {
      pos <- as.numeric(r[2])
      sub(".*#", "", locus$refName) == sub(".*#", "", r[1]) &&
        pos <= locus$end && pos + nchar(r[4]) - 1 > locus$start
    }, logical(1))
    records <- records[keep]
  }
  records
}

# NULL where the record lacks the key or gives it as `.`, VCF's missing value
info_field <- function(info, key) {
  m <- regmatches(info, regexpr(sprintf("(^|;)%s=[^;]*", key), info))
  value <- sub("^;?[^=]*=", "", m)
  if (length(value) && value != ".") value
}

# Each allele's frequency, the reference's first
allele_frequencies <- function(record, alleles) {
  info <- record[8]
  num <- function(x) {
    v <- strsplit(x, ",", fixed = TRUE)[[1]]
    as.numeric(replace(v, v == ".", NA))
  }
  af <- info_field(info, "AF")
  ac <- info_field(info, "AC")
  an <- info_field(info, "AN")
  alt <- if (!is.null(af)) {
    num(af)
  } else if (!is.null(ac) && !is.null(an)) {
    num(ac) / num(an)
  } else {
    called <- called_alleles(record)
    if (!length(called)) return(NULL)
    tabulate(called + 1, alleles)[-1] / length(called)
  }
  alt[is.na(alt)] <- 0
  c(max(0, 1 - sum(alt)), alt)
}

called_alleles <- function(record) {
  if (length(record) < 10) return(integer())
  gt <- sub(":.*", "", record[-(1:9)])
  calls <- unlist(strsplit(gt, "[/|]"))
  as.integer(calls[calls != "."])
}

# A site's frequency for each node its alleles pass, named by node id
site_frequencies <- function(record) {
  info <- record[8]
  level <- info_field(info, "LV")
  at <- info_field(info, "AT")
  if (is.null(at) || (!is.null(level) && level != "0")) return(NULL)
  paths <- strsplit(at, ",", fixed = TRUE)[[1]]
  freq <- allele_frequencies(record, length(paths))
  if (is.null(freq)) return(NULL)
  steps <- lapply(strsplit(paths, "[<>]"), function(s) s[nzchar(s)])
  node <- unlist(steps)
  passes <- rowsum(rep(freq, lengths(steps)), node, reorder = FALSE)
  stats::setNames(passes[, 1], rownames(passes))
}
