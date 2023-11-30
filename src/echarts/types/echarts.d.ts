declare type ThemeOption = Dictionary<any>; // 复制文件
declare type HowEchartsTheme = 'light' | 'dark' | ThemeOption // 复制文件
declare type RendererType = 'canvas' | 'svg'; // 复制文件
// 复制文件
declare const _default: {
  time: {
    month: string[];
    monthAbbr: string[];
    dayOfWeek: string[];
    dayOfWeekAbbr: string[];
  };
  legend: {
    selector: {
      all: string;
      inverse: string;
    };
  };
  toolbox: {
    brush: {
      title: {
        rect: string;
        polygon: string;
        lineX: string;
        lineY: string;
        keep: string;
        clear: string;
      };
    };
    dataView: {
      title: string;
      lang: string[];
    };
    dataZoom: {
      title: {
        zoom: string;
        back: string;
      };
    };
    magicType: {
      title: {
        line: string;
        bar: string;
        stack: string;
        tiled: string;
      };
    };
    restore: {
      title: string;
    };
    saveAsImage: {
      title: string;
      lang: string[];
    };
  };
  series: {
    typeNames: {
      pie: string;
      bar: string;
      line: string;
      scatter: string;
      effectScatter: string;
      radar: string;
      tree: string;
      treemap: string;
      boxplot: string;
      candlestick: string;
      k: string;
      heatmap: string;
      map: string;
      parallel: string;
      lines: string;
      graph: string;
      sankey: string;
      funnel: string;
      gauge: string;
      pictorialBar: string;
      themeRiver: string;
      sunburst: string;
    };
  };
  aria: {
    general: {
      withTitle: string;
      withoutTitle: string;
    };
    series: {
      single: {
        prefix: string;
        withName: string;
        withoutName: string;
      };
      multiple: {
        prefix: string;
        withName: string;
        withoutName: string;
        separator: {
          middle: string;
          end: string;
        };
      };
    };
    data: {
      allData: string;
      partialData: string;
      withName: string;
      withoutName: string;
      separator: {
        middle: string;
        end: string;
      };
    };
  };
};

declare type LocaleOption = typeof _default; // 复制文件

declare type EChartsInitOpts = { // 复制文件
  locale?: string | LocaleOption;
  renderer?: RendererType;
  devicePixelRatio?: number;
  useDirtyRect?: boolean;
  ssr?: boolean;
  width?: number;
  height?: number;
};
export declare interface HowEchartsInitOpts extends EChartsInitOpts {
  chartType?: string;
  keepData?: boolean; // 用于保持原数据格式，默认开启。例如： 1.0 保存为 1.0 
}