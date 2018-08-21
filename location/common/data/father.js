import basic from '../basic.json'

export class FatherCoordinates {//坐标系
  constructor () {
    this.spaceX= 0//元素之间的间距X轴
    this.spaceY= 0//元素之间的间距y轴 || 连线题题干之间的间距
    this.RspaceY= 0//连线题答案之间的y轴间距
    this.stemX= 0//X轴起始坐标
    this.stemY= 0//Y轴起始坐标
    this.answerx= 0//连线题答案的X轴起始坐标
    this.answerY= 0//连线题答案的y轴起始坐标
    this.modelType= 0//题型，
    this.submitX= 0//按钮的坐标X
    this.submitY= 0//Y
    this.submitW= 0//宽
    this.submitH= 0//高
    this.compute= function (page) {
      this._compute_submit(page)
      this._compute_space(page)
      this._compute_stem(page)
      this._compute_answer(page)
      this._compute_model_type(page)
    }
    //处理按钮的坐标
    this._compute_submit = function (page) {
      for (let i in basic.modelType) {
        // if (basic.modelType[i] == page.modelType) {
          this.submitX = basic[i].submitX;
          this.submitW = basic[i].submitW;
          this.submitH = basic[i].submitH;
          this.submitY = basic[i].submitY;
        // }
      }
    }
  
    this._compute_space = function (page) {
  
    }
  
    this._compute_stem = function (page) {
  
    }
  
    this._compute_answer = function (page) {
  
    }
    //处理modelType(题型)
    this._compute_model_type = function (page) {
      this.modelType = page.modelType;
    }
  }
}