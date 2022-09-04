<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { createAxios, useFileDownLoad } from "howves/axios";
import { AxiosRequestConfig } from "axios";
const { useAxiosRequest } = createAxios({
  instanceConfig: {
    baseURL: "http://www.httpbin.org",
  },
});

export default defineComponent({
  setup() {
    //测试基本数据请求
    const AnyThingConf: AxiosRequestConfig = {
      url: "/anything",
      method: "post",
    };
    const { data, response, loading, execute, edata } = useAxiosRequest<any>(
      AnyThingConf,
      {
        isDebounce: true,
      }
    );

    // watchEffect(() => {
    //   if (data.value.code == 1) {
    //     alert("错误");
    //   }
    // });

    // watchEffect(() => {
    //   edata.value.msg && alert(edata.value.msg);
    // });

    execute({ params: { p: 1 }, data: { d: 1 } });
    execute({ params: { p: 1 }, data: { d: 1 } });
    execute({ params: { p: 1 }, data: { d: 1 } });

    //测试下载文件
    const ImageConf: AxiosRequestConfig = {
      url: "/image/png",
      responseType: "blob",

    };
    const { response: imgRes, execute: imgExecute } =
      useAxiosRequest(ImageConf);

    const { finished } = useFileDownLoad({
      response: imgRes,
      fileName: "测试图片",
    });

    return {
      data,
      loading,
      response,
      imgExecute,
      finished,
    };
  },
});
</script>

<template>
  <div>
    <p v-if="loading">请求中...</p>
    <p v-else>请求完成</p>
    {{data}}
    <p></p>
    {{response}}
    <p></p>
    <button @click="imgExecute">下载测试</button> {{finished ?'下载完成':'请下载'}}
  </div>
</template>