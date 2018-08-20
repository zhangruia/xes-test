export function submit_btn (children, coordinate) {
  let submitX = coordinate.submitX;
  let submitY = coordinate.submitY;
  let submitH = coordinate.submitH;
  let submitW = coordinate.submitW;
  children.rectangle = [0, 0, submitW, submitH];
  children.transform = [submitX, submitY, 0, 0, 0, 0, 0, 0, 0];
}