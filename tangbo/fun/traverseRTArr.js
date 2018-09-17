import { inheritStyle,addSpecialStyle} from './changeStyle';
   //  type=0  结束标签
        //  1  开始标签无样式
        //  2  开始标签含样式
        //  3  文本内容
        //  4  img标签 
        //  5  br标签 
        //  6  $$公式$$
export  const traverseRTArr=(tagArr)=>{//处理splitTag.js返回的数组
    let findArr = [];//存需要寻找结束标签的开始标签
    let styleArr = [];//存需要继承的style
    let contentStyle = [];//有文本和样式的最终输出
    tagArr.forEach(function(elem,i,arr){
        let type=elem.type;
        if(type == 1 || type == 2){
          //可添加新的标签
            findArr.push(elem.tag);
            styleArr.push(elem.style);
        }else if(type == 0){
            findArr.pop();
            styleArr.pop();
        }else if(type == 3){
            let obj = {};
            obj.content = elem.content;
            obj.type = elem.type;
            obj.style = inheritStyle(styleArr);
            addSpecialStyle(obj);
            contentStyle.push(obj);
        }else if(type == 4 || type == 5){
            contentStyle.push(elem);
        }else if(type == 6){
            elem.style=inheritStyle(styleArr);
            contentStyle.push(elem);
        }
    })
    return contentStyle;
}