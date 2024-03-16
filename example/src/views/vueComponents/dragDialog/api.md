# API 说明

在 [https://vueuse.org/core/useDraggable/](https://vueuse.org/core/useDraggable/) 基础上封装了自定义的`UseDraggable`组件。支持任意拖动，支持边界锁定。

## props & event 
| 属性         | 说明                              |                 |
| ------------ | --------------------------------- | --------------- |
| visible      | 打开或者关闭，默认`false`         | true/false      |
| position     | 弹窗位置，默认 [0，0]             | [number,number] |
| any          | 是否为任意内容弹窗 ，默认 `false` | boolean         |
| lockBoundary | 是否锁定边界，默认`true`。        | boolean         |

## slot

| 属性    | 说明         |
| ------- | ------------ |
| header  | 头部内容     |
| default | 中间部分内容 |
| footer  | 底部内容     |