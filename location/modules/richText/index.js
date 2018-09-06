import { isWrap } from './isWrap'

let max = 0

function rich (child, parent) {
  for(let i = 0; i < child.length; i += 1){
    let item = child[i], index = i;
    if (item.conName === 'Text') {
      isWrap('text', child[index - 1], item, parent)
    } else if (item.conName === 'Sprite') {
      isWrap('img', child[index - 1], item, parent)
    } else console.log('unexpectedly：' + item.conName);
  }
}


export {
  rich
}
