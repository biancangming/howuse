const defaultGeoBaseUrl = "//echartsgeojson.bianbingdang.com"
const cnGeoJson = "//geojson.cn/api/data"

export type GeoJsonMapType = "default" | "custom" | "datav" | "cnGeoJson"
export type AreaCode = string
export interface GeoMapOpts {
  type?: GeoJsonMapType;
  code?: AreaCode;
  name: string; // 注册map名称
  data?: any
}


// 默认数据路径查找
export function defaultGeoJsonData(code: AreaCode) {
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

// https://geojson.cn/ 网站数据接入
export function cnGeoJsonData(code: AreaCode) {
  let path = ""
  // 查找path 路径
  if (code !== path && code !== "100000") {
    if (code.endsWith("0000")) {
      path += `/${code}`
    } else {
      path += `/${code.slice(0, 2).padEnd(6, "0")}/${code}`
    }
  } else {
    path = "china"
  }
  return fetch(`${cnGeoJson}${path}.json`).then(r => r.json())
}