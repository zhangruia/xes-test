import basic from '../basic.json'

export function choice (page) {
  let submith, submitw, submity, submitx;
  for (let i in basic.modelType) {
    if (basic.modelType[i] == page.modelType) {
      // console.log(basic[i])
      submitx = basic[i].submitX;
      submitw = basic[i].submitW;
      submith = basic[i].submitH;
      submity = basic[i].submitY;
    }
  }
  let children = page.children;
  let index = 0;
  let width = 0;
  let begin = 0;
  let imgWidth = 0;
  for (var i = 0; i < children.length; i++) {
    if (children[i].conName == 'Choice') {
      imgWidth = children[i].rectangle[2]
      index = index + 1;
      width = width + imgWidth;
    }
  }
  let spacex = (children[0].rectangle[2] - width - begin * 2) / (index + 1);
  if (index == 1) {
    begin = (children[0].rectangle[2] - imgWidth) / 2;
  } else {
    begin = spacex;
  }
  //选择题数据
  return  { 
    spaceX: spacex,
    spaceY: 0,
    RspaceY: 0,
    stemX: begin,
    stemY: 600,
    modelType: 1,
    submitX: submitx,
    submitY: submity,
    submitW: submitw,
    submitH: submith
  }
}
