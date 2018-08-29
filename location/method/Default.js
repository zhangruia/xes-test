
export function Default (children, coordinate) {
  let {spaceX, spaceY, stemX, stemY, height, heightB, stemXtwo, spaceXtwo, index} = coordinate;
  children.transform[0] = stemX;
  children.transform[1] = stemY;
  coordinate.stemX = stemX + spaceX + children.rectangle[2];
  coordinate.stemY = stemY + spaceY;
}