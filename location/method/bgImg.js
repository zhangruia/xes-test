
export function BgImg (children, coordinate) {
  // console.log(coordinate)
  children.rectangle = [0, 0, coordinate.bgImgW, coordinate.bgImgH];
  children.transform = [coordinate.bgImgX, coordinate.bgImgY, 0, 0, 0, 0, 0, 0, 0];
}