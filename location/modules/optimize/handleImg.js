import { Common } from './common'
import Global from './global.json'
import basic from '../../common/basic.json'
import { prevInformation } from './information/prevInformation'

export class HandleImg extends Common {
  constructor (prev, item, parent) {
    super()
    this.arrays = null
    this.maxHei = 0
    this.curMaxHei = 0
    this.transform(prev, item, parent)
  }
  firstObj (current) {
    super.handleWrap(current)
    maxWid = basic.common.warpW
    let imgwid = current.rectangle[2]
    Global.forceWrap = true
    Global.allPrev.push(current)
  }
  isWrap (prev, current) {
    const prevData = prevInformation(prev)
    Global.maxWid = basic.common.warpW - prevData.prevX - prevData.prevW
    let imgwid = current.rectangle[2]
    if (current.isWrap > 0) {
      Global.forceWrap = true
      this.arrays = Global.allPrev
      this.maxHei = Global.maxHei
      this.curMaxHei = super.max(Global.len)
      Global.maxHei += super.max(Global.len)
      let max = super.max(Global.widthLen)
      Global.globalWid = (Global.globalWid <= max) ? max : Global.globalWid
      Global.len = []
      Global.widthLen = []
      Global.allPrev = []
      super.handleWrap(current)
      Global.allPrev.push(current)
    } else if (imgwid > Global.maxWid) {
      Global.forceWrap = true
      this.arrays = Global.allPrev
      this.maxHei = Global.maxHei
      this.curMaxHei = super.max(Global.len)
      Global.maxHei += super.max(Global.len)
      let max = super.max(Global.widthLen)
      Global.globalWid = (Global.globalWid <= max) ? max : Global.globalWid
      Global.len = []
      Global.widthLen = []
      Global.allPrev = []
      super.handleWrap(current)
      Global.allPrev.push(current)
    } else {
      Global.forceWrap = false
      this.arrays = null
      this.maxHei = 0
      this.curMaxHei = 0
      Global.maxWid -= current.rectangle[2];
      super.handleWrap(current)
      Global.allPrev.push(current)
    }
  }
  transform (prev, item, parent) {
    if (prev) this.isWrap(prev, item)
    else this.firstObj(item)
    super.setTransform(
      prev?prevInformation(prev):null,
      item,
      Global.forceWrap,
      Global.maxHei,
      Global.maxHei + super.max(Global.len)
    )
    if (Global.forceWrap) {
      super.vertical(this.arrays, this.maxHei, this.curMaxHei)
      this.specialStyle(this.arrays, this.maxHei, Global.maxHei)
    }
  }
  specialStyle (lineObj, prevMax, curMax) {
    super.specialStyle(lineObj, prevMax, curMax)
    // if (Global.forceWrap) super.vertical(this.arrays, this.maxHei, this.curMaxHei)
  }
}
