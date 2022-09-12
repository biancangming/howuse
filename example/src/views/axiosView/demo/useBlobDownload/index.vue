<template>
  <a-button type="primary" @click="downloadPng()">下载</a-button>
</template>
<script lang="ts" setup>
import { createAxios } from "howuse/axios";
const { useBlobDownload } = createAxios({
  baseURL: "http://www.httpbin.org",
});

const { execute: downloadPng } = useBlobDownload(
  {
    url: "/image/png",
  },
  {
    fileName: "图片.png",
  }
);
</script>
<style lang="less" scoped></style>
