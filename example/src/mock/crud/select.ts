import Mock from "mockjs"
import { Success } from ".."

Mock.mock("/user/selectList", 'get', (req: any) => {
  return Success({
    data: [
      { id: 1, name: "第一阶段" },
      { id: 2, name: "第二阶段" },
      { id: 3, name: "第三阶段" },
    ]
  })
})