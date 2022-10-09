<template>
  <div>
    <p class="flex">
    <h1 style="text-align: center">当前宽度：{{ lineChartWidth }}</h1>
    <b>自适应测试：</b>
    <div>
      <button @click="lineChartWidth = `${300}px`">300px宽</button>
      <button @click="lineChartWidth = `${500}px`">500px宽</button>
      <button @click="lineChartWidth = `${800}px`">800px宽</button>
      <button @click="lineChartWidth = `100%`">100%宽</button>
    </div>
    </p>
    <div style="height: 300px;" :style="{width: `${lineChartWidth}`}">
      <how-line-chart :option="option"></how-line-chart>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { HowLineChart } from "howuse/echarts";
import { EChartsOption } from 'echarts';
const lineChartWidth = ref("100%");

const option: EChartsOption = {
  grid: {
    top: "10%",
    left: "1%",
    right: "1%",
    containLabel: true,
  },
  legend: {
    bottom: "1%"
  },
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "我是x轴",
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
}
</script>
<style scoped>
.flex {
  display: flex;
  width: 600px;
  margin: auto;
  justify-content: space-around;
  align-items: center;
}
</style>
