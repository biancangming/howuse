<script lang="ts" setup>
// import Down from "./demo/useBlobDownload.md";
import { createAxios } from "howuse/axios";
import type { HowAxiosRequestConfig } from "types/axios";
import CodeView from "@/components/CodeView.vue";
import AxiosInterceptorCode from "./demo/AxiosInterceptor/index.md";
import useBlobDownloadDemo from "./demo/useBlobDownload/index.vue";
import useBlobDownloadCode from "./demo/useBlobDownload/index.md";
import useAxiosRequestDemo from "./demo/useAxiosRequest/index.vue";
import useAxiosRequestCode from "./demo/useAxiosRequest/index.md";

const { useAxiosRequest, useBlobDownload } = createAxios({
  baseURL: "http://www.httpbin.org",
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
  <p><b>相对于原生axios解决问题：</b></p>
  <p>1. 加入节流自动过滤多余的重复请求，节省带宽同时，一定程度防止表单短时间重复提交的问题</p>
  <p>2. vue页面销毁自动取消未完成的请求，节省页面资源</p>
  <p>3. 在有必要的情况下，可手动终止当前请求</p>
  <p>4. 响应式用法</p>
  <p>5. 响应默认值设置</p>
  <p>6. 增加path传参模式</p>
  <CodeView title="实例创建-请求拦截器、响应拦截器">
    <!-- <AxiosInterceptorDemo /> -->
    <template #desc> 在初始化创建，保留原有的 <b>AxiosInstance</b> 结构 </template>
    <template #code>
      <AxiosInterceptorCode />
    </template>
  </CodeView>
  <CodeView title="请求">
    <useAxiosRequestDemo />
    <template #desc> 
      带防抖的请求，通过<b>isDebounce</b>设置实际上内部默认开启防抖，通过<b>defaultVal</b>可设置返回默认值
     </template>
    <template #code>
      <useAxiosRequestCode />
    </template>
  </CodeView>
  <CodeView title="blob文件下载">
    <useBlobDownloadDemo />
    <template #desc> 描述 </template>
    <template #code>
      <useBlobDownloadCode />
    </template>
  </CodeView>
</template>
