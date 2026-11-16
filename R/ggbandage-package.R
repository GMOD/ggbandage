#' @keywords internal
#' @importFrom ggplot2 autoplot fortify
#' @importFrom utils globalVariables
"_PACKAGE"

utils::globalVariables(c(
  "x", "y", "draw", "ink", "width", "angle", "halfWidth",
  "color", "alpha", "panel", "name", "stretch", "gene", "stops", "walk",
  "note", "xmin", "xmax", "kind", "label", "id", "position",
  "letter", "block", "key", "colour", "slide_x", "slide_y",
  "strong", "text", "under", "swatch", "px", "dashed", "rim", "rim_px",
  "size", "x1", "y1", "x2", "y2", "fill"
))

#' @export
ggplot2::autoplot
