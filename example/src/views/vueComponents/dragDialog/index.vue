<template>
  <a-space>
    <a-button type="primary" @click="visible=true">打开可自由移动的弹窗</a-button>
    <a-button type="primary" @click="anyVisible=true">自定义任意移动的弹窗</a-button>
  </a-space>
  <how-drag-dialog v-model:visible="visible" :position="position" @after-close="afterClose">
    <template #header="{ x, y }">拖动这里可自由移动， 当前位置 {{ Math.round(x) }}, {{ Math.round(y) }}</template>
    <div class="test-content">
      一般而言给内容指定宽度比较好
    </div>
    <template #footer>
      自定义底部操作内容
    </template>
  </how-drag-dialog>
  <how-drag-dialog v-model:visible="anyVisible" :position="position" any>
    按住这里拖动我
    <a-button @click="anyVisible = false">点我关闭</a-button>
  </how-drag-dialog>
</template>
<script lang="ts" setup>
import { HowDragDialog } from "howuse/vueComponent"
import { message } from 'ant-design-vue';

// 设置初始位置 相对于窗口x，y位置
const position = ref<[number, number]>([window.innerWidth / 3.6, 200])

const visible = ref(false)
const anyVisible = ref(false)

function afterClose() {
  message.success("弹窗关闭了")
}
</script>
<style lang="less" scoped>
:slotted(.howuse-drag-dialog__content) {
  background-color: green !important;
}

.test-content {
  height: 300px;
  width: 400px;
}
</style>