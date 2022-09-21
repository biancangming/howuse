import path from 'path';
import type { UserConfigExport } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'
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
      },
      emptyOutDir: false,
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: `types/${name}.d.ts`, dest: `.`
          }
        ]
      })
    ]
  }
}