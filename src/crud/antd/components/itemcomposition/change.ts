import { isArray } from "howtools";

// 修改item值传递到seachbar , args 用于兼容原始的change事件
export function useChange(props, emit) { 
  if (props.defaultValue && (props.type === "date-range" || props.type === "time-range")) {
    if (!isArray(props.defaultValue)) {
      console.warn(props.type, props.dataIndex, "这里的值应该是一个数组");
    }
  }
  function change(val, ...args) {
    if(!props.dataIndex) return
    emit("change", {
      dataIndex: props.dataIndex,
      val: val || props.defaultValue,
    });
    props.extraAttrs.onChange && props.extraAttrs.onChange.call(props, val || props.defaultValue, ...args)
  }
  return change
}