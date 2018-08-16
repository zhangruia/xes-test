import { juade } from './juadeMold'

class GetData {
  constructor (json) {
    this.json = json
    this.which = 0
    this.traverse()
    // console.log(json);
  }
  traverse () {
    let json  = this.json
    json.forEach((val, ind) => {
      this.which = ind
      if (val.name === 'bgImg') {
        /*******
          * 单独写背景图的操作
          * TODO: 根据name判断 目前不确定背景图name是否固定
       */
        return false
      }
      if (ind > 0) this.recursion(val, json[ind-1], 'page')
      else this.recursion(val, null, 'page')
    })
  }

  // 取值进行判断值类型
  recursion (json, prev, isRoot) {
    if (isRoot === 'page') {
      if (json.children) {
        const children = json.children
        children.forEach((val, ind) => {
          if (ind > 0) this.recursion(val, children[ind-1], null)
          else this.recursion(val, null, null)
        })
      } else {
        // TODO: page的子元素
        // 可单纯第一级对象
        // juade(json, prev, null)
      }
    } else {
      if (json.children) {
        const children = json.children
        children.forEach((val, ind) => {
          if (ind > 0) this.recursion(val, children[ind-1], null)
          else this.recursion(val, null, null)
        })
        juade(json, prev, null)
      } else {
        // TODO: page的子元素
        juade(json, prev, null)
      }
    }
  }
}

export {
  GetData
}
