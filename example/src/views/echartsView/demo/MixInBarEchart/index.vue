<template>
  <div style="height: 300px">
    <how-bar-chart :option="[optionColor, option]"></how-bar-chart>
  </div>
</template>
<script lang="ts" setup>
import { HowBarChart } from "howuse/echarts";
import { EChartsOption } from "echarts";

const optionColor: EChartsOption = {
  color: ["#FF0000"],
  tooltip: {},
  series: [
    {
      markPoint: {
        data: [
          { type: "max", name: "Max" },
          { type: "min", name: "Min" },
        ],
      },
    },
  ],
};

const option: EChartsOption = {
  dataset: {
    dimensions: ["date", "value"],
    source: [
      { date: "Mon" , value: "120.12"},
      { date: "Tue" , value: "12"},
      { date: "Wed" , value: "15"},
      { date: "Thu" , value: "80"},
      { date: "Fri" , value: "70"},
      { date: "Sat" , value: "110"},
      { date: "Sun" , value: "130.00"},
    ]
  },
  xAxis: {
    type: "category",
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
  ],
};
</script>
