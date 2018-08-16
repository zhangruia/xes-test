import {richText} from './richText';
import { getConName } from '../common/common'

export const traverseChildren=(children)=>{
    //如何让children[i]被替换掉，还能被遍历出来子children
    for(let i in children){//遍历children
        let child=children[i];
        let content=child.texture.content;
        let id = child.id;
        console.log("正在遍历id="+id+"的children...")
//判断类型，选择构造类
        // let conName=getConName(child);
        // console.log(conName);
        // children[i].conName=conName;

        // console.log(id);
        // console.log(content);
        if(content.indexOf("<br>")!=-1||content.indexOf("\n")!=-1||content.indexOf("$$")!=-1||content.indexOf("<img")!=-1){
            console.log("捕获了id="+id+"的富文本,即将送入富文本解析函数...")
            children[i]=richText(children[i]);
            // console.log(richText(children[i]));
        }
        if(child.children!=""){
            console.log("即将遍历id="+id+"的子children")
            console.log("=======================周期==========================")
            traverseChildren(children[i].children);
            // console.log('children不为空');
        }
    }
    return children;
    // console.log(children)
}
