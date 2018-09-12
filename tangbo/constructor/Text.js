export class Text{//文本类
    constructor(texture){
        this.conName = 'Text';
        this.texture = texture;
        this.isWrap =  0;
        this.rectangle = [0,0,0,0];
        this.transform = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
}
