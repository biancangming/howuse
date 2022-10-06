<template>
  <JsonPreview :data="data" />
  <a-divider></a-divider>
  <a-button type="primary" @click="openJson">指令模式打开</a-button>
</template>
<script lang="ts" setup>
import { JsonPreview, createJsonPreview } from 'howuse/vueComponent';

const data = {
  "name": "网站",
  "num": 3,
  "sites": ["Google", "Runoob", "Taobao"]
}

function openJson() {
  createJsonPreview(data, {
    title: "预览这个数据"
  })
}
</script>
<style lang="less" scoped>

</style>