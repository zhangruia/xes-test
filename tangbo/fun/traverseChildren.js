import { richText } from './richText';
import { getConName, toText } from '../commonFun/common'
import { styleTransform } from './changeStyle'
export const traverseChildren=(children,resource,promiseArr)=>{
    //遍历children
    for(let i in children){
        let child = children[i];
        children[i].rectangle = [0,0,0,0];
        children[i].transform = [0,0,0,0,0,0,0,0,0];
        let content = child.texture.content;
        if(content) children[i].content=toText(content);
        let textureType = children[i].texture.type;
        styleTransform(children[i].texture.style);
        let conName = getConName(child);
        children[i].conName = conName;
         //添加groupType//添加对应的正确选项属性
        if(conName == 'Choice'){
            children[i].groupType = 'choice';
            children[i].isRight = false;  
        }else if (conName == 'FillVacancy'){
            children[i].groupType = 'blank';
            children[i].rightAnswer = "";
        }
        //修改name
        children[i].name = child.name+child.id;
        if(content.indexOf("<br>") != -1 || content.indexOf("\n") != -1 || content.indexOf("$$") != -1 || content.indexOf("<img") != -1){
            children[i].conName = 'Container';
            let result = richText(children[i],resource,promiseArr);
            // children[i] = result.child;
            // console.log(children[i])
            resource = result.resource;
            promiseArr = result.promiseArr;
            continue;
        }else{
            // 修改type,只考虑文本和图片//修改content格式
            if(typeof content == "string"){
                let textureStyle = child.texture?child.texture.style:'';
                let newContent = {};
                newContent.text = content;
                if(textureStyle){
                    newContent.style = textureStyle;
                    delete children[i].texture.style;
                }
               children[i].texture.content=newContent;
            }
            children[i].texture.type = textureType == 0 ? 3 : 4 ;
        }
        //子children继续遍历
        if(child.children.length>0 && children[i].conName != "Container"){
            traverseChildren(children[i].children,resource,promiseArr);
        }
    }
    return {children,resource,promiseArr};
}
