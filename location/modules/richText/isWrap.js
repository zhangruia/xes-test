import basic from '../../common/basic.json'
import { prevInformation } from './information/prevInformation'
import { cuttingObj } from './cuttingObj'
import { admissible } from './admissible'
import { setRectangle } from './information/setRectangle'
import { setTransform } from './information/setTransform'
import global from './global.json'

const warpW = basic.common.warpW

let maxWid = 0, maxHei = 0, width = 0;
let len = []
let max = function (array) {
  return Math.max.apply(Math, array)
}

let wrapFun = function (current) {
  const isWrap = current.isWrap ? current.isWrap : 0
  if (isWrap > 1) {
    const line = basic.common.lineH * (isWrap - 1)
    len.push(current.rectangle[3]+line)
  } else {
    len.push(current.rectangle[3])
  }
}

export const isWrap = function (type, prev, current, parent) {
  if (type == 'text') {
    if (prev) {
      const prevData = prevInformation(prev)
      current.force == undefined?global.forceWarp=false:global.forceWarp=true
      const font = current.texture.content
      const size = font.hasOwnProperty('fontSize') ? font.fontSize : basic.common.fontSize
      if (current.isWrap > 0) global.forceWarp = true
      if (!global.forceWarp) {
        maxWid = warpW - prevData.prevX - prevData.prevW
        let admiss = admissible(current, maxWid)
        cuttingObj(admiss, current, parent)
        setRectangle(current, admiss.width, size)
        wrapFun(current)
        setTransform(prevData, current, global.forceWarp, maxHei)
      } else {
        maxHei += Math.max.apply(Math, len)
        len = []
        maxWid = warpW
        let admiss = admissible(current, maxWid)
        cuttingObj(admiss, current, parent)
        setRectangle(current, admiss.width, size)
        wrapFun(current)
        setTransform(prevData, current, global.forceWarp, maxHei)
      }
      console.log('当前内容：', current.texture.content.text);
      console.log('当前内容宽高：', current.rectangle);
      console.log('当前内容坐标：', current.transform);
      console.log('--------------分割-----------------------------------');
    } else {
      const font = current.texture.content
      const size = font.hasOwnProperty('fontSize') ? font.fontSize : basic.common.fontSize
      maxWid = warpW
      let admiss = admissible(current, maxWid)
      cuttingObj(admiss, current, parent)
      setRectangle(current, admiss.width, size)
      wrapFun(current)
      setTransform(prev, current, true, maxHei)
      console.log('当前内容：', current.texture.content.text);
      console.log('当前内容宽高：', current.rectangle);
      console.log('当前内容坐标：', current.transform);
      console.log('--------------分割-----------------------------------');
    }
  } else if (type == 'img') {
    if (prev) {
      const prevData = prevInformation(prev)
      maxWid = basic.common.warpW - prevData.prevX - prevData.prevW
      let imgwid = current.rectangle[3]
      if (current.isWrap > 0) {
        global.forceWarp = true
        maxHei += Math.max.apply(Math, len)
        len = []
        wrapFun(current)
      } else if (imgwid > maxWid) {
        global.forceWarp = true
        maxHei += Math.max.apply(Math, len)
        len = []
        wrapFun(current)
      } else {
        global.forceWarp = false
        wrapFun(current)
      }
    } else {
      wrapFun(current)
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
    console.log('当前内容：', current.texture.content);
    console.log('当前内容宽高：', current.rectangle);
    console.log('当前内容坐标：', current.transform);
    console.log('--------------分割-----------------------------------');
  }
  setRectangle(parent,warpW, maxHei+Math.max.apply(Math,len))
  parent.transform[0] = 0
  parent.transform[1] = 200
}
