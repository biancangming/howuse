import "../less/howuse.less"
import "../less/animate.less" // 参考动画库地址：https://animate.style/
import Mask from "./mask/Index.vue"
import ImgPreview from "./imgPreview/Index.vue"
import { createImgPreview } from "./imgPreview/functional"
import DragDialog from "./dragDialog/Index.vue"
import AnyDragDialog from "./dragDialog/AnyDrag.vue"
import JsonPreview from './jsonPreview/JsonPreview.vue';
import { createJsonPreview } from './jsonPreview/JsonPreviewDialog';
export {
  Mask,
  ImgPreview,
  createImgPreview,
  DragDialog, // 可拖拽弹窗
  AnyDragDialog, // 任意可拖拽窗口
  JsonPreview, // 组件
  createJsonPreview // 指令模式
}