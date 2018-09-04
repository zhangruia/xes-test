import {splitStyle} from "./styleChange";
export const splitTag=(str)=>{
    let newTag = "";//存标签
    let newContent = "";//存内容
    let sw = false;//控制存标签/内容
    let tagArr = [];//以对象格式，放入数组，存所有数据
    for (let i = 0,length=str.length;i<length;i++){
        let key=str[i];
        if(key.indexOf(""))
        if(key === "<"){
            sw = true;
        }
        if(!sw && key != " " && key != "\n"){
            newContent += key;
        }
        if(sw){
            newTag += key;
        }
        if(key === ">"){
            sw = false;
        }
        if((newContent && sw)||(newTag && !sw) ){
            let tagObj = {};
            if(!sw){
                //标签类
                if(newTag.indexOf("<img") != -1){
                    tagObj.type = 4;//标签为img
                    tagObj.tag = newTag;
                    let style = newTag.slice(newTag.indexOf("style")+7,newTag.indexOf("\"",newTag.indexOf("style")+7));
                    tagObj.style = splitStyle(style)
                    tagObj.src = newTag.slice(newTag.indexOf("src")+5,newTag.indexOf("\"",newTag.indexOf("src")+5));
                }
                else if (newTag.indexOf("<br") != -1){
                    tagObj.type = 5;//标签为br
                    tagObj.tag=newTag;
                }
                else if(newTag.indexOf("style") != -1){
                    tagObj.type = 2;//标签且有样式
                    tagObj.tag = newTag.split(" ")[0];
                    let style = newTag.slice(newTag.indexOf("style")+7,newTag.indexOf("\"",newTag.indexOf("style")+7));
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
    console.log(tagArr)
    return tagArr;
}