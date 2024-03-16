<template>
  <CodeView title="点击区域外部触发操作">
    <ClickOutSideDemo />
    <template #code>
      <ClickOutSideCode />
    </template>
  </CodeView>

  <CodeView title="点击区域外部触发操作, 组件模式">
    <ClickOutSideDemo2 />
    <template #code>
      <ClickOutSideCode2 />
    </template>
  </CodeView>
</template>
<script lang="ts" setup>
import ClickOutSideDemo from "./clickOutSide/demo/index.vue"
import ClickOutSideCode from "./clickOutSide/demo/Index.md"

import ClickOutSideDemo2 from "./clickOutSide/demo2/index.vue"
import ClickOutSideCode2 from "./clickOutSide/demo2/Index.md"
</script>