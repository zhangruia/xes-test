export const prevInformation = function (prev) {
  let prevW, prevH, prevX, prevY;
  prevW = prev.rectangle[2]
  prevH = prev.rectangle[3]
  prevX = prev.transform[0]
  prevY = prev.transform[1]
  return {
    prevW: prevW,
    prevH: prevH,
    prevX: prevX,
    prevY: prevY
  }
}
