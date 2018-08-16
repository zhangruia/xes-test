import mainJson from "../../static/main";
// import resourceJson from "../../static/resource1";

export const getMaxId=(data)=>{//获取最大各种id
    let idObj={};
    let traverse=(data)=>{
        for (let a in data) {
            if (typeof(data[a]) == "object") {
                traverse(data[a]); 
            } else {
                if(a=="id" || a.indexOf("Id")!=-1){
                    idObj[a] = (idObj[a] == undefined ? 0 : idObj[a] ) < data[a] ? data[a] : idObj[a];
                }
            }   
        }
    }
    traverse(data);
    return idObj;
}

// console.log(maxId);
let maxId=getMaxId(mainJson);
export const newId=()=>{
    return ++maxId.id;
}
export const getConName=(child)=>{
    let name = child.name;
    let type =  child.texture.type;
    if(name.indexOf("test_option")!=-1){
        return "Choice";
    }else if (name.indexOf("test_blank")!=-1){
        return "FillVacanvy";
    }else{
        if(type=="0"){
            return "Text";
        }else if(type=="1"){
            return "Sprite"
        }else{//"可以添加type值，目前只有text和sprite，以及选择填空两种题型
            console.log("没有获取到type")
            return ;
        }
    }
}



export const toJSON=(p,z)=>{//对象转JSON
    let  c = z || {};
    for (let i in p) {
        if(! p.hasOwnProperty(i)){
            continue;
        }
        if (typeof p[i] === 'object') {
            if(p[i].constructor===Array){
              c['"' + i + '"']=[];
              toJSON(p[i], c['"'+i+'"'])
            }else{  
              c[i]={};
              toJSON(p[i], c[i]);
            }
        } else {
            if(c.constructor===Array){
                c[i]=p[i];
              }else{
                c['"' + i + '"']=p[i]
              }
        }
    }
    return c;
}