import {Resource} from './constructor/Resource'
import {newId,toJSON} from './common/common.js'
import { traverseChildren } from './fun/traverseChildren'
require('xes-ligature');

export const  translate=(main,source)=>{
    console.log("=============================index.js导出成功=================================")
    let resource=new Resource(source);
    console.log("=======================这是原始的main==========================")
    console.log(main);
    main.pages[0].children=traverseChildren(main.pages[0].children);
    // console.log(main)
    // main=toJSON(main,{});
    // resource=toJSON(resource,{});
    resource=resource.resource; 
    return {main,resource};
}