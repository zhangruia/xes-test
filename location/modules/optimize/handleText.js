import { Common } from './common'
import Global from './global.json'
import basic from '../../common/basic.json'

export class HandleText extends Common {
  constructor (prev, item, parent) {
    super()
    this.warpW = basic.common.warpW
    this.fontReg = /[\u4e00-\u9fa5]+/
    this.letterReg = /[A-Za-z]/
    this.chinesePunctuaReg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/
    this.englishPunctuaReg = /[\x21-\x2f\x3a-\x40\x5b-\x60\x7B-\x7F]/
    this.trimReg = /\s/
    this.numberReg = /\d/
    this.prevData = prev?super.prevInformation(prev):null
    this.arrays = null
    this.maxHei = 0
    this.curMaxHei = 0
    this.transform(prev, item, parent)
  }
  contSize (value) {
    let nextwid = 0
    if (this.fontReg.test(value)) {
      nextwid = basic.common.fontSize
    } else if (this.letterReg.test(value)) {
      nextwid = basic.common.letterSize
    } else if (this.chinesePunctuaReg.test(value)) {
      nextwid = basic.common.chineseSize
    } else if (this.englishPunctuaReg.test(value)) {
      nextwid = basic.common.englishSize
    } else if (/\．/.test(value)) {
      nextwid = basic.common.chineseSize
    } else if (this.trimReg.test(value)) {
      nextwid = basic.common.trimSize
    } else if (this.numberReg.test(value)) {
      nextwid = basic.common.numberSize
    } else {
      console.log(value);
    }
    return nextwid
  }
  fontSize (wid, current, size) {
    let content = current.texture.content
    const fontState = content.hasOwnProperty('style')
    if (fontState && content.style.hasOwnProperty('fontSize')) wid += content.style.fontSize;
    else wid += size;
    return wid
  }
  admissible (current, maxWid) {
    let accomm = ''; // 可容纳内容
    let residue = ''; // 需要剪裁内容
    let hei = 30;
    let wid = 0;
    let test = true
    const text = current.texture.content.text

    for (let i = 0; i < text.length; i++){
      let nextsize = this.contSize(text[i])
      if (maxWid - wid >= nextsize) {
        if (this.fontReg.test(text[i])) {
          wid = this.fontSize(wid, current, basic.common.fontSize)
        } else if (this.letterReg.test(text[i])) {
          wid = this.fontSize(wid, current, basic.common.letterSize)
        } else if (this.chinesePunctuaReg.test(text[i])) {
          wid = this.fontSize(wid, current, basic.common.chineseSize)
        } else if (this.englishPunctuaReg.test(text[i])) {
          wid = this.fontSize(wid, current, basic.common.englishSize)
        } else if (/\．/.test(text[i])) {
          wid = this.fontSize(wid, current, basic.common.chineseSize)
        } else if (this.trimReg.test(text[i])) {
          wid = this.fontSize(wid, current, basic.common.trimSize)
        } else if (this.numberReg.test(text[i])) {
          wid = this.fontSize(wid, current, basic.common.numberSize)
        } else console.log(text[i]);
        accomm += text[i]
      } else {
        residue += text[i]
      }
    }
    let content = current.texture.content
    const fontState = content.hasOwnProperty('style')
    if (fontState) content.style.fontSize = basic.common.fontSize;
    else {
      content.style = {}
      content.style["fontSize"] = basic.common.fontSize
    }
    return {
      accomm: accomm,
      residue: residue,
      width: wid
    }
  }
  cuttingObj (admissible, current, parent) {
      if (admissible.residue == '') return false
      else {
        current.texture.content.text = admissible.accomm
        let newObj = JSON.stringify(current)
        newObj = JSON.parse(newObj)
        newObj['force'] = true
        newObj.texture.content.text = admissible.residue
        parent.children.map((item, ind) => {
          if (parent.children[ind].texture.content.text == admissible.accomm) {
            parent.children.splice(ind + 1, 0, newObj)
          }
        })
      }
  }
  firstObj (prev, current, parent) {
    const font = current.texture.content
    const size = font.hasOwnProperty('fontSize') ? font.fontSize : basic.common.fontSize
    Global.maxWid = this.warpW
    let admiss = this.admissible(current, Global.maxWid)
    this.cuttingObj(admiss, current, parent)
    super.setRectangle(current, admiss.width, size)
    super.handleWrap(current)
    Global.allPrev.push(current)
  }
  isWrap (prev, current, parent) {
    current.force == undefined?Global.forceWrap=false:Global.forceWrap=true
    const font = current.texture.content
    const size = font.hasOwnProperty('fontSize') ? font.fontSize : basic.common.fontSize
    if (current.isWrap > 0) Global.forceWrap = true
    if (!Global.forceWrap) {
      this.arrays = null
      this.maxHei = 0
      this.curMaxHei = 0
      Global.maxWid = this.warpW - this.prevData.prevX - this.prevData.prevW
      let admiss = this.admissible(current, Global.maxWid)
      this.cuttingObj(admiss, current, parent)
      super.setRectangle(current, admiss.width, size)
      super.handleWrap(current)
      Global.allPrev.push(current)
    } else {
      this.arrays = Global.allPrev
      this.maxHei = Global.maxHei
      this.curMaxHei = super.max(Global.len)
      Global.maxHei += super.max(Global.len)
      let max = super.max(Global.widthLen)
      Global.globalWid = (Global.globalWid <= max) ? max : Global.globalWid
      Global.len = []
      Global.widthLen = []
      Global.allPrev = []
      Global.maxWid = this.warpW
      let admiss = this.admissible(current, Global.maxWid)
      this.cuttingObj(admiss, current, parent)
      super.setRectangle(current, admiss.width, size)
      super.handleWrap(current)
      Global.allPrev.push(current)
    }
  }
  transform (prev, current, parent) {
    if (prev) {
      this.isWrap(prev, current, parent)
      super.setTransform(this.prevData, current, Global.forceWrap, Global.maxHei)
    } else {
      this.firstObj(prev, current, parent)
      super.setTransform(prev, current, true, Global.maxHei)
    }
    console.log(current.texture.content);
    console.log(current.rectangle);
    console.log(current.transform);
    console.log('---------------------------------');
    if (Global.forceWrap) super.vertical(this.arrays, this.maxHei, this.curMaxHei)
  }
}
