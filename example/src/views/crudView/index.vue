<template>
  <p>基于antd 构建 ， 快速开发curd 表单提交，未开发完整功能，仅供辅助表格等提供辅助操作</p>
  <CodeView title="curd 顶部搜索构建">
    <useAntdCrudSearchDemo />
    <template #desc> 在初始化创建，保留原有的 <b>AxiosInstance</b> 结构。如果有必要，也可以使用默认的 <b>server</b> </template>
    <template #code>
      <useAntdCrudSearchCode />
    </template>
  </CodeView>
  <CodeView title="curd 表单构建">
    <useAntdCrudFormDemo />
    <template #desc> 在初始化创建，保留原有的 <b>AxiosInstance</b> 结构。如果有必要，也可以使用默认的 <b>server</b> </template>
    <template #code>
      <useAntdCrudFormCode />
    </template>
  </CodeView>
</template>
<script lang="ts" setup>
import CodeView from "@/components/CodeView.vue";
import useAntdCrudSearchCode from "./demo/useAntdCrudSearch/index.md";
import useAntdCrudSearchDemo from "./demo/useAntdCrudSearch/index.vue";
import useAntdCrudFormDemo from "./demo/useAntdCrudForm/index.vue";
import useAntdCrudFormCode from "./demo/useAntdCrudForm/index.md";
</script>
<style lang="less" scoped>

</style>