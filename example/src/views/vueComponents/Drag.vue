<template>
  <p>1. 支持初始化位置</p>
  <p>2. 支持同时打开多个操作不受影响</p>
  <p>3. 支持自定义内容的弹窗</p>
  <CodeView title="可拖拽弹窗">
    <DragDialogDemo />
    <template #desc>
      <p>打开一个可自由移动的弹窗，同时还要操作数据的时候使用最好。如果只是仅仅移动，则没有太大的用处。</p>
    </template>
    <template #code>
      <DragDialogCode />
    </template>
  </CodeView>
  <Api/>
</template>
<script lang="ts" setup>
import DragDialogDemo from "./dragDialog/index.vue"
import DragDialogCode from "./dragDialog/Index.md"
import Api from "./dragDialog/api.md"
</script>