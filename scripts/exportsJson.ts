import { RollupOptions } from "rollup"
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'

const esbuildPlugin = esbuild()

const dtsPlugin = [
    dts(),
]

export const paths = ["axios", "core", "echarts"]

// 创建导出文件
export function createConfig(path?: string, outPath = "dist"): RollupOptions[] {
    const input = path ? `src/${path}/index.ts` : "src/index.ts"
    return [
        {
            input,
            output: [
                {
                    file: path ? `${outPath}/${path}/index.mjs` : `${outPath}/index.mjs`,
                    format: 'es',
                },
                {
                    file: path ? `${outPath}/${path}/index.cjs` : `${outPath}/index.cjs`,
                    format: 'cjs',
                },
            ],
            plugins: [
                esbuildPlugin,
            ],
        },
        {
            input,
            output: {
                file: path ? `${outPath}/${path}/index.d.ts` : `${outPath}/index.d.ts`,
                format: 'es',
            },
            plugins: dtsPlugin,
            external: ["axios"]
        }
    ]
}
/**
 * @param  {string} path 文件夹名称
 */
export function createExport(path: string) {
    return {
        ['./' + path]: {
            "import": `./${path}/index.mjs`,
            "require": `./${path}/index.cjs`,
            "types": `./${path}/index.d.ts`
        }
    }
}
