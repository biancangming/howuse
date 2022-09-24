<template>
  <p>基于ant-design-vue 3.2.12 构建 ， 快速开发curd 表单提交，未开发完整功能，仅供辅助表格等提供辅助操作</p>
  <CodeView title="curd 顶部搜索构建">
    <useAntdCrudSearchDemo />
    <template #code>
      <useAntdCrudSearchCode />
    </template>
  </CodeView>
  <CodeView title="curd 表单构建">
    <useAntdCrudFormDemo />
    <template #code>
      <useAntdCrudFormCode />
    </template>
  </CodeView>
  <CodeView title="基础表格构建">
    <tableDemo />
    <template #desc> 自动预留了action 插槽用于操作，不写则不会有该选项 </template>
    <template #code>
      <tableCode />
    </template>
  </CodeView>
  <CodeView title="综合示例">
    <crudCompositionDemo />
    <template #desc> 综合示例, 提供了三种表单模式，分别是<code>AntdCrudFormModal</code> <code>AntdCrudFormDrawer</code> <code>AntdCrudForm</code> 
    <p>示例中为了简单演示，使用了相同的 columns ， 实际使用当中，根据实际情况而定。</p>
    </template>
    <template #code>
      <crudCompositionCode />
    </template>
  </CodeView>
</template>
<script lang="ts" setup>
import CodeView from "@/components/CodeView.vue";
import useAntdCrudSearchCode from "./demo/useAntdCrudSearch/index.md";
import useAntdCrudSearchDemo from "./demo/useAntdCrudSearch/index.vue";
import useAntdCrudFormDemo from "./demo/useAntdCrudForm/index.vue";
import useAntdCrudFormCode from "./demo/useAntdCrudForm/index.md";
import tableDemo from "./demo/Table/index.vue";
import tableCode from "./demo/Table/index.md";
import crudCompositionDemo from "./demo/crudComposition/index.vue";
import crudCompositionCode from "./demo/crudComposition/index.md";
</script>
<style lang="less" scoped>

</style>