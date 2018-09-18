import { rImage,mImage } from '../constructor/Image';
import { Text } from '../constructor/Text';
import { newId,toText } from '../commonFun/common';
import { getSvg, getImage } from './request';
import { splitTag } from './splitTag';
import { traverseRTArr } from './traverseRTArr'

export const richText = (child,resource,promiseArr) => {//富文本解析
    let str = child.texture.content;
    str = toText(str);
    let tagArr = splitTag(str);
    let arr = traverseRTArr(tagArr);
    let brSw = 0 ;
    arr.forEach(function(elem){
        let mobj = {};
        let robj = {};
        let texture = {};
        let config = {};
        if (elem.type == 3) {//文本
            texture.content = {};
            elem.content = elem.content.replace(/(&nbsp;)|(&copy;)/g,function(key){
                if(key == "&nbsp;") return " ";
                else if (key == "&copy;") return "©";
            })
            texture.content.text = elem.content;
            texture.type = 3;
            texture.content.style = elem.style || {};
            texture.content.specialStyle=elem.specialStyle || "normal";
            mobj = new Text(texture);
            if(brSw != 0 ){
                mobj.isWrap = brSw;
                brSw = 0;
            }
            child.children.push(mobj);
        } else if (elem.type == 4) {//图片
            let imgObj = {};
            let rid = newId();
            imgObj.id = rid;
            let imgs = elem.tag.split(" ");
            for (let prop of imgs) {
                if (/src=/.test(prop)) {
                    let src = prop.split("=")[1];
                    src=src.slice(1,-1);
                    if(src.indexOf("http") == -1){
                        imgObj.host = resource.resource.list[0].host;
                        imgObj.src = "."+src.slice(src.indexOf("/")).replace(/\'|\"/g,"");
                    }else{
                        imgObj.host = src.slice(0,src.indexOf("com") + 3).replace(/\'|\"/g,"");
                        imgObj.src = "." + src.slice(src.indexOf("com") + 3).replace(/\'|\"/g,"");
                    }
                    imgObj.name = src.slice(src.lastIndexOf('/') + 1,src.lastIndexOf('.')) + rid;
                    imgObj.ext = imgObj.src.slice(imgObj.src.lastIndexOf(".") + 1 );
                } else if (/resourceId=/.test(prop)) {
                    imgObj.resourceId = prop.split("=")[1];
                } else if (/width=/.test(prop)) {
                    imgObj.width = parseInt(prop.split("=")[1]);
                } else if (/height=/.test(prop)) {
                    imgObj.height = parseInt(prop.split("=")[1]);
                }
            }
            robj = new rImage(imgObj);
            texture.content = {
                default: rid
            };
            texture.type = 4;
            imgObj.texture = texture;
            if(brSw != 0 ){
                imgObj.isWrap = brSw;
                brSw = 0;
            }
            mobj = new mImage(imgObj);
            child.children.push(mobj);
            let rectangle = child.children[child.children.length-1].rectangle;
            resource.add(robj);
            if(imgObj.width == undefined || imgObj.height == undefined){
                promiseArr.push(
                    getImage(imgObj,rectangle,resource)
                )
            }
        } else if(elem.type == 5){//br标签
            brSw ++;
        } else if(elem.type == 6){//公式
            let rid = newId();
            texture.content = {
                default: rid
            };
            texture.type = 4;
            config.texture = texture;
            if(brSw != 0 ){
                config.isWrap = brSw;
                brSw = 0;
            }
            mobj = new mImage(config);
            child.children.push(mobj);
            let rectangle = child.children[child.children.length-1].rectangle;
            promiseArr.push(
                getSvg(rid,elem.content,resource,rectangle,rImage,elem.style.fontSize)
            )
        }
    })
    child.texture = {
        content:"",
        type:4
    }
    delete child.content;
    return {child,resource,promiseArr};//返回所有的异步请求去index.js中执行
}
