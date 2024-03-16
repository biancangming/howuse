<template>
  <b>echarts
    被阿帕奇合并之后，api在5.0开始发生一些不可逆转的转变，按需加载发生极大转变，建议使用
    5.0.1 + 版本，本模块基于5.3 + 版本实现 , 该版本内置typescript无需额外安装</b>
  <p>
    <b>简要说明：</b>
  </p>
  <p>1. 在原生代码基础上增加页面响应式自适应</p>
  <p>2. 提供基本图形组件模板，组件内部按需引入，降低按需引入的编码成本</p>
  <p>3. 默认内置了 GridComponent, LegendComponent, TooltipComponent, TitleComponent 几个常用组件，其余需要在使用时动态注入</p>
  <CodeView title="自适应折线图，其它自适应类似">
    <LineChartDemo />
    <template #code>
      <LineChartCode />
    </template>
  </CodeView>
  <CodeView title="柱状图">
    <BarEchartDemo />
    <template #code>
      <BarEchartCode />
    </template>
  </CodeView>
  <CodeView title="混入模式-柱状图举例">
    <MixBarEchartDemo />
    <template #code>
      <MixBarEchartCode />
    </template>
    <template #desc>
      支持多个option 同时传入,自动合并
    </template>
  </CodeView>
  <CodeView title="饼图">
    <PieEchartDemo />
    <template #code>
      <PieEchartCode />
    </template>
  </CodeView>
  <CodeView title="自定义">
    <BaseEchartDemo />
    <template #desc>
      适合组合图，例如柱状图和折线图组合使用，本示例还是用了toolbox
    </template>
    <template #code>
      <BaseEchartCode />
    </template>
  </CodeView>
  <CodeView title="地图模块演示">
    <Suspense>
      <MapChartDemo />
      <template #fallback>
        Loading...
      </template>
    </Suspense>
    <template #desc>
      适合组合图，例如柱状图和折线图组合使用，本示例还是用了toolbox
      <p>传入的code值参考  <b>https://gitee.com/bsxbl/geojson/raw/master/code.json 或者 https://www.mca.gov.cn/article/sj/xzqh/2020/202006/202008310601.shtml</b></p>
      <p>本插件使用100000，表示国内地图</p>
      <p>下载各大洲geojson：https://geojson-maps.ash.ms/</p>
      <p>国内geojson：https://geojson.cn/</p>
      <p>边界生成器： http://datav.aliyun.com/portal/school/atlas/area_generator#3.86/102.834000/34.951000</p>
    </template>
    <template #code>
      <MapChartCode />
    </template>
  </CodeView>
</template>
<script lang="ts" setup>
import LineChartDemo from "./demo/LineChart/index.vue";
import LineChartCode from "./demo/LineChart/index.md";
import BarEchartDemo from "./demo/BarEchart/index.vue";
import BarEchartCode from "./demo/BarEchart/index.md";
import MixBarEchartDemo from "./demo/MixInBarEchart/index.vue";
import MixBarEchartCode from "./demo/MixInBarEchart/index.md";
import PieEchartDemo from "./demo/PieEchart/index.vue";
import PieEchartCode from "./demo/PieEchart/index.md";
import BaseEchartDemo from "./demo/BaseChart/index.vue";
import BaseEchartCode from "./demo/BaseChart/index.md";
import MapChartDemo from "./demo/MapChart/index.vue";
import MapChartCode from "./demo/MapChart/index.md";
import CodeView from "@/components/CodeView.vue";
</script>