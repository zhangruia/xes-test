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
      this.coordinate = choice(page)
    }
  }
}
