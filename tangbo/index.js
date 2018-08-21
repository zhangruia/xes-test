import {Resource} from './constructor/Resource'
import {newId,toJSON} from './common/common.js'
import { traverseChildren } from './fun/traverseChildren'
// import { resource } from './common/common'
require('xes-ligature');
export const  translate=(main,resourceJson)=>{
    // console.log("=============================index.js导出成功=================================")
    let resource=new Resource(resourceJson);
    // console.log(resource);
    for(let i in main.pages){//如果有两个舞台却只有一个返回值.....如果看到思考一下....
        main.pages[i].remark="测试备注"+main.pages[i].id;
        main.pages[i].modelType=4; //瞎写的哟
        let result=traverseChildren(main.pages[i].children,resource);
        main.pages[i].children=result.children;
        resource=result.resource;
    }
    // console.log(main)
    resource=resource.resource; 
    // console.log(resource)
    return {main,resource};
}
       