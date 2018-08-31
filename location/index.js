import { GetData } from './common/getData'
// console.log('daochuchenggong erdocid');
const ergodic = (mainJson) => {
  const json = mainJson.pages[0]
  let data = new GetData(
    json.children,
    json
  )
}

export {
  ergodic
}
