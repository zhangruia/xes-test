import { FatherCoordinates } from './father.js'
//处理连线题
export class Ligature extends FatherCoordinates {
  constructor (page) {
    super();
    this.compute(page);
    let children = page.children;
    let Rindex = 0;
    let Rheight = 0;
    let Rbegin = 130;
    let RbeginX = 360;
    let RimgWidth = 0;
    let Lindex = 0;
    let Lheight = 0;
    let Lbegin = 130;
    let LimgWidth = 0;
    let answerX = children[0].rectangle[2] - RbeginX;
    for (var i = 0; i < children.length; i++) {
      if (children[i].groupType == 'ligature_answer') {
        RimgWidth = children[i].rectangle[3];
        Rindex = Rindex + 1;
        Rheight = Rheight + RimgWidth;
      } else if (children[i].groupType == 'ligature_stem') {
        LimgWidth = children[i].rectangle[3];
        Lindex = Lindex + 1;
        Lheight = Lheight + LimgWidth;
      }
    }
    let Rspacey = (children[0].rectangle[3] - Rheight - Rbegin * 2) / (Rindex - 1);
   
    let Lspacey = (children[0].rectangle[3] - Lheight - Lbegin * 2) / (Lindex - 1);
    this.spaceY = Lspacey;
    this.RspaceY = Rspacey;
    this.stemX = RbeginX;
    this.stemY = Lbegin;
    this.answerx = answerX;
    this.answerY = Rbegin;
    // console.log(this)
  }
}