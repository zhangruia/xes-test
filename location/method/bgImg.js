
export function BgImg (children, coordinate) {
  children.rectangle = [0, 0, coordinate.bgImgW, coordinate.bgImgH];
  children.transform = [coordinate.bgImgX, coordinate.bgImgY, 0, 0, 0, 0, 0, 0, 0];
}