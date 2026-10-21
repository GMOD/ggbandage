#' Bandage's reference-position hues as a fill scale
#'
#' Hue 0 to 300 at the saturation and lightness the Bandage view paints the
#' backbone with, so walk rows set under a layout read in its colours.
#' `autoplot(rows, hues = "bandage")` adds it to walk rows.
#' @param name the scale's title
#' @param ... passed to [ggplot2::scale_fill_gradientn()]
#' @export
scale_fill_bandage_position <- function(name = "reference position, Mb", ...) {
  position_scale(ggplot2::scale_fill_gradientn, name, colours = bandage_hues(), ...)
}

# hsl(h, 70%, 50%) is hsv(h, 0.7 / 0.85, 0.85); a stop every 10 degrees keeps
# the scale's interpolation on the hue circle
bandage_hues <- function() {
  grDevices::hsv(seq(0, 300, by = 10) / 360, 0.7 / 0.85, 0.85)
}

position_scale <- function(scale, name, ...) {
  scale(
    name,
    ...,
    breaks = function(limits) seq(limits[1], limits[2], length.out = 3),
    labels = mb_labels,
    guide = ggplot2::guide_colourbar(
      order = 1, barwidth = grid::unit(120, "pt"), barheight = grid::unit(8, "pt"),
      title.position = "top", direction = "horizontal"
    )
  )
}

# Mb to as many decimals as tell the ends of the span apart
mb_labels <- function(x) {
  span <- diff(range(x, na.rm = TRUE)) / 1e6
  digits <- if (span > 0) max(2, ceiling(-log10(span)) + 1) else 2
  formatC(x / 1e6, format = "f", digits = digits)
}
