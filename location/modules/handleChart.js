import basic from '../common/basic.json'
import { isWarp } from './handleChart/isWarp'

// rule
const fontReg    = /[\u4e00-\u9fa5]+/;
const letterReg  = /[A-Za-z]/;
const punctuaReg = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/;
const trimReg    = /\s/;
const numberReg  = /\d/;
const pageW = basic.common.pageW; // 舞台的总宽度
const warpW = basic.common.warpW; // 舞台中央的宽度
let wid = 0;
let forceWarp = false // 强制换行 -> 在iswarp不成立的情况下，如果forceWarp成立，还是需要换行 -> 即residue不为空


function handleChart (modelType, prev, current, parent) {
  if (current.name == 'stem') {
    for (let i in basic.modelType) {
      if (basic.modelType[i] == modelType) {
        if (prev.conName !== 'Text') isWarp(forceWarp, null, current, parent)
        else isWarp(forceWarp, prev, current, parent)
      }
    }
  } else if (current.name && current.name.indexOf('submit') != -1) {
    // TODO: 提交文字可直接确定位置，不需要写其他操作
    for (let i of basic.modelType) {
      if (basic.modelType[i] == modelType) {
      }
    }
  } else {
    // 正常内容
    if (parent && parent.conName == 'Choice') {
      if (prev) {
        // 如果有prev，则不是第一个对象，需要确定前一个对象的数据
        isWarp(forceWarp, prev, current, parent)
      } else {
        isWarp(forceWarp, null, current, parent)
      }
    }
  }
}

// 修改当前可容纳的text以及将不可容纳的text追加到parent
// function disposeData (iswarp, prev, current, parent) {
//   let ledal = getLedalContent(iswarp, prev, current, parent)
//   if (ledal.residue == '') {
//     forceWarp = false
//     return false
//   }
//   else {
//     forceWarp = true
//     current.texture.content.text = ledal.accomm
//     let newObj = JSON.stringify(current)
//     newObj = JSON.parse(newObj)
//     newObj.texture.content.text = ledal.residue
//     // console.log(parent);
//     parent.children.map((item, ind) => {
//       if (parent.children[ind].texture.content.text == ledal.accomm) {
//         parent.children.splice(ind + 1, 0, newObj)
//         isWarp(current, newObj, parent)
//       }
//     })
//   }
// }

// 获取当前可容纳内容以及超出内容
// function getLedalContent (iswarp, prev, current, parent){
//   let accomm = ''; // 可容纳内容
//   let residue = ''; // 需要剪裁内容
//   let wid = 0;
//   const text = current.texture.content.text
//
//   let totalWid = null
//   if (iswarp) {
//     if (parent) totalWid = parent.rectangle[2]
//   } else {
//     if (prev && !forceWarp) parent ? (totalWid = parent.rectangle[2] - prev.rectangle[2]) : (totalWid = warpW - prev.rectangle[2])
//     else parent ? totalWid = parent.rectangle[2] : totalWid = warpW
//   }
//
//   for (let i of text) {
//     if (totalWid - wid >= 30) {
//       /*
//         *******
//         * 该判断条件成立下再同一行
//         * 10只是目前暂定的一个数，应当进行计算
//        */
//       if (fontReg.test(i)) wid += basic.common.fontSize
//       else if (letterReg.test(i)) wid += basic.common.letterSize
//       else if (punctuaReg.test(i)) wid += basic.common.punctuaSize
//       else if (trimReg.test(i)) wid += basic.common.trimSize
//       else if (numberReg.test(i)) wid += basic.common.numberSize
//       else console.log(i);
//       accomm += i
//     } else {
//       residue += i
//     }
//   }
//   return {
//     accomm: accomm,
//     residue: residue
//   }
// }

// 当前文字是否要求换行
// function isWarp (prev, current, parent) {
//   const warpLen = current.isWarp ? current.isWarp : 0
//   if (warpLen <= 0) {
//     // 不要求换行，正常计算
//     if (prev) {
//       const paramsWid = countWidth(null, prev, current.texture.content.text, parent)
//       let prevData = prevInformation(prev)
//       position(
//         current,
//         paramsWid,
//         basic.common.lineH,
//         forceWarp ? basic.common.fontpadleft : prevData.prevX + prevData.prevW + basic.common.fontpadleft,
//         forceWarp ? prevData.prevY + prevData.prevH + basic.common.fontpadtop : prevData.prevY
//       )
//       disposeData(null, prev, current, parent)
//     }
//     else {
//       // console.log(current.texture.content);
//       const paramsWid = countWidth(null, null, current.texture.content.text, parent)
//       // console.log(paramsWid);
//       position(current,
//         paramsWid,
//         basic.common.lineH,
//         basic.common.fontpadleft,
//         basic.common.fontpadtop
//       )
//       disposeData(null, null, current, parent)
//     }
//   }
//   else {
//     // 换行 不需要知道prev的数据
//     if (prev) {
//       const paramsWid = countWidth(warpLen, prev, current.texture.content.text, parent)
//       const prevData = prevInformation(prev)
//       position(
//         current,
//         paramsWid,
//         basic.common.lineH,
//         basic.common.fontpadleft,
//         prevData.prevY + prevData.prevH + (basic.common.lineH * (warpLen - 1)) + basic.common.fontpadtop
//       )
//       disposeData('init', null, current, parent)
//     } else {
//       const paramsWid = countWidth(warpLen, null, current.texture.content.text, parent)
//       position(current,
//         paramsWid,
//         basic.common.lineH,
//         basic.common.fontpadleft,
//         (basic.common.lineH * (warpLen - 1)) + basic.common.fontpadtop
//       )
//       disposeData('init', null, current, parent)
//     }
//   }
//
//   return current
// }

// 可容纳的宽度计算
// function countWidth (iswarp, prev, text, parent) {
//   let wid = 0;
//
//   let totalWid = null
//   if (iswarp) {
//     // 如果iswarp，不需要知道prev的数据
//     if (parent) {
//       totalWid = parent ? parent.rectangle[2] : warpW
//     }
//   } else {
//     if (prev && !forceWarp) {
//       totalWid = parent ? (parent.rectangle[2] - prev.rectangle[2]) : (warpW - prev.rectangle[2])
//     } else {
//       totalWid = parent ? parent.rectangle[2] : warpW
//     }
//   }
//   for (let i of text) {
//
//     if (totalWid - wid > 30) {
//       /*
//         *******
//         * 该判断条件成立下再同一行
//         * 10只是目前暂定的一个数，应当进行计算
//        */
//       if (fontReg.test(i)) wid += basic.common.fontSize
//       else if (letterReg.test(i)) wid += basic.common.letterSize
//       else if (punctuaReg.test(i)) wid += basic.common.punctuaSize
//       else if (trimReg.test(i)) wid += basic.common.trimSize
//       else if (numberReg.test(i)) wid += basic.common.numberSize
//       else console.log(i);
//     }
//   }
//   return wid
// }
//
// function parentInformation (parent) {
//   let parentW, parentH, parentX, parentY;
//   parentW = parent.rectangle[2]
//   parentH = parent.rectangle[3]
//   parentX = parent.transform[0]
//   parentY = parent.transform[1]
//   return {
//     parentW,
//     parentH,
//     parentX,
//     parentY
//   }
// }

// function prevInformation (prev) {
//   let prevW, prevH, prevX, prevY;
//   prevW = prev.rectangle[2]
//   prevH = prev.rectangle[3]
//   prevX = prev.transform[0]
//   prevY = prev.transform[1]
//   return {
//     prevW,
//     prevH,
//     prevX,
//     prevY
//   }
// }
//
// function position (current, w, h, x, y) {
//   if (w) current.rectangle[2] = w
//   if (h) current.rectangle[3] = h
//   if (x) current.transform[0] = x
//   if (y) current.transform[1] = y
//   return current
// }

export {
  handleChart
}
