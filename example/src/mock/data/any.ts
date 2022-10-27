
import Mock from "mockjs"
import { mock } from "../request";

mock.onGet("/return/any").reply((req)=>{
  const data = JSON.parse(req.data || "{}")
  return [
    200,
    `您的请求参数：${data}`
  ]
})