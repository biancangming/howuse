import { RuleObject } from "ant-design-vue/es/form/interface"
export interface Column {
  title: string;
  dataIndex: string;
  search?: boolean;// 是否为搜索项, 用于头部设置
  table?: boolean;
  select?: {
    api: string;
    change: () => void
  },
  operation?: OperationOpts[]
}

export type SearchItemType = "input" | "select" | "tree-select" | "date" | "date-range" | "time" | "time-range"

export interface SearchOpts {
  label: string;
  dataIndex: string; // 一般是后端需要的字段名称
  type?: SearchItemType;
  defaultValue?: any; // 默认值
  extraAttrs?: Record<string, any>; // 额外属性，用于传入原生组的属性，方便扩展设置

  // extraAttrs 扩展说明
  //api?: Promise<any>; // 个别组件需要, 如果需要参与全局拦截器，请传入axios实例，并且保证response未被重写
}

export interface CrudFormOpts extends SearchOpts {
  rules?: RuleObject[],
  [propName: string]: any; // 可携带任意其它参数
}