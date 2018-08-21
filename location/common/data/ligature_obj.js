import { FatherCoordinates } from './father.js'
//处理连线题
export class Ligature extends FatherCoordinates {
  constructor (page) {
    super();
    this.compute(page);
    let Rchildren = page.children;
    let Rindex = 0;
    let Rheight = 0;
    let Rbegin = 130;
    let RbeginX = 360;
    let RimgWidth = 0;
    let answerX = Rchildren[0].rectangle[2] - RbeginX;
    for (var i = 0; i < Rchildren.length; i++) {
      if (Rchildren[i].groupType == 'ligature_answer') {
        RimgWidth = Rchildren[i].rectangle[3];
        Rindex = Rindex + 1;
        Rheight = Rheight + RimgWidth;
      }
    }
    let Rspacey = (Rchildren[0].rectangle[3] - Rheight - Rbegin * 2) / (Rindex - 1);
    let Lchildren = page.children;
    let Lindex = 0;
    let Lheight = 0;
    let Lbegin = 130;
    let LimgWidth = 0;
    for (var i = 0; i < Lchildren.length; i++) {
      if (Lchildren[i].groupType == 'ligature_stem') {
        LimgWidth = Lchildren[i].rectangle[3];
        Lindex = Lindex + 1;
        Lheight = Lheight + LimgWidth;
      }
    }
    let Lspacey = (Lchildren[0].rectangle[3] - Lheight - Lbegin * 2) / (Lindex - 1);
    this.spaceY = Lspacey;
    this.RspaceY = Rspacey;
    this.stemX = RbeginX;
    this.stemY = Lbegin;
    this.answerx = answerX;
    this.answerY = Rbegin;
    // console.log(this)
  }
}