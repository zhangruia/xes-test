import { GetData } from './common/getData'
// console.log('daochuchenggong erdocid');
const ergodic = (mainJson) => {
  // console.log('进入ergodic');
  const json = mainJson.pages[0]
  let data = new GetData(
    json.modelType,
    null,
    json.children,
    json
  )
}

export {
  ergodic
}
