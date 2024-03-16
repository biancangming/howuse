<template>
  <button v-if="showMark" @click="showMark = false">隐藏水印</button>
  <button v-else @click="showMark = true">显示水印</button>
  <how-watermark text="哟、还有一个呢" :show="showMark" :opacity="0.5" style="width: 80%;margin-top:10px">
    <div class="data-wrapper">
      <p> 曾经 我茫然前行</p>
      <p> 黯夜的路上</p>
      <p> 微风 刺痛着灵魂</p>
      <p> 找不到应该的方向</p>
      <p> 生命这样的旅程</p>
      <p> 要用多少泪水来完整</p>
      <p> 是否我能期待遥远天际</p>
      <p> 一起飞翔 新造的人</p>
      <p> 生命这样的旅程</p>
      <p> 我渴求你的微笑来完整</p>
      <p> 你能为我打开自由的门</p>
      牵起手吧 新造的人
    </div>
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
  font-size: 18px;
  text-align: center;
  overflow-y: auto;
}
</style>
