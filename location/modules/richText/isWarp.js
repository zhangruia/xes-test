import basic from '../../common/basic.json'
import { prevInformation } from './information/prevInformation'
import { parentInformation } from './information/parentInformation'
import { cuttingObj } from './cuttingObj'
import { admissible } from './admissible'
import { setRectangle } from './information/setRectangle'
import { setTransform } from './information/setTransform'
import global from './global.json'

const warpW = basic.common.warpW

let maxWid = 0, maxHei = 0
let len = []
let max = function (array) {
  return Math.max.apply(Math, array)
}

let warpFun = function (current) {
  const isWarp = current.isWarp ? current.isWarp : 0
  if (isWarp > 1) {
    const line = basic.common.lineH * (isWarp - 1)
    len.push(current.rectangle[3] + line)
  } else {
    len.push(current.rectangle[3])
  }
}

export const isWarp = function (type, prev, current, parent) {
  if (type == 'text') {
    if (prev) {
      const prevData = prevInformation(prev)
      current.force == undefined?global.forceWarp=false:global.forceWarp=true
      if (!global.forceWarp) {
        maxWid = warpW - prevData.prevX - prevData.prevW
        let admiss = admissible(current, maxWid)
        cuttingObj(admiss, current, parent)
        setRectangle(current, admiss.width, basic.common.lineH)
        warpFun(current)
        setTransform(prevData, current, global.forceWarp, maxHei)
      } else {
        maxHei += Math.max.apply(Math, len)
        len = []
        maxWid = warpW
        let admiss = admissible(current, maxWid)
        cuttingObj(admiss, current, parent)
        setRectangle(current, admiss.width, basic.common.lineH)
        warpFun(current)
        setTransform(prevData, current, global.forceWarp, maxHei)
      }
    } else {
      maxWid = warpW
      let admiss = admissible(current, maxWid)
      cuttingObj(admiss, current, parent)
      setRectangle(current, admiss.width, basic.common.lineH)
      warpFun(current)
      setTransform(prev, current, true, maxHei)
    }
  } else if (type == 'img') {
    if (prev) {
      const prevData = prevInformation(prev)
      maxWid = basic.common.warpW - prevData.prevX - prevData.prevW
      let imgwid = current.rectangle[3]
      if (imgwid > maxWid) {
        global.forceWarp = true
        maxHei += Math.max.apply(Math, len)
        len = []
        warpFun(current)
      } else {
        global.forceWarp = false
        warpFun(current)
      }
    } else {
      warpFun(current)
      maxWid = basic.common.warpW
      let imgwid = current.rectangle[3]
      global.forceWarp = true
    }
    setTransform(
      prev?prevInformation(prev):null,
      current,
      global.forceWarp,
      maxHei
    )
    console.log(maxHei);
  }
}
