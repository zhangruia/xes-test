export function nest (children) {
  if (children[0]){
    children[0].transform[0] = 20;
    children[0].transform[1] = 15;
    if (children[0].texture.content.style) {
      let style = children[0].texture.content.style;
      for (var k in style) {
        //style样式转canvas命名规范
        if (k == 'color') {
          style['fill'] = style['color']
          // console.log(k)
        };
        if (k.indexOf('-') != '-1') {
          style[k.replace(/\-(\w)/g, function(all, letter){
            return letter.toUpperCase();
          })] = style[k];
          delete style[k];
        }
      }
      console.log(style);
    }
  }
  if (children.children) {
    nest(children.children);
  }
}