export class Resource{
    constructor(config){
        this.resource=config;
    }
    add(item){
        //向list数组中添加指定格式的对象
        this.resource.list.push(item)
    }
    delete(id){
        //删除list数组中指定id的对象
    }
    get(id){
        //获取List数组中指定id的对象
    }
    update(id){
        //修改list数组中指定id的对象
    }
}
