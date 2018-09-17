let maxId;
let modelType;
export const getMaxId = (data) => {//获取最大各种id
    // let idObj = {};
    let max=0;
    const traverse = (data) => {
        for (let a in data) {
            if (typeof (data[a]) == "object") {
                traverse(data[a]);
            } else {
                if (a == "id" || a.indexOf("Id") != -1) {
                    max = data[a] > max ? data[a] : max;
                    maxId = max;
                    // idObj[a] = (idObj[a] == undefined ? 0 : idObj[a]) < data[a] ? data[a] : idObj[a];
                }
            }
        }
    }
    traverse(data);
    // maxId=idObj.id;
}

export const newId = () => {//获取新的resource Max id
    return ++maxId;
}

export const getConName = (child) => {//获取conName
    let name = child.name ;
    let type = child.texture.type ;
    if (name.indexOf("test_option") != -1) {
        modelType = 1;
        return "Choice";
    } else if (name.indexOf("test_blank") != -1) {
        modelType = 2;
        return "FillVacanvy";
    } else {
        if (type == "0") {
            return "Text";
        } else if (type == "1") {
            return "Sprite";
        } else {//"可以添加type值，目前只有text和sprite，以及选择填空两种题型
        console.log("没有获取到type")
        return "";
        }
    }
}

export const getModelType=()=>{//获取modelType
    return modelType;
}

export const toText=(str)=>{//富文本Unicode转中文
    return str.replace(/[\u4e00-\u9fa5]/g,function(key){
        return unescape(key.replace(/\\u/g, "%u"))
    })
}

export const toJSON = (p, z) => {//对象转JSON
    let c = z || {};
    for (let i in p) {
        if (!p.hasOwnProperty(i)) {
            continue;
        }
        if (typeof p[i] === 'object') {
            if (p[i].constructor === Array) {
                c['"' + i + '"'] = [];
                toJSON(p[i], c['"' + i + '"'])
            } else {
                c[i] = {};
                toJSON(p[i], c[i]);
            }
        } else {
            if (c.constructor === Array) {
                c[i] = p[i];
            } else {
                c['"' + i + '"'] = p[i]
            }
        }
    }
    return c;
}