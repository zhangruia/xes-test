import { FillVacancy } from "./fillvacancy_obj";
import { Choice } from './choice_obj'
import { Ligature } from "./ligature_obj";
import { Default } from './default_obj';
import basic from '../basic.json';

export class Coordinates {//坐标系 
  constructor (page) {
    // for (let i in basic.modelType) {
    //   if (page.modelType == basic.modelType[i]) {
    //     // this.coordinate = new i(page)
    //     name.i(page)
    //     // console.log(i)
    //   }
    // }
    if (page.modelType == 1) {
      this.coordinate = new Choice(page);
    } else if (page.modelType == 2) {
      this.coordinate = new Choice(page);
    } else if (page.modelType == 4) {
      this.coordinate = new Ligature(page);
    } else {
      this.coordinate = new Default(page);
    }
  }
}
