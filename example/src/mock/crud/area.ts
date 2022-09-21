import Mock from "mockjs"
import { Success } from ".."

Mock.mock("/area/city1", 'get', (req: any) => {
  return Success({
    data: [
      { id: 1, name: "陕南" },
      { id: 2, name: "陕北" },
      { id: 3, name: "关中" },
    ]
  })
})

Mock.mock("/area/city2", 'get', (req: any) => {
  const { name } = JSON.parse(req.body || "{}")
  
  if(!name){
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
      { id: 3, name: "渭南" },
      { id: 3, name: "杨凌" },
      { id: 3, name: "铜川" },
    ]
  }

  return Success({
    data: obj[name]
  })
})