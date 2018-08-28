import { GetData } from './common/getData'

const ergodic = (mainJson) => {
  const json = mainJson.pages[0]
  let data = new GetData(
    json.modelType,
    null,
    json.children,
    json
  )
  // console.log(data);
  return data
}

export {
  ergodic
}
