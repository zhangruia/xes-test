import {rImage,mImage} from '../constructor/Image';
import {Text} from '../constructor/Text';
import {newId} from '../common/common';
import { splitText } from './splitText'


export const richText=(child,resource)=>{
     
    let str=child.texture.content;
    console.log(str);
    let arr =splitText(str);
    arr.forEach(function(elem,i,arr){
        let fetchStatus=0;
        let mobj={};
        let robj={};
        let texture={};
        if(/[\u4e00-\u9fa5]+/.test(elem)){
            console.log("我遇到文本啦");
            
            texture.content={};
            texture.content.text=elem;
            texture.type=3;
            //如果日后富文本中解析出style可以在这里添加style
            // texture.content.style={}
            //判断是否有br
            mobj=new Text(texture);
            console.log(mobj);   
        }else if(/\<img/.test(arr[i])){
            console.log("我遇到图片啦");
            let imgObj={};
            let rid=newId();
            imgObj.id=rid;
            let imgs=arr[i].split(" ");
            for(let prop of imgs){
                if(/^src=/.test(prop)){//取src、ext
                    imgObj.src=prop.split("=")[1];
                    imgObj.ext=imgObj.src.slice(imgObj.src.lastIndexOf(".")+1,-1)
                }else if(/^data-resourceId=/.test(prop)){//取resourceId
                    imgObj.resourceId=prop.split("=")[1];
                }else if (/^data-width=/.test(prop)){//取宽
                    imgObj.width=prop.split("=")[1];
                }else if (/^data-height=/.test(prop)){//取高
                    imgObj.height=prop.split("=")[1].slice(0,-1);
                }
            }

            robj=new rImage(imgObj);
            texture.content=[rid];
            texture.type=4;
            mobj=new mImage(texture)//
        }else if(/^\s*\<br\s*$/.test(elem)){
            console.log("我遇到单独的标签啦");
            let length=child.children.length;
            // if(length>0)child.children[length-1].isWrap=parseInt(child.children[length-1].isWrap)+1;
            if(length>0)child.children[length-1].isWrap=child.children[length-1].isWrap+1;
        }else{
            console.log("我遇到公式啦！")
            let rid=newId();
            //吃完饭回来把公式搞定！
            console.log(elem)
            let fobj={};
            fetch('http://10.99.2.153:4000/mathhandle/jax/?mathstr='+elem)
            .then((data)=>{
                return data.json();
            })
            .then((data)=>{
                let fobj=data;
                fobj.id=rid;
                if(data.status==100)resource.add(new rImage(fobj));
            })
            texture.content=[rid];
            texture.type=4;
            mobj=new mImage(texture);
            console.log(mobj);
        }
        if(mobj.conName!=undefined)child.children.push(mobj);
        if(robj.id!=undefined)resource.add(robj);
        // console.log("push过一次")
    })
    child.texture={
        content:[],
        type:4
    }
    // console.log("即将输出arr")
    // console.log(arr);
    // console.log("结束了richText");
    // console.log(child)
    
    return {child,resource};
}