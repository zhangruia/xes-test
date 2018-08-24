
export function submit_btn (children, coordinate) {
  let { submitX, submitY, submitH, submitW } = coordinate;
  children.rectangle = [0, 0, submitW, submitH];
  children.transform = [submitX, submitY, 0, 0, 0, 0, 0, 0, 0];
}