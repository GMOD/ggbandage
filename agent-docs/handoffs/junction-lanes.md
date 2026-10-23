# Handoff: lanes through junctions

## What was done

**Request:** lifted walks drew hooks and knots where they meet at a junction, as at both ends of the Rhesus box and at the hub of the RHD syng figure. The user asked for a critique of the lane code, then said to fix it.

**Diagnosis**
- A node kept one lane frame (shift and normal), set by the first walk to reach it. Every other walk, and every later pass, used a frame fitted to another direction of travel.
- Syng graph nodes are far shorter than the band. On RHD every lifted node is, at a median of 0.2 px against a 24.5 px band, so a link between two frames that disagree has no length to slide in, and the slide drew as a hook.
- Thread order followed pass order, and on a once-visited node the thread switched at the midpoint between its neighbours, so threads swapped sideways at junctions.
- The inner thread of a hairpin tighter than half the band folded back on itself.

**Core (`bandage-core` 11.13.0, released 2026-10-23)**
- `laneLines` gives each walk's visit to a node a `VisitFrame` from that walk's smoothed route, and `runSigns` turns each frame to agree with the node's first visit.
- Where a walk runs the first visit's way for the smoothing reach either side of a visit's points, `laneLines` lets the visit share the first visit's arrays, and smooths again only where routes part. Flat lanes, which tile a node, keep one frame per node.
- `easeOffsets` eases a thread's offset (slot centre plus thread place) along its walk, point by point where it changes. On a node the walk passes once, the thread glides between the threads either side of it.
- `loosened` smooths a line again wherever it turns tighter than half the band.
- `walkSteps` holds the parts no zoom changes, and the builder caches it on the lift. `laneRuns` lays runs out per step in typed arrays.

**Measured** with a scratch harness that chains each walk's strokes into threads:

| | RHD before | RHD after | C4 before | C4 after |
| --- | --- | --- | --- | --- |
| turns over 50° per 2 px | 42 | 0 | 37 | 0 |
| hooks over 120° | 19 | 0 | 20 | 0 |
| thread crossings | 12 | 5 | 27 | 5 |
| points a third of a pixel off the local chord | 250 | 2 | 352 | 61 |

**Performance** on ada, cold builds against main:
- the RHD figure takes about 200 ms against 150 ms, and C4 47 ms against 36 ms
- the 20k-node chain takes about 1.4× main with 2 walks, 1.6× with 20, and 2× with 20 walks of which one repeats

**ggbandage**
- `syng_overlay` and `syng_rhd` are redrawn, and `inst/js/bandage.js` is bundled from 11.13.0.
- The two-threads test counts v1's strokes from the node table, since a hairpin's shifted lanes now cross v1's x range.

**Review:** an independent review found that a long node let a visit share a frame where routes part, and that flat lanes stopped tiling. 11.13.0 fixes both, with a test for each.

## Rough edges

- **Hairpin pull-back:** a hairpin's tip sits back from its nodes, by however far it takes to turn the band's inner thread. At the RHD hub the lanes stop short of the faded node cluster.
  - Settled as kept: bandage-core's `docs/adr/0001-hairpin-tips-keep-their-pull-back.md` records the trial and why reaching further let the hub's opposing hairpins overlap.
- **Orange curl:** the core still draws a small curl for HG01258#2 at the RHD hub, where the walk's route loops in the layout.
- **Crossings:** of the 5 left in each figure, 7 of the 10 lie between different walks, where a walk's fixed slot puts it on the wrong side of a band that splits. Only 1 in RHD and 1 in C4 lie within one walk's threads. Ordering threads by where they go next would remove only those; most of the rest need slots that change order along a band, as in metro-line crossing minimisation.
- **Flat lanes:** lanes of walks that never repeat keep one frame per node, so their links still slide by the frame they leave from.
