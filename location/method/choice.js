var i = 0;
export function Choice (children, coordinate) {
  i++;
  let { spaceX, spaceY, stemX, stemY, height, stemXtwo, spaceXtwo, index } = coordinate;
  console.log(coordinate)
  if (i <= index) {
    children.transform[0] = stemX;
    children.transform[1] = stemY;
    coordinate.stemX = stemX + spaceX + children.rectangle[2];
    coordinate.stemY = stemY + spaceY;
  } else {
    children.transform[0] = stemXtwo;
    children.transform[1] = stemY + height + 30;
    coordinate.stemXtwo = stemXtwo + spaceXtwo + children.rectangle[2];
    coordinate.stemY = stemY + spaceY;
  }
}
