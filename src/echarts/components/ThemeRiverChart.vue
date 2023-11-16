
<template>
  <div style="width: 100%; height: 100%" ref="chartRef"></div>
</template>
<script lang="ts" setup>
import { EChartsOption } from 'echarts';
import { ThemeRiverChart } from 'echarts/charts';
import { PropType } from 'vue';
import { useBaseECharts } from '../baseChart';
const chartRef = ref();
const { setOption, echartInstance, echarts } = useBaseECharts(chartRef)
echarts.use(ThemeRiverChart)

const props = defineProps({
  option: {
    default: () => ({}),
    type: Object as PropType<EChartsOption | EChartsOption[]>
  },
  theme: {
    default: "",
    type: [String, Object],
  }
})

defineExpose({
  getInstance: echartInstance
})

watch(() => props.option,
  (option) => {
    setOption(option, props.theme)
  },
  {
    immediate: true
  })
</script>
