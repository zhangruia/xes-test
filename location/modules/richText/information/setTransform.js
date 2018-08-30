import basic from '../../../common/basic.json'
import global from '../global.json'

const isCut = function (prev, current, iscut, y) {
  if (iscut) {
    current.transform[0] = basic.common.fontpadleft
    current.transform[1] = y
  } else {
    current.transform[0] = prev.prevX + prev.prevW + basic.common.fontpadleft
    current.transform[1] = y
  }
}

export const setTransform = function (prev, current, iscut, maxHei) {
  const isWarp = current.isWarp ? current.isWarp : 0
  if (isWarp > 1) {
    const line = basic.common.lineH * (isWarp - 1)
    if (iscut) {
      isCut(prev, current, iscut, maxHei+line)
    }
    else {
      isCut(prev, current, iscut, line)
    }
  } else {
    // console.log(maxHei);
    isCut(prev, current, iscut, maxHei)
  }
}
