
<template>
  <div style="width: 100%; height: 100%" ref="chartRef"></div>
</template>
<script lang="ts" setup>
import { EChartsOption } from 'echarts';
import { PropType } from 'vue';
import { useBaseECharts } from '../baseChart';
import { HowEchartsInitOpts } from '../types/echarts';
import { use } from "echarts/core";
const chartRef = ref();
const { setOption, echartInstance } = useBaseECharts(chartRef)

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

use(props.use)

defineExpose({
  getInstance: echartInstance,
  on: echartInstance()?.on,
  dispatchAction: echartInstance()?.dispatchAction,
})

watch(() => props.option,
  (option) => {
    setOption(option, props.theme)
  },
  {
    immediate: true
  })
</script>
