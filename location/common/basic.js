/******
    ** pageW  -> 舞台大小
    ** bgX -> 背景图X轴
    ** x   -> 下标为1的对象距离舞台的x轴
    ** spaceX  -> 左右布局中间的间距
    ** spaceY  -> 上下布局中间的间隔
    ** contentX   -> 容器坐标
    ** modelType  -> 1选择  2填空  3分类  4连线
    ** submitX    -> 提交按钮的位置
*/

class Coordinate {
  constructor () {
    this.gap = {
      pageW: 1000,
      pageH: 200,
      bgX: 0,
      bgY: 10,
      x: 10,
      y: 10,
      spaceX: 100,
      spaceY: 10,
      contentX: 0,
      contentY: 0,
      modelType: 2,
      submitX: 0,
      submitY: 100
    }
    this.classify = {
      pageW: 1000,
      pageH: 200,
      bgX: 0,
      bgY: 10,
      x: 10,
      y: 10,
      spaceX: 100,
      spaceY: 10,
      contentX: 0,
      contentY: 0,
      modelType: 3,
      submitX: 0,
      submitY: 100
    }
    this.ligature = {
      pageW: 1000,
      pageH: 200,
      bgX: 0,
      bgY: 10,
      x: 10,
      y: 10,
      spaceX: 100,
      spaceY: 10,
      contentX: 0,
      contentY: 0,
      modelType: 4,
      submitX: 0,
      submitY: 100
    }
    this.choice = {
      pageW: 1000,
      pageH: 200,
      bgX: 0,
      bgY: 10,
      x: 10,
      y: 10,
      spaceX: 100,
      spaceY: 10,
      contentX: 0,
      contentY: 0,
      modelType: 1,
      submitX: 0,
      submitY: 100
    }
  }
}

export {
  Coordinate
}
