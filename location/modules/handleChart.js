import basic from '../common/basic.json'

// rule
const fontReg    = /[\u4e00-\u9fa5]+/;
const letterReg  = /[A-Za-z]/;
const punctuaReg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
const trimReg    = /\s/;
const pageW = basic.common.pageW; // 舞台的总宽度
const warpW = basic.common.warpW; // 舞台中央的宽度

function handleChart (modelType, prev, current, parent) {

  // console.log(prev);
  // console.log(current.texture.content);
  // console.log(parent);
  // console.log('---------------------------');

  // 题干
  if (current.name == 'stem') {
    // current.transform[1] = basic.common.
    for (let i in basic.modelType) {
      if (basic.modelType[i] == modelType) {
        current.texture.content.style['fontSize'] = basic.common.fontSize
      }
    }
  }

  const text = current.texture.content.text
  const isCommon = alignCenter(text)
  let newArr = null
  // 可容纳
  // console.log(typeof(text));
  // console.log(warpW - computed(text));
  if (warpW - computed(text).totalW >= 0) {
    current.rectangle[2] = isCommon.accommWid
    current.rectangle[3] = basic.common.lineH
    current.transform[0] = (pageW - isCommon.accommWid) / 2
    current.transform[1] = basic.choice.stemTop
    newArr = current
  } else {
    // 不可容纳
    current.texture.content.text = isCommon.accomm
    current.rectangle[2] = isCommon.accommWid
    current.rectangle[3] = basic.common.lineH
    current.transform[0] = (pageW - isCommon.accommWid) / 2
    // current.transform[0] = 293
    current.transform[1] = basic.choice.stemTop
    // console.log(pageW, isCommon.accommWid, (pageW - isCommon.accommWid) / 2);
    let newObj = JSON.stringify(current)
    newObj = JSON.parse(newObj)
    newObj.transform[0] = current.transform[1]
    newObj.transform[1] = current.transform[2] + basic.common.lineH
    newObj.texture.content.text = isCommon.residue
    newArr = [current, newObj]
  }
  return newArr
}

// 当前对象的总宽度
function computed (text) {
  let fontLen = 0; // 文字个数
  let letterLen = 0; // 单词个数
  let punctuationLen = 0; // 标点符号个数
  let trimLen = 0; // 空格个数

  for (let i of text) {
    if (fontReg.test(i)) fontLen += 1
    else if (letterReg.test(i)) letterLen += 1
    else if (punctuaReg.test(i)) punctuationLen += 1
    else if (trimReg.test(i)) trimLen += 1
    else console.log(i);
  }

  const totalW = (fontLen * basic.common.fontSize)
  + (letterLen * basic.common.letterSize)
  + (punctuationLen * basic.common.punctuaSize)
  + (trimLen * basic.common.trimSize)

  return {
    fontLen: fontLen,
    letterLen: letterLen,
    punctuationLen: punctuationLen,
    trimLen: trimLen,
    totalW: totalW
  }
}

// 计算可容纳的内容的宽高
function alignCenter (content) {
  // console.log(content);
  let wid = 0;
  let accomm = ''; // 可容纳内容
  let residue = ''; // 需要剪裁内容
  for (let i of content) {
    if (warpW - wid > basic.common.fontSize) {
      accomm += i
      if (fontReg.test(i)) wid += basic.common.fontSize
      else if (letterReg.test(i)) wid += basic.common.letterSize
      else if (punctuaReg.test(i)) wid += basic.common.punctuaSize
      else if (trimReg.test(i)) wid += basic.common.trimSize
      else console.log(i);
    } else residue += i
  }

  return {
    accommWid: wid,
    accomm: accomm,
    residue: residue
  }
}

export {
  handleChart
}
