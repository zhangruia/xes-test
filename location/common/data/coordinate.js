import { fillvacancy } from "./fillvacancy";
import { choice } from './choice'
import { ligature } from "./ligature";

export class Coordinates {//坐标系
  constructor (page) {
    //让填空题和选择题的答案的水平居中
    // console.log(page.modelType)
    if (page.modelType == 1) {
      this.coordinate = choice(page)
    } else if (page.modelType == 2) {
      this.coordinate = fillvacancy(page)
    } else if (page.modelType == 4) {
      this.coordinate = ligature(page)
    }else {
      this.coordinate = {//未处理
        spaceX: 0,
        spaceY: 0,
        RspaceY: 0,
        stemX: 0,
        stemY: 0,
        answerX: 0,
        answerY: 0,
        modelType: 3
      }
    }
  }
}
