export function fillvacancy (children, coordinate) {
  let { spaceX, spaceY, RspaceY, stemX, stemY, answerx, answerY } = coordinate;
  children.transform[0] = stemX;
  children.transform[1] = stemY;
  coordinate.stemX = stemX + spaceX + children.rectangle[3];
  coordinate.stemY = stemY + spaceY;
}