#!/usr/bin/env bash
# Rebuilds the walk-file fixtures from the GFAs beside them with gfa-to-tabix
# 4.0, in walk format 7. Usage: testdata/build.sh <gfa-to-tabix binary>
set -euo pipefail
cd "$(dirname "$0")"
B=${1:?the gfa-to-tabix binary}
build() {
  local name=$1 gfa=$2; shift 2
  "$B" "$gfa" --walks -o "$name.tmp" "$@" > /dev/null 2>&1
  local out
  for out in "$name".tmp.*.walks.gz; do
    local sample=${out#"$name".tmp.}; sample=${sample%.walks.gz}
    mv "$out" "$name.$sample.walks.gz"
    mv "$out.idx" "$name.$sample.walks.gz.idx"
  done
}
build ecoli_pggb ecoli_pggb_subgraph.gfa --refs K12 --tile 65536
build ecoli_pggb_abridged ecoli_pggb_subgraph.gfa --refs K12 --tile 65536 --abridge-steps 20
build records records.GRCh38.gfa --refs GRCh38 --tile 1000
build stepless stepless.REF.gfa --refs REF --tile 1000
