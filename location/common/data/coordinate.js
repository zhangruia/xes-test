export class Coordinates {
    constructor () {
        //选择题数据
        this.coordinate1 = {
            spaceX: 500,
            spaceY: 0,
            stemX:300,
            stemY:600,
            answerX:0,
            answerY:0,
            modelType: 1
        }
            //填空题数据
        this.coordinate2 = {
            spaceX: 400,
            spaceY: 0,
            stemX:300,
            stemY:700,
            answerX:0,
            answerY:0,
            modelType: 2
        }
            //分类题
        this.coordinate3 = {
            spaceX: 400,
            spaceY: 0,
            stemX:300,
            stemY:650,
            answerX:0,
            answerY:0,
            modelType: 3
        }
            //连线题数据
        this.coordinate4 = {
            spaceX: 0,//x轴图片间距
            spaceY: 200,//y轴图片间距
            stemX:360,//x容器坐标
            stemY:130,//y容器坐标
            answerX:1300,
            answerY:130,
            modelType: 4
        }
    }
}
