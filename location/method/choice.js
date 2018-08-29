
export function Choice (children, coordinate) {
    coordinate.count++;
    if (coordinate.count <= 1) {
      coordinate.StemX = coordinate.stemX;
    }
    let {widthMax, spaceX, spaceY, StemX, stemX, stemY, height, heightB, stemXtwo, spaceXtwo, index, count} = coordinate;
    if (children.rectangle[2] > widthMax) {
      let HeightB = heightB == 0? 0: heightB + spaceY;
      children.transform[0] = StemX;
      children.transform[1] = stemY + height + spaceY + HeightB;
      coordinate.count--;
    } else {
      if (count <= index || index == 0) {
        children.transform[0] = stemX;
        children.transform[1] = stemY + ((height - children.rectangle[3]) / 2);
        coordinate.stemX = stemX + spaceX + children.rectangle[2];
        // coordinate.stemY = stemY + spaceY;
      } else {
        children.transform[0] = stemXtwo;
        children.transform[1] = stemY + height + spaceY + (heightB - children.rectangle[3]) / 2;
        coordinate.stemXtwo = stemXtwo + spaceXtwo + children.rectangle[2];
        // coordinate.stemY = stemY + spaceY;
      }
    }
  // }
}
