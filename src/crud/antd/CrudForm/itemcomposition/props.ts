import { SearchItemType } from "types/crud";
import { PropType } from "vue";

export default {
  type: {
    default: "input",
    type: String as PropType<SearchItemType>,
  },
  label: {
    default: "",
    type: String,
  },
  dataIndex: {
    default: "",
    type: String,
  },
  defaultValue: {
    // 默认值设置
    default: undefined,
    type: [String, Number, Array, null, undefined] as PropType<any>,
  },
  mittKey: {
    // 传递事件总线
    default: "",
    type: String,
  },
  extraAttrs: {
    default: () => ({}),
    type: Object,
  },
}
