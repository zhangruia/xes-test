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
      // console.log(value);
    }
    return nextwid
  }
  fontSize (wid, current, size, text) {
    let content = current.texture.content
    const fontState = content.hasOwnProperty('style')
    if (fontState && content.style.hasOwnProperty('fontSize')) {
      if (this.fontReg.test(text)) {
        wid += content.style.fontSize;
      } else if (this.letterReg.test(text)) {
        wid += content.style.fontSize * 0.5;
      } else if (this.chinesePunctuaReg.test(text)) {
        if (/[\“\”]/.test(text)) wid += content.style.fontSize * 0.3;
        else wid += content.style.fontSize * 0.9;
      } else if (this.englishPunctuaReg.test(text)) {
        if (/[\_]/.test(text)) wid += content.style.fontSize * 0.6;
        else wid += content.style.fontSize * 0.3;
      } else if (/\．/.test(text)) {
        wid += content.style.fontSize * 0.9;
      } else if (this.trimReg.test(text)) {
        wid += content.style.fontSize * 0.3;
      } else if (this.numberReg.test(text)) {
        wid += content.style.fontSize * 0.6;
      } else {
        // console.log(text);
      }
    } else wid += size;
    return wid
  }
  admissible (current, maxWid) {
    // console.log(current.texture.content.text, maxWid, 'hhhhhhhhhhhh');
    let accomm = '', // 可容纳内容
        residue = ''; // 需要剪裁内容
    let wid = 0;
    let force = false; // 是否被截取
    const text = current.texture.content.text;
    let incision = null;
    for (let i = 0; i < text.length; i++){
      let nextsize = this.contSize(text[i])
      if (maxWid - wid >= nextsize && !force) {
        if (this.fontReg.test(text[i])) {
          wid = this.fontSize(wid, current, basic.common.fontSize, text[i])
        } else if (this.letterReg.test(text[i])) {
          wid = this.fontSize(wid, current, basic.common.letterSize, text[i])
        } else if (this.chinesePunctuaReg.test(text[i])) {
          if (/[\“\”]/.test(text[i])) wid = this.fontSize(wid, current, basic.common.englishSize, text[i]);
          else wid = this.fontSize(wid, current, basic.common.chineseSize, text[i]);
        } else if (this.englishPunctuaReg.test(text[i])) {
          if (/\_/.test(text[i])) wid = this.fontSize(wid, current, basic.common.fontSize * 0.6, text[i])
          else wid = this.fontSize(wid, current, basic.common.englishSize, text[i])
        } else if (/\．/.test(text[i])) {
          wid = this.fontSize(wid, current, basic.common.chineseSize, text[i])
        } else if (this.trimReg.test(text[i])) {
          wid = this.fontSize(wid, current, basic.common.trimSize, text[i])
        } else if (this.numberReg.test(text[i])) {
          wid = this.fontSize(wid, current, basic.common.numberSize, text[i])
        } else {
          // console.log(val);
        }
        accomm += text[i]
      } else {
        if (accomm.length == 0) {
          current.force = true
          Global.maxWid = this.warpW; // 回归初始状态
          // console.log('整个对象换行，回归初始状态：', Global.maxWid);
          const test = this.full(current, Global.maxWid)
          return {
            accomm: test.accomm,
            residue: test.residue,
            width: test.width
          };
        } else {
          residue += text[i];
        }
      }
    }
    Global.maxWid -= wid;
    // console.log('切割之后：', Global.maxWid);
    return {
      accomm: accomm,
      residue: residue,
      width: wid
    }
  }

  // incision (val, wid, current) {
  //   if (this.fontReg.test(val)) {
  //     wid = this.fontSize(wid, current, basic.common.fontSize, val)
  //   } else if (this.letterReg.test(val)) {
  //     wid = this.fontSize(wid, current, basic.common.letterSize, val)
  //   } else if (this.chinesePunctuaReg.test(val)) {
  //     if (/[\“\”]/.test(val)) wid = this.fontSize(wid, current, basic.common.englishSize, val);
  //     else wid = this.fontSize(wid, current, basic.common.chineseSize, val);
  //   } else if (this.englishPunctuaReg.test(val)) {
  //     if (/\_/.test(val)) wid = this.fontSize(wid, current, basic.common.fontSize * 0.6, val)
  //     else wid = this.fontSize(wid, current, basic.common.englishSize, val)
  //   } else if (/\．/.test(val)) {
  //     wid = this.fontSize(wid, current, basic.common.chineseSize, val)
  //   } else if (this.trimReg.test(val)) {
  //     wid = this.fontSize(wid, current, basic.common.trimSize, val)
  //   } else if (this.numberReg.test(val)) {
  //     wid = this.fontSize(wid, current, basic.common.numberSize, val)
  //   } else {
  //     // console.log(val);
  //   }
  //   Global.maxWid -= wid;
  //   console.log(wid, 'incision');
  //   return wid;
  // }

  // 完整的对象在当前一行容纳不了
  full (current, maxWid) {
    let accomm = '', // 可容纳内容
        residue = ''; // 需要剪裁内容
    let wid = 0;
    let force = false; // 是否被截取
    let incision = null;
    const text = current.texture.content.text;
    for (let i = 0; i < text.length; i++){
      let nextsize = this.contSize(text[i])
      if (maxWid - wid >= nextsize && !force) {
        // console.log(text[i], current);
        if (this.fontReg.test(text[i])) {
          wid = this.fontSize(wid, current, basic.common.fontSize, text[i])
        } else if (this.letterReg.test(text[i])) {
          wid = this.fontSize(wid, current, basic.common.letterSize, text[i])
        } else if (this.chinesePunctuaReg.test(text[i])) {
          if (/[\“\”]/.test(text[i])) wid = this.fontSize(wid, current, basic.common.englishSize, text[i]);
          else wid = this.fontSize(wid, current, basic.common.chineseSize, text[i]);
        } else if (this.englishPunctuaReg.test(text[i])) {
          if (/\_/.test(text[i])) wid = this.fontSize(wid, current, basic.common.fontSize * 0.6, text[i])
          else wid = this.fontSize(wid, current, basic.common.englishSize, text[i])
        } else if (/\．/.test(text[i])) {
          wid = this.fontSize(wid, current, basic.common.chineseSize, text[i])
        } else if (this.trimReg.test(text[i])) {
          wid = this.fontSize(wid, current, basic.common.trimSize, text[i])
        } else if (this.numberReg.test(text[i])) {
          wid = this.fontSize(wid, current, basic.common.numberSize, text[i])
        } else {
          // console.log(val);
        }
        accomm += text[i]
      } else {
        residue += text[i];
      }
    }
    Global.maxWid -= wid;
    // console.log('整个对象换行之后容纳：', Global.maxWid);
    return {
      accomm: accomm,
      residue: residue,
      width: wid
    }
  }

  addFontSize (current) {
    let content = current.texture.content
    const fontState = content.hasOwnProperty('style')
    if (fontState && content.style.hasOwnProperty('fontSize')) return false;
    else if (fontState) content.style.fontSize = basic.common.fontSize;
    else {
      content.style = {}
      content.style["fontSize"] = basic.common.fontSize
    }
  }
  cuttingObj (admissible, current, parent) {
    if (admissible.residue.length > 0) {
      current.texture.content.text = admissible.accomm
      let newObj = JSON.parse(JSON.stringify(current))
      newObj.force = true;
      newObj.texture.content.text = admissible.residue
      parent.children.map((item, ind) => {
        if (parent.children[ind].texture.content.text == admissible.accomm) {
          parent.children.splice(ind + 1, 0, newObj)
        }
      })
    }
  }
  firstObj (prev, current, parent) {
    // current.force = true;
    const font = current.texture.content
    const size = font.hasOwnProperty('fontSize') ? font.fontSize : basic.common.fontSize
    // console.log('admiss前', Global.maxWid);
    let admiss = this.admissible(current, Global.maxWid)
    this.addFontSize(current)
    this.cuttingObj(admiss, current, parent)
    super.setRectangle(current, admiss.width, size)
    super.handleWrap(current)
    Global.allPrev.push(current)
  }
  isWrap (prev, current, parent) {
    const font = current.texture.content;
    const size = (font.hasOwnProperty('style') && font.style.hasOwnProperty('fontSize')) ?
    font.style.fontSize : basic.common.fontSize;
    // console.log('admiss前', Global.maxWid);
    // 对当前对象进行切割，不切割并且要换行 将换行标识改为true
    if (current.isWrap > 0) {
      Global.maxWid = basic.common.warpW;
      // console.log('isWrap换行：', Global.maxWid);
    }
    const admiss = this.admissible(current, Global.maxWid)
    // console.log(admiss, Global.maxWid);
    Global.forceWrap = current.force;
    // 给当前对象添加fontSize
    this.addFontSize(current)
    // 将需要进行切割的剩余内容追加到父级，并且修改剩余内容的换行标识
    this.cuttingObj(admiss, current, parent)
    // admiss函数已经算出了容纳内容的宽度，所以可以直接对当前对象进行赋值
    super.setRectangle(current, admiss.width, size)
    /*
      所有情况考虑到之后
      获取当前对象的换行标识，根据该状态对当前对象进行  坐标调整
      1、优先考虑isWrap字段
      2、获取对象的换行标识
    */

    if (current.isWrap > 0) {
      Global.forceWrap = true;
    }
    if (!Global.forceWrap) {
      this.arrays = null
      this.maxHei = 0
      this.curMaxHei = 0
      // Global.maxWid -= (this.prevData.prevX + this.prevData.prevW)
      // console.log('不换行：', Global.maxWid);
      super.handleWrap(current)
      Global.allPrev.push(current)
    } else {
      this.arrays = Global.allPrev
      this.maxHei = Global.maxHei
      this.curMaxHei = super.max(Global.len) // 当前一行的最高高度
      Global.maxHei += super.max(Global.len) // 到当前为止一共的高度，计算对象y坐标时使用
      let max = super.max(Global.widthLen)
      Global.globalWid = (Global.globalWid <= max) ? max : Global.globalWid
      // 将所有内容制空
      Global.len = [];
      Global.widthLen = [];
      Global.allPrev = [];
      super.handleWrap(current)
      Global.allPrev.push(current)
    }

  }
  transform (prev, current, parent) {
    if (prev) {
      this.isWrap(prev, current, parent)
      super.setTransform(
        this.prevData,
        current,
        Global.forceWrap,
        Global.maxHei,
        Global.maxHei + super.max(Global.len))
        // console.log('-------------------------------------');
        // console.log('-------------------------------------');
    } else {
      this.firstObj(prev, current, parent)
      super.setTransform(
        prev,
        current,
        true,
        Global.maxHei,
        Global.maxHei + super.max(Global.len))
        // console.log('-------------------------------------');
        // console.log('-------------------------------------');
    }
    if (Global.forceWrap) {
      super.vertical(this.arrays, this.maxHei, this.curMaxHei);
      this.specialStyle(this.arrays, this.maxHei, Global.maxHei)
    }
  }
  specialStyle (lineObj, prevMax, curMax) {
    super.specialStyle(lineObj, prevMax, curMax)
  }
}
