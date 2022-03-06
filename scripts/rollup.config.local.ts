// 本地测试打包

import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import type { RollupOptions } from 'rollup'
import { createConfig, createExport, paths } from './exportsJson'

const configs: RollupOptions[] = []




for (const path of paths) {
    configs.push(...createConfig(path, "example/node_modules/howves"))
}


// 读取导出文件
const packageJsonPath = path.resolve(__dirname, "../package.json")
const packageJson = JSON.parse(readFileSync(packageJsonPath).toString())
const releasePkg = { ...packageJson }
const exportsJ = {}
for (const path of paths) Object.assign(exportsJ, createExport(path))
releasePkg.exports = exportsJ
releasePkg.scripts = {}
writeFileSync("example/node_modules/howves/package.json", JSON.stringify(releasePkg, null, '  ')); //更新发布的package.json

export default configs