
export function Default (children, coordinate) {
  let {spaceX, spaceY, RspaceY, stemX, stemY, answerx, answerY, modelType, submitX, submitY, submitW, submitH, bgImgX, bgImgY, bgImgH, bgImgW, height, heightB, stemXtwo, spaceXtwo, index} = coordinate;
  children.transform[0] = stemX;
  children.transform[1] = stemY;
  coordinate.stemX = stemX + spaceX + children.rectangle[2];
  coordinate.stemY = stemY + spaceY;
  // console.log(coordinate)
}
