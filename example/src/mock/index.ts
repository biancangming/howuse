import "./crud/list"
import "./crud/select"
import "./crud/area"


export function Success(data: any) {
  return {
    code: 0,
    msg: "成功",
    ...data
  }
}

export function Fail(data: any) {
  return {
    code: 0,
    msg: "失败",
    ...data
  }
}