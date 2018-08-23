export function Ligature (children, coordinate) {
  let {spaceX, spaceY, RspaceY, stemX, stemY, answerx, answerY} = coordinate;
  let answerX = 0;
  if (children.groupType == 'ligature_stem') {
    children.transform[0] = stemX;
    children.transform[1] = stemY;
    coordinate.stemX = stemX + spaceX;
    coordinate.stemY = stemY + spaceY + children.rectangle[3];
  }
  if (children.groupType == 'ligature_answer') {//连线题答案
    answerX = answerx - children.rectangle[2]
    children.transform[0] = answerX;
    children.transform[1] = answerY;
    coordinate.answerX = answerX + spaceX;
    coordinate.answerY = answerY + RspaceY + children.rectangle[3];
  }
}