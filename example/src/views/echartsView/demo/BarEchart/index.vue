<template>
  <button @click="theme = 'dark'">深色</button>
  <button @click="theme = 'light'">浅色</button>
  <div style="height: 300px;" :style="{ backgroundColor: theme == 'dark' ? '#000' : '#fff' }">
    <how-bar-chart :option="option" :theme="theme" :config="{ keepData: true }"></how-bar-chart>
  </div>
</template>
<script lang="ts" setup>
import { HowBarChart } from "howuse/echarts";
import { EChartsOption } from 'echarts';
import { ref } from 'vue';
const theme = ref()

const option: EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  tooltip:{},
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      },
      markPoint: {
        data: [
          { type: "max", name: "Max" },
          { type: "min", name: "Min" },
        ],
      },
    }
  ]
}
</script>
