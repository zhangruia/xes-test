export function choice (page) {
  // if (page.children) {
    let children = page.children;
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
    return  {
      spaceX: spacex,
      spaceY: 0,
      RspaceY: 0,
      stemX: begin,
      stemY: 600,
      answerX: 0,
      answerY: 0,
      modelType: 1
    }
  // }
}