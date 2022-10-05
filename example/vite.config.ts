import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs"
import Prism from 'prismjs';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'
import Markdown from 'vite-plugin-md'
import code from '@yankeeinlondon/code-builder'
import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import CustomBlock from "markdown-it-custom-block"
import topLevelAwait from 'vite-plugin-top-level-await'
// import svgLoader from 'vite-svg-loader'

function pathResolve(dir: string) {
  return resolve(__dirname, ".", dir);
}

export default defineConfig({
  base: "",
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueJsx(),
    topLevelAwait({
      promiseExportName: '__tla',
      promiseImportName: i => `__tla_${i}`
    }),
    // svgLoader(),
    Markdown({
      builders: [code()],
      markdownItSetup(md) {
        md.use(CustomBlock, {
          code(url) {
            const file = fs.readFileSync(url).toString()
            const code = Prism.highlight(file, Prism.languages.html, "html").trim();
            return `<pre class="language-vue"><code class="language-vue">${code}</code></pre>`
          },
          js(url) {
            const file = fs.readFileSync(url).toString()
            const code = Prism.highlight(file, Prism.languages.js, "js").trim();
            return `<pre class="language-js"><code class="language-js">${code}</code></pre>`
          }
        })
      },
      markdownItOptions: {
        html: true,
        linkify: true,
      }
    }),
    AutoImport({
      imports: ["vue"],
      dts: "./auto-import.d.ts"
    }),
    Components({
      resolvers: [AntDesignVueResolver()]
    }),
  ],
  // 配置文件别名
  resolve: {
    alias: {
      "@": pathResolve('src'),
      "howuse": pathResolve("../src")
    },
  },
  // 打包配置
  build: {
    target: 'modules',
    outDir: 'dist', //指定输出路径
    assetsDir: 'static', // 指定生成静态资源的存放路径
    rollupOptions: {
      external: ["prismjs"]
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  // 本地运行配置，及反向代理配置
  server: {
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    proxy: {
      '/api': {
        target: 'http://192.168.0.2:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
