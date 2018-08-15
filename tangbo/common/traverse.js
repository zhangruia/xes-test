export const traverse=(data,fun)=>{
    for (let a in data) {
        if (typeof(data[a]) == "object") {
            traverse(data[a]); //递归遍历
        } else {
            console.log(a + ":" + data[a]); //如果是值就显示
            fun();
        }
    }
}
//这是一个废弃的文件.....