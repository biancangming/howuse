# API 说明

默认支持全套的托拽事件，和原生保持一致。可参考学习：https://juejin.cn/post/7158748498668552229

## props & event 
| 属性        | 说明                                                ||
| ----------- | --------------------------------------------------- |--- |
| draggable   | 是否是一个可托拽的元素，默认`true`           |true/false|
| data   | 托拽元素绑定的数据                                      |any|
| dragDom   | 是否拖动内部HTML元素到目标位置，默认`true`         |boolean|
| dragstart | 拖拽元素起始会调用                                  |(ev: DragEventInit)=>void |
| drag      | 元素发生拖拽，只要拖拽元素离开原本位置会一直调用    |(ev: DragEventInit)=>void |
| dragleave | 元素完全离开原来的位置开始调用                      |(ev: DragEventInit)=>void |
| dragenter | 元素开始进入目标区域                                |(ev: DragEventInit)=>void |
| dragover  | 元素被拖拽到目标区域上方                            |(ev: DragEventInit)=>void |
| drop      | 元素落在目标元素上方时调用，el是托拽的dom元素，data是托拽元素绑定的数据                     |(ev: DragEventInit, {el, dropData})=>void |
| dragend   | 元素还未到达目标区域，就点击Esc案件或者鼠标释放调用 |(ev: DragEventInit)=>void |

## slot

| 属性        | 说明      |
| ----------- | --------------------------------------------------- |
| default   |    数据 `dropData` ,这个数据实际上是dragData 是托拽元素传入的数据 |