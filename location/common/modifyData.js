import { Coordinates } from './data/coordinate.js'//引入坐标数据
import { nestData } from './nestData.js'//引入处理嵌套关系方法
import { style } from './style.js'//处理样式
import { GetData } from './getData.js'
import { bgImg, submit_btn, text } from '../method/index.js'

export function modifyData (mainJson) {
  for (var i = 0; i < mainJson.pages.length; i++) {//循环pages
    let { coordinate } = new Coordinates(mainJson.pages[i]);
    let children = mainJson.pages[i].children;
    // console.log(coordinate)
    let spaceX = coordinate.spaceX;
    let spaceY = coordinate.spaceY;
    let RspaceY = coordinate.RspaceY;
    let stemX = coordinate.stemX;
    let stemY = coordinate.stemY;
    let answerx = coordinate.answerx;
    let answerX = 0;
    let answerY = coordinate.answerY;
    var index = 0;
    for (var i = 0; i < children.length; i++) {
      children[i].transform[2] = 1;
      children[i].transform[3] = 1;
      children[i].transform[4] = 0;
      children[i].transform[5] = 0;
      children[i].transform[6] = 0;
      children[i].transform[7] = 0;
      children[i].transform[8] = 0;
      children[i].rectangle[0] = 0;
      children[i].rectangle[1] = 0;
      if (children[i].name == 'bgImg' && children[i].conName == 'Sprite') {
        //背景图片
        bgImg(children[i]);
      } else if (children[i].name == 'submit_btn' && children[i].conName == 'Sprite') {
        //按钮
        submit_btn(children[i], coordinate)
      } else if (children[i].conName == 'Text') {
        //让最外层题干文字水平居中
        style(children[i]);
        text(children[i])
      } else {
        if ((children[i].groupType == 'ligature_stem' && children[i].conName == 'Ligature') //连线题题干
          || children[i].conName == 'Choice' //选择题
          || children[i].conName == 'FillVacancy') {//填空题
          children[i].transform[0] = stemX;
          children[i].transform[1] = stemY;
          stemX = stemX + spaceX;
          stemY = stemY + spaceY;
          if (children[i].groupType !== 'ligature_stem') {//非连线题
            stemX = stemX + children[i].rectangle[2];
          } else {
            stemY = stemY + children[i].rectangle[3];
          }
        }
        if (children[i].groupType == 'ligature_answer' && children[i].conName == 'Ligature') {//连线题答
          answerX = answerx - children[i].rectangle[2]
          children[i].transform[0] = answerX;
          children[i].transform[1] = answerY;
          answerX = answerX + spaceX;
          answerY = answerY + RspaceY + children[i].rectangle[3];
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
