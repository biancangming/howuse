import Mock from "mockjs"
import { Success } from ".."

Mock.mock("/user/selectList", 'get', (req: any) => {
  const { name } =  JSON.parse(req.body || "{}")
  const data = [
    { id: 1, name: "第一阶段" },
    { id: 2, name: "第二阶段" },
    { id: 3, name: "第三阶段" },
  ]

  return Success({
    data: name ? data.filter(item => item.name.indexOf(name) > -1) : data
  })
})

Mock.mock("/user/chui", 'get', (req: any) => {
  const { name } =  JSON.parse(req.body || "{}")
  const data = [
    { id: 1, name: "铁锤" },
    { id: 2, name: "木锤" },
    { id: 3, name: "瓷锤" },
  ]

  return Success({
    data: name ? data.filter(item => item.name.indexOf(name) > -1) : data
  })
})