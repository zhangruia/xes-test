import { fillvacancy } from "./fillvacancy";
import { choice } from './choice'
import { ligature } from "./ligature";

export class Coordinates {//坐标系
  constructor (page) {
    if (page.modelType == 1) {
      this.coordinate = choice(page)
    } else if (page.modelType == 2) {
      this.coordinate = fillvacancy(page)
    } else if (page.modelType == 4) {
      this.coordinate = ligature(page)
    } else {
      this.coordinate = {//未处理
        spaceX: 0,
        spaceY: 0,
        RspaceY: 0,
        stemX: 0,
        stemY: 0,
        answerx: 0,
        answerY: 0,
        modelType: 3,
        submitX: 1600,
        submitY: 900,
        submitW: 240,
        submitH: 80
      }
    }
  }
}
