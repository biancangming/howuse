<template>
  <a-button @click="visible = true">打开遮板</a-button>
  <!-- prop 预留多个配置，to 挂载点、isBg 是否显示蒙版背景色、position位置top、bottom、left、right、center 和 空字符串，默认是居中
  isClickMaskClose 表示是否点击蒙版关闭
  @after-close 是关闭之后的回调事件 -->
  <Mask position="center" v-model:visible="visible">
    <div style="width: 500px;height:300px;backgroundColor:#FFF">我是组件</div>
  </Mask>
</template>
<script lang="ts" setup>
import { Mask } from "howuse/vueComponent"
const visible = ref(false)
</script>
<style lang="less" scoped>

</style>