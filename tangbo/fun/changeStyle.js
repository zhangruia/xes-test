export const styleTransform = (style) => {//修改样式的格式
    if(style){
      for (let k in style) {
        if (k.indexOf('-') != -1) {
          style[k.replace(/\-[a-z]/g, function(item){
            return item.slice(1).toUpperCase();
          })] = style[k].indexOf("px") != -1 ? parseInt(style[k]) : style[k];

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
        }//这里添加else可以过滤所有其他样式
      }
    }
}
  
  
export const splitStyle = (style) => {//切割内联sytle方法，可添加筛选文本style方法
    let styleArr = style.split(/:|;/);
    if(styleArr[styleArr.length-1] == "")styleArr.pop();
    let styleObj = {};
    for(let i = 0,length = styleArr.length;i < length;i += 2){
        styleObj[styleArr[i]] = styleArr[i+1]
    }
    styleTransform(styleObj);
    return styleObj;
}


export const inheritStyle = (styleArr) => {//继承styleArr中所有的style
    let inherit = {};
    for(let i = 0,length = styleArr.length;i < length;i++){
        for(let key in styleArr[i]){
            inherit[key] = styleArr[i][key]
        }
    }
    return inherit;
}

export const addStyle = (newTag,tagObj,pFontSize = 16) => {//识别特殊标签  添加可继承样式
  if(newTag.indexOf("<strong" ) != -1 || newTag.indexOf("<b" ) != -1){
      tagObj.style.fontWeight = "bold";
  }else if(newTag.indexOf("<i" ) != -1){
      tagObj.style.fontStyle='italic';
  }else if(newTag.indexOf("<sup") != -1){
      tagObj.style.verticalAlign = "sup";
  }else if(newTag.indexOf("<sub") != -1){
      tagObj.style.verticalAlign = "sub";
  }else if(newTag.indexOf("<u") != -1 || newTag.indexOf("<ins") != -1){
      tagObj.style.textDecoration = "underline";
  }else if(newTag.indexOf("<del") != -1){
      tagObj.style.textDecoration = "line-through";
  }else if(newTag.indexOf("<h1") != -1){
      tagObj.style.fontWeight = "bold";
      tagObj.style.fontSize = 2 * pFontSize;
  }else if(newTag.indexOf("<h2") != -1){
      tagObj.style.fontWeight = "bold";
      tagObj.style.fontSize = 1.5 * pFontSize;
  }else if(newTag.indexOf("<h3") != -1){
      tagObj.style.fontWeight = "bold";
      tagObj.style.fontSize = 1.17 * pFontSize;
  }else if(newTag.indexOf("<h4") != -1){
      tagObj.style.fontWeight = "bold";
      tagObj.style.fontSize = 1 * pFontSize;
  }else if(newTag.indexOf("<h5") != -1){
      tagObj.style.fontWeight = "bold";
    tagObj.style.fontSize = 0.83 * pFontSize;
  }else if(newTag.indexOf("<h6") != -1){
      tagObj.style.fontWeight = "bold";
      tagObj.style.fontSize = 0.67 * pFontSize;
  }
}


export const addSpecialStyle = (obj) => {//根据特殊标签的特殊style  为渲染模块添加特殊字段specialStyle
  if(obj.style.verticalAlign != undefined ){
    obj.specialStyle = obj.style.verticalAlign
  }else if(obj.style.textDecoration != undefined){
    obj.specialStyle = obj.style.textDecoration
  }
}