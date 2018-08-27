import { admissible } from './admissible'
import { isWarp } from './isWarp'

let forceWarp = false

export const cuttingObj = function (iswarp, prev, current, parent) {
  let ledal = admissible(iswarp, prev, current, parent)
  // console.log(ledal);
  if (ledal.residue == '') {
    forceWarp = false
    return false
  }
  else {
    forceWarp = true
    current.texture.content.text = ledal.accomm
    let newObj = JSON.stringify(current)
    newObj = JSON.parse(newObj)
    newObj.texture.content.text = ledal.residue
    if (Object.prototype.toString.call(parent) == '[object Object]') return false
    parent.children.map((item, ind) => {
      if (parent.children[ind].texture.content.text == ledal.accomm) {
        parent.children.splice(ind + 1, 0, newObj)
        isWarp(forceWarp, current, newObj, parent)
      }
    })
  }
}
