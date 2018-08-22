import { FatherCoordinates } from './father.js'
//处理填空题
export class FillVacancy extends FatherCoordinates {
  constructor (page) {
    super();
    this.compute(page);
    let children = page.children;
    let index = 0, width = 0, begin = 0, begintwo = 0, imgWidth = 0, spacextwo = 0, height = 0, top = 0, heightB = 0;
    for (var i = 0; i < children.length; i++) {
      if (children[i].conName == 'FillVacancy') {
        if (children[i].rectangle[2] > height) {
          height = children[i].rectangle[2];
        }
        imgWidth = children[i].rectangle[2];
        index = index + 1;
        width = width + imgWidth;
      }
    }
    let spacex = (children[0].rectangle[2] - width - begin * 2) / (index + 1);
    if (spacex <= 60) {
      top = Math.ceil(index / 2)
      let buttom = Math.floor(index / 2)
      index = 0;
      width = 0;
      imgWidth = 0;
      for (var i = 0; i < children.length; i++) {
        if (children[i].conName == 'FillVacancy') {
          if (children[i].rectangle[2] > height && i <= top) {
            height = children[i].rectangle[2];
          } else if (children[i].rectangle[2] > heightB && i > top) {
            heightB = children[i].rectangle[2];
          }
          index = index + 1;
          imgWidth = children[i].rectangle[2];
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
      top = index;
    }
    this.height = height;
    this.heightB = heightB;
    this.stemXtwo = begintwo;
    this.spaceXtwo = spacextwo
    this.index = top;
    this.spaceX = spacex;
    this.stemX = begin;
    this.stemY = 500;
  }
}