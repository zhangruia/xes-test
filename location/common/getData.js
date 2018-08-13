import { juade } from './juadeMold'

class GetData {
  constructor (json) {
    this.json = json
    this.traverse()
    // console.log(json);
  }
  traverse () {
    let json  = this.json
    let a = []
    json.forEach(val => {
      this.recursion(val)
    })
  }

  // 取值进行判断值类型
  recursion (json) {
    if (json.texture && json.texture.children) {
      const children = json.texture.children
      children.forEach(val => {
        /********
          TODO: 先取val的content，然后再递归判断是否还有子级
          content需要判断类型
          根据类型进行不同的间距换算
      */
        this.recursion(val)
      })
    } else {
      // TODO: 没有children，直接计算rectangle
    }
    // const topic = eval(json.texture.type) // 主题类型
    juade(json)

  }
}

export {
  GetData
}
