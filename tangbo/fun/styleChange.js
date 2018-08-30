export const styleChange = (children)=>{//修改样式的格式
    if (children.texture.style) {
      let style = children.texture.style;
      for (let k in style) {
        if (k.indexOf('-') != '-1') {
          style[k.replace(/\-[a-z]/g, function(all, letter){
            return letter.toUpperCase();
          })] = style[k];
          delete style[k];
        }
        if (k == 'color') {
          style['fill'] = style['color'];
          delete style['color'];
        }else if (k == 'opacity') {
          style['alpha'] = style['opacity'];
          delete style['opacity'];
        }else if (k == 'lineHeight') {
          style['leading'] = style['lineHeight'];
          delete style['lineHeight'];
        }else if (k == 'textAlign') {
          style['align'] = style['textAlign'];
          delete style['textAlign'];
        }
        
      }
    }
  }
  