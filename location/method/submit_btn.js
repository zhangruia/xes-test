import basic from '../common/basic.json'
export function submit_btn (children) {
  children.rectangle = [0, 0, basic.common.submitW, basic.common.submitH];
  children.transform = [basic.common.submitX, basic.common.submitY, 0, 0, 0, 0, 0, 0, 0];
}