import { Coordinates } from './data/coordinate.js'//引入坐标数据
import { nestData } from './nestData.js'//引入处理嵌套关系方法
import { style } from './style.js'
import { GetData } from './getData.js'

export function modifyData (mainJson) {
  for (var i = 0; i < mainJson.pages.length; i++) {//循环pages
    let { coordinate } = new Coordinates(mainJson.pages[i]);
    // console.log(coordinate)
    let spaceX = coordinate.spaceX;
    let spaceY = coordinate.spaceY;
    let RspaceY = coordinate.RspaceY;
    let stemX = coordinate.stemX;
    let stemY = coordinate.stemY;
    let answerX = coordinate.answerX;
    let answerY = coordinate.answerY;
    // var modelType = coordinate.modelType;
    let children = mainJson.pages[i].children;
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
        children[i].rectangle = [0, 0, 1920, 1080];
        children[i].transform = [0, 0, 1, 1, 0, 0, 0, 0, 0];
      } else if (children[i].conName == 'Text') {
        style(children[i]);
        //让最外层题干文字水平居中
        let text = (children[i].texture.content.text).split('');
        let size = children[i].texture.content.style.fontSize;
        let length = text.length * size;
        let textX = (children[0].rectangle[2] - length) / 2;
        children[i].rectangle = [0, 0, 0, 40];
        children[i].transform[0] = textX;
        children[i].transform[1] = 150;
      } else if (children[i].name == 'submit_btn' && children[i].conName == 'Sprite') {
        //按钮
        children[i].rectangle = [0, 0, 210, 80];
        children[i].transform = [1600, 930, 1, 1, 0, 0, 0, 0, 0];
      } else {
        if ((children[i].groupType == 'ligature_stem' && children[i].conName == 'Ligature') //连线题题干
          || children[i].conName == 'Choice' //选择题
          || children[i].conName == 'FillVacancy') {//填空题
          children[i].transform[0] = stemX;
          children[i].transform[1] = stemY;
          // console.log(stemY)
          stemX = stemX + spaceX;
          stemY = stemY + spaceY;
          if (children[i].groupType !== 'ligature_stem') {//非连线题
            stemX = stemX + children[i].rectangle[2];
          } else {
            stemY = stemY + children[i].rectangle[3];
          }
        }
        if (children[i].groupType == 'ligature_answer' && children[i].conName == 'Ligature') {//连线题答案
          if (index == 0) {
            answerX = answerX - children[i].rectangle[2]
            index++;
          }
          children[i].transform[0] = answerX;
          children[i].transform[1] = answerY;
          // console.log(answerY)
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
