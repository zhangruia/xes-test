export const setTransform = function (current, x, y) {
  current.transform[0] = x
  current.transform[1] = y
  return current
}
