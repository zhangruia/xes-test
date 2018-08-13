const { handleImg } = require('../modules/handleImg')
const { handleChart } = require('../modules/handleChart')

module.exports = {
  juade
}

function juade (json) {
  const content = json.texture.content[0]
  if (typeof(content) == 'string') handleChart()
  else if (typeof(content) == 'number') handleImg()
  else console.log('what')
}
