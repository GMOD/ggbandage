#' @keywords internal
#' @importFrom ggplot2 autoplot fortify
#' @importFrom utils globalVariables
"_PACKAGE"

utils::globalVariables(c(
  "x", "y", "draw", "ink", "width", "angle", "halfWidth",
  "color", "alpha", "panel", "name", "stretch", "gene", "stops", "walk",
  "note", "xmin", "xmax", "kind", "label", "readout", "id", "position",
  "letter", "block"
))

#' @export
ggplot2::autoplot
