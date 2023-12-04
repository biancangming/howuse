import * as echarts from "echarts/core"
import { useBaseECharts } from "./baseChart"
import { useGeoJsonMap } from "./composition/uesGeoMap"

const BaseChart = defineAsyncComponent(() => import("./components/BaseChart.vue"))

const BarChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ BarChart }) => {
        echarts.use(BarChart)
    })
    return import("./components/BaseChart.vue")
})

const LineChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ LineChart }) => {
        echarts.use(LineChart)
    })
    return import("./components/BaseChart.vue")
})

const LinesChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ LinesChart }) => {
        echarts.use(LinesChart)
    })
    return import("./components/BaseChart.vue")
})

const BoxplotChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ BoxplotChart }) => {
        echarts.use(BoxplotChart)
    })
    return import("./components/BaseChart.vue")
})

const CandlestickChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ CandlestickChart }) => {
        echarts.use(CandlestickChart)
    })
    return import("./components/BaseChart.vue")
})
const CustomChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ CustomChart }) => {
        echarts.use(CustomChart)
    })
    return import("./components/BaseChart.vue")
})
const EffectScatterChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ EffectScatterChart }) => {
        echarts.use(EffectScatterChart)
    })
    return import("./components/BaseChart.vue")
})
const FunnelChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ FunnelChart }) => {
        echarts.use(FunnelChart)
    })
    return import("./components/BaseChart.vue")
})
const GaugeChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ GaugeChart }) => {
        echarts.use(GaugeChart)
    })
    return import("./components/BaseChart.vue")
})
const GraphChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ GraphChart }) => {
        echarts.use(GraphChart)
    })
    return import("./components/BaseChart.vue")
})
const HeatmapChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ HeatmapChart }) => {
        echarts.use(HeatmapChart)
    })
    return import("./components/BaseChart.vue")
})
const MapChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ MapChart }) => {
        echarts.use(MapChart)
    })
    return import("./components/BaseChart.vue")
})
const ParallelChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ ParallelChart }) => {
        echarts.use(ParallelChart)
    })
    return import("./components/BaseChart.vue")
})
const PictorialBarChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ PictorialBarChart }) => {
        echarts.use(PictorialBarChart)
    })
    return import("./components/BaseChart.vue")
})
const PieChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ PieChart }) => {
        echarts.use(PieChart)
    })
    return import("./components/BaseChart.vue")
})
const RadarChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ RadarChart }) => {
        echarts.use(RadarChart)
    })
    return import("./components/BaseChart.vue")
})
const ScatterChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ ScatterChart }) => {
        echarts.use(ScatterChart)
    })
    return import("./components/BaseChart.vue")
})
const SunburstChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ SunburstChart }) => {
        echarts.use(SunburstChart)
    })
    return import("./components/BaseChart.vue")
})
const ThemeRiverChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ ThemeRiverChart }) => {
        echarts.use(ThemeRiverChart)
    })
    return import("./components/BaseChart.vue")
})
const TreemapChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ TreemapChart }) => {
        echarts.use(TreemapChart)
    })
    return import("./components/BaseChart.vue")
})
const SankeyChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ SankeyChart }) => {
        echarts.use(SankeyChart)
    })
    return import("./components/BaseChart.vue")
})
const TreeChart = defineAsyncComponent(() => {
    import("echarts/charts").then(({ TreeChart }) => {
        echarts.use(TreeChart)
    })
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