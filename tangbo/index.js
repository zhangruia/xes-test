import {Resource} from './constructor/Resource'
import {getMaxId,getModelType} from './common/common.js'
import { traverseChildren } from './fun/traverseChildren'
require('xes-ligature');
export const  translate=(main,resourceJson)=>{
    getMaxId(resourceJson);
    let promiseArr = [];
    let resource = new Resource(resourceJson);
    let result;
    for(let i in main.pages){
        if(main.pages[i].remark!=undefined)continue;
        main.pages[i].remark = "测试备注"+main.pages[i].id;
        main.pages[i].width = 1920; //
        main.pages[i].height = 1080; //
        let res = traverseChildren(main.pages[i].children,resource,promiseArr);
        main.pages[i].modelType = getModelType(); //
        // main.pages[i].children = res.children;
        result=res;
    }
    result.promiseArr.push(
        new Promise((resolve,reject)=>{
             resolve(main)
        })
    )
    return Promise.all(result.promiseArr).then((data)=>{
        let obj={};
        obj.main=data[promiseArr.length-1];
        obj.resource=data[promiseArr.length-2].resource;
        return obj;
    })
}
