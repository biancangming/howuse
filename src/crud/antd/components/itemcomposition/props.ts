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
    default: "",
    type: [String, Number, Array, null, undefined] as PropType<any>,
  },
  extraAttrs: {
    default: () => ({}),
    type: Object,
  },
}
