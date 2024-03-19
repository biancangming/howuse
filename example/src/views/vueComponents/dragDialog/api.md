# API 说明

[https://vueuse.org/core/useDraggable/](https://vueuse.org/core/useDraggable/) 这里其实实现了大部分内容，本组件也是在这个方法的基础上封装，做了轻微修改，以便于适应自身业务

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