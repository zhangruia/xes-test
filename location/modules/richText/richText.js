import { handleChart } from '../handleChart/handleChart'

function richText (modelType, prev, richtext, parent) {
  const child = richtext.children;
  child.map((item, index) => {
    if (item.conName === 'Text') {
      if (index === 0) {
        // handleChart(modelType, null, item, parent)
      } else {
        // handleChart(modelType, child[index - 1], item, parent)
        if (index == child.length - 1) richtext.rectangle[2] = item.transform[0] + item.rectangle[2]
      }
      // console.log(item.transform);
    } else if (item.conName === 'Sprite') {
      if (index === 0) {
        // handleImg(modelType, null, item, parent)
      } else {
        // handleImg(modelType, child[index - 1], item, parent)
        if (index == child.length - 1) richtext.rectangle[2] = item.transform[0] + item.rectangle[2]
      }
      // console.log(item.transform);
    } else console.log('residue' + item.conName);
  })

  return richtext

}


export {
  richText
}
