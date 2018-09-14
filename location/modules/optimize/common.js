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
  lineThrough (parent, val, curMax) {
    this.findAddChildIndex(parent, val, curMax)
  }
  underLine (parent, val, curMax) {
    // this.findAddChildIndex(parent, val, curMax)
  }
  findAddChildIndex (parent, val, curMax) {
    const childs = parent.children,
          style = val.texture.content.style,
          width = val.rectangle[2]; // 文本的宽度

    let len = 0, // 线的个数
        lineWid = null,
        newObj = JSON.parse(JSON.stringify(val)); // 将线转给一个新的对象

    newObj.force = false;
    newObj.isWrap = 0;
    newObj.texture.content.text = ''; // 置空
    newObj.line = true; // 给线添加一个特殊标识
    const special = val.texture.content.specialStyle
    if (special == 'underline') {
      lineWid = style.fontSize ? (style.fontSize) * 0.6 : basic.common.fontSize * 0.6
    } else {
      lineWid = style.fontSize ? (style.fontSize) * 0.35 : basic.common.fontSize * 0.35
    } // 线宽

    childs.map((item, ind) => {
      if (val.texture.content.text === item.texture.content.text) {
        for (let i = lineWid * len; i < width; i += 1) {
          if (lineWid * len < width) {
            len += 1;
            if (special == 'line-through;') newObj.texture.content.text += '-'
            else if (special == 'underline') newObj.texture.content.text += '_'
          }
        }
        parent.children.splice(ind + 1, 0, newObj)
        console.log(item.texture.content.text, ind, parent, 'parent');
      }
    })
    // console.log(parent);
  }
  specialStyle (lineObj, prevMax, curMax, parent) {
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
      } else if (special == 'line-through;') {
        console.log(11111111);
        
      } else {
        normalArr.push(val)
        if (special == 'line-through;') {
          // this.lineThrough(parent, val, curMax)
          this.findAddChildIndex(parent, val, curMax)
        } else if (special == 'underline') {
          // this.underLine(parent, val, curMax)
          // this.findAddChildIndex(parent, val, curMax)
        }
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
