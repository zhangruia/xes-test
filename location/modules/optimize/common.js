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
      if (!item.texture.content.specialStyle || item.texture.content.specialStyle=='normal') {
        item.transform[1] = prevMax + flexHei
      }
    })
  }
  max (array) {
    return Math.max.apply(Math, array)
  }
  handleWrap (current) {
    const isWrap = current.isWrap ? current.isWrap : 0
    if (isWrap > 1) { // 要求换多行
      if (current.texture.type == 3) {
        const lineH = basic.common.lineH; // 默认行高
        const size = current.texture.content.style.fontSize // 文字大小
        lineH > size ? Global.len.push(lineH) : Global.len.push(size)
      } else {
        Global.len.push(current.rectangle[3])
      }
      Global.widthLen.push(current.rectangle[2])
    } else {
      if (current.texture.type == 3) {
        const lineH = basic.common.lineH;
        const size = current.texture.content.style.fontSize
        lineH > size ? Global.len.push(lineH) : Global.len.push(size)
      } else {
        Global.len.push(current.rectangle[3])
      }
      Global.widthLen.push(current.rectangle[2])
    }
  }
  setTransform (prev, current, iscut, prevMaxHei, maxHei) {
    const isWrap = current.isWrap ? current.isWrap : 0
    const curWid = maxHei - prevMaxHei
    if (isWrap > 1) {
      const line = basic.common.lineH * (isWrap - 1)
      this.isCut(prev, current, iscut,
        prevMaxHei + line + ((curWid - current.rectangle[3]) / 2))
    } else {
      this.isCut(prev, current, iscut, prevMaxHei)
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
  alignTop (len) {
    len += 1;
    return len
  }
  alignBottom (len, val, prevMax, curMax) {
    const spaceY = curMax - prevMax - val.rectangle[3];
    val.transform[1] = prevMax + spaceY
    len += 1;
    return len
  }
  deleteLine () {

  }
  underLine () {

  }
  specialStyle (lineObj, prevMax, curMax) {
    let specialState = null;
    let normalArr = [], len = 0;
    lineObj.map((val, ind) => {
      const special = val.texture.content.specialStyle
      if (special == 'sup') {
        const alignTop = this.alignTop(len)
        len = alignTop;
      } else if (special == 'sub') {
        const alignBottom = this.alignBottom(len, val, prevMax, curMax)
        len = alignBottom;
      } else {
        normalArr.push(val)
      }
    })
    // 根据标签的状态更改剩余对象的y轴
    if (len) {
      normalArr.map(val => {
        const line = Global.maxHei - prevMax;
        const curWidth = val.rectangle[3];
        const width = (line - curWidth) / 2
        val.transform[1] = width + prevMax
      })
    }
  }
}
