import basic from './basic.json'
import { juade } from './juadeMold'
import { handleChart } from '../modules/handleChart'
import { handleImg } from '../modules/handleImg'
import { richText } from '../modules/richText'

let choiceLen = 0,
    totalWid  = 0,
    totalHei  = 0;

  /*
    ******
    *** modelType -> modelType
    *** prev -> 当前对象的前一个对象 没有则为null
    *** current -> 当前对象
  */

export class GetData {
  constructor (modelType, prev, current, parent) {
    return this.initial(modelType, prev, current, parent)
  }

  // 取值进行判断值类型
  initial (modelType, prev, current, parent) {
    if (Object.prototype.toString.call(current) == '[object Object]') {
      this.moldCurrent(modelType, prev, current, parent)
      this.childCurrent(modelType, prev ,current)
      // console.log(parent);
      return false
    } else {
      // console.log(current);
      current.map((item, index) => {
        // 处理选择题图片选项的摆放方式
        if (item.conName == 'Choice') {
          // TODO: 目前不知选择题是如何处理图片的放置情况，暂搁置当下
          // handleImg(current)
        } else if (item.conName === 'Container') {
          // TODO: 本应放在moldCurrent当中，但目前需要当前内容的parent，暂放置当下
          this.moldCurrent(modelType, current[index-1], item, current)
          return false
        }
        if (index !== 0) {
          /*
              ****
              *判断index的原因：
              * 如果当前对象不是第一个，需要知道前一个对象的数据
           */
          this.moldCurrent(modelType, current[index-1], item, parent)
          this.childCurrent(modelType, current[index-1], item)
        } else {
          this.moldCurrent(modelType, null, item, current)
          this.childCurrent(modelType, null, item)
        }
      })
    }
    return {
      current
    }
  }

  // 判断当前类型
  moldCurrent (modelType, prev, item, parent) {
    if (item.name === 'bgImg') {
      // item.rectangle[2] = basic.common.pageW
      // item.rectangle[3] = basic.common.pageH
      // item.transform[0] = 0
      // item.transform[1] = 0
      return false
    }
    if (item.conName === 'Choice') {
      // console.log(parent);
      /*
        *******
        ** 优先考虑题型
        选择题 图片的处理方式
        conName为选择题的时候  texture.text都有多种情况 可能为图片 也可能为空
        TODO: 为空是什么意思 什么情况下会为空 对children是否有影响
      */
      if (item.texture.content.text === '') {
        // 为空的处理方式
        // console.log('题型 text为空');
      } else if (item.texture.type == 4) {
        // 图片的处理方式
        // console.log('题型 img');
        // choiceLen += 1
        // totalWid += item.rectangle[3]

      } else {
        // console.log('type error', item);
      }
    } else if (item.conName === 'FillVacancy') {
      // 填空题
    } else if (item.conName === 'Text') {
      // 文本处理方式
      handleChart(modelType, prev, item, parent);
    } else if (item.conName === 'Sprite') {
      // 图片处理方式
    } else if (item.conName === 'Container') {
      // 富文本的处理方式
      return richText(modelType, prev, item, parent)
    } else console.log('beat all', item);
  }

  // 判断当前对象的children
  childCurrent (modelType, prev, item) {
    if (!item.children || item.children.length === 0) return false
    else {
      const child = item.children
      // 当前对象有children
      if (child.length >= 1) {
        child.map((val, ind) => {
          if (ind == 0) this.initial(modelType, null, val, item)
          else this.initial(modelType, child[ind - 1], val, item)
        })
      }
    }
  }

}
