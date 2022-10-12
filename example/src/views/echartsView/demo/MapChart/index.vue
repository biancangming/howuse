<template>
  <div style="height: 600px;">
    <how-map-chart :option="option" v-if="mapVisible" />
  </div>
</template>
<script lang="ts" setup>
import { EChartsOption } from 'echarts';
import { HowMapChart, useGeoJsonMap } from 'howuse/echarts';
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
        // 这里需要注意的是，一些提供商的地区命名存在区别，比如 白水县 称作 白水、韩城市 称作 韩城
        { name: '韩城', value: 4822023 },
        { name: '白水', value: 38000000 },
        { name: '澄城', value: 6553255 },
        { name: '蒲城', value: 2949131 },
        { name: '合阳', value: 299131 },
        { name: '大荔', value: 2949131 },
        { name: '富平', value: 30000000 },
        { name: '临渭', value: 25000000 },
        { name: '华州', value: 294913 },
        { name: '华阴', value: 5500000 },
        { name: '潼关', value: 1949131 },
      ]
    }
  ]
};

/**
 *  type "default" | "custom" | "datav" | "cnGeoJson"
 *  default 是自建服务的地图，可能不准确，更新不及时
 *  custom 传统方式，需要额外输入一个 data 传入geojson数据
 *  datav  http://datav.aliyun.com/portal/school/atlas/area_selector 服务似乎下架了2022/10/11 官网一直提示服务升级中
 *  cnGeoJson geojson.cn 数据
 */
useGeoJsonMap({ code: "610500", name: "weinan", type: "cnGeoJson" }).then(() => {
  mapVisible.value = true
}) // name 是必传条件
</script>