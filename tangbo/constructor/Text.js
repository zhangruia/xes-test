export class Text{//文本类
    constructor(texture){
        this.conName='Text';
        this.texture=texture;
        this.isWrap=0;
        // this.rectangle=[];
        // this.transform=[];
        this.rectangle=[0,0,150,150];
        this.transform=[300, 660, 1, 1, 0, 0, 0, 0, 0];
        // this.type=3;
    }
}