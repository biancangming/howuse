<template>
  <button v-if="showMark" @click="showMark = false">隐藏水印</button>
  <button v-else @click="showMark = true">显示水印</button>
  <how-watermark text="水印 HOWUSE" :show="showMark" style="width: 80%;margin-top:10px">
    <div class="data-wrapper">1111111111111111</div>
  </how-watermark>
</template>
<script lang="ts" setup>
import { HowWatermark } from "howuse/vueComponent";
import { ref } from 'vue';
const showMark = ref(true)
</script>
<style lang="less" scoped>
.data-wrapper {
  border: 1px solid rgba(0, 0, 0, 0.608);
  height: 500px;
}
</style>
