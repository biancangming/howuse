<template>
  <p>chrome 浏览器页面渲染dom超过1500个节点就会出现性能问题，使用虚拟滚动，将数据放到JavaScript内存当中最合适不过了 by https://web.dev/dom-size/</p>
  <CodeView title="虚拟滚动">
    <virtualScrollDemo />
    <template #code>
      <virtualScrollCode />
    </template>
  </CodeView>
  <CodeView title="虚拟自动滚动">
    <virtualScrollDemo2 />
    <template #desc>
    不太喜欢这种滚动，不过许多业务，尤其是大屏，需要这种效果，一直不知道有什么暖用
    <p>auto-scroll 表示滑动速度，值越小，滑动越快。 是Boolean 或者一个 Number ， Number 代表滚动的毫秒数，默认是1000ms</p>
    </template>
    <template #code>
      <virtualScrollCode2 />
    </template>
  </CodeView>
</template>
<script lang="ts" setup>
import virtualScrollDemo from "./demo/index.vue";
import virtualScrollCode from "./demo/index.md";
import virtualScrollDemo2 from "./demo2/index.vue";
import virtualScrollCode2 from "./demo2/index.md";
</script>
