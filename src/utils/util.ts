/**
 * @param  {T} val
 * @param  {} defVal=undefined
 * 为某个字段创建一个默认值，即undefined
 */
export function createDef<T = any>(val: T, defVal: T) {
  return val === undefined || val === defVal ? defVal : val
}