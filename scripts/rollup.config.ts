import type { RollupOptions } from 'rollup'
import { createConfig, paths } from './exportsJson'

const configs: RollupOptions[] = []

configs.push(...createConfig())
for (const path of paths) {
    configs.push(...createConfig(path))
}


export default configs