const BETA = 'beta'
const pkg = require("../package.json")

const input = process.argv
const isBate = pkg.version.indexOf("-beta") > -1

if (!isBate && input[2] === BETA) {
  throw new Error("版本更新不正确，当前是正式版本，无法发布到beta环境")
}