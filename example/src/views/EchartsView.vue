<template>
  <div>
    <p class="flex">
      <b>自适应测试：</b>
      <button @click="lineChartWidth = `${300}px`">300px宽</button>
      <button @click="lineChartWidth = `${500}px`">500px宽</button>
      <button @click="lineChartWidth = `${800}px`">800px宽</button>
      <button @click="lineChartWidth = `100%`">100%宽</button>
    </p>
    <div class="wd" ref="chart" :style="{width:`${lineChartWidth}`}"></div>
    <h1 style="text-align:center">当前宽度：{{ lineChartWidth }}</h1>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { useBaseECharts } from "howuse/echarts";
export default defineComponent({
  setup() {
    const chart = ref();
    const lineChartWidth = ref("300px");
    const { setOption } = useBaseECharts(chart);

    onMounted(() => {
      setOption({
        grid: {
          top: "10%",
          left: "1%",
          right: "1%",
          containLabel: true,
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
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
          },
        ],
      });
    });

    return {
      chart,
      lineChartWidth,
    };
  },
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