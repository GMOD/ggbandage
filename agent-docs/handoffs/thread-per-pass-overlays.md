# Handoff: thread-per-pass overlays

## What was done

**Request:** the gallery's "Three KIV-2 haplotypes overlaid" figure, then the CFHR3/CFHR1 and C4 overlays, should use gradients, with walk rows below. The C4 extra copy was invisible because every copy shares nodes.

**Gallery**
- The README shows eight figures, four wide then four tall: `cfh_overlay`, `kiv2_rows`, `amylase_rows`, `cyp2d6_stress`, `kiv2_overlay`, `syng_overlay`, `syng_rhd` and `own_colours`. `docs/gallery.md` shows them first and the other eight under "More examples". `readme = TRUE` in `scripts/gallery.R` marks the core set.
- `kiv2_overlay`, `cfh_overlay` and `syng_overlay` sit above walk rows.
- In all three each walk has a separate colour ramp, and each row repeats its walk's ramp unbroken along the bar, under a grey strip where it runs on the GRCh38 path. `cfh_overlay`'s ribbons break across the 85 kb HG02055#1 lacks.
- `syng_overlay` lifts its walks as grey, blue and orange progress ramps with a thread per pass. Core 11.10.0 shades each thread by its own pass, so a node's threads step light to dark. `syng_ramp` is the position-ramp version, in `docs/gallery.md` only.
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

## Second session (core `1aa75b9`..`fc5b7d7`, released as 11.9.0)

**Performance**, as a fraction of 11.8.0's time on the 20k-node lift bench. Builds ran interleaved in one process on a loaded box, since ada refused ssh all session; ratios hold to about ±7%.

| Lift | whole graph | zoomed to a twentieth |
| --- | --- | --- |
| 2 walks | 0.98 | 0.69 |
| 20 walks | 1.05 | 0.40 |
| 2 walks, one repeating | 0.89 | 0.52 |
| 20 walks, one repeating | 0.76 | 0.49 |

- `1aa75b9`: the edge loop culls a lifted link against the viewport before building lanes. The margin is the widest band times the longest mitred normal plus the largest smoothing shift.
- `5f0d540`, `dff2834`, `88056b8`: `laneLines` sums in typed arrays, `walkThreads` interns nodes and keys link threads from → to, and `laneRuns` claims each node with one lookup.
- `e9edcf2`: lane prep is cached on the lift by positions, version and scale, so BandageJS reuses it when a pan rebuilds at the same zoom. `walkThreads.bench.ts` nudges the scale so each run is a cold zoom.
- Output is byte-identical to 11.8.0 on 180 bench cases, and the gallery redraws pixel-identical.
- A `Math.hypot` → `sqrt` swap saved ~3% but moved `syng_overlay` by antialiasing, so it was dropped.

**Palette** (`fc5b7d7`): ramps lifted together that share a family split it, the first taking the pale end, with a 0.08 gap. Four or fewer ramps keep the whole family, so no gallery figure changes.

## Next steps

1. **Performance against 11.7.3:** repeating lifts still take 1.7–2.5× 11.7.3's time. The rest is per-walk, string-keyed map lookups for colours and threads at every node and edge. The next step is node-indexed arrays across `WalkLift` and the builder.
2. **Viewport-cut prep:** lane prep can't be cut to the viewport exactly. A run's side comes from agreement summed over the whole run, so a cut could flip lanes mid-pan.

## Rough edges

- **Crossing:** the lanes knot where the C4 ring closes and the tails leave it.
- **Notch:** every lane jogs about 1 px at the top right of the C4 ring, where one run's smoothing hands over to another's.
- **Floating curl:** the pale curl beside the right tail is sequence no lifted walk visits, drawn faded as the key says.
- **Thumbnails:** the 2 px threads can't be counted at README thumbnail size. `syng_ramp` gives every pass through a node that node's colour, so all of a node's threads match.
- **Ramp rows:** a row's ramp runs from its bar's start, at the left flank, and the drawing's ramp from the cut's start, 1 kb further out, so the two differ by a few percent.
- **Commit trailers:** some agent commits say Opus 5.5 where the owner's say Sonnet.
