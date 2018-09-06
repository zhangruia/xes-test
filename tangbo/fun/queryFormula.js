
import $ from './jquery-1.11.3';
export const getSvg=(rid,elem,resource,rectangle,rImage,fontSize=16)=>{//封装公式请求//返回promise
    console.log(fontSize)
    return new Promise(function(resolve,reject){
        $.ajax({
            url: "http://10.99.2.153:4000/mathhandle/jax",
            type: "get",
            data:{
                "mathstr" : elem
            },
            // async:false,
            dataType:"json",
            success: function (data) {
                let config={};
                let src=data.data;
                let host=src.slice(0,src.indexOf('/img'));
                let name=src.slice(src.lastIndexOf('/')+1,src.lastIndexOf('.'));
                let ext=src.slice(src.lastIndexOf('.')+1);
                src='.'+src.slice(src.indexOf('/img'));
                let fobj=data;
                fobj.id=rid;
                fobj.src=src;
                fobj.host=host;
                fobj.ext=ext;
                fobj.name=name;
                config.height=data.height;
                config.width=data.width;
                resource.add(new rImage(fobj));
                if(rectangle){
                    rectangle[2]=parseInt(data.width)*(9/16*parseInt(fontSize));
                    rectangle[3]=parseInt(data.height)*(9/16*parseInt(fontSize));
                }
                resolve(resource);
            }, 
            error: function (err) {
                reject(err)
            }
        })
    })


























    // $.ajax({
    //     url: "http://10.99.2.153:4000/mathhandle/jax",
    //     type: "get",
    //     data:{
    //         "mathstr" : elem
    //     },
    //     dataType:"json",
    //     success: function (data) {
    //         let src=data.data;
    //         let host=src.slice(0,src.indexOf('/img'));
    //         let name=src.slice(src.lastIndexOf('/')+1,src.lastIndexOf('.'));
    //         let ext=src.slice(src.lastIndexOf('.')+1);
    //         src='.'+src.slice(src.indexOf('/img'));
    //         let fobj=data;
    //         fobj.id=rid;
    //         fobj.src=src;
    //         fobj.host=host;
    //         fobj.ext=ext;
    //         fobj.name=name;
    //         resource.add(new rImage(fobj));
    //     }, error: function (err) {
    //         console.log(err)
    //     }
    // })
}
