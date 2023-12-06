import { use } from "echarts/core"
import { useBaseECharts } from "./baseChart"
import { useGeoJsonMap } from "./composition/uesGeoMap"

const BaseChart = defineAsyncComponent(() => import("./components/BaseChart.vue"))

const BarChart = defineAsyncComponent(async () => {
    const { BarChart } = await import("echarts/charts")
    use(BarChart)
    return import("./components/BaseChart.vue")
})

const LineChart = defineAsyncComponent(async () => {
    const { LineChart } = await import("echarts/charts")
    use(LineChart)
    return import("./components/BaseChart.vue")
})

const LinesChart = defineAsyncComponent(async () => {
    const { LinesChart } = await import("echarts/charts")
    use(LinesChart)
    return import("./components/BaseChart.vue")
})

const BoxplotChart = defineAsyncComponent(async () => {
    const { BoxplotChart } = await import("echarts/charts")
    use(BoxplotChart)
    return import("./components/BaseChart.vue")
})

const CandlestickChart = defineAsyncComponent(async () => {
    const { CandlestickChart } = await import("echarts/charts")
    use(CandlestickChart)
    return import("./components/BaseChart.vue")
})
const CustomChart = defineAsyncComponent(async () => {
    const { CustomChart } = await import("echarts/charts")
    use(CustomChart)
    return import("./components/BaseChart.vue")
})
const EffectScatterChart = defineAsyncComponent(async () => {
    const { EffectScatterChart } = await import("echarts/charts")
    use(EffectScatterChart)
    return import("./components/BaseChart.vue")
})
const FunnelChart = defineAsyncComponent(async () => {
    const { FunnelChart } = await import("echarts/charts")
    use(FunnelChart)
    return import("./components/BaseChart.vue")
})
const GaugeChart = defineAsyncComponent(async () => {
    const { GaugeChart } = await import("echarts/charts")
    use(GaugeChart)
    return import("./components/BaseChart.vue")
})
const GraphChart = defineAsyncComponent(async () => {
    const { GraphChart } = await import("echarts/charts")
    use(GraphChart)
    return import("./components/BaseChart.vue")
})
const HeatmapChart = defineAsyncComponent(async () => {
    const { HeatmapChart } = await import("echarts/charts")
    use(HeatmapChart)
    return import("./components/BaseChart.vue")
})
const MapChart = defineAsyncComponent(async () => {
    const { MapChart } = await import("echarts/charts")
    use(MapChart)
    return import("./components/BaseChart.vue")
})
const ParallelChart = defineAsyncComponent(async () => {
    const { ParallelChart } = await import("echarts/charts")
    use(ParallelChart)
    return import("./components/BaseChart.vue")
})
const PictorialBarChart = defineAsyncComponent(async () => {
    const { PictorialBarChart } = await import("echarts/charts")
    use(PictorialBarChart)
    return import("./components/BaseChart.vue")
})
const PieChart = defineAsyncComponent(async () => {
    const { PieChart } = await import("echarts/charts")
    use(PieChart)
    return import("./components/BaseChart.vue")
})
const RadarChart = defineAsyncComponent(async () => {
    const { RadarChart } = await import("echarts/charts")
    use(RadarChart)
    return import("./components/BaseChart.vue")
})
const ScatterChart = defineAsyncComponent(async () => {
    const { ScatterChart } = await import("echarts/charts")
    use(ScatterChart)
    return import("./components/BaseChart.vue")
})
const SunburstChart = defineAsyncComponent(async () => {
    const { SunburstChart } = await import("echarts/charts")
    use(SunburstChart)
    return import("./components/BaseChart.vue")
})
const ThemeRiverChart = defineAsyncComponent(async () => {
    const { ThemeRiverChart } = await import("echarts/charts")
    use(ThemeRiverChart)
    return import("./components/BaseChart.vue")
})
const TreemapChart = defineAsyncComponent(async () => {
    const { TreemapChart } = await import("echarts/charts")
    use(TreemapChart)
    return import("./components/BaseChart.vue")
})
const SankeyChart = defineAsyncComponent(async () => {
    const { SankeyChart } = await import("echarts/charts")
    use(SankeyChart)
    return import("./components/BaseChart.vue")
})
const TreeChart = defineAsyncComponent(async () => {
    const { TreeChart } = await import("echarts/charts")
    use(TreeChart)
    return import("./components/BaseChart.vue")
})

export {
    useBaseECharts,
    useGeoJsonMap,
    BarChart as HowBarChart,
    BaseChart as HowBaseChart,
    BoxplotChart as HowBoxplotChart,
    CandlestickChart as HowCandlestickChart,
    CustomChart as HowCustomChart,
    EffectScatterChart as HowEffectScatterChart,
    FunnelChart as HowFunnelChart,
    GaugeChart as HowGaugeChart,
    GraphChart as HowGraphChart,
    HeatmapChart as HowHeatmapChart,
    LineChart as HowLineChart,
    LinesChart as HowLinesChart,
    MapChart as HowMapChart,
    ParallelChart as HowParallelChart,
    PictorialBarChart as HowPictorialBarChart,
    PieChart as HowPieChart,
    RadarChart as HowRadarChart,
    SankeyChart as HowSankeyChart,
    ScatterChart as HowScatterChart,
    SunburstChart as HowSunburstChart,
    ThemeRiverChart as HowThemeRiverChart,
    TreeChart as HowTreeChart,
    TreemapChart as HowTreemapChart,
}