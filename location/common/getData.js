import { juade } from './juadeMold'
// import { Coordinate } from './basic'
import { handleChart } from '../modules/handleChart'

class GetData {
  constructor (modelType, current) {
    this.recursion(modelType, current)
  }

  // 取值进行判断值类型
  recursion (modelType, current) {
    if (current.name === 'stem') handleChart(modelType, current)
    /*
      先对current进行处理
      再去找current的children
    */
    // const coor = new Coordinate(modelType)
    // if (current.length == 1) {
    //   let position = current[0].transform
    //   position[0] = coor.tabX
    //   position[1] = coor.tabY
    // } else if (current.length > 1) {
    //   current.forEach((val, ind) => {
    //     if (ind >= 1) {
    //       val.transform[0] = coor.tabX + current[ind - 1].transform[0]
    //       val.transform[1] = coor.tabY
    //     } else {
    //       current[0].transform[0] = coor.tabX
    //       current[0].transform[1] = coor.tabY
    //     }
    //   })
    // } else if (Object.prototype.toString.call(current) == '[object Object]') {
    //   // TODO: 已经处理 是否不需要传递到这里？
    // }
    // if (!current.children || current.children.length == 0) return false
    // else {
    //   // console.log('递归');
    //   this.recursion(modelType, current.children)
    // }
  }
}

export {
  GetData
}
