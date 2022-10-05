<template>
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
</template>
<script lang="ts" setup>
import MaskDemo from "./mask/Index.vue"
import MaskCode from "./mask/Index.md"
import imgPreviewDemo from "./imgPreview/Index.vue"
import imgPreviewCode from "./imgPreview/Index.md"
</script>
<style lang="less" scoped>

</style>