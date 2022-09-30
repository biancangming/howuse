import path from 'path';
import type { UserConfigExport } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'
import AutoImport from "unplugin-auto-import/vite"
import dts from 'vite-plugin-dts'

export const pathResolve = (name: string) => path.resolve(__dirname, name)
/**
 * @param  {string} name 库名称
 */
export function libConfig(name: string): UserConfigExport {
  return {
    build: {
      lib: {
        entry: pathResolve(`../src/${name}/index`),
        name: 'howuse',
        fileName: (format) => `${name}.${format}.js`,
        formats: ['es', "cjs"],
      },
      rollupOptions: {
        external: ['vue', name],
        output:{
          banner: "/** Create By biancangming **/"
        }
      },
      outDir: `dist/${name}`
      // emptyOutDir: false,
    },
    plugins: [
      // viteStaticCopy({
      //   targets: [
      //     {
      //       src: `types/${name}.d.ts`, dest: `.`
      //     }
      //   ]
      // })
      dts({
        entryRoot: pathResolve(`../src/${name}`),
      }),
      AutoImport({
        imports: ["vue"],
      }),
    ]
  }
}