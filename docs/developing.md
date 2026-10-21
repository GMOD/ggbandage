# Developing

## The engine bundle

`inst/js/bandage.js` is bandage-core, the tabix reader and graph-walks bundled
for V8, committed so installing needs no JavaScript toolchain. Its first line
names the core release it was built from, the one `package.json` pins. To
take the latest releases by hand:

```console
scripts/update-deps.sh
```

- The `bundle` workflow checks the committed bundle is the pinned releases'
  build
- The `update-deps` workflow runs `scripts/update-deps.sh` daily. The script
  moves every bundled package to its latest release and the packages they
  depend on to the newest their ranges allow, rebuilds, and commits to main
  once R CMD check passes
- `@jbrowse` releases go in the day they come out. Others wait three days,
  the `minimumReleaseAge` in `pnpm-workspace.yaml`

## The gallery

`scripts/gallery.R` holds each gallery figure's code, title and alt text. It
draws `gallery/*.png` from the hosted files, then writes `docs/gallery.md` and
the README's cards from the same list, a card for each figure marked
`readme = TRUE`:

```console
Rscript scripts/gallery.R            # every figure
Rscript scripts/gallery.R c4_stress  # one figure, and the docs
```

## Test fixtures

`tests/testthat/testdata/ecoli_pggb.*` and `ecoli_rgfa.*` are segment indexes
of the two test GFAs, made with gfa-to-tabix 0.12.1:

```console
gfa-to-tabix ecoli_pggb_subgraph.gfa --reference K12 -o ecoli_pggb
gfa-to-tabix ecoli_rgfa_slice.gfa.gz -o ecoli_rgfa
```

`ecoli_pggb.K12.walks.bed.gz` is the pggb GFA's walk file, and `ecoli_contig.*`
the same graph in the contig layout, made with gfa-to-tabix 1.0.0:

```console
gfa-to-tabix ecoli_pggb_subgraph.gfa --walks --refs K12 -o ecoli_pggb
gfa-to-tabix ecoli_pggb_subgraph.gfa --reference K12 --layout contig -o ecoli_contig
```

`ecoli_pggb_csi.*` copies `ecoli_pggb`'s two files with a `.csi` in place of
each `.tbi`, from `tabix -C -p bed`.
