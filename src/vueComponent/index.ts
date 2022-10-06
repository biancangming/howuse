import "../less/howuse.less"
import "animate.css" // 动画库地址：https://animate.style/
import Mask from "./mask/Index.vue"
import ImgPreview from "./imgPreview/Index.vue"
import { createImgPreview } from "./imgPreview/functional"
import DragDialog from "./dragDialog/Index.vue"
import AnyDragDialog from "./dragDialog/AnyDrag.vue"
export {
  Mask,
  ImgPreview,
  createImgPreview,
  DragDialog, // 可拖拽弹窗
  AnyDragDialog, // 任意可拖拽窗口
}