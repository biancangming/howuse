<template>
  <CodeView title="curd 顶部搜索构建">
    <useAntdCrudSearchDemo />
    <template #desc> 在初始化创建，保留原有的 <b>AxiosInstance</b> 结构。如果有必要，也可以使用默认的 <b>server</b> </template>
    <template #code>
      <useAntdCrudSearchCode />
    </template>
  </CodeView>
</template>
<script lang="ts" setup>
import CodeView from "@/components/CodeView.vue";
import useAntdCrudSearchCode from "./demo/useAntdCrudSearch/index.md";
import useAntdCrudSearchDemo from "./demo/useAntdCrudSearch/index.vue";
</script>
<style lang="less" scoped>

</style>