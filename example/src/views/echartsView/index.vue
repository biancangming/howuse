<template>
  <b
    >echarts
    被阿帕奇合并之后，api在5.0开始发生一些不可逆转的转变，按需加载发生极大转变，建议使用
    5.0.1 + 版本，本模块基于5.3 + 版本实现 , 该版本内置typescript无需额外安装</b
  >
  <p>
    <b>简要说明：</b>
  </p>
  <p>1. 在原生代码基础上增加页面响应式自适应</p>
  <CodeView title="自适应折线图，其它类似">
    <LineChartDemo />
    <template #desc>
      本方法实用高度定制的echarts图标， 默认已加载 GridComponent, LegendComponent, TooltipComponent, CanvasRenderer, SVGRenderer 常用的这几个模块
    </template>
    <template #code>
      <LineChartCode />
    </template>
  </CodeView>
</template>
<script lang="ts" setup>
import LineChartDemo from "./demo/LineChart/index.vue";
import LineChartCode from "./demo/LineChart/index.md";
import CodeView from "@/components/CodeView.vue";
</script>
<style lang="less" scoped></style>
