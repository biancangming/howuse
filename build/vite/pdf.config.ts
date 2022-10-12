import { defineConfig } from "vite";
import { pathResolve } from '../util';
import vue from '@vitejs/plugin-vue';
import AutoImport from "unplugin-auto-import/vite"
import topLevelAwait from 'vite-plugin-top-level-await'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: pathResolve(`../src/pdf/index.ts`),
      name: 'howuseJsPDF',
      fileName: (format) => `pdf.${format}.js`,
      formats: ['es', "cjs"],
    },
    rollupOptions: {
      external: ['vue', 'jspdf', 'html2canvas'],
      output: {
        banner: "/** Create By biancangming **/",
      }
    },
    cssCodeSplit: false,
    outDir: "dist/pdf",
    minify: "esbuild",
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
    }),
    topLevelAwait(),
    dts({
      entryRoot: pathResolve(`../src/echarts`),
    }),
  ]
})