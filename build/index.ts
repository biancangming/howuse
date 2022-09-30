import { build } from "vite";
import path from 'path';
import pkg from "../package.json"
import { writeFileSync } from "fs";

const libs = ["axios", "echarts", "crud"]

const _exports = {}

for (const lib of libs) {
  _exports[`./${lib}`] = {
    "import": `./${lib}/${lib}.es.js`,
    "require": `./${lib}/${lib}.cjs.js`,
    "types": `./${lib}/index.d.ts`,
  }
}

(
 async function(){
    await build({ configFile: path.join(__dirname, `./vite/axios.config.ts`) })
    await build({ configFile: path.join(__dirname, `./vite/echarts.config.ts`) })
    await build({ configFile: path.join(__dirname, `./vite/crud.config.ts`) })
  }
)()
// --------------------------------------------------

pkg.exports = _exports
Reflect.deleteProperty(pkg, "scripts")

const destPackageJsonPath = path.resolve(__dirname, "../dist/package.json")


setTimeout(() => {
  writeFileSync(destPackageJsonPath, JSON.stringify(pkg, null, '  '))
}, 1500)