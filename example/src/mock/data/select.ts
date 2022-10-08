import { Success } from ".."
import { mock } from '../request';

mock.onGet("/user/selectList", { id: 1 }).reply((req: any) => {
  const { name } = JSON.parse(req.data || "{}")
  const data = [
    { id: 1, name: "第一阶段" },
    { id: 2, name: "第二阶段" },
    { id: 3, name: "第三阶段" },
  ]

  return [
    200,
    Success({
      data: name ? data.filter(item => item.name.indexOf(name) > -1) : data
    })
  ]
})

mock.onGet("/user/chui").reply((req: any) => {
  const { name } = JSON.parse(req.body || "{}")
  const data = [
    { id: 1, name: "铁锤" },
    { id: 2, name: "木锤" },
    { id: 3, name: "瓷锤" },
  ]

  return [
    200,
    Success({
      data: name ? data.filter(item => item.name.indexOf(name) > -1) : data
    })
  ]
})