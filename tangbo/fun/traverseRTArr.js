import {inheritStyle} from './styleChange';
export  const traverseRTArr=(tagArr)=>{//处理splitTag.js返回的数组
    let findArr = [];//存需要寻找结束标签的开始标签
    let styleArr = [];//存需要继承的style
    let contentStyle = [];//有文本和样式的最终输出
    tagArr.forEach(function(elem,i,arr){
        let type=elem.type
        if(type == 1){
            findArr.push(elem.tag);
            styleArr.push({})
        }else if(type == 2){
            findArr.push(elem.tag);
            styleArr.push(elem.style);
        }else if(type == 0){
            if(contentStyle){//判断特殊标签
                if(elem.tag == "</sup"){
                    contentStyle[contentStyle.length-1].specialStyle = "sup";
                }else if(elem.tag == "</sub"){ 
                    contentStyle[contentStyle.length-1].specialStyle = "sub";
                }
            }
            if(findArr)findArr.pop();
            if(styleArr)styleArr.pop();
        }else if(type == 3){
            //暂不区分文本和公式
            let obj = {};
            obj.content = elem.content;
            obj.type = elem.type;
            obj.style = inheritStyle(styleArr);
            contentStyle.push(obj);
        }else if(type == 4){
            contentStyle.push(elem);
        }else if(type == 5){

        }
    })
    console.log(contentStyle)
    return contentStyle;
}