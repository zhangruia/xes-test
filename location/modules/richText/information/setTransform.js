import basic from '../../../common/basic.json'

export const setTransform = function (prev, current, iscut, maxHei) {
  if (iscut) {
    current.transform[0] = basic.common.fontpadleft
    current.transform[1] = maxHei
  } else {
    current.transform[0] = prev.prevX + prev.prevW + basic.common.fontpadleft
    current.transform[1] = prev.prevY
  }
}
