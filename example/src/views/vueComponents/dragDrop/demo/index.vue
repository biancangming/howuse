<template>
  <div class="drag-wrapper">
    <div class="data-wrapper">
      <!-- how-drag-drop 默认宽高都是继承父元素100%，
        拖放会将容器内部元素拖走，建议只有一个根元素，否则会有点问题 
      -->
      <how-drag-drop>
        <div class="drag">HOWUSE</div>
      </how-drag-drop>
    </div>
    <div class="data-wrapper">
      <how-drag-drop dom="false"></how-drag-drop>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { HowDragDrop } from "howuse/vueComponent";
</script>
<style lang="less" scoped>
.drag-wrapper {
  display: flex;
  width: 300px;
  justify-content: space-around;

  .data-wrapper {
    border: 1px dashed rgba(0, 0, 0, 0.608);
    height: 100px;
    width: 100px;
    padding: 10px;
    .drag {
      background-color: green;
      height: 100%;
    }
  }
}
</style>
