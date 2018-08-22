export function Text (children) {
  let text = (children.texture.content.text).split('');
  let size = children.texture.content.style.fontSize;
  let length = text.length * size;
  let textX = (children.rectangle[2] - length) / 2;
  // children.rectangle = [0, 0, 0, 40];
  // children.transform[0] = textX;
  // children.transform[1] = 150;
}
