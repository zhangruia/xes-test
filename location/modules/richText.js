function richText (prev, richtext) {
  for (let i in richtext.children) {
    let child = richtext.children
    if (prev) {
      const [prevX, prevY] = prev.transform
      if (i == 0) {
        child[i].transform[0] = 0
        child[i].transform[1] = prevY+20
        // console.log(child[i].transform);
      } else {
        // console.log(i);
      }
      // console.log(richtext.children[i]);
      // console.log(prev.transform);
    } else {
      richtext.children[0].transform[0] = 0
    }
  }
}

export {
  richText
}
