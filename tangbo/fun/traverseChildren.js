import {richText} from './richText';
import { getConName } from '../common/common'

export const traverseChildren=(children)=>{

    for(let i in children){//遍历children
        let child=children[i];
        let content=child.texture.content;
        let id = child.id;
        let textureType=children[i].texture.type
        console.log("正在遍历id="+id+"的children...")

        //添加conName
        let conName=getConName(child);
        children[i].conName=conName;
         //添加groupType//添加对应的正确选项属性
        if(conName=='Choice'){
            children[i].groupType='choice';
            children[i].isRight=false;
        }else if (conName=='FillVacancy'){
            children[i].groupType='blank';
            children[i].rightAnswer="";
        }
        //修改name
        children[i].name=child.name+child.id;

        if(content.indexOf("<br>")!=-1||content.indexOf("\n")!=-1||content.indexOf("$$")!=-1||content.indexOf("<img")!=-1){
            console.log("捕获了id="+id+"的富文本,即将送入富文本解析函数...");
            children[i].conName='Container';//容器的构造名
            children[i]=richText(children[i]);
        }else{
            //修改type,只考虑文本和图片
            children[i].texture.type = textureType == 0 ? 3 : 4 ;
        }
        if(child.children!=""){
            // children[i].children.parentId=id;
            console.log("即将遍历id="+id+"的子children")
            console.log("=======================周期==========================")
            traverseChildren(children[i].children);
        }
    }
    return children;
}
