import {rImage,mImage} from '../constructor/Image';
import {Text} from '../constructor/Text';
import {newId,toText} from '../common/common';
import { splitText } from './splitText';
import $ from './jquery-1.11.3';
import { getSvg } from './queryFormula';


export const richText = (child,resource,promiseArr) => {//富文本解析
    let sw=true;
    let str=child.texture.content;
    str=toText(str);
    let arr=splitText(str);
    arr.forEach(function(elem,i,arr){
        let mobj = {};
        let robj = {};
        let texture = {};
        let config = {};
        if (/[\u4e00-\u9fa5]+/.test(elem)) {//文本
            texture.content = {};
            texture.content.text = elem;
            texture.type = 3;
            //如果日后富文本中解析出style可以在这里添加style
            // texture.content.style={}
            //判断是否有br
            mobj = new Text(texture);
            // console.log(mobj);   
        } else if (/\<img/.test(arr[i])) {//图片
            let imgObj = {};
            let rid = newId();
            imgObj.id = rid;
            let imgs=arr[i].split(" ");
            for (let prop of imgs) {
                if (/^src=/.test(prop)) {
                    imgObj.src = prop.split("=")[1];
                    imgObj.ext = imgObj.src.slice(imgObj.src.lastIndexOf(".")+1,-1)
                } else if (/^data-resourceId=/.test(prop)) {
                    imgObj.resourceId=prop.split("=")[1];
                } else if (/^data-width=/.test(prop)) {
                    imgObj.width=prop.split("=")[1];
                } else if (/^data-height=/.test(prop)) {
                    imgObj.height=prop.split("=")[1].slice(0,-1);
                }
            }
            robj = new rImage(imgObj);
            texture.content = [rid];
            texture.type = 4;
            imgObj.texture = texture;
            mobj = new mImage(imgObj)//
        } else if(/^\s*\<br\s*$/.test(elem)){//br标签
            let length=child.children.length;
            if (length > 0) child.children[length-1].isWrap = child.children[length-1].isWrap + 1;
        } else {//公式
            let rid = newId();
            texture.content = [rid];
            texture.type = 4;
            config.texture = texture;
            mobj = new mImage(config);
            sw=false;
            child.children.push(mobj);
            // 10.99.2.153
            // 192.168.21.203:
            let rectangle = child.children[child.children.length-1].rectangle;
            promiseArr.push(
                getSvg(rid,elem,resource,rectangle,rImage)
            )
            
            
            
        }
        if(mobj.conName != undefined && sw)child.children.push(mobj);
        if(robj.id != undefined )resource.add(robj);
    })
    child.texture = {
        content:"",
        type:4
    }
    delete child.content;
    return {child,resource,promiseArr};
}