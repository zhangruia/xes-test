import { isWarp } from './isWarp'
import global from './global.json'

let max = 0

function richText (modelType, prev, child, parent) {
  for(let i = 0; i < child.length; i += 1){
    let item = child[i], index = i;
    if (item.conName === 'Text') {
      isWarp('text', child[index - 1], item, parent)
    } else if (item.conName === 'Sprite') {
      isWarp('img', child[index - 1], item, parent)
    } else console.log('unexpectedly：' + item.conName);
  }
}


export {
  richText
}
