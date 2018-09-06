import Global from './global.json'
import basic from '../../common/basic.json'

export class Common {
  constructor () {
    this.forceWrap = Boolean
  }
  prevInformation (prev) {
    if (prev == null) return false
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
  vertical (array, prevMax, curMaxHei) {
    array.map((item, index) => {
      const hei = item.rectangle[3]
      const flexHei = (curMaxHei - basic.common.fontpadtop - hei) / 2
      item.transform[1] = prevMax + flexHei
    })
  }
  max (array) {
    return Math.max.apply(Math, array)
  }
  handleWrap (current) {
    const isWrap = current.isWrap ? current.isWrap : 0
    if (isWrap > 1) {
      const line = basic.common.lineH * (isWrap - 1)
      const top = basic.common.fontpadtop * (isWrap - 1)
      Global.len.push(current.rectangle[3] + line + top)
      Global.widthLen.push(current.rectangle[2])
    } else {
      Global.len.push(current.rectangle[3] + basic.common.fontpadtop)
      Global.widthLen.push(current.rectangle[2])
    }
  }
  setTransform (prev, current, iscut, maxHei) {
    const isWarp = current.isWarp ? current.isWarp : 0
    if (isWarp > 1) {
      const line = basic.common.lineH * (isWarp - 1)
      this.isCut(prev, current, iscut, maxHei + line)
    } else {
      this.isCut(prev, current, iscut, maxHei)
    }
  }
  isCut (prev, current, iscut, y) {
    if (iscut) {
      current.transform[0] = basic.common.fontpadleft
      current.transform[1] = y
    } else {
      current.transform[0] = prev.prevX + prev.prevW + basic.common.fontpadleft
      current.transform[1] = y
    }
  }
  setRectangle (current, w, h) {
    current.rectangle[0] = 0
    current.rectangle[1] = 0
    current.rectangle[2] = w
    current.rectangle[3] = h
  }
}
