exports.handleImg = handleImg
var imgJson = require('../../static/resource')
function handleImg (json) {
  // console.log(json.texture.content[0]);
  // console.log(imgJson.list);
  var img = '';
  for (var i = 0; i < imgJson.list.length; i++) {
    if (imgJson.list[i].id == json.texture.content[0]) {
      img = imgJson.list[i]
      break;
    }
  }
  console.log(img)
  return img
}
