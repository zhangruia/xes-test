import basic from '../../common/basic.json'
import { setRectangle } from '../information/setRectangle'

const fontReg    = /[\u4e00-\u9fa5]+/;
const letterReg  = /[A-Za-z]/;
const punctuaReg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
const trimReg    = /\s/;
const numberReg  = /\d/;

export const admissible = function (iswarp, prev, current, parent) {
  let accomm = ''; // 可容纳内容
  let residue = ''; // 需要剪裁内容
  let wid = 0;
  const text = current.texture.content.text

  let totalWid = null
  if (iswarp) {
    if (parent) totalWid = parent.rectangle[2]
  } else {
    if (prev && !forceWarp) parent ? (totalWid = parent.rectangle[2] - prev.rectangle[2]) : (totalWid = warpW - prev.rectangle[2])
    else parent ? totalWid = parent.rectangle[2] : totalWid = warpW
  }

  for (let i of text) {
    if (totalWid - wid >= 30) {
      /*
        *******
        * 该判断条件成立下再同一行
        * 10只是目前暂定的一个数，应当进行计算
       */
      if (fontReg.test(i)) wid += basic.common.fontSize
      else if (letterReg.test(i)) wid += basic.common.letterSize
      else if (punctuaReg.test(i)) wid += basic.common.punctuaSize
      else if (trimReg.test(i)) wid += basic.common.trimSize
      else if (numberReg.test(i)) wid += basic.common.numberSize
      else console.log(i);
      accomm += i
    } else {
      residue += i
    }
  }
  return {
    accomm: accomm,
    residue: residue
  }

  let style = current.texture.content.style['fontSize']
  hei = style ? style : basic.common.fontSize

  setRectangle(current, wid, hei)

  return {
    currentWid: wid,
    currentHei: hei,
    accomm: accomm,
    residue: residue
  }
}
