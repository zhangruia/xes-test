import { Coordinate } from '../common/basic'

function handleChart (modelType, json) {
  const basic = new Coordinate(modelType);
  const warpW = basic.warpW;
  const warpH = basic.warpH;
  let fontLen = 0; // 文字个数
  let punctuationLen = 0; // 标点符号个数
  let trimLen = 0; // 空格个数

  const fontReg    = /[\u4e00-\u9fa5]+/;
  const punctuaReg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
  const trimReg    = /\s/;

  const text = json.texture.content.text
  for (let i of text) {
    if (fontReg.test(i)) fontLen += 1
    else if (punctuaReg.test(i)) punctuationLen += 1
    else if (trimReg.test(i)) trimLen += 1
    else console.log(i);
  }
  const totalW = (fontLen * basic.fontSize) + (punctuationLen * basic.punctuaSize) + (trimLen * basic.trimSize)

  if (warpW > totalW) return false
  else {
    let wid = 0;
    let residue = ''
    for (let i of text) {
      if (fontReg.test(i)) wid += basic.fontSize
      else if (punctuaReg.test(i)) wid += basic.punctuaSize
      else if (trimReg.test(i)) wid += basic.trimSize
      else console.log(i);

      if (warpW - wid < 20) {
        // current.transform
        residue += i
      }
    }
    let newObj = Object.assign({}, json)
    newObj.texture.content.text = residue
    console.log(newObj);
  }

}


export {
  handleChart
}
