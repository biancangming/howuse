<template>
  <div class="demo" ref="area" @click="message='您点击了区域内部'">
    {{message}}
  </div>
</template>
<script lang="ts" setup>
import { useClickOutSide } from "howuse/vueComponent"
import { ref } from 'vue';

const message = ref("点击区域外部")
const area = ref()
useClickOutSide(area, ()=>{
  message.value = "您点击了区域外部"
})
</script>
<style lang="less" scoped>
.demo {
  width: 200px;
  height: 200px;
  background-color: aquamarine;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>