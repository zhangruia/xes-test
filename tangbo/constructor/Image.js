export class rImage{//图片类//公式转图片?，sourceJson的类型
    constructor(config){
        this.id=config.id;
        this.ext=config.ext||"svg";
        this.name=config.name||"richTextSplit";
        this.host=config.host;
        this.src=config.src||config.data;
        this.height=config.height;
        this.width=config.width;
    }
}

export class mImage{
    constructor(texture){
        this.conName='Sprite';
        this.texture=texture;
        this.isWrap=0;
        this.rectangle=[];
        this.transform=[];
        // this.rectangle=[0,0,0,0];
        // this.transform=[0,0,0,0,0,0,0,0,0];
    }
}