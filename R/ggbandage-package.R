#' @keywords internal
#' @importFrom ggplot2 autoplot fortify
#' @importFrom utils globalVariables
"_PACKAGE"

utils::globalVariables(c(
  "x", "y", "draw", "ink", "width", "angle", "length", "halfWidth",
  "color", "alpha", "panel"
))

#' @export
ggplot2::autoplot
