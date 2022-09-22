
<template>
  <div style="width: 100%; height: 100%" ref="chartRef"></div>
</template>
<script lang="ts" setup>
import { EChartsOption } from 'echarts';
import { PropType } from 'vue';
import { useBaseECharts } from '../baseChart';
const chartRef = ref();
const { setOption, echartInstance, echarts } = useBaseECharts(chartRef)

const props = defineProps({
  option: {
    default: () => ({}),
    type: Object as PropType<EChartsOption>
  }
})

defineExpose({
  getInstance: echartInstance()
})

watch(() => props.option,
  (option) => {
    setOption(option)
  },
  {
    immediate: true
  })
</script>
