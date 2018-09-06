import { richText } from './richText'

export const getData = function (pages) {
  const page = pages.pages[0].children
  page.map((value, ind) => {
    if (value.conName === 'Container') {
      const child = value.children
      richText(child, value)
      console.log(value);
    }
  })
}
