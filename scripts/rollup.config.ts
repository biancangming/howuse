import fs from 'fs'

import type { Options as ESBuildOptions } from 'rollup-plugin-esbuild'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import type { RollupOptions } from 'rollup'

const configs: RollupOptions[] = []

const externals = [
    "resize-observer-polyfill"
]

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

const input = 'src/index.ts'
const iifeName = "HowVes"
const iifeGlobals = {
    HowVes: "HowVes"
}
configs.push(
    {
        input,
        output: [
            {
                file: `dist/index.mjs`,
                format: 'es',
            },
            {
                file: `dist/index.cjs`,
                format: 'cjs',
            },
            {
                file: `dist/index.iife.js`,
                format: 'iife',
                name: iifeName,
                extend: true,
                globals: iifeGlobals,
            },
            {
                file: `dist/index.iife.min.js`,
                format: 'iife',
                name: iifeName,
                extend: true,
                globals: iifeGlobals,
                plugins: [
                    esbuildMinifer({
                        minify: true,
                    }),
                ],
            }
        ],
        plugins: [
            esbuildPlugin
        ],
    },
    {
        input,
        output: {
            file: `dist/index.d.ts`,
            format: 'es',
        },
        plugins: dtsPlugin,
        external: {
            ...externals
        }
    }
)

export default configs