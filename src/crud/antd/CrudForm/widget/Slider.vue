<template>
  <a-slider @change="changeSlider" v-model:value="silderValue" v-bind="{..._extraAttrs}"/>
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
const silderValue = ref(0)

const _extraAttrs = computed(() => {
  const defaultRet = { ...props.extraAttrs }
  silderValue.value = props.defaultValue
  Reflect.deleteProperty(defaultRet, "onChange")
  return defaultRet
})

// 监听事件
emitter?.on(update.updateSliderValue,({dataIndex, value}: any)=>{
  if(dataIndex == props.dataIndex){
    silderValue.value = value
    change(value)
  }
})

function changeSlider(val) {
  change(val, undefined)
}
</script>