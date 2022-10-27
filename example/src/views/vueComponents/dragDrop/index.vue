<template>
  <CodeView title="随意托拽功能">
    <howDragDropDemo />
    <template #desc>拖动绿色部分移动到目标位置</template>
    <template #code>
      <howDragDropCode />
    </template>
  </CodeView>
  <CodeView title="随意托拽功能, 只操作数据">
    <howDragDropDemo2 />
    <template #desc>很多时候拖动并不是拖动一个dom，而是拖动整个dom，对方接收的是一个数据。
      然后根据数据渲染成一个可用的dom元素，例如渲染一个echart图这种</template>
    <template #code>
      <howDragDropCode2 />
    </template>
  </CodeView>
  <Api style="margin-top: 10px;"/>
</template>
<script lang="ts" setup>
import howDragDropDemo from "./demo/index.vue";
import howDragDropCode from "./demo/index.md";
import howDragDropDemo2 from "./demo2/index.vue";
import howDragDropCode2 from "./demo2/index.md";
import Api from "./api.md";
</script>
