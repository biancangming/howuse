<template>
  <h3>渲染10万条数据示例</h3>
  <div class="data-wrapper">
    <how-virtual-scroll :data-source="data" :el-height="100">
      <template #default="{ item }">
        <div class="data-item">
          {{ item }}
        </div>
      </template>
    </how-virtual-scroll>
  </div>
</template>
<script lang="ts" setup>
import { HowVirtualScroll } from "howuse/vueComponent";
import { Ref } from "vue";

const data: Ref<number[]> = ref([]);
for (let i = 0; i <= 100000; i++) {
  data.value.push(i);
}
</script>
<style lang="less" scoped>
.data-wrapper {
  border: 1px solid rgba(0, 0, 0, 0.608);
  .data-item {
    border: 1px solid #000;
    height: 100%;
  }
}
</style>
