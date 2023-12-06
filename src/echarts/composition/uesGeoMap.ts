import { createDef } from '../../utils/util';
import { cnGeoJsonData, defaultGeoJsonData, GeoJsonMapType, GeoMapOpts } from "./data/jsongeo";

export function useGeoJsonMap(opts?: GeoMapOpts) {
  const { type, code, data, name } = opts || {}

  if (!name) {
    throw Error("地图名称不能为空！！！")
  }

  const _type = createDef(type, "default")
  const _code = createDef(code, "100000") as GeoJsonMapType

  return new Promise((resolve, reject) => {
    import("echarts").then(({ registerMap }) => {
      if (_type === "default") {
        defaultGeoJsonData(_code).then((json) => {
          registerMap(name, json)
          resolve("ok")
        }).catch(reject)
      } else if (_type === "cnGeoJson") {
        cnGeoJsonData(_code).then((json) => {
          registerMap(name, json)
          resolve("ok")
        }).catch(reject)
      } else if (_type === "custom") {
        if (!data) {
          reject("custom模式需要传入data geojson格式文件")
          return
        }
        registerMap(name, data)
        resolve("ok")
      }
    })
  })
}