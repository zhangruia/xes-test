import { Coordinates } from './data/coordinate.js'//引入坐标数据
import { nestData } from './nestData.js'//引入处理嵌套关系方法
import { style } from '../method/style.js'//处理样式
import { bgImg, submit_btn, text, fillvacancy, ligature, choice } from '../method/index.js'//处理不同类型的方法
import { GetData } from './getData.js'

export function modifyData (mainJson) {
  for (var i = 0; i < mainJson.pages.length; i++) {//循环pages
    let { coordinate } = new Coordinates(mainJson.pages[i]);
    let children = mainJson.pages[i].children;
    for (var i = 0; i < children.length; i++) {
      children[i].transform = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      children[i].rectangle[0] = 0;
      children[i].rectangle[1] = 0;
      if (children[i].name == 'bgImg' && children[i].conName == 'Sprite') {
        //背景图片
        bgImg(children[i]);
      } else if (children[i].name == 'submit_btn' && children[i].conName == 'Sprite') {
        //按钮
        submit_btn(children[i], coordinate)
      } else if (children[i].conName == 'Text') {
        //文本，让最外层题干文字水平居中
        style(children[i]);
        text(children[i])
      } else {
        if (children[i].conName == 'Ligature') {
          ligature(children[i], coordinate)
        } else if (children[i].conName == 'Choice') {
          choice(children[i], coordinate)
        } else if (children[i].conName == 'FillVacancy') {
          fillvacancy(children[i], coordinate)
        } else {
          choice(children[i], coordinate)
        }
      }
      if (children[i].children) {
        //处理children里面嵌套了children
        nestData(children[i].children)
        const modelType = mainJson.pages[0].modelType
        new GetData(modelType, children[i], children[i].children)
      }
    }
  }
  return mainJson;
}
