import Mock from "mockjs"
import { Success } from ".."

Mock.mock("/area/city", 'get', (req: any) => {
  return Success({
    data: [
      { id: 1, name: "陕南" },
      { id: 2, name: "陕北" },
      { id: 3, name: "关中" },
    ]
  })
})

Mock.mock("/area/city", 'get', (req: any) => {
  return Success({
    data: [
      { id: 1, name: "陕南" },
      { id: 2, name: "陕北" },
      { id: 3, name: "关中" },
    ]
  })
})