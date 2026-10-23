#!/usr/bin/env bash
# Builds <prefix>.syng.gfa.gz, a syng graph of HPRC haplotypes over a GRCh38
# region, with impg:
#   build-syng-region.sh chr6:160,616,004-160,646,753 kiv2 HG00097#1,HG00133#2
# Needs R with ggbandage, impg (or set IMPG),
# samtools, curl and python3. Without R, copy <prefix>.walks from a machine with it.
set -euo pipefail
region=$1 prefix=$2 haps=$3
impg=${IMPG:-impg}
walks=https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f5.GRCh38.walks.bed.gz
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

if [[ ! -s $prefix.walks ]]; then
  Rscript -e 'a <- commandArgs(TRUE)
    cat(ggbandage::bandage_gfa(a[1], a[2], haplotypes = strsplit(a[3], ",")[[1]]))' \
    "$walks" "$region" "$haps" |
    awk -F'\t' '$1 == "W" {
      n = gsub("<", "", $7); p = gsub(">", "", $7)
      print $2, $3, $4, $5, $6, (n > p ? 2 : 1)
    }' >"$tmp/walks"
  { grep '^GRCh38 ' "$tmp/walks"; grep -v '^GRCh38 ' "$tmp/walks"; } >"$prefix.walks"
fi

while read -r sample hap contig start end strand; do
  case $sample in
  GRCh38 | CHM13)
    genome=$([[ $sample == GRCh38 ]] && echo hg38 || echo hs1)
    curl -sf --retry 3 "https://api.genome.ucsc.edu/getData/sequence?genome=$genome;chrom=$contig;start=$start;end=$end" |
      python3 -c 'import json, sys; print(">" + sys.argv[1]); print(json.load(sys.stdin)["dna"].upper())' \
        "${sample,,}#$contig:$start-$end"
    ;;
  *)
    echo ">$sample#$hap#$contig:$start-$end"
    curl -sf --retry 3 "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=nuccore&id=$contig&rettype=fasta&seq_start=$((start + 1))&seq_stop=$end&strand=$strand" |
      grep -v '^>'
    sleep 0.4
    ;;
  esac
done <"$prefix.walks" >"$tmp/haps.fa"

# impg leaves the queried path out of its GFA, so query a copy of the reference
awk '/^>/ { n++ } n == 1 { print (NR == 1 ? ">query#0#ref" : $0) }' "$tmp/haps.fa" >"$tmp/query.fa"
cat "$tmp/query.fa" >>"$tmp/haps.fa"
samtools faidx "$tmp/haps.fa"

"$impg" syng -f "$tmp/haps.fa" -o "$tmp/haps.syng" -t 8
len=$(awk -F'\t' '$1 == "query#0#ref" { print $2 }' "$tmp/haps.fa.fai")
"$impg" query -a "$tmp/haps.syng" -r "query#0#ref:0-$len" \
  -d 1m -o gfa:syng --sequence-files "$tmp/haps.fa" \
  --force-large-region -O "$tmp/haps.syng"

awk -F'\t' -v OFS='\t' '$1 == "P" && match($2, /:[0-9]+-[0-9]+:[0-9]+-[0-9]+$/) {
  split(substr($2, RSTART + 1), r, /[-:]/)
  $2 = substr($2, 1, RSTART) (r[1] + r[3]) "-" (r[1] + r[4])
} 1' "$tmp/haps.syng.gfa" | gzip -9 >"$prefix.syng.gfa.gz"
