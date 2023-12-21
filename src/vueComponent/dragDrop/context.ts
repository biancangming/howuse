// 用户拖拽之间拖拽的与目标对象之间数据传递
const __EL__DATA = { el: undefined }
export function useTransferContext() {
  let data = new Proxy(__EL__DATA, {
    get(obj, prop) {
      const target = obj[prop]
      Reflect.deleteProperty(obj, prop)
      return target
    }
  })

  function setData(_data = {}) {
    Object.assign(data, _data)
  }

  function getData(key: string) {
    return data[key]
  }

  function getDatas() {
    const d = {}
    for (const key in data) {
      d[key] = data[key]
    }
    return d
  }

  return {
    setData,
    getData,
    getDatas
  }
}