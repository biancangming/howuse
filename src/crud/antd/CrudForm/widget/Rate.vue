<template>
  <a-rate @change="changeRate" v-model:value="rateVal" v-bind="{..._extraAttrs}" />
</template>
<script lang="ts" setup>
import { Emitter, EventType } from "mitt";
import { update } from "..";
import { useChange } from "../itemcomposition/change";
import _props from "../itemcomposition/props";
const props = defineProps(_props);
const emitter = inject<Emitter<Record<EventType, unknown>>>(props.mittKey)
const emit = defineEmits(["change"]);
const change = useChange(props, emit)
const rateVal = ref()

const _extraAttrs = computed(() => {
  const defaultRet = { ...props.extraAttrs }
  rateVal.value = props.defaultValue
  Reflect.deleteProperty(defaultRet, "onChange")
  return defaultRet
})

// 监听事件
emitter?.on(update.updateRateValue, ({ dataIndex, value }: any) => {
  if (dataIndex == props.dataIndex) {
    rateVal.value = value
    change(value, undefined)
  }
})

// 修改 a-rate
function changeRate(value: number) {
  change(value, undefined)
}
</script>