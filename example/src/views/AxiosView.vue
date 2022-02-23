<script>
import { defineComponent } from '@vue/composition-api'
import { createAxios } from "howves/axios";

const { useAxiosRequest } = createAxios({
  instanceConfig: {
    baseURL: "http://www.httpbin.org",
  },
});

export default defineComponent({
  setup() {
    const AnyThingConf = {
      url: "/anything",
    };

    const { data, response, loading, execute } = useAxiosRequest(AnyThingConf, { immediate: true });

    execute()
    execute()
    execute()

    return {
      data,
      loading,
      response
    }
  },
})
</script>

<template>
  <div>
    <p v-if="loading">请求中...</p>
    <p v-else>请求完成</p>
    {{data}}
    <p></p>
    {{response}}
  </div>
</template>