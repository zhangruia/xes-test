import { Coordinates } from './data/index.js'//引入坐标数据
import { BgImg, submit_btn, Text, FillVacancy, Ligature, Choice, Default } from '../method/index.js'//处理不同类型的方法
import { style } from '../method/style.js'//处理样式
import { nestData } from './nestData.js'//引入处理嵌套关系方法
import { GetData } from './getData.js'

export function modifyData (mainJson) {
  for (var j = 0; j < mainJson.pages.length; j++) {//循环pages
    let { coordinate } = new Coordinates(mainJson.pages[j]);
    let children = mainJson.pages[j].children;
    for (var i = 0; i < children.length; i++) {
      children[i].transform = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      children[i].rectangle[0] = 0;
      children[i].rectangle[1] = 0;
      if (children[i].conName == 'Container') {
        //Container容器
        
      }
      if (children[i].name == 'bgImg' && children[i].conName == 'Sprite') {
        //背景图片
        BgImg(children[i], coordinate);
      } else if (children[i].name == 'submit_btn' && children[i].conName == 'Sprite') {
        //按钮
        submit_btn(children[i], coordinate);
      } else if (children[i].conName == 'Text') {
        //文本，让最外层题干文字水平居中
        style(children[i]);
        // Text(children[i]);
      } else {
        if (children[i].conName == 'Ligature') {
        //处理连线题
          Ligature(children[i], coordinate);
        } else if (children[i].conName == 'Choice' || children[i].conName == 'Container') {
          //处理选择题
          Choice(children[i], coordinate);
        } else if (children[i].conName == 'FillVacancy') {
          //处理填空题
          FillVacancy(children[i], coordinate);
        } else {
          //未知题型处理
          Default(children[i], coordinate);
        }
      }
      if (children[i].children) {
        //处理children里面嵌套了children
        // nestData(children[i].children)
      }
    }
  }
  return mainJson;
}
