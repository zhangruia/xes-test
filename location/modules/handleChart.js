import basic from '../common/basic.json'

function handleChart (modelType, json) {
  const warpW = basic.common.warpW;
  const warpH = basic.common.warpH;
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
  const totalW = (fontLen * basic.common.fontSize) + (punctuationLen * basic.common.punctuaSize) + (trimLen * basic.common.trimSize)

  let a = 1 // 假设为modelType值
  for (let i in basic.modelType) {
    if (basic.modelType[i] === a) {
      console.log(basic[i]); // gap中的值
    }
  }

  if (warpW > totalW) return false
  else {
    let wid = 0;
    let accomm = ''; // 可容纳内容
    let residue = ''; // 需要剪裁内容
    for (let i of text) {
      if (fontReg.test(i)) wid += basic.common.fontSize
      else if (punctuaReg.test(i)) wid += basic.common.punctuaSize
      else if (trimReg.test(i)) wid += basic.common.trimSize
      else console.log(i);

      if (warpW - wid < 20) {
        // current.transform
        residue += i
      } else {
        accomm += i
        json.texture.content.text = accomm
        json.transform[0] = 500
        json.transform[1] = 200
      }
    }
    let newObj = JSON.stringify(json)
    let a = JSON.parse(newObj)
    a.texture.content.text = residue
    // console.log(a);
  }

}


export {
  handleChart
}
