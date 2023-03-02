<template>
  <div style="height: 300px;">
    <how-bar-chart :option="[optionColor, option]"></how-bar-chart>
  </div>
</template>
<script lang="ts" setup>
import { HowBarChart } from "howuse/echarts";
import { EChartsOption } from 'echarts';


const optionColor: EChartsOption = {
  color: ["#FF0000"],
  series: [
    {
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
    }
  ]
}

const option: EChartsOption = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
}
</script>
