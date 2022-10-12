<template>
  <!-- 日期/日期时间选择器 -->
  <a-date-picker v-if="props.type === 'date'" @change="changeDatePicker" v-model:value="datePicker"
    v-bind="_extraAttrs"></a-date-picker>
  <!-- 日期/日期时间范围选择器 -->
  <a-range-picker v-else-if="props.type === 'date-range'" @change="changeRangeDatePicker" v-model:value="datePicker"
    v-bind="_extraAttrs">
  </a-range-picker>
  <!-- 时间选择器 -->
  <a-time-picker v-else-if="props.type === 'time'" @change="changeTimePicker" v-model:value="datePicker"
    v-bind="_extraAttrs" />
  <!-- 时间范围选择器 -->
  <a-time-range-picker v-else-if="props.type === 'time-range'" @change="changeTimeRangePicker"
    v-model:value="datePicker" v-bind="_extraAttrs" />
  <!--下拉选择器 -->
</template>
<script lang="ts" setup>
import _props from "../itemcomposition/props";
import { isEmpty, isArray } from 'howtools';
import { useChange } from '../itemcomposition/change';
import { Emitter, EventType } from "mitt";
import { update } from "..";
import dayjs from 'dayjs';

const datePicker = ref()

const props = defineProps(_props);
const emitter = inject<Emitter<Record<EventType, unknown>>>(props.mittKey)

const emit = defineEmits(["change"]);

const change = useChange(props, emit)


// 参数配置
const _extraAttrs = computed<Record<string, any>>(() => {
  const defaultRet = { ...props.extraAttrs }
  Reflect.deleteProperty(defaultRet, "onChange")
  if (props.extraAttrs.format && props.extraAttrs.valueFormat === undefined) {
    props.extraAttrs.valueFormat = props.extraAttrs.format
  }
  if (props.type === "time-range" || props.type === "date-range") {
    if (isEmpty(defaultRet.defaultValue)) { datePicker.value = props.defaultValue || [null, null] }
    return defaultRet
  } else if (props.type === "time" || props.type === "date") {
    if (!defaultRet.defaultValue) { datePicker.value = props.defaultValue || null }
    return defaultRet
  } else {
    return defaultRet;
  }
});



// // --------------------a-date-picker-------------------------------
// // 修改日期选择器
function changeDatePicker(date: any, dateString: string) {
  change(date, dateString)
}

// // ----------------------a-range-date------------------------------------------
// // 修改日期范围选择器
function changeRangeDatePicker(date: any, dateString: [string, string]) {
  change(date, dateString)
}

// // ----------------------a-time-picker------------------------------------------
// // 修改时间选择器
function changeTimePicker(date: any, dateString: string) {
  change(date, dateString)
}

// // 时间范围选择器
function changeTimeRangePicker(date: any, dateString: [string, string]) {
  change(date, dateString)
}

// 监听事件 - 更新单选数值
emitter?.on(update.updateAnyDatePicker, ({ dataIndex, value }: any) => {
  // 修复错误的时间格式
  const fixValue = () => {
    const isValid = (val: any) => dayjs(val).isValid()
    if (isArray(value)) {
      if (isValid(value[0]) && isValid(value[1])) {
        return [dayjs(new Date(value[0] as string)), dayjs(new Date(value[1] as string))]
      } else {
        if (!(value[0] === "" && value[1] === "")) {
          console.warn("传入的时间格式似乎不正确，请检查，一般为两个字符串元组")
        }
        return [undefined, undefined]
      }
    } else {
      if (isValid(value)) {
        return dayjs(new Date(value))
      } else {
        if (!(value === "")) {
          console.warn("传入的时间格式似乎不正确，请检查，一般为字符串")
        }
        return undefined
      }
    }
  }

  const _fixVal = fixValue()

  // 根据类型，选择时间选择器
  if (dataIndex == props.dataIndex) {
    switch (props.type) {
      case 'date':
        changeDatePicker(_fixVal, value)
        break;
      case 'time':
        changeTimePicker(_fixVal, value)
        break;
      case 'date-range':
        changeRangeDatePicker(_fixVal, value)
        break;
      case 'time-range':
        changeTimeRangePicker(_fixVal, value)
        break;
      default:
        break;
    }

    datePicker.value = _fixVal
  }
})

</script>
<style lang="less" scoped>
.ant-picker {
  width: 100%;
}
</style>