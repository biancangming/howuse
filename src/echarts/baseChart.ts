import * as echarts from 'echarts/core';
import { EChartsOption } from "echarts"
import { GridComponent, LegendComponent, TooltipComponent, TitleComponent, DatasetComponent } from "echarts/components"
import { CanvasRenderer, SVGRenderer } from "echarts/renderers"
import { onMounted, nextTick, Ref, onUnmounted } from 'vue';
import { addResizeListener, removeResizeListener } from 'howtools';
import type { HowEchartsInitOpts } from "./types/echarts"
import { createDef } from '../utils/util';
import { EChartsType } from 'echarts/core';
import { merge, isArray, isObject } from "lodash-es"
import { fixOption } from './helper';

echarts.use([GridComponent, LegendComponent, TooltipComponent, TitleComponent, DatasetComponent])

export function useBaseECharts(el: Ref<HTMLDivElement>, theme?: string | object, opts?: HowEchartsInitOpts) {
  let lastTheme = createDef(theme, "light")
  let keepData = createDef(opts?.keepData, true) // 保持后端返回数据的原有格式
  // 渲染模式 默认canvas
  const renderer = opts?.renderer
  echarts.use(createDef(renderer, 'canvas') === 'canvas' ? CanvasRenderer : SVGRenderer)
  //echarts图实例
  let echartInstance: EChartsType | undefined;

  //设置默认样式数据
  const defaultOption: EChartsOption = {
    backgroundColor: createDef(theme, "light") ? 'rgba(0,0,0,0)' : 'rgba(255,555,255,0)'
  }

  function addDefaultOption(option: EChartsOption) {
    Object.assign(defaultOption, option)
  }


  async function setOption(option: EChartsOption | EChartsOption[], theme?: string | object) {
    // 判断主题是否为默认主题，否则创建实例切换主题
    if (theme != lastTheme) {
      lastTheme = theme
      defaultOption.backgroundColor = createDef(theme, "light") ? 'rgba(0,0,0,0)' : 'rgba(255,555,255, 0)'
      if (echartInstance) {
        setOption(option, theme)
      }
    }

    // 等待el 被创建
    async function _waitElCreate() {
      if (!el.value) {
        await nextTick();
        _waitElCreate()
      }
    }

    if (!el.value) await _waitElCreate();

    // 创建echarts 实例
    if (!echartInstance) {
      echartInstance = echarts.init(el.value, theme);
    }

    if (!echartInstance) throw new Error("echarts 实例没有创建成功");

    if (isArray(option)) {
      echartInstance?.setOption(merge({}, defaultOption, ...(keepData ? option.map(fixOption) : option)), true)
    } else if (isObject(option)) {
      echartInstance?.setOption(merge({}, defaultOption, keepData ? fixOption(option) : option), true)
    } else {
      throw new Error("echarts option only support EChartsOption[] or EChartsOption");
    }
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
  }
}
