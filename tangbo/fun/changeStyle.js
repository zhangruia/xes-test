export const styleTransform = (style)=>{//修改样式的格式
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
  
  
export const splitStyle=(style)=>{//独立的切割内联sytle方法，可添加筛选文本style方法
    let styleArr=style.split(/:|;/);
    if(styleArr[styleArr.length-1]=="")styleArr.pop();
    let styleObj={};
    for(let i = 0,length=styleArr.length;i<length;i+=2){
        styleObj[styleArr[i]]=styleArr[i+1]
    }
    styleTransform(styleObj);
    return styleObj;
}


export const inheritStyle=(styleArr)=>{//独立的方法  继承styleArr中所有的style
    let inherit = {};
    for(let i = 0,length = styleArr.length;i < length;i++){
        for(let key in styleArr[i]){
            inherit[key] = styleArr[i][key]
        }
    }
    return inherit;
}

export const addStyle=(newTag,tagObj)=>{
  if(newTag.indexOf("<strong" ) != -1 || newTag.indexOf("<b" ) != -1){
      tagObj.style.fontWeight='blod';
  }else if(newTag.indexOf("<i" ) != -1){
      tagObj.style.fontStyle='italic';
  }else if(newTag.indexOf("<sup") != -1){
      tagObj.style.verticalAlign = "sup";
  }else if(newTag.indexOf("<sub") != -1){
      tagObj.style.verticalAlign = "sub";
  }else if(newTag.indexOf("<u") != -1 || newTag.indexOf("<ins") != -1){
      tagObj.style.textDecoration = "underline";
  }else if(newTag.indexOf("<del") != -1){
      tagObj.style.textDecoration = "line-through;";
  }
}

export const addSpecialStyle=(obj)=>{
  if(obj.style.verticalAlign != undefined ){
    obj.specialStyle = obj.style.verticalAlign
  }else if(obj.style.textDecoration != undefined){
    obj.specialStyle = obj.style.textDecoration
  }
}