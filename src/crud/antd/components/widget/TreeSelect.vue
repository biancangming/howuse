<template>
  <a-tree-select :tree-data="models.selectOpts" @change="changeSelectPicker" v-bind="{..._extraAttrs}" v-if="isSelectMultiple" v-model:value="models.selectVals">
  </a-tree-select>
  <a-tree-select :tree-data="models.selectOpts" @change="changeSelectPicker" v-bind="{..._extraAttrs}" v-else v-model:value="models.selectVal">
  </a-tree-select>
</template>
<script lang="ts" setup>
import { SelectValue } from "ant-design-vue/es/tree-select";
import { Emitter, EventType } from "mitt";
import { mittInjectKey, update } from "../..";
import { useChange } from "../itemcomposition/change";
import _props from "../itemcomposition/props";
import { findArrayFromObj } from "../itemcomposition/utils";
const props = defineProps(_props);
const emit = defineEmits(["change"]);
const change = useChange(props, emit)

const emitter = inject<Emitter<Record<EventType, unknown>>>(mittInjectKey)

const models = reactive({
  selectOpts: [], // 存储select下拉选项数据
  selectVal: undefined,// 下拉选框的值，不设置会造成无法选中，antd-vue 的问题
  selectVals: []
});

// 下拉选择是否支持多选
const isSelectMultiple = computed(() => props.extraAttrs.multiple === true)

// 参数配置
const _extraAttrs = computed(() => {
  const defaultRet = { ...props.extraAttrs }
  Reflect.deleteProperty(defaultRet, "onChange")
  // 是否展示全部下拉选项，默认不展示
  const { api, multiple } = props.extraAttrs;

  // mode="multiple" or mode="tags"
  if (multiple === true) {
    models.selectVals = props.defaultValue || []
  }

  // 自定义api直接返回响应值作为select下拉值，默认往下取三层
  const responseKey = props.extraAttrs.responseKey || "data"

  if(api && api.then){
    api.then((res) => {
      models.selectOpts = findArrayFromObj(res, responseKey) as never[]
    });
  }else{
    console.warn("tree-select 传入下拉选项api参数不正确，请参考axios 文档构造");
  }

  return defaultRet
})

// 监听事件 - 更新输入框数值
emitter?.on(update.updateSelectValue,({dataIndex, value}: any)=>{
  if(dataIndex == props.dataIndex){
    isSelectMultiple ? models.selectVals = value : models.selectVal = value
  }
})

// 监听事件 - 更新下拉数据
emitter?.on(update.updateSelectDropdownValue,({dataIndex, value}: any)=>{
  if(dataIndex == props.dataIndex){
    models.selectVals = []
    models.selectVal = undefined
    models.selectOpts = value
  }
})

// 下拉选择
function changeSelectPicker(val: SelectValue, labelList, extra) {
  change(val, labelList, extra)
}
</script>