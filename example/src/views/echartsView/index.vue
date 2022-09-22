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
  <p>2. 提供基本图形组件模板，组件内部按需引入，降低按需引入的编码成本</p>
  <CodeView title="自适应折线图，其它自适应类似">
    <LineChartDemo />
    <template #code>
      <LineChartCode />
    </template>
  </CodeView>
  <CodeView title="柱状图">
    <BarEchartDemo />
    <template #code>
      <BarEchartCode />
    </template>
  </CodeView>
  <CodeView title="饼图">
    <PieEchartDemo />
    <template #code>
      <PieEchartCode />
    </template>
  </CodeView>
  <CodeView title="自定义">
    <BaseEchartDemo />
    <template #desc>
      适合组合图，例如柱状图和折线图组合使用，本示例还是用了toolbox
    </template>
    <template #code>
      <BaseEchartCode />
    </template>
  </CodeView>
</template>
<script lang="ts" setup>
import LineChartDemo from "./demo/LineChart/index.vue";
import LineChartCode from "./demo/LineChart/index.md";
import BarEchartDemo from "./demo/BarEchart/index.vue";
import BarEchartCode from "./demo/BarEchart/index.md";
import PieEchartDemo from "./demo/PieEchart/index.vue";
import PieEchartCode from "./demo/PieEchart/index.md";
import BaseEchartDemo from "./demo/BaseChart/index.vue";
import BaseEchartCode from "./demo/BaseChart/index.md";
import CodeView from "@/components/CodeView.vue";
</script>
<style lang="less" scoped></style>
