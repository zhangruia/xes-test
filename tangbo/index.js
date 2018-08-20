import {Resource} from './constructor/Resource'
import {newId,toJSON} from './common/common.js'
import { traverseChildren } from './fun/traverseChildren'
import { resource } from './common/common'
require('xes-ligature');
// console.log("=======================resource引入=============================")
// console.log(resource);
export const  translate=(main,resource)=>{
    // console.log("=============================index.js导出成功=================================")
    // let resource=new Resource(source);
    // console.log("=======================这是原始的main==========================")
    // console.log(source)
    // // console.log(main);
    // for(let i in main.pages){
    //     main.pages[i].remark="测试备注"+main.pages[i].id;
    //     main.pages[i].mo
        // delType="还不知道是多少哟";
    //     main.pages[i].children=traverseChildren(main.pages[i].children);
    // }
    // resource=resource.resource; 
    return {main,resource};
}
