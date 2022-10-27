<template>
  <CodeView title="蒙版，打开后可按空白区域关闭">
    <MaskDemo />
    <template #code>
      <MaskCode />
    </template>
  </CodeView>
</template>
<script lang="ts" setup>
import MaskDemo from "./mask/index.vue"
import MaskCode from "./mask/Index.md"
</script>