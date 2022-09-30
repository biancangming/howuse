import * as echarts from 'echarts/core';
import type { EChartsOption } from "echarts"
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components"
import { CanvasRenderer, SVGRenderer } from "echarts/renderers"
import { onMounted, nextTick, Ref, onUnmounted } from 'vue';
import { addResizeListener, removeResizeListener } from "howtools"
import type { HowEchartsInitOpts } from "./types/echarts"
import { createDef } from '../utils/util';
import { EChartsType } from 'echarts/core';

echarts.use([GridComponent, LegendComponent, TooltipComponent])


export function useBaseECharts(el: Ref<HTMLDivElement>, theme?: string | object, opts?: HowEchartsInitOpts) {
  // 渲染模式 默认canvas
  const renderer = opts?.renderer
  echarts.use(createDef(renderer, 'canvas') === 'canvas' ? CanvasRenderer : SVGRenderer)
  //echarts图实例
  let echartInstance: EChartsType;

  //设置默认样式数据
  const defaultOption: EChartsOption = {
    backgroundColor: createDef(theme, "light") ? 'rgba(0,0,0,0)' : 'rgba(255,555,255)'
  }

  function addDefaultOption(option: EChartsOption) {
    Object.assign(defaultOption, option)
  }


  async function setOption(option: EChartsOption) {
    if (!el.value) {
      await nextTick();
      echartInstance = echarts.init(el.value, theme);
    }
    if (!echartInstance) throw new Error("echarts 实例没有创建成功");

    echartInstance?.setOption(Object.assign(defaultOption, option), true)
  }


  function resize() {
    echartInstance?.resize()
  }

  //初始化echarts图
  onMounted(() => {
    if (!el.value) return
    echartInstance = echarts.init(el.value, theme);
    addResizeListener(el.value, resize)
  })

  onUnmounted(() => {
    removeResizeListener(el.value, resize)
  })

  return {
    addDefaultOption,
    setOption,
    resize,
    echartInstance: () => echartInstance,
    echarts
  }
}
