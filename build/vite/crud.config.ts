import { defineConfig } from "vite";
import { pathResolve } from '../util';
import { viteStaticCopy } from 'vite-plugin-static-copy'
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  build: {
    lib: {
      entry: pathResolve(`../src/crud/index.ts`),
      name: 'howuse',
      fileName: (format) => `crud.${format}.js`,
      formats: ['es', "cjs"],
    },
    rollupOptions: {
      external: ['vue', 'ant-design-vue', '@ant-design/icons-vue'],
    },
    emptyOutDir: false,
    cssCodeSplit: false,
  },
  plugins: [
    vue(),
    viteStaticCopy({
      targets: [
        {
          src: `types/crud.d.ts`, dest: `.`
        }
      ]
    })
  ]
})