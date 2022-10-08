
// ant-design-vue curd 打包
import { defineConfig } from "vite";
import { pathResolve } from '../util';
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    lib: {
      entry: pathResolve(`../src/crud/antd/index.ts`),
      name: 'crud',
      fileName: (format) => `crud.${format}.js`,
      formats: ['es', "cjs"],
    },
    rollupOptions: {
      external: ['vue', /^ant-design-vue\/.+/, '@ant-design/icons-vue'],
      output: {
        banner: "/** Create By biancangming **/"
      }
    },
    cssCodeSplit: false,
    outDir: "dist/crud/antd"
  },
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
    dts({
      entryRoot: pathResolve(`../src/crud/antd`),
      cleanVueFileName: true,
    }),
    AutoImport({
      imports: ["vue"],
    }),
    Components({
      resolvers: [AntDesignVueResolver()]
    }),
  ]
})