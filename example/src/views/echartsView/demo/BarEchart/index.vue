<template>
  <div style="height: 300px;">
    <BarEchart :option="option"></BarEchart>
  </div>
</template>
<script lang="ts" setup>
import { BarEchart } from "howuse/echarts";
import { EChartsOption } from 'echarts';

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
