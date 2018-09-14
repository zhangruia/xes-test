import { HandleText } from './handleText'
import { HandleImg } from './handleImg'
import { Common } from './common'
import Global from './global.json'
import basic from '../../common/basic.json'

export const richText = (child, parent) => {
  Global.maxWid = basic.common.warpW; // 初始状态
  for(let i = 0; i < child.length; i += 1){
    let item = child[i], index = i;
    console.log(item.texture.content, index);
    // console.log(child);
    console.log('-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-==-==-=-=-=');
    if (item.conName === 'Text') {
      item['force'] = (item.hasOwnProperty('force') && item.force == true) ? true : false;
      if (item.hasOwnProperty('line')) {
        // console.log(11111111);
        // return;
        // console.log(item.);
      } else if (child[index - 1] && child[index - 1].hasOwnProperty('line')) {
        new HandleText(child[index - 2], item, parent);
      } else {
        new HandleText(child[index - 1], item, parent);
      }
      // console.log('============================');
    } else if (item.conName === 'Sprite') {
      // console.log(item.texture.content);
      if (child[index - 1] && child[index - 1].hasOwnProperty('line')) {
        new HandleImg(child[index - 2], item, parent);
      } else new HandleImg(child[index - 1], item, parent);
      // console.log('============================');
    } else console.log('unexpectedly：' + item.conName);
  }
  /*
    ********
    设置每段富文本的最后一层的垂直居中
   */
  let allPrev   = Global.allPrev,
      prevMax   = Global.maxHei,
      curMaxHei = Math.max.apply(Math, Global.len);
  allPrev.map((item, index) => {
    const hei = item.rectangle[3]
    const flexHei = (curMaxHei - basic.common.fontpadtop - hei) / 2
    item.transform[1] = prevMax + flexHei
  })

  // 设置富文本对象的外层数据
  new Common().setRectangle(parent,Global.globalWid, Global.maxHei + Math.max.apply(Math,Global.len))
  parent.transform[0] = 200
  parent.transform[1] = 0
}
