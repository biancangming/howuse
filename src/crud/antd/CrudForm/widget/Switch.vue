<template>
  <a-switch @change="changeSwitch" v-model:checked="switchVal" v-bind="{..._extraAttrs}"/>
</template>
<script lang="ts" setup>
import { Emitter, EventType } from "mitt";
import { mittInjectKey, update } from "..";
import { useChange } from "../itemcomposition/change";
import _props from "../itemcomposition/props";
const emitter = inject<Emitter<Record<EventType, unknown>>>(mittInjectKey)
const props = defineProps(_props);
const emit = defineEmits(["change"]);
const change = useChange(props, emit)
const switchVal = ref(false)

const _extraAttrs = computed(() => {
  const defaultRet = { ...props.extraAttrs }
  switchVal.value = props.defaultValue
  Reflect.deleteProperty(defaultRet, "onChange")
  return defaultRet
})

// 监听事件
emitter?.on(update.updateSwitchValue,({dataIndex, value}: any)=>{
  if(dataIndex == props.dataIndex){
    switchVal.value = value
    change(value)
  }
})

function changeSwitch(checked, e: Event) {
  change(checked, e)
}
</script>