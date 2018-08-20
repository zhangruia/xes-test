import basic from '../basic.json'
export function ligature (page) {
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
  //连线题数据
  let Rchildren = page.children;
  let Rindex = 0;
  let Rheight = 0;
  let Rbegin = 130;
  let RbeginX = 360;
  let RimgWidth = 0;
  let answerX = Rchildren[0].rectangle[2] - RbeginX;
  for (var i = 0; i < Rchildren.length; i++) {
    if (Rchildren[i].groupType == 'ligature_answer') {
      RimgWidth = Rchildren[i].rectangle[3]
      Rindex = Rindex + 1;
      Rheight = Rheight + RimgWidth;
    }
  }
  let Rspacey = (Rchildren[0].rectangle[3] - Rheight - Rbegin * 2) / (Rindex - 1);
  console.log(Rspacey)
  let Lchildren = page.children;
  let Lindex = 0;
  let Lheight = 0;
  let Lbegin = 130;
  let LimgWidth = 0;
  for (var i = 0; i < Lchildren.length; i++) {
    if (Lchildren[i].groupType == 'ligature_stem') {
      LimgWidth = Lchildren[i].rectangle[3]
      Lindex = Lindex + 1;
      Lheight = Lheight + LimgWidth;
    }
  }
  let Lspacey = (Lchildren[0].rectangle[3] - Lheight - Lbegin * 2) / (Lindex - 1);
  return {
    spaceX: 0,//x轴图片间距
    spaceY: Lspacey,//y轴图片间距
    RspaceY: Rspacey,//y轴图片间距
    stemX: 360,//x容器坐标
    stemY: Lbegin,//y容器坐标
    answerx: answerX,
    answerY: Rbegin,
    modelType: 4,
    submitX: submitx,
    submitY: submity,
    submitW: submitw,
    submitH: submith
  }
}