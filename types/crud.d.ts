import axios from 'axios';
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
  ref?: string | string[]; // 关联函数，如果添加了关联，会自动将所关联函数的所有对象暴露给当前函数，方便调用 , 值为任意dataIndex
  $refs?: Record<string, any>; // 不要自己去设置，没有用

  // extraAttrs 扩展说明
  //api?: Promise<any>; // 个别组件需要, 如果需要参与全局拦截器，请传入axios实例，并且保证response未被重写
}