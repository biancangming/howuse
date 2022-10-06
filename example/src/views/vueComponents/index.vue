<template>
  <div>
    <p>这部分插件主要开发一些辅助UI功能，这些功能很常见，但是多数UI组件并没有包含在内。</p>
  </div>
  <CodeView title="蒙版">
    <MaskDemo />
    <template #code>
      <MaskCode />
    </template>
  </CodeView>
  <CodeView title="图片预览">
    <imgPreviewDemo />
    <template #code>
      <imgPreviewCode />
    </template>
  </CodeView>
  <CodeView title="json数据预览">
    <JsonPreviewDemo />
    <template #code>
      <JsonPreviewCode />
    </template>
  </CodeView>
  <CodeView title="可拖拽弹窗">
    <DragDialogDemo />
    <template #desc>
      <p>打开一个可自由移动的弹窗，同时还要操作数据的时候使用最好。如果只是仅仅移动，则没有太大的用处。</p>
    </template>
    <template #code>
      <DragDialogCode />
    </template>
  </CodeView>
</template>
<script lang="ts" setup>
import MaskDemo from "./mask/Index.vue"
import MaskCode from "./mask/Index.md"
import imgPreviewDemo from "./imgPreview/Index.vue"
import imgPreviewCode from "./imgPreview/Index.md"
import DragDialogDemo from "./dragDialog/Index.vue"
import DragDialogCode from "./dragDialog/Index.md"
import JsonPreviewDemo from "./jsonPreview/Index.vue"
import JsonPreviewCode from "./jsonPreview/Index.md"
</script>
<style lang="less" scoped>

</style>