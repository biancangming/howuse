<template>
  <a-button type="primary" @click="request()">请求接口</a-button>
  <p>请求结果：{{ data }}</p>
</template>
<script lang="ts" setup>
import { message } from "ant-design-vue";
import { createAxios } from "howuse/axios";

const { useAxiosRequest } = createAxios({
  baseURL: "http://www.httpbin.org",
});

const { data, response, loading, finished, execute, edata } = useAxiosRequest<any>(
  {
    url: "/anything",
    method: "post",
  },
  {
    defaultVal: {}, // 设置默认响应值，默认是 []
    isDebounce: false
  }
);

// 响应式用法
watch(finished, ()=> message.info("响应式调用完成"))

// 一般请求用法
function request() {
  execute().then((data) => {
    message.info(`一般调用完成`);
  });
}
</script>
