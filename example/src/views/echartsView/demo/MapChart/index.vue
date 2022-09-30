<template>
  <div style="height: 600px;">
    <MapChart :option="option" v-if="mapVisible" />
  </div>
</template>
<script lang="ts" setup>
import { EChartsOption } from 'echarts';
import { MapChart, useGeoJsonMap } from 'howuse/echarts';
const mapVisible = ref(false) // 控制地图显示时间，等待地图注册成功再显示，防止无意义报错
const option: EChartsOption = {
  color: ["red"],
  title: {
    text: '陕西省渭南市',
  },
  tooltip: {
    trigger: 'item',
    showDelay: 0,
    transitionDuration: 0.2
  },
  visualMap: {
    left: 'right',
    min: 500000,
    max: 38000000,
    inRange: {
      color: [
        '#313695',
        '#4575b4',
        '#74add1',
        '#abd9e9',
        '#e0f3f8',
        '#ffffbf',
        '#fee090',
        '#fdae61',
        '#f46d43',
        '#d73027',
        '#a50026'
      ]
    },
    text: ['High', 'Low'],
    calculable: true
  },
  series: [
    {
      name: 'weinan',
      type: 'map',
      roam: true,
      map: 'weinan',
      label: {
        show: true,
        color: "#FFF"
      },
      data: [
        { name: '韩城市', value: 4822023 },
        { name: '白水县', value: 38000000 },
        { name: '澄城县', value: 6553255 },
        { name: '蒲城县', value: 2949131 },
        { name: '合阳县', value: 299131 },
        { name: '大荔县', value: 2949131 },
        { name: '富平县', value: 30000000 },
        { name: '临渭区', value: 25000000 },
        { name: '华州区', value: 294913 },
        { name: '华阴市', value: 5500000 },
        { name: '潼关县', value: 1949131 },
      ]
    }
  ]
};

useGeoJsonMap({ code: "610500", name: "weinan" }).then(() => {
  mapVisible.value = true
}) // name 是必传条件
</script>