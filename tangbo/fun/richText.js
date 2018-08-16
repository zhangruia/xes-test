import {Image} from '../constructor/Image';
import {Text} from '../constructor/Text';
import {Box} from '../constructor/Box';
import {newId} from '../common/common';
 
//              texture：
                    // type:
        //              STAGE: "1",
        //              CONTAINER: "2",
        //              TEXT: "3",
        //              IMG: "4",
        //              AUDIO: "5",
        //              VIDEO: "6",
        //              IMAGE_TEXT: "7",
        //              IMAGE_AUDIO: "8"
export const richText=(child)=>{
    let nid=newId();
    console.log(nid);
    // let content=[];//这里应该改为{xxx,x,x,xx,x}
    // let box=new Box(child);
    // console.log("这是一个桩1");
    // box.name=child.name+nid,
    // box.conName=child.conName,//这个没有
    // box.visible=child.visbile,
    // box.alpha=child.alpha,
    // box.groupType=child.groupType,//这个没有
    // box.isRight=child.isRight,//这个没有
    // box.rectangle=child.rectangle,//不需要遍历吧
    // box.transform=child.transform,//不需要遍历吧
    // box.texture=child.texture,//这个单聊
    // box.children=[];//这个不能有
    
    // ===========================上面处理属性，下面处理富文本==================================

    let str=child.texture.content;
    
    let arr=str.split("\n");//按\n切开富文本
    arr.forEach(function(elem,i,arr){
        if(elem==""){//去数组中空元素
            arr.splice(i,1);
            return ;
        }
        if(elem.indexOf("$$")!=-1){
            let newArr=arr[i].split("$$");
            newArr.forEach(function(elem,i,arr){
                if(elem==""){//去数组中空元素
                    newArr.splice(i,1);
                }
            })
            arr.splice(i,1,...newArr);
        }
       
        // if(elem)
        // if(elem!="<br>"){//将元素按<br>切开
        //     arr[i]=arr[i].replace(/\<br\>$/,"\\n");
        //     let newArr=arr[i].split("$$");
        //     arr.splice(i,1,...newArr);
        //     if(/^\<img/.test(arr[i])){//判断是元素是否为img标签
        //         let imgObj=new RImage();
        //         let imgs=arr[i].split(" ");
        //         for(let prop of imgs){
        //             if(/^src=/.test(prop)){//取src、ext
        //                 imgObj.src=prop.split("=")[1];
        //                 imgObj.ext=imgObj.src.slice(imgObj.src.lastIndexOf(".")+1,-1)
        //             }else if(/^data-resourceId=/.test(prop)){//取resourceId
        //                 imgObj.resourceId=prop.split("=")[1];
        //             }else if (/^data-width=/.test(prop)){//取宽
        //                 imgObj.width=prop.split("=")[1];
        //             }else if (/^data-height=/.test(prop)){//取高
        //                 imgObj.height=prop.split("=")[1].slice(0,-1);
        //             }
        //         }
        //         if(imgObj)resource.add(imgObj);//当前content富文本图片信息为添加到resourceList数组
        //     }
        // }
    })
    arr.forEach(function(elem,i,arr){
        if(/[\u4e00-\u9fa5]+/.test(elem)){
            console.log("我遇到文本啦");
            let texture={};
            texture.content=elem;
            //如果日后富文本中解析出style可以在这里添加style
            //判断是否有br
            let obj=new Text(texture);
        }else if(/\<img/.test(arr[i])){
            console.log("我遇到图片啦");
            
            //         let imgs=arr[i].split(" ");
            //         for(let prop of imgs){
            //             if(/^src=/.test(prop)){//取src、ext
            //                 imgObj.src=prop.split("=")[1];
            //                 imgObj.ext=imgObj.src.slice(imgObj.src.lastIndexOf(".")+1,-1)
            //             }else if(/^data-resourceId=/.test(prop)){//取resourceId
            //                 imgObj.resourceId=prop.split("=")[1];
            //             }else if (/^data-width=/.test(prop)){//取宽
            //                 imgObj.width=prop.split("=")[1];
            //             }else if (/^data-height=/.test(prop)){//取高
            //                 imgObj.height=prop.split("=")[1].slice(0,-1);
            //             }
            //         }

        }else if(/^\s*\<br\>\s*$/.test(elem)){
            console.log("我遇到单独的标签啦");
            let length=child.children.length;
            child.children[length-1].isWrap=parseInt(child.children[length-1].isWrap)+1;
        }else{
            console.log("我遇到公式啦！")
            //吃完饭回来把公式搞定！

        }
        child.children.push(obj)
    })
    console.log("即将输出arr")
    console.log(arr);
    console.log("结束了richText");
    return child;
}