
export function FillVacancy (children, coordinate) {
  coordinate.count++;
  let {spaceX, spaceY, stemX, stemY, height, heightB, stemXtwo, spaceXtwo, index, count} = coordinate;
  if (count <= index) {
    children.transform[0] = stemX;
    children.transform[1] = stemY + (height - children.rectangle[3]) / 2;
    coordinate.stemX = stemX + spaceX + children.rectangle[2];
    coordinate.stemY = stemY + spaceY;
  } else {
    children.transform[0] = stemXtwo;
    children.transform[1] = stemY + height + 30 + (heightB - children.rectangle[3]) / 2;
    coordinate.stemXtwo = stemXtwo + spaceXtwo + children.rectangle[2];
    coordinate.stemY = stemY + spaceY;
  }
}