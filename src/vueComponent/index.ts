import "../less/howuse.less"
import "../less/animate.less" // 参考动画库地址：https://animate.style/
import HowMask from "./mask/Index.vue"
import HowImgPreview from "./imgPreview/Index.vue"
import { createImgPreview } from "./imgPreview/functional"
import HowDragDialog from "./dragDialog/Index.vue"
import HowJsonPreview from './jsonPreview/JsonPreview.vue';
import { createJsonPreview } from './jsonPreview/JsonPreviewDialog';
import HowVirtualScroll from './virtualScroll/Index.vue';
export {
  HowMask,
  HowImgPreview,
  createImgPreview,
  HowDragDialog, // 可拖拽弹窗
  HowJsonPreview, // 组件
  createJsonPreview, // 指令模式
  HowVirtualScroll, // 虚拟滚动
}