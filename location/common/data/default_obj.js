import { FatherCoordinates } from './father'
//处理未知的题型
export class Default extends FatherCoordinates {
  constructor (page) {
    super();
    this.compute(page);
    let children = page.children;
    let index = 0;
    let width = 0;
    let begin = 0;
    let imgWidth = 0;
    for (var i = 0; i < children.length; i++) {
      if(children[i].conName !== 'Sprite' && children[i].conName !== 'Text') {
        imgWidth = children[i].rectangle[2]
        width = width + imgWidth;
        index = index + 1;
      }
    }
    let spacex = (children[0].rectangle[2] - width - begin * 2) / (index + 1);
    if (index == 1) {
      begin = (children[0].rectangle[2] - imgWidth) / 2;
    } else {
      begin = spacex;
    }
    this.spaceX = spacex;
    this.stemX = begin;
    this.stemY = 300;
  }
}