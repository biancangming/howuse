import  { registerMap } from "echarts"
import { createDef } from '../../utils/util';
import codeJson from "../data/code.json"
// echarts.registerMap("", json)

export type GeoJsonMapType = "default" | "custom" | "datav"
export type AreaCode = string
export interface GeoMapOpts {
  type?: GeoJsonMapType;
  code?: AreaCode;
  name: string; // 注册map名称
  data?: any
}
const defaultGeoBaseUrl = "//echartsgeojson.bianbingdang.com"

// 默认数据路径查找
function defaultGeoJsonData(code: AreaCode) {
  let path = "100000"
  // 查找path 路径
  if (code !== path) {
    if (code.endsWith("0000")) {
      path += `/${code}`
    } else {
      path += `/${code.slice(0, 2).padEnd(6, "0")}/${code}`
    }
  }
  return fetch(`${defaultGeoBaseUrl}/${path}.geoJson`).then(r => r.json())
}

export function useGeoJsonMap(opts?: GeoMapOpts) {
  const { type, code, data, name } = opts || {}

  if (!name) {
    throw Error("地图名称不能为空！！！")
  }

  const _type = createDef(type, "default")
  const _code = createDef(code, "100000") as GeoJsonMapType

  return new Promise((resolve, reject) => {
    if (_type === "default") {
      defaultGeoJsonData(_code).then((json) => {
        registerMap(name, json)
        resolve("ok")
      }).catch(reject)
    }
  })
}