import basic from '../../common/basic.json'
import global from './global.json'

const fontReg    = /[\u4e00-\u9fa5]+/;
const letterReg  = /[A-Za-z]/;
const punctuaReg = /[^\u4e00-\u9fa5a-zA-Z0-9]/i;
const trimReg    = /\s/;
const numberReg  = /\d/;

const contSize = function (value) {
  let nextwid = 0
  if (fontReg.test(value)) {
    nextwid = basic.common.fontSize
  } else if (letterReg.test(value)) {
    nextwid = basic.common.letterSize
  } else if (punctuaReg.test(value)) {
    nextwid = basic.common.punctuaSize
  } else if (trimReg.test(value)) {
    nextwid = basic.common.trimSize
  } else if (numberReg.test(value)) {
    nextwid = basic.common.numberSize
  } else console.log(value);
  return nextwid
}

const fontSize = function (wid, current, size) {
  const content = current.texture.content
  const fontState = content.hasOwnProperty('style')
  if (fontState && font.hasOwnProperty('fontSize')) {
    wid += font.fontSize
  } else {
    wid += size
  }
  return wid
}

export const admissible = function (current, maxWid) {
  let accomm = ''; // 可容纳内容
  let residue = ''; // 需要剪裁内容
  let hei = 30;
  let wid = 0;
  let test = true
  const text = current.texture.content.text
  for (let i = 0; i < text.length; i++) {
    let nextsize = contSize(text[i])
    if (maxWid - wid >= nextsize) {
      if (fontReg.test(text[i])) wid = fontSize(wid, current, basic.common.fontSize)
      else if (letterReg.test(text[i])) wid = fontSize(wid, current, basic.common.letterSize)
      else if (punctuaReg.test(text[i])) wid = fontSize(wid, current, basic.common.punctuaSize)
      else if (trimReg.test(text[i])) wid = fontSize(wid, current, basic.common.trimSize)
      else if (numberReg.test(text[i])) wid = fontSize(wid, current, basic.common.numberSize)
      else console.log(text[i]);
      accomm += text[i]
    } else {
      residue += text[i]
    }
  }
  return {
    accomm: accomm,
    residue: residue,
    width: wid
  }
}
