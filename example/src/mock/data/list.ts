import Mock from "mockjs"
import { Success } from ".."
import { mock } from "../request"

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

mock.onGet("/user/list").reply(200, Success(userList))


const userList2 = Mock.mock({
  "data|50": [
    {
      id: "@id()", //得到随机的id
      username: "@cname()", //随机生成中文名字
      date: "@date()", //随机生成日期
      description: "@paragraph()", //描述
      email: "@email()" //email
    }
  ]
})

mock.onGet("/user/list2").reply(200, Success(userList2))