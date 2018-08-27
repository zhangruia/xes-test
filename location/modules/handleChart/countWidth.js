import basic from '../../common/basic.json'

const fontReg    = /[\u4e00-\u9fa5]+/;
const letterReg  = /[A-Za-z]/;
const punctuaReg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
const trimReg    = /\s/;
const numberReg  = /\d/;
const warpW = basic.common.warpW; // 舞台中央的宽度

export const countWidth = function (forceWarp, iswarp, prev, text, parent) {
  let wid = 0;

  let totalWid = null
  if (iswarp) {
    // 如果iswarp，不需要知道prev的数据
    if (parent) {
      totalWid = parent ? parent.rectangle[2] : warpW
    }
  } else {
    if (prev && !forceWarp) {
      totalWid = parent ? (parent.rectangle[2] - prev.rectangle[2]) : (warpW - prev.rectangle[2])
    } else {
      totalWid = parent ? parent.rectangle[2] : warpW
    }
  }
  for (let i of text) {

    if (totalWid - wid > 30) {
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
    }
  }
  return wid
}
