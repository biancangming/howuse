<template>
  <CodeView title="加水印">
    <watermarkDemo />
    <template #desc>水印默认为展示</template>
    <template #code>
      <watermarkCode />
    </template>
  </CodeView>
  <Api />
</template>
<script lang="ts" setup>
import watermarkDemo from "./demo/index.vue";
import watermarkCode from "./demo/index.md";
import Api from "./api.md"
</script>
