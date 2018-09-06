import {splitStyle} from "./changeStyle";
export const splitTag=(str)=>{
    let newTag = "";//存标签
    let newContent = "";//存内容
    let newFormula="";
    let sw = false;//控制存标签/内容
    let fsw = false;//控制公式存储
    let tagArr = [];//以对象格式，放入数组，存所有数据
    let tagReg=/<(?=\/?(div|span|img|strong|p|video|i|b|br|font|s|u))/;
    for (let i = 0,length=str.length;i<length;i++){
        let key=str[i];
        if(key=="$" && str[i+1]=="$"){
            fsw=!fsw;
            sw=!sw;
        }
        if(key=="$")continue;
        if(fsw){
            newFormula += key;
        }

        if(key === "<" && !fsw){
            let tag = str[i] + str[i+1] + str[i+2] + str[i+3] + str[i+4] + str[i+5] + str[i+6];
            if(tagReg.test(tag))sw = true;
        }
        if(!sw && key != " " && key != "\n" && !fsw){
            newContent += key;
        }
        if(sw && !fsw){
            newTag += key;
        }
        if(key === ">" && !fsw && sw){
            sw = false;
        }
        if(newFormula && !fsw){
            let tagObj={};
            tagObj.type=6;//公式
            tagObj.content=newFormula;
            tagArr.push(tagObj);
            newFormula=""; 
        }
        
        if((newContent && sw)||(newTag && !sw) ){
            let tagObj = {};
            
            if(!sw){
                //标签类
                if(newTag.indexOf("<img") != -1){
                    tagObj.type = 4;//标签为img
                    tagObj.tag = newTag;
                    // let style = newTag.slice(newTag.indexOf("style") + 7,newTag.indexOf("\"",newTag.indexOf("style") + 7));
                    // tagObj.style = splitStyle(style)
                    // tagObj.src = newTag.slice(newTag.indexOf("src") + 5,newTag.indexOf("\"",newTag.indexOf("src") + 5));
                }else if (newTag.indexOf("<br") != -1){
                    tagObj.type = 5;//标签为br
                    tagObj.tag=newTag;
                }else if(newTag.indexOf("style") != -1){
                    tagObj.type = 2;//标签且有样式
                    tagObj.tag = newTag.split(" ")[0];
                    let fromi = newTag.indexOf("\'") == -1 ? newTag.indexOf("\"",newTag.indexOf("style")+7):newTag.indexOf("\'",newTag.indexOf("style")+7);
                    let  style = newTag.slice(newTag.indexOf("style")+7,fromi);
                    tagObj.style = splitStyle(style)
                }else{
                    tagObj.tag = newTag.split(">")[0];
                    if(newTag.indexOf("</") != -1){
                        tagObj.type = 0;//结束标签
                    }else{
                        tagObj.type = 1;//仅有标签
                    }
                }
                tagArr.push(tagObj);
                newTag = "";
            //内容类
            }else{
                tagObj.type=3;
                tagObj.content=newContent;
                tagArr.push(tagObj);
                newContent = "";
            }
        }
    }
    return tagArr;
}