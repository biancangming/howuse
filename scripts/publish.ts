import { execSync } from 'child_process'
import pkg from "../package.json"
// 更新版本直接提交到github
execSync('git add package.json', { stdio: 'inherit' })
execSync(`git commit -m "update version ${pkg.version}"`, { stdio: 'inherit' })
execSync(`git push origin dev`)