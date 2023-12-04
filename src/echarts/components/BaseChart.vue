
<template>
  <div style="width: 100%; height: 100%" ref="chartRef"></div>
</template>
<script lang="ts" setup>
import { EChartsOption } from 'echarts';
import { PropType } from 'vue';
import { useBaseECharts } from '../baseChart';
import { HowEchartsInitOpts } from '../types/echarts';
const chartRef = ref();
const { setOption, echartInstance, echarts } = useBaseECharts(chartRef)

const props = defineProps({
  option: {
    default: () => ({}),
    type: Object as PropType<EChartsOption | EChartsOption[]>
  },
  theme: {
    default: "",
    type: [String, Object],
  },
  use: {
    default: () => [],
    type: Object as PropType<any>
  },
  config: {
    default: () => ({}),
    type: Object as PropType<HowEchartsInitOpts>,
  }
})

echarts.use(props.use)

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
