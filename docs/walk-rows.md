# Reading walk rows

`bandage_walk_rows()` draws each walk as a bar of the bp it has between the
reference nodes flanking the region, the reference on top, then the walks that
reach both flanks longest first. A repeat expansion shows as bar length, which
no node layout shows. [KIV-2 copy number as walk rows](gallery.md#kiv-2-copy-number-as-walk-rows)
and [Amylase copy number in twelve haplotypes](gallery.md#amylase-copy-number-in-twelve-haplotypes)
are two examples.

```r
walks <- "https://jbrowse.org/demos/hprc/hprc-v2.1-mc-grch38-f5.GRCh38.walks.bed.gz"
rows <- bandage_walk_rows(
  walks, "chr6:160,616,004-160,646,753",
  haplotypes = c("HG00097#1", "HG00099#1", "HG00133#2", "HG01123#1", "HG02055#1")
)
autoplot(rows)
```

- **x:** bp from the left flank, counted along each walk, not reference
  coordinates
- **Readout:** a bar's bp between the flanks, so GRCh38 reads 31 kb at KIV-2.
  A layout's walk key counts the whole cut instead, `context` bp past each end
  of the region included, and reads 32.8 kb for the same GRCh38 walk
- **Colour:** sequence on the reference's path takes the colour of the
  reference position it covers. A duplicated reference stretch repeats its
  colours, and an inverted one runs them backwards. A copy the graph threads
  through a different reference paralogue takes that paralogue's colours
- **A reference that walks nodes twice:** a syng or pggb graph can fold the
  reference's own duplication onto one copy's nodes. Each copy then takes the
  colours of the reference copy it continues, and switches where the row walks
  a node only one reference copy holds. The reference's own row stays a smooth
  gradient
- **Charcoal:** sequence on non-reference nodes. Such sequence can still
  resemble the reference, as an extra repeat copy does, but the graph holds it
  on separate nodes
- **Letters:** a block of non-reference nodes that two or more drawn rows
  walk, the same letter wherever it recurs, A for the most bp. A letter twice
  in one row means the row walks some of those nodes twice, or other sequence
  splits the block. A block counts once a stretch of it reaches 1.2% of the
  longest bar, and `autoplot()` fills the three largest. Which rows are drawn
  decides the blocks, and another row can split one
- **White:** sequence missing from the extracted subgraph, counted in the
  bar's length:
  - **outside the extracted subgraph** (dashed): graph sequence the walk takes
    away from the region's nodes. From a walk file, the readout names where,
    e.g. `34 kb on nodes filed near chr22:20.3 Mb`
  - **not in the graph** (solid dark, walk files only): the walk's record ends
    and the contig's next record starts past it
  - **gap, cause unknown** (dotted, walk files only): the file leaves it open,
    as between two record breaks with a record the reference never visits
    between them
- **Ribbons:** pale blue where neighbouring rows walk the same graph nodes,
  violet where one walks them backwards. Shared nodes mean similar sequence,
  not shared ancestry. `autoplot(rows, ribbons = FALSE)` leaves them out, as
  for rows that share almost every node
- Inside a repeat, the ribbons show one pairing of the copies, the one that
  keeps both rows in order. A missing ribbon there does not mean the rows
  share nothing
- A walk measured from one flank gets no ribbons or letters, and its readout
  ends `· no ribbons`
- `order = "shared"` puts each row under the row it shares the most nodes
  with. The order is a layout aid and does not show relatedness
- `rows$rows` has each walk's `bp` and readout, `rows$runs` each stretch of
  each bar, `rows$links` each ribbon and `rows$blocks` each stretch of a block
