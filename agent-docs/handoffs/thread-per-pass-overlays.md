# Handoff: thread-per-pass overlays

## What was done

**Request:** the gallery's "Three KIV-2 haplotypes overlaid" figure, then the CFHR3/CFHR1 and C4 overlays, should use gradients, with walk rows below. The C4 extra copy was invisible because every copy shares nodes.

**Gallery**
- The README shows eight figures, four wide then four tall: `cfh_overlay`, `kiv2_rows`, `amylase_rows`, `cyp2d6_stress`, `kiv2_overlay`, `syng_overlay`, `syng_rhd` and `own_colours`. `docs/gallery.md` shows them first and the other eight under "More examples". `readme = TRUE` in `scripts/gallery.R` marks the core set.
- `kiv2_overlay`, `cfh_overlay` and `syng_overlay` sit above walk rows.
- In `kiv2_overlay` and `cfh_overlay` each walk has a separate colour ramp, and each row repeats its walk's ramp along the bar, paler off the GRCh38 path. `cfh_overlay`'s ribbons break across the 85 kb HG02055#1 lacks.
- `syng_overlay` lifts each walk in one flat colour with a thread per pass, and its rows take those colours. `syng_ramp` is the position-ramp version, in `docs/gallery.md` only.
- The six PNGs that drifted are redrawn:
  - `syng_c4`, `syng_kiv2`, `syng_amy` and `syng_rhd` moved by subpixels with core 11.7.2's `9c46a40`, which orients a force layout to the reference. A bundle of 11.7.1 redraws the old PNGs exactly.
  - `kiv2_walks` and `own_colours` were drawn from the `-f4` walk file, which jbrowse.org no longer serves.

**Core (`bandage-core` 11.8.0, released 2026-10-21)**
- First session: `ff8651f`..`a28924f` draw a thread per pass, cap the band at 48 px and add walk, pass and offset columns to `figureData`.
- `1aacd82`: `keys` gains `field`, so a host can tell a progress ramp from a reference-position one.
- `4f69312`: lanes cut only a curl shorter than π times the band. The old 2π cut straightened C4's HERV-K loop away once ten walks widened the band.
- `966c5cc`: lifts with no repeats lane along the walk's smoothed normals. The per-node normals sprayed stray dots off clusters of short nodes.
- `12d957a`: flat lanes past the fourth walk take each family at 0.85, then 0.2, so twelve walks get twelve colours.
- `dcc3df7`: thread placement uses slot centres in place of closures, with identical output.
- `d2f2310`, `1166fa8`: `figureSvg` wraps its key onto more lines, the walk-rows key entry by entry.
- `a2b03e3`: a lane run that no earlier run overlaps takes its sign from the direction it reads its nodes in, so a backward walk keeps its side through a bubble only it takes.
- `326986c`: `pathLegend` tries sample#haplotype before an offset, so syng walks key as `HG01978#2`.
- `0ba03af`: walk rows widen P-line labels to sample#haplotype where two would match.

**ggbandage**
- `hues = "walk"` takes progress ramps as well as flat colours, runs a ramp from the bar's end where the row reads its walk backwards, and outlines blocks so their fills leave the walk colours visible.
- Rows a passed `layout` lifts take the key's names, and blocks past the three filled ones are keyed.
- `autoplot.bandage_layout` draws with `clip = "off"`, and the position colourbar lays out horizontally wherever its legend sits.
- The rows' outline scale is skipped when nothing takes an outline, which fixes the "No shared levels found" warning.
- `inst/js/bandage.js` is bundled from the 11.8.0 release, which `package.json` pins.

**Tests:** core 856 pass, with tsc, eslint and prettier clean. Every R test passes, R CMD check gives no notes, and the four findings of an independent review are fixed.

## Rebuild

- `BANDAGE_CORE=<checkout> node scripts/build-js.mjs` bundles `inst/js/bandage.js` from a local core.
- `Rscript scripts/gallery.R [id]` redraws figures and rewrites `docs/gallery.md` and the README table.

## Next steps

1. **Performance:** timed on ada, min of 7 runs on a 20k-node chain:

   | Lift | 11.7.3 | now |
   | --- | --- | --- |
   | 2 walks | 43 ms | 78 ms |
   | 20 walks | 167 ms | 275 ms |
   | 2 walks, one repeating | 34 ms | 165 ms |
   | 20 walks, one repeating | 157 ms | 488 ms |

   - The time spreads across lane runs, smoothing, thread assignment and GC, with no single hot line. The next step is a rewrite onto typed arrays, or lane runs cut to the viewport
   - BandageJS rebuilds geometry after each zoom, and the lane work covers the whole graph
2. **Palette for ramps:** walks lifted together on progress ramps still repeat the four families after the fourth walk.

## Rough edges

- **Crossing:** the lanes knot where the C4 ring closes and the tails leave it.
- **Notch:** every lane jogs about 1 px at the top right of the C4 ring, where one run's smoothing hands over to another's.
- **Floating curl:** the pale curl beside the right tail is sequence no lifted walk visits, drawn faded as the key says.
- **Thumbnails:** the 2 px threads can't be counted at README thumbnail size. `syng_ramp` gives every pass through a node that node's colour, so all of a node's threads match.
- **Ramp rows:** a row's ramp runs from its bar's start, at the left flank, and the drawing's ramp from the cut's start, 1 kb further out, so the two differ by a few percent.
- **Commit trailers:** some agent commits say Opus 5.5 where the owner's say Sonnet.
