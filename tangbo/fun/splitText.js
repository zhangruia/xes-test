
export function splitText(str){//切割字符串
    let nReg = /\n|\r/g;
    str = str.replace(nReg,"");
    
    let indexArr = [];
    let tagReg = /<br|<img|\$\$/g;
    for(let i = 0,length = str.length;i<length;i++){//exec查找出所有的切割点的下标
        let aa =  tagReg.exec(str);
        if(aa == null)break;
        indexArr.push(aa);
        if(aa[0] == "<img"||aa[0] == "<br"){
            let bb = [];
            bb[0] = ">";
            bb['index'] = str.indexOf(">",aa.index);
            indexArr.push(bb);
        }
    }
    if(indexArr[0]["index"] != 0){//确保从0开始slice
        let ee = [];
        ee["index"] = 0;
        indexArr.unshift(ee); 
    }
    let i = 0 , result = [];
    do{
        let length = indexArr.length;
        if(indexArr[i][0] == "$$"){
            indexArr[i]["index"]=indexArr[i]["index"]+2;
        }
        if(indexArr[i][0] == ">"){
            indexArr[i]["index"] = indexArr[i]["index"]+1;
        }
        let cc = str.slice(indexArr[i]["index"],indexArr[i+1]["index"]);
        if(!/^\s*$/.test(cc)){
            result.push(cc);
        }
        // indexArr[i+1][0]==">"?i+=2:i++;
        i++;
        if (i == length-1)break;
    }while(1)
    return result;
}