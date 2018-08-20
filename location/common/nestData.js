import { style } from "./style";

export function nestData (children) {
  if (children[0]){
    children[0].transform[0] = 20;
    children[0].transform[1] = 15;
    //style样式转canvas命名规范,驼峰命名
    style(children[0]);
  }
  if (children.children) {
    nest(children.children);
  }
}
