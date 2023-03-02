
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
    type: Object as PropType<EChartsOption | EChartsOption[]>
  },
  use: {
    default: () => [],
    type: Object as PropType<any>
  }
})

if(!props.use || props.use.length === 0){
  console.error("提示：必须传入可用的echart组件")
}else{
  echarts.use(props.use)
}

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
