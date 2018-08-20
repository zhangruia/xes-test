import basic from '../common/basic.json'
export function bgImg (children) {
  children.rectangle = [0, 0, basic.common.pageW, basic.common.pageH];
  children.transform = [basic.common.bgX, basic.common.bgY, 0, 0, 0, 0, 0, 0, 0];
}