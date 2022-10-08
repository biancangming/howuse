import Mock from "mockjs"
import { Success } from ".."
import { mock } from "../request"

mock.onGet("/area/city1").reply(200, Success({
  data: [
    { id: 1, name: "陕南" },
    { id: 2, name: "陕北" },
    { id: 3, name: "关中" },
  ]
}))

const obj = {
  "陕南": [
    { id: 31, name: "汉中" },
    { id: 32, name: "安康" },
    { id: 33, name: "商洛" },
  ],
  "陕北": [
    { id: 21, name: "榆林" },
    { id: 22, name: "延安" },
    { id: 23, name: "商洛" },
  ],
  "关中": [
    { id: 11, name: "西安" },
    { id: 12, name: "宝鸡" },
    { id: 13, name: "咸阳" },
    { id: 14, name: "渭南" },
    { id: 15, name: "杨凌" },
    { id: 16, name: "铜川" },
  ]
}

mock.onGet("/area/city2").reply((req: any) => {
  const { name } = JSON.parse(req.data || "{}")

  if (!name) {
    return Success({
      data: []
    })
  }
  const obj = {
    "陕南": [
      { id: 1, name: "汉中" },
      { id: 2, name: "安康" },
      { id: 3, name: "商洛" },
    ],
    "陕北": [
      { id: 1, name: "榆林" },
      { id: 2, name: "延安" },
      { id: 3, name: "商洛" },
    ],
    "关中": [
      { id: 1, name: "西安" },
      { id: 2, name: "宝鸡" },
      { id: 3, name: "咸阳" },
      { id: 4, name: "渭南" },
      { id: 5, name: "杨凌" },
      { id: 6, name: "铜川" },
    ]
  }

  return [
    200,
    Success({
      data: obj[name]
    })
  ]
})



mock.onGet("/area/city-tree").reply(200, Success({
  data: [
    { id: 1, name: "陕南", children: obj["陕南"] },
    { id: 2, name: "陕北", children: obj["陕北"] },
    { id: 3, name: "关中", children: obj["关中"] },
  ]
}))


