export class rImage{//图片类//公式转图片?，sourceJson的类型
    constructor(config){
        this.id = config.id;
        this.ext = config.ext||"svg";
        this.name = config.name||"richTextSplit";
        this.host = config.host;
        this.src = config.src
        // this.height=config.height?config.height:0;
        // this.width=config.width?config.width:0;
    }
}

export class mImage{
    constructor(config){
        this.conName = 'Sprite';
        this.texture = config.texture;
        this.isWrap = config.isWarp || 0;
        this.rectangle = [0,0,config.width ? config.width : 100,config.height ? config.height : 100];
        this.transform = [300, 660, 1, 1, 0, 0, 0, 0, 0];
    }
}