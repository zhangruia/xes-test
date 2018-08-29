export const parentInformation = function (parent) {
  let parentW, parentH, parentX, parentY;
  parentW = parent.rectangle[2]
  parentH = parent.rectangle[3]
  parentX = parent.transform[0]
  parentY = parent.transform[1]
  return {
    parentW: parentW,
    parentH: parentH,
    parentX: parentX,
    parentY: parentY
  }
}
