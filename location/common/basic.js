/******
    ** pageW  -> 舞台大小
    ** bgX -> 背景图X轴
    ** x   -> 下标为1的对象距离舞台的x轴
    ** spaceX  -> 左右布局中间的间距
    ** spaceY  -> 上下布局中间的间隔
    ** contentX   -> 容器坐标
    ** modelType  -> 1选择  2填空  3分类  4连线
    ** submitX    -> 提交按钮的位置
    ** tabX       -> padding距离
*/

class Coordinate {
  constructor (modelType) {
    if (modelType === 2) {
      let gap = {
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
        submitX: 0,
        submitY: 100,
        tabX: 30,
        tabY: 30
      }
      return gap
    } else if (modelType === 1) {
      let classify = {
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
        submitX: 0,
        submitY: 100,
        tabX: 30,
        tabY: 30
      }
      return classify
    } else if (modelType === 4) {
      let ligature = {
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
        submitX: 0,
        submitY: 100,
        tabX: 30,
        tabY: 30
      }
      return ligature
    } else if (modelType === 3) {
      let choice = {
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
        submitX: 0,
        submitY: 100,
        tabX: 30,
        tabY: 30
      }
      return choice
    }
  }
}

export {
  Coordinate
}
