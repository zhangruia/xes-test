export function Text (children) {
  let text = (children.texture.content.text).split('');
  let size = children.texture.content.style.fontSize? children.texture.content.style.fontSize: 40;
  let length = text.length * size;
  let textX = (1920 - length) / 2;
  // children.rectangle = [0, 0, 0, 40]; 
  children.transform[0] = parseInt(textX);
  children.transform[1] = 150;
}
