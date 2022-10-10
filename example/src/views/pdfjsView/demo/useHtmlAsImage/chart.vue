<template>
  <how-bar-chart :option="option" style="height: 300px"></how-bar-chart>
</template>
<script lang="ts" setup>
import { HowBarChart } from "howuse/echarts";
import { EChartsOption } from "echarts";

const option: EChartsOption = {
  grid:{
    bottom: "10%"
  },
  title: {
    text: "雨巷徘徊次数统计图",
    subtext: "戴望舒",
    left: "center",
  },
  xAxis: {
    type: "category",
    data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
  ],
};
</script>
<style lang="less" scoped></style>
