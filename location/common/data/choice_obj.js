import { FatherCoordinates } from './father.js'
import basic from '../basic.json'
//处理选择题
export class Choice extends FatherCoordinates {
  constructor (page) {
    super();
    // this.compute(page);
    let {common: {stemY, stemX, spaceXMin, spaceY, widthMax}} = basic
    // console.log(stemY, stemX, spaceXMin, spaceY)
    this.count = 0;
    let children = page.children;
    let index = 0, width = 0, begin = stemX, begintwo = stemX, imgWidth = 0, spacextwo = 0, height = 0, buttom = 0, top = 0, heightB = 0;
    for (let i = 0; i < children.length; i++) {
      if ((children[i].conName == 'Choice'
      || children[i].conName == 'Container' 
      || children[i].conName == 'FillVacancy')
      && children[i].rectangle[2] <= widthMax) {
        if (children[i].rectangle[3] > height) {
          height = children[i].rectangle[3];
        }
        imgWidth = children[i].rectangle[2];
        index = index + 1;
        width = width + imgWidth;
      }
    }
    let spacex = (children[0].rectangle[2] - width - begin * 2) / (index + 1);
    if (spacex <= spaceXMin) {
      top = Math.ceil(index / 2)
      buttom = Math.floor(index / 2)
      console.log(top)
      console.log(buttom)
      index = 0;
      width = 0;
      imgWidth = 0;
      for (let j = 0; j < children.length; j++) {
        if ((children[j].conName == 'Choice'
        || children[j].conName == 'Container' 
        || children[j].conName == 'FillVacancy')
        && children[j].rectangle[2] <= widthMax) {
          if (children[j].rectangle[3] > height && j <= top) {
            height = children[j].rectangle[3];
          } else if (children[j].rectangle[3] > heightB && j > top) {
            heightB = children[j].rectangle[3];
          }
          index = index + 1;
          imgWidth = children[j].rectangle[2];
          width = width + imgWidth;
          if (index == top) {
            spacex = (children[0].rectangle[2] - width - begin * 2) / (top + 1);
            begin = top == 1? (children[0].rectangle[2] - imgWidth) / 2: spacex;
            width = 0;
          }
        }
      }
      spacextwo = (children[0].rectangle[2] - width - begintwo * 2) / (buttom + 1);
      begintwo = buttom == 1? (children[0].rectangle[2] - imgWidth) / 2: spacextwo;
    } else {
      begin = index == 1? (children[0].rectangle[2] - imgWidth) / 2: spacex;
      top = index
    }
    this.height = height; 
    this.heightB = heightB;
    this.stemXtwo = begintwo + stemX;
    this.spaceXtwo = spacextwo
    this.index = top;
    this.spaceX = spacex;
    this.stemX = begin + stemX;
    this.stemY = stemY;
    this.spaceY = spaceY;
    this.widthMax = widthMax
  }
}
