

export class FatherCoordinates {//坐标系
  constructor () {
    this.spaceX = 0  //元素之间的间距X轴
    this.spaceY = 0  //元素之间的间距y轴 || 连线题题干之间的间距
    this.stemX = 0  //X轴起始坐标
    this.stemY = 0  //Y轴起始坐标
    this.height = 0  //第一排和第二排答案的间距最高的元素高度
    this.heightB = 0  //第二排最高元素的高度
    this.stemXtwo = 0  //第二排的x轴起始坐标
    this.spaceXtwo = 0  //第二排x轴间距
    this.index = 0  //第几个开始换行
    this.count = 0  //计数，第二个舞台重新计数
    this.RspaceY = 0  //连线题答案之间的y轴间距
    this.answerx = 0  //连线题答案的X轴起始坐标
    this.answerY = 0  //连线题答案的y轴起始坐标
    this.widthMax = 0
    this.StemX = 0
    // this.modelType = 0  //题型，暂时用不到。
    // this.compute= function (page) {
    //   this._compute_submit(page)
    //   this._compute_space(page)
    //   this._compute_stem(page)
    //   this._compute_answer(page)
    //   this._compute_model_type(page)
    //   this._compute_bgImg(page)
    // }
    //处理按钮的坐标
    // this._compute_submit = function (page) {
      
    // }
    // //处理modelType(题型)
    // this._compute_model_type = function (page) {
    //   this.modelType = page.modelType;
    // }
    // //处理背景图片
    // this._compute_bgImg = function (page) {
    // }
  
    // this._compute_space = function (page) {
  
    // }
  
    // this._compute_stem = function (page) {
  
    // }
  
    // this._compute_answer = function (page) {
  
    // }
  }
}