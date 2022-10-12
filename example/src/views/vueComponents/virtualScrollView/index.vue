<template>
  <p>chrome 浏览器页面渲染dom超过1500个节点就会出现性能问题，使用虚拟滚动，将数据放到JavaScript内存当中最合适不过了 by https://web.dev/dom-size/</p>
  <CodeView title="虚拟滚动">
    <virtualScrollDemo />
    <template #code>
      <virtualScrollCode />
    </template>
  </CodeView>
</template>
<script lang="ts" setup>
import virtualScrollDemo from "./demo/index.vue";
import virtualScrollCode from "./demo/index.md";
</script>
