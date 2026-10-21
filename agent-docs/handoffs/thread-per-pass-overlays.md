# Handoff: thread-per-pass overlays

## What was done

**Request:** the gallery's "Three KIV-2 haplotypes overlaid" figure, then the CFHR3/CFHR1 and C4 overlays, should use gradients, with walk rows below. The C4 extra copy was invisible because every copy shares nodes.

**Gallery (`ggbandage`)**
- `kiv2_overlay`, `cfh_overlay` and `syng_overlay` now sit above walk rows.
- `kiv2_overlay` keeps per-walk ramps. `cfh_overlay` colours every walk on one rainbow by GRCh38 position.
- `syng_overlay` keeps flat colours per walk with a thread per pass, and its rows are filled in each walk's colour. `syng_ramp` is the position-ramp version, in `docs/gallery.md` only.
- The README gallery table, alt texts, notes and docs match the figures.

**Core (`bandage-core`, local `main`, unpublished)**
- A walk that visits a node n times draws n threads in its own slot beside the other walks' slots.
- Commits: `ff8651f`, `4929789`, `accfa33`, `80c7929`, `ee30c8b`, `65218ad`, `a28924f`.
- Ramps stop at mid-lightness, and the band is capped at 48 px, with the key saying "thinned to fit".
- Lifts with no repeated node keep 11.7.3's link behaviour.
- `figureData` adds walk, pass and offset columns, and the thread note has its own `threadKeys` table.

**ggbandage**
- Commits: `9a30237`, `27ad4d9`, `9ba430c`, `3ce9c3f`, `efc13e9`, `e902e55`.
- The walk key wraps to the plot width and sits top left. Rows can take `hues = "walk", layout = g`, and the off-path stretches are pale tints.
- The bundle is the same from any checkout path.

**Tests:** core 848 pass, with tsc, eslint and prettier clean. R: 197 pass. Two independent reviews ran, and the findings are applied except as listed below.

## Rebuild

- `BANDAGE_CORE=<checkout> node scripts/build-js.mjs` bundles `inst/js/bandage.js` from a local core.
- `Rscript scripts/gallery.R [id]` redraws figures and rewrites `docs/gallery.md` and the README table.

## Next steps

1. **Release core:** publish a core version, bump the `package.json` pin from 11.7.0, run `pnpm install`, rebuild the bundle. `docs/developing.md` lists the steps. Nothing is pushed in either repo, and the `bundle` workflow fails on `main` until this is done.
2. **Decide on `cfh_overlay`:** it is one rainbow band, so the walks can't be told apart by colour. The deletion edge and rows carry the point. A flat colour per walk would separate them.
3. **Read the six other drifted PNGs:** `syng_c4`, `syng_kiv2`, `syng_amy`, `syng_rhd`, `own_colours` and `kiv2_walks` differ from their committed versions even when rendered from `main`. The cause is unknown. Read it before regenerating them.
4. **Fix the "No shared levels found" warning:** it comes from the colour scale in `R/walkrows.R` and appears while drawing `cfh_overlay`. It predates this work.
5. **Test with a larger set of walks:** the reviewers only tested synthetic chains and the C4 and KIV-2 cases. The JBrowse viewer redraw rate and the SVG key layout were not tested.

## Rough edges

- **Crossing:** the lanes knot where they cross at the bottom of the syng ring.
- **Floating curl:** a small pale curl floats beside the right tail.
- **Notch:** a faint notch sits on GRCh38's threads at the top right of the ring.
- **Stray dots:** a few stray dots show on the HG00097 loop in `kiv2_overlay`.
- **Colours:** `kiv2_overlay`'s colours swapped, because the key order now follows the rows (HG00133 cyan to blue, HG00097 yellow to red).
- **Thumbnails:** the 2 px threads can't be counted at README thumbnail size. `syng_ramp` also gives each pass the node's one colour, so the extra thread doesn't say which copy it is.
- **Row colours:** `kiv2_overlay`'s rows use a position scale that doesn't match its walk colours, and the key doesn't say that. Only `syng_overlay`'s rows match.
- **Performance:** a 20-walk lift with one repeating walk takes about 1.0 s on a 20k-node chain, against 0.36 s on 11.7.3. That is above the "few hundred ms" target.
- **Off-path stretches:** in `syng_overlay`'s rows they are about 1 px wide.
- **Commit trailers:** some agent commits in `bandage-core` and `ggbandage` say Opus 5.5 where the owner's say Sonnet.
- **Branches:** the first edits went straight to the primary checkout, without a worktree. Later work used worktrees that were removed after landing.
