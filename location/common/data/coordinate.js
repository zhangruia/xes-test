export class Coordinates {
  constructor (mainJson) {
    //让填空题和选择题的答案的水平居中
    let children = mainJson.pages[0].children;
    let index = 0;
    let width = 0;
    let begin = 400;
    let imgWidth = 0;
    for (var i = 0; i < children.length; i++) {
      if (children[i].groupType == 'choice' || children[i].groupType == 'blank') {
        imgWidth = children[i].rectangle[2]
        index = index + 1;
        width = width + imgWidth;
      }
    }
    let spacex = (children[0].rectangle[2] - width - begin * 2) / (index - 1);
    //选择题数据
    this.coordinate1 = {
      spaceX: spacex,
      spaceY: 0,
      RspaceY: 0,
      stemX: begin,
      stemY: 600,
      answerX: 0,
      answerY: 0,
      modelType: 1
    }
        //填空题数据
    this.coordinate2 = {
      spaceX: spacex,
      spaceY: 0,
      RspaceY: 0,
      stemX: begin,
      stemY: 700,
      answerX: 0,
      answerY: 0,
      modelType: 2
    }
        //分类题
    this.coordinate3 = {//未处理
      spaceX: 0,
      spaceY: 0,
      RspaceY: 0,
      stemX: 0,
      stemY: 0,
      answerX: 0,
      answerY: 0,
      modelType: 3
    }
    //连线题数据
    let Rchildren = mainJson.pages[0].children;
    let Rindex = 0;
    let Rheight = 0;
    let Rbegin = 130;
    let RbeginX = 360;
    let RimgWidth = 0;
    let answerx = children[0].rectangle[2] - RbeginX;
    for (var i = 0; i < Rchildren.length; i++) {
      if (Rchildren[i].groupType == 'ligature_answer') {
        RimgWidth = Rchildren[i].rectangle[3]
        Rindex = Rindex + 1;
        Rheight = Rheight + RimgWidth;
      }
    }
    let Rspacey = (Rchildren[0].rectangle[3] - Rheight - Rbegin * 2) / (Rindex - 1);
    let Lchildren = mainJson.pages[0].children;
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
    this.coordinate4 = {
      spaceX: 0,//x轴图片间距
      spaceY: Lspacey,//y轴图片间距
      RspaceY: Rspacey,//y轴图片间距
      stemX: 360,//x容器坐标
      stemY: Lbegin,//y容器坐标
      answerX: answerx,
      answerY: Rbegin,
      modelType: 4
    }
  }
}
