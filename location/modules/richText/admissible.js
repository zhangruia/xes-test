import basic from '../../common/basic.json'
import { prevInformation } from './information/prevInformation'
import { parentInformation } from './information/parentInformation'
import { setRectangle } from './information/setRectangle'
import global from './global.json'

const warpW = basic.common.warpW; // 舞台中央的宽度
const fontReg    = /[\u4e00-\u9fa5]+/;
const letterReg  = /[A-Za-z]/;
const punctuaReg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
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

export const admissible = function (type, current, maxWid) {
  let accomm = ''; // 可容纳内容
  let residue = ''; // 需要剪裁内容
  let wid = 0;
  let hei = 30;
  let test = true

  if (type == 'text') {
    const text = current.texture.content.text
    for (let i = 0; i < text.length; i++) {
      let nextsize = contSize(text[i])
      if (maxWid - wid >= nextsize) {
        if (fontReg.test(text[i])) wid += basic.common.fontSize
        else if (letterReg.test(text[i])) wid += basic.common.letterSize
        else if (punctuaReg.test(text[i])) wid += basic.common.punctuaSize
        else if (trimReg.test(text[i])) wid += basic.common.trimSize
        else if (numberReg.test(text[i])) wid += basic.common.numberSize
        else console.log(text[i]);
        accomm += text[i]
      } else {
        residue += text[i]
      }
    }
    // console.log(accomm, '->', residue);
    setRectangle(current, wid, hei)
  } else if (type == 'img') {
    let imgwid = current.rectangle[3]
    if (imgwid > maxWid) {
      global.forceWarp = true
    } else {
      global.forceWarp = false
    }
  }
  // console.log('切割内容：', accomm, '->', residue);

  return {
    accomm: accomm,
    residue: residue,
    width: wid
  }
}
