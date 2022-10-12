import { EChartsOption } from "echarts";
import { PropType } from "vue";
import { useBaseECharts } from "../baseChart";

export const useEchartInstance = () => {

  const chartRef = ref();
  const { setOption, echartInstance, echarts } = useBaseECharts(unref(chartRef))

  const props = defineProps({
    option: {
      default: () => ({}),
      type: Object as PropType<EChartsOption>
    }
  })


  defineExpose({
    getInstance: echartInstance()
  })



  watch(() => props.option, (option) => {
    setOption(option)
  })

  return {
    chartRef,
    echarts
  }
}