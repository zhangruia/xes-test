import basic from '../common/basic.json'

function handleImg (modelType, prev, current, parent) {
  if (prev == null) {
    console.log('需要定义该图片的尺寸及位置');
  } else {

    const prevW = prev.rectangle[2]
    const prevH = prev.rectangle[3]
    const prevX = prev.transform[0]
    const prevY = prev.transform[1]

    // 判断剩余的大小能否放置该图片
    if (basic.common.warpW - prev.rectangle[2] >= current.rectangle[2]) {
      // 可放置
      current.transform[0] = prevX + prevW
      current.transform[1] = prevY
    } else {
      // 不可放置
      current.transform[0] = basic.common.imgpadleft
      current.transform[1] = prevY + prevH
    }

  }
}


export {
  handleImg
}
