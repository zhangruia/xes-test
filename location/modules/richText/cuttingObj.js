import { admissible } from './admissible'

export const cuttingObj = function (admissible, current, parent) {
    if (admissible.residue == '') return false
    else {
      current.texture.content.text = admissible.accomm
      let newObj = JSON.stringify(current)
      newObj = JSON.parse(newObj)
      newObj['force'] = true
      newObj.texture.content.text = admissible.residue
      parent.children.map((item, ind) => {
        if (parent.children[ind].texture.content.text == admissible.accomm) {
          parent.children.splice(ind + 1, 0, newObj)
        }
      })
    }
}
