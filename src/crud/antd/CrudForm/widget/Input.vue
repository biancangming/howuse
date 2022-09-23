<template>
  <a-input @change="changeInput" v-model:value="inputVal" v-bind="{..._extraAttrs}" autocomplete="off"/>
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
const inputVal = ref()

const _extraAttrs = computed(() => {
  const defaultRet = { ...props.extraAttrs }
  inputVal.value = props.defaultValue
  Reflect.deleteProperty(defaultRet, "onChange")
  return defaultRet
})

// 监听事件
emitter?.on(update.updateInputValue,({dataIndex, value}: any)=>{
  if(dataIndex == props.dataIndex){
    inputVal.value = value
    change(value)
  }
})

// 修改输入框 a-input
function changeInput(e: Event) {
  
  const val = (e.target as any).value
  
  change(val, e)
}
</script>