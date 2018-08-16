export class Coordinates {
    constructor (mainJson) {
        //让填空题和选择题的答案的水平居中
        var children = mainJson.pages[0].children;
        var index = 0;
        var width = 0;
        var begin = 400;
        var imgWidth = 0;
        for (var i = 0; i < children.length; i++) {
            if (children[i].groupType == 'choice' || children[i].groupType == 'blank') {
                imgWidth = children[i].rectangle[2]
                index = index + 1;
                width = width + imgWidth;
            }
        }
        var spacex = (children[0].rectangle[2] - width - begin * 2) / (index - 1) + imgWidth;
        //选择题数据
        this.coordinate1 = {
            spaceX: spacex,
            spaceY: 0,
            stemX:begin,
            stemY:600,
            answerX:0,
            answerY:0,
            modelType: 1
        }
            //填空题数据
        this.coordinate2 = {
            spaceX: 300,
            spaceY: 0,
            stemX:400,
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
