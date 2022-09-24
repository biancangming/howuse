<template>
  <a-checkbox-group @change="changeCheckboxPicker" v-bind="_extraAttrs" v-model:value="models.checkboxVal">
    <a-checkbox v-for="s in models.checkboxOpts" :key="s[models.checkboxOptsVal]" :value="s[models.checkboxOptsVal]">{{
    s[models.checkboxOptsName] }}</a-checkbox>
  </a-checkbox-group>
</template>
<script lang="ts" setup>
import { CheckboxValueType } from "ant-design-vue/es/checkbox/interface";
import { Emitter, EventType } from "mitt";
import { mittInjectKey, update } from "..";
import { useChange } from "../itemcomposition/change";
import _props from "../itemcomposition/props";
import { findArrayFromObj } from "../itemcomposition/utils";
const props = defineProps(_props);
const emit = defineEmits(["change"]);
const change = useChange(props, emit)

const emitter = inject<Emitter<Record<EventType, unknown>>>(mittInjectKey)

const models = reactive({
  checkboxOpts: [], // 存储select下拉选项数据
  checkboxOptsName: "", // 存储select下拉选项展示的名字
  checkboxOptsVal: "", // 存储select下拉选项值的key
  checkboxVal: undefined,// 下拉选框的值，不设置会造成无法选中，antd-vue 的问题
});

// 参数配置
const _extraAttrs = computed(() => {
  const defaultRet = { ...props.extraAttrs }
  Reflect.deleteProperty(defaultRet, "onChange")
  // 是否展示全部下拉选项，默认不展示
  const { api, name, value, mode, onSearch } = props.extraAttrs;
  // if (!api) console.warn("传入下拉选项api参数不正确，请参考axios 文档构造");
  if (!name || !value) {
    console.warn(
      "checkbox 必须在 extraAttrs 指定参数 name value 分别代表select下拉数据的显示的名字和选定的值"
    );
    return {};
  }
  models.checkboxOptsName = name;
  models.checkboxOptsVal = value;

  // 自定义api直接返回响应值作为select下拉值，默认往下取三层
  const responseKey = props.extraAttrs.responseKey || "data"

  if(api && api.then){
    api.then((res) => {
      models.checkboxOpts = findArrayFromObj(res, responseKey) as never[]
    });
  }else{
    console.warn("checkbox 传入下拉选项api参数不正确，请参考axios 文档构造");
  }

  return defaultRet
})

// 监听事件 - 更新单选数值
emitter?.on(update.updateCheckboxValue,({dataIndex, value}: any)=>{
  if(dataIndex == props.dataIndex){
    changeCheckboxPicker(value)
  }
})

// 监听事件 - 更新选择数据
emitter?.on(update.updateCheckboxGroupValue,({dataIndex, value}: any)=>{
  if(dataIndex == props.dataIndex){
    models.checkboxVal = undefined
    models.checkboxOptsVal = value
  }
})

// 修改数值
function changeCheckboxPicker(e: CheckboxValueType[]) {
  change(e, undefined)
}
</script>