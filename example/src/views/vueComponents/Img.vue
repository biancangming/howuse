<template>
  <CodeView title="图片预览">
    <imgPreviewDemo />
    <template #code>
      <imgPreviewCode />
    </template>
  </CodeView>
</template>
<script lang="ts" setup>
import imgPreviewDemo from "./imgPreview/Index.vue"
import imgPreviewCode from "./imgPreview/Index.md"
</script>
