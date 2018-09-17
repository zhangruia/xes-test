let http = require('http');

export const getSvg = (rid,elem,resource,rectangle,rImage,fontSize = 16) => {//封装公式请求//返回promise
    return new Promise(function(resolve,reject){
        let options={
            hostname:"10.99.2.189",
            port:4000,
            path:"/mathhandle/jax?mathstr="+elem,
        }
        let req=http.request(options,function(res){
            res.on('data',function(data){
                data = JSON.parse(data.toString());
                let config = {};
                let src = data.data;
                let host = src.slice(0,src.indexOf('/img'));
                let name = src.slice(src.lastIndexOf('/') + 1,src.lastIndexOf('.'));
                let ext = src.slice(src.lastIndexOf('.') + 1);
                src = '.'+src.slice(src.indexOf('/img'));
                let fobj = data;
                fobj.id = rid;
                fobj.src = src;
                fobj.host = host;
                fobj.ext = ext;
                fobj.name = name;
                config.height = data.height;
                config.width = data.width;
                resource.add(new rImage(fobj));
                if(rectangle){
                    rectangle[2] = parseInt(data.width) * (9 / 16 * parseInt(fontSize));
                    rectangle[3] = parseInt(data.height) * (9 / 16 * parseInt(fontSize));
                }
                resolve(resource);
                
            });
        });
        
        req.on("error",function(err){
            console.log(222)
            console.log(err.message);
        });
        req.end();
    })
}


export const getImage = (imgObj,rectangle,resource) => {
    return new Promise(function(resolve){
        let host = imgObj.host ,src = imgObj.src;
        let path = host + src.slice(1);
        let img = new Image();
        img.onload = function(){ 
             rectangle[2] = parseInt(img.width);
            rectangle[3] = parseInt(img.height);
            resolve(resource)
        }
        img.src = path;
    })
}