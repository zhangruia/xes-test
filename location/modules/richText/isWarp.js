import basic from '../../common/basic.json'
import { countWidth } from './countWidth'
import { prevInformation } from './information/prevInformation'
import { parentInformation } from './information/parentInformation'
import { cuttingObj } from './cuttingObj'
import { admissible } from './admissible'
import { setRectangle } from './information/setRectangle'
import { setTransform } from './information/setTransform'
import global from './global.json'

let maxHei = 0
let len = []
let max = function (array) {
  return Math.max.apply(Math, array)
}

export const isWarp = function (type, prev, current, parent) {
  if (type == 'text') {
    const parentData = parentInformation(parent)
    if (prev) {
      const prevData   = prevInformation(prev)
      current.force == undefined?global.forceWarp=false:global.forceWarp=true
      if (!global.forceWarp) {
        len.push(current.rectangle[3])
        let maxWid = parentData.parentW - prevData.prevW
        let admiss = admissible('text', current, maxWid)
        cuttingObj(admiss, current, parent)
        setRectangle(current, admiss.width, basic.common.lineH)
        setTransform(prevData, current, global.forceWarp, maxHei)
      } else {
        maxHei += Math.max.apply(Math, len)
        len = []
        let maxWid = parentData.parentW
        let admiss = admissible('text', current, maxWid)
        cuttingObj(admiss, current, parent)
        setRectangle(current, admiss.width, basic.common.lineH)
        setTransform(prevData, current, global.forceWarp, maxHei)
        len.push(current.rectangle[3])
      }
    } else {
      len.push(current.rectangle[3])
      let maxWid = parentData.parentW
      let admiss = admissible('text', current, maxWid)
      cuttingObj(admiss, current, parent)
      setRectangle(current, admiss.width, basic.common.lineH)
      setTransform(prev, current, true, maxHei)
    }

    // if (warpLen <= 0) {
    //   // 不要求换行，正常计算
    //   if (prev) {
    //     const paramsWid = countWidth(type, forceWarp, null, prev, current, parent)
    //     // console.log(paramsWid);
    //     let prevData = prevInformation(prev)
    //     setRectangle(current, paramsWid, basic.common.lineH)
    //     setTransform(
    //       current,
    //       forceWarp ? basic.common.fontpadleft : prevData.prevX + prevData.prevW + basic.common.fontpadleft,
    //       forceWarp ? prevData.prevY + prevData.prevH + basic.common.fontpadtop : prevData.prevY
    //     )
    //     // incision = cuttingObj(type, null, prev, current, parent)
    //   }
    //   else {
    //     // console.log(current.texture.content.text);
    //     const paramsWid = countWidth(type, forceWarp, null, null, current.texture.content.text, parent)
    //     setRectangle(current, paramsWid, basic.common.lineH)
    //     setTransform(
    //       current,
    //       basic.common.fontpadleft,
    //       basic.common.fontpadtop
    //     )
    //     // incision = cuttingObj(type, null, null, current, parent)
    //   }
    // }
    // else {
    //   // 换行 不需要知道prev的数据
    //   if (prev) {
    //     // console.log(current.texture.content.text);
    //     const paramsWid = countWidth(type, forceWarp, warpLen, prev, current.texture.content.text, parent)
    //     const prevData = prevInformation(prev)
    //     setRectangle(current, paramsWid, basic.common.lineH)
    //     setTransform(
    //       current,
    //       basic.common.fontpadleft,
    //       prevData.prevY + prevData.prevH + (basic.common.lineH * (warpLen - 1)) + basic.common.fontpadtop
    //     )
    //     // incision = cuttingObj(type, 'init', null, current, parent)
    //   } else {
    //     // console.log(current.texture.content.text);
    //     const paramsWid = countWidth(type, forceWarp, warpLen, null, current.texture.content.text, parent)
    //     setRectangle(current, paramsWid, basic.common.lineH)
    //     setTransform(
    //       current,
    //       basic.common.fontpadleft,
    //       (basic.common.lineH * (warpLen - 1)) + basic.common.fontpadtop
    //     )
    //     // incision = cuttingObj(type, 'init', null, current, parent)
    //   }
    // }
  } else if (type == 'img') {
    console.log(prev.rectangle);
    console.log(prev.transform);
    admissible('img', current, maxHei)
    let a = function () {
      if (global.forceWarp) {
        return basic.common.imgpadleft
      } else {
        return (prevInformation(prev))
      }
    }
    setTransform(
      a(),
      current,
      global.forceWarp,
      maxHei
    )
    len.push(current.rectangle[3])
  }
  // console.log(len);
}
