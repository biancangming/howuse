<template>
  <CodeView title="json数据预览">
    <JsonPreviewDemo />
    <template #code>
      <JsonPreviewCode />
    </template>
  </CodeView>
</template>
<script lang="ts" setup>
import JsonPreviewDemo from "./jsonPreview/Index.vue"
import JsonPreviewCode from "./jsonPreview/Index.md"
</script>