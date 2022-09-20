import Mock from "mockjs"
import { Success } from ".."

const userList = Mock.mock({
  "data|10": [
    {
      id: "@id()", //得到随机的id
      username: "@cname()", //随机生成中文名字
      date: "@date()", //随机生成日期
      description: "@paragraph()", //描述
      email: "@email()" //email
    }
  ]
})

Mock.mock("/user/list", 'get', (req: any) => {
  return Success(userList)
})