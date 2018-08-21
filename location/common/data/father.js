import basic from '../basic.json'

export class Coordinates {//坐标系
  constructor () {
    this.spaceX= 0
    this.spaceY= 0
    this.RspaceY= 0
    this.stemX= 0
    this.stemY= 0
    this.answerx= 0
    this.answerY= 0
    this.modelType= 0
    this.submitX= 0
    this.submitY= 0
    this.submitW= 0
    this.submitH= 0
    this.compute= function (page) {
      this._compute_space(page)
      this._compute_stem(page)
      this._compute_answer(page)
      this._compute_model_type(page)
      this._compute_submit(page)
    }
    this._compute_submit = function (page) {
      for (let i in basic.modelType) {
        if (basic.modelType[i] == page.modelType) {
          this.submitX = basic[i].submitX;
          this.submitW = basic[i].submitW;
          this.submitH = basic[i].submitH;
          this.submitY = basic[i].submitY;
        }
      }
    }
  
    this._compute_space = function (page) {
  
    }
  
    this._compute_stem = function (page) {
  
    }
  
    this._compute_answer = function (page) {
  
    }
  
    this._compute_model_type = function (page) {
  
    }
  
  }

}