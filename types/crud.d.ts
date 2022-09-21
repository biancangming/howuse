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

// type RuleObject = {
//   required: ?boolean;
//   message: ?string;
//   enum?: string;
//   len?: number;
//   max?: number;
//   min?: number;
//   pattern?: RegExp;
//   transform?: (val) => any;
//   trigger?: 'blur' | 'change' | ['change', 'blur'];
//   type?: "string" | "number" | "boolean" | "method" | "regexp" | "integer" | "float" | "array" | "object" | "enum" | "date" | "url" | "hex" | "email" | "any";
//   validator?: (rule, value, cb) => void;
//   whitespace?: boolean;
// }
export interface CrudFormOpts extends SearchOpts {
  rules?: RuleObject[]
}