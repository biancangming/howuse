import { RollupOptions } from "rollup"
import esbuild from 'rollup-plugin-esbuild'

const esbuildPlugin = esbuild({
    // plugins: {}
})


export const paths = ["axios", "echarts"]

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
        }
    }
}
