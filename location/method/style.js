export function style (children) {
  if (children.texture.content.style) {
    let style = children.texture.content.style;
    for (var k in style) {
      if (k == 'color') {
        style['fill'] = style['color'];
        delete style['color'];
      };
      if (k.indexOf('-') != '-1') {
        style[k.replace(/\-(\w)/g, function(all, letter){
          return letter.toUpperCase();
        })] = style[k];
        delete style[k];
      }
    }
  }
}
