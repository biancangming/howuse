import { build } from "vite";
import path from 'path';
import pkg from "../package.json"
import { writeFileSync } from "fs";

const libs = ["axios", "echarts"]

const _exports = {}

for (const lib of libs) {
  _exports[`./${lib}`] = {
    "import": `./${lib}.es.js`,
    "require": `./${lib}.cjs.js`,
    "types": `./${lib}.d.ts`,
  }
  build({ configFile: path.join(__dirname, `./vite/${lib}.config.ts`) })
}

pkg.exports = _exports
Reflect.deleteProperty(pkg, "scripts")

const destPackageJsonPath = path.resolve(__dirname, "../dist/package.json")


setTimeout(() => {
  writeFileSync(destPackageJsonPath, JSON.stringify(pkg, null, '  '))
}, 1500)