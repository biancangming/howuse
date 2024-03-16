<template>
  <how-click-out-side @click-side="message='点击区域外部'"> 
    <div class="demo" @click="message='您点击了区域内部'">
      {{message}}
    </div>
  </how-click-out-side>
</template>
<script lang="ts" setup>
import { HowClickOutSide } from "howuse/vueComponent"
import { ref } from 'vue';

const message = ref("点击区域外部")
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