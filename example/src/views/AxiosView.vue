<script lang="ts" setup>
import { createAxios } from "howuse/axios";
import type { HowAxiosRequestConfig } from "types/axios";

const { useAxiosRequest, useBlobDownload } = createAxios({
  instanceConfig: {
    baseURL: "http://www.httpbin.org",
  },
});

//测试基本数据请求
const AnyThingConf: HowAxiosRequestConfig = {
  url: "/anything",
  method: "post",
};
const { data, response, loading, execute, edata } = useAxiosRequest<any>(
  AnyThingConf,
  {
    isDebounce: true,
  }
);

execute({ params: { p: 1 }, data: { d: 1 } });
execute({ params: { p: 1 }, data: { d: 1 } });
execute({ params: { p: 1 }, data: { d: 1 } });

//测试下载文件
const ImageConf: HowAxiosRequestConfig = {
  url: "/image/png",
  responseType: "blob",
};
const { execute: imgExecute, downLoadFinished } = useBlobDownload(ImageConf, {
  fileName: "测试图片.png",
  immediate: false,
});

</script>

<template>
  <div>
    <p v-if="loading">请求中...</p>
    <p v-else>请求完成</p>
    {{ data }}
    <p></p>
    {{ response }}
    <p></p>
    <button @click="imgExecute()">下载测试</button>
    {{ downLoadFinished ? "下载完成" : "请下载" }}
  </div>
</template>
