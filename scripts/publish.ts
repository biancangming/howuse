const { execSync } = require("child_process")
const path = require("path")
const consola = require("consola")
const { readFileSync, writeFileSync } = require("fs")

const packageJsonPath = path.resolve(__dirname, "../package.json")
const destReadmePath = path.resolve(__dirname, "../dist/README.md")


const packageJson = JSON.parse(readFileSync(packageJsonPath).toString())
const version = packageJson.version

writeFileSync(destReadmePath, readFileSync(path.resolve(__dirname, "../README.md")).toString())

execSync('npm run build', { stdio: 'inherit' })

let command = 'npm publish --access public'

if (version.includes('beta'))
    command += ' --tag beta'

execSync(command, { stdio: 'inherit', cwd: path.resolve(__dirname, '../dist') })
consola.success("发布成功")