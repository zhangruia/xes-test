import { rich } from '../modules/richText/index'

export class GetData {
  constructor (current, parent) {
    this.initial(current, parent)
  }

  // 取值进行判断值类型
  initial (current, parent) {
    current.map((value, index) => {
      if (value.conName == 'Container') {
        const child = value.children
        rich(child, value)
      }
    })
  }
}
