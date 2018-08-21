import { FillVacancy } from "./fillvacancy_obj";
import { Choice } from './choice_obj'
import { Ligature } from "./ligature_obj";

export class Coordinates {//坐标系
  constructor (page) {
    if (page.modelType == 1) {
      this.coordinate = new Choice(page)
    } else if (page.modelType == 2) {
      this.coordinate = new FillVacancy(page)
    } else if (page.modelType == 4) {
      this.coordinate = new Ligature(page)
    } else {
      this.coordinate = new Choice(page)
    }
  }
}
