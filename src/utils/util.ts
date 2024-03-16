import { isDefined } from "@vueuse/core"

/**
 * @param  {T} val
 * @param  {} defVal=undefined
 * 为某个字段创建一个默认值，即undefined
 */
export function createDef<T = any>(val: T, defVal: Exclude<Partial<T>, undefined>) {
  return val === undefined || val === defVal ? defVal : val
}

// 创建一个iframe
export function createIframe(url: string, hidden = true) {
  const iframe = document.createElement("iframe")
  iframe.src = url
  document.body.appendChild(iframe)
  if (hidden) iframe.style.display = "none"
  return iframe
}