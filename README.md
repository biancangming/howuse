# howves

> 好用的 Vue Composition 辅助库

- 支持 webpack vite 
- typescript 实现
- 致力于简单实用，满足基础业务需求

# 安装方式

`npm i howves`

# 简要文档说明

> 简单介绍函数作用，具体需要在`src`文件夹下查看函数的具体作用。

# 代码贡献指南

工具包按照模块化布局，每增加一个小模块则增加一个文件夹

1. 需要在 `howves\scripts\rollup.config.ts` `paths` 增加路径
2. 需要在`package.json` 增加一个导入
```json
"exports": {
    ".": {
      "import": "./index.mjs",
      "require": "./index.cjs",
      "types": "./index.d.ts"
    }
  },
```
5. 第三方包安装在dev依赖当中