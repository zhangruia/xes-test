import basic from '../../common/basic.json'
import { countWidth } from './countWidth'
import { prevInformation } from './information/prevInformation'
import { parentInformation } from './information/parentInformation'
import { cuttingObj } from './cuttingObj'
import { setRectangle } from './information/setRectangle'
import { setTransform } from './information/setTransform'

export const isWarp = function (forceWarp, prev, current, parent) {
  const warpLen = current.isWarp ? current.isWarp : 0
  if (warpLen <= 0) {
    // 不要求换行，正常计算
    if (prev) {
      // console.log(current.texture.content.text);
      const paramsWid = countWidth(forceWarp, null, prev, current.texture.content.text, parent)
      let prevData = prevInformation(prev)
      setRectangle(current, paramsWid, basic.common.lineH)
      setTransform(
        current,
        forceWarp ? basic.common.fontpadleft : prevData.prevX + prevData.prevW + basic.common.fontpadleft,
        forceWarp ? prevData.prevY + prevData.prevH + basic.common.fontpadtop : prevData.prevY
      )
      cuttingObj(null, prev, current, parent)
    }
    else {
      // console.log(current.texture.content.text);
      const paramsWid = countWidth(forceWarp, null, null, current.texture.content.text, parent)
      setRectangle(current, paramsWid, basic.common.lineH)
      setTransform(
        current,
        basic.common.fontpadleft,
        basic.common.fontpadtop
      )
      cuttingObj(null, null, current, parent)
    }
  }
  else {
    // 换行 不需要知道prev的数据
    if (prev) {
      // console.log(current.texture.content.text);
      const paramsWid = countWidth(forceWarp, warpLen, prev, current.texture.content.text, parent)
      const prevData = prevInformation(prev)
      setRectangle(current, paramsWid, basic.common.lineH)
      setTransform(
        current,
        basic.common.fontpadleft,
        prevData.prevY + prevData.prevH + (basic.common.lineH * (warpLen - 1)) + basic.common.fontpadtop
      )
      cuttingObj('init', null, current, parent)
    } else {
      // console.log(current.texture.content.text);
      const paramsWid = countWidth(forceWarp, warpLen, null, current.texture.content.text, parent)
      setRectangle(current, paramsWid, basic.common.lineH)
      setTransform(
        current,
        basic.common.fontpadleft,
        (basic.common.lineH * (warpLen - 1)) + basic.common.fontpadtop
      )
      cuttingObj('init', null, current, parent)
    }
  }

  return current
}
