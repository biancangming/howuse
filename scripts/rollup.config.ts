import fs from 'fs'

import type { Options as ESBuildOptions } from 'rollup-plugin-esbuild'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import type { RollupOptions } from 'rollup'

const configs: RollupOptions[] = []


const esbuildPlugin = esbuild()

const dtsPlugin = [
    dts(),
]

const esbuildMinifer = (options: ESBuildOptions) => {
    const { renderChunk } = esbuild(options)

    return {
        name: 'esbuild-minifer',
        renderChunk,
    }
}

const paths = ["axios"]

function createConfig(path: string): RollupOptions[] {
    const input = `src/${path}/index.ts`
    return [
        {
            input,
            output: [
                {
                    file: `dist/${path}/index.mjs`,
                    format: 'es',
                },
                {
                    file: `dist/${path}/index.cjs`,
                    format: 'cjs',
                },
            ],
            plugins: [
                esbuildPlugin
            ],
        },
        {
            input,
            output: {
                file: `dist/${path}/index.d.ts`,
                format: 'es',
            },
            plugins: dtsPlugin,
            external: ["axios"]
        }
    ]
}

for (const path of paths) {
    configs.push(...createConfig(path))
}


export default configs