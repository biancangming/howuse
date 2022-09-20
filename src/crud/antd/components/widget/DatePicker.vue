<template>
  <!-- 日期/日期时间选择器 -->
  <a-date-picker v-if="props.type === 'date'" @change="changeDatePicker" v-bind="_extraAttrs"></a-date-picker>
  <!-- 日期/日期时间范围选择器 -->
  <a-range-picker v-else-if="props.type === 'date-range'" @change="changeRangeDatePicker" v-bind="_extraAttrs">
  </a-range-picker>
  <!-- 时间选择器 -->
  <a-time-picker v-else-if="props.type === 'time'" @change="changeTimePicker" v-bind="_extraAttrs" />
  <!-- 时间范围选择器 -->
  <a-time-range-picker v-else-if="props.type === 'time-range'" @change="changeTimeRangePicker" v-bind="_extraAttrs" />
  <!--下拉选择器 -->
</template>
<script lang="ts" setup>
import _props from "../itemcomposition/props";
import { isEmpty } from "howtools";
import { useChange } from '../itemcomposition/change';


const props = defineProps(_props);

const emit = defineEmits(["change"]);

const change = useChange(props, emit)


// 参数配置
const _extraAttrs = computed<Record<string, any>>(() => {
  const defaultRet = { ...props.extraAttrs, defaultValue: props.defaultValue }
  Reflect.deleteProperty(defaultRet, "onChange")
  if (props.type === "time-range" || props.type === "date-range") {
    if (isEmpty(defaultRet.defaultValue)) { defaultRet.defaultValue = [null, null] }
    return defaultRet
  } else if (props.type === "time" || props.type === "date") {
    if (!defaultRet.defaultValue) { defaultRet.defaultValue = null }
    return defaultRet
  } else {
    return defaultRet;
  }
});



// // --------------------a-date-picker-------------------------------
// // 修改日期选择器
function changeDatePicker(date: any, dateString: string) {
  change(dateString, date, dateString)
}

// // ----------------------a-range-date------------------------------------------
// // 修改日期范围选择器
function changeRangeDatePicker(date: any, dateString: [string, string]) {
  change(dateString, date, dateString)
}

// // ----------------------a-time-picker------------------------------------------
// // 修改时间选择器
function changeTimePicker(date: any, dateString: string) {
  change(dateString, date, dateString)
}

// // 时间范围选择器
function changeTimeRangePicker(date: any, dateString: [string, string]) {
  change(dateString, date, dateString)
}
</script>
<style lang="less" scoped>

</style>