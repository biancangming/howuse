<template>
  <div>
    <p class="flex">
      <h1 style="text-align: center">当前宽度：{{ lineChartWidth }}</h1>
      <b>自适应测试：</b>
      <button @click="lineChartWidth = `${300}px`">300px宽</button>
      <button @click="lineChartWidth = `${500}px`">500px宽</button>
      <button @click="lineChartWidth = `${800}px`">800px宽</button>
      <button @click="lineChartWidth = `100%`">100%宽</button>
    </p>
    <div class="wd" ref="chart" :style="{ width: `${lineChartWidth}` }"></div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useBaseECharts } from "howuse/echarts";
import { LineChart } from 'echarts/charts';
const chart = ref();
const lineChartWidth = ref("100%");

// useBaseECharts 传入参数和echarts.init 完全兼容，只是增加了一些默认值，renderer默认为canvas
// 参数一为响应式dom对象，light 是主题可设置为 dark，默认为亮色主题。
// 更多配置可参考 https://echarts.apache.org/zh/api.html#echarts.init
const { setOption, echarts } = useBaseECharts(chart, 'light' , { renderer: 'svg' });
echarts.use([LineChart]) // 按需加载lineChart 组件

onMounted(() => {
  setOption({
    grid: {
      top: "10%",
      left: "1%",
      right: "1%",
      containLabel: true,
    },
    legend:{
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
  });
});
</script>
<style scoped>
.wd {
  width: 500px;
  height: 400px;
  margin: auto;
}

.flex {
  display: flex;
  width: 500px;
  margin: auto;
  justify-content: space-around;
}
</style>
