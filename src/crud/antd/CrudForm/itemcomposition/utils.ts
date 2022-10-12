import { firstToLower, isArray, isObject } from 'howtools';
// 从对象往下取三层，直到取到数组，否则为空数组
export function findArrayFromObj(obj: any, key: string) {
  if (isArray(obj)) return obj

  const getObj = (obj) => {
    if (isObject(obj)) return obj
    return {}
  }

  const _data = getObj(obj)[key]
  if(!_data) return []
  if (isArray(_data)) return _data

  const _data2 = getObj(_data)[key]
  if(!_data2) return []
  if (isArray(_data2)) {
    return _data2
  }else {
    return []
  }
}

// 从对象中分离事件和属性
export function parserOn(obj){
  const listeners = {}
  const attrs = {}
  for(const [key,val] of Object.entries(obj)){
    if(/^on/.test(key)){
      listeners[firstToLower(key.slice(2))] = val

      console.log(listeners)
    }else{
      attrs[key] = val
    }
  }
  return {
    listeners,
    attrs
  }
}