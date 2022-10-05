import { defineConfig } from "vite";
import { pathResolve } from '../util';
import vue from '@vitejs/plugin-vue';
import AutoImport from "unplugin-auto-import/vite"
import topLevelAwait from 'vite-plugin-top-level-await'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: pathResolve(`../src/vueComponent/index.ts`),
      name: 'howuseVueComponent',
      fileName: (format) => `vueComponent.${format}.js`,
      formats: ['es', "cjs"],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        banner: "/** Create By biancangming **/",
      }
    },
    cssCodeSplit: false,
    outDir: "dist/vueComponent"
  },
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
    AutoImport({
      imports: ["vue"],
    }),
    topLevelAwait(),
    dts({
      entryRoot: pathResolve(`../src/vueComponent`),
    }),
  ]
})