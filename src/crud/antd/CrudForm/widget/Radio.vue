<template>
  <a-radio-group @change="changeRadioPicker" v-bind="_extraAttrs" v-model:value="models.radioVal">
    <a-radio v-for="s in models.radioOpts" :key="s[models.radioOptsVal]" :value="s[models.radioOptsVal]">{{
    s[models.radioOptsName] }}</a-radio>
  </a-radio-group>
</template>
<script lang="ts" setup>
import { RadioChangeEvent } from "ant-design-vue/es";
import { Emitter, EventType } from "mitt";
import { update } from "..";
import { useChange } from "../itemcomposition/change";
import _props from "../itemcomposition/props";
import { findArrayFromObj } from "../itemcomposition/utils";
const props = defineProps(_props);
const emit = defineEmits(["change"]);
const change = useChange(props, emit)

const emitter = inject<Emitter<Record<EventType, unknown>>>(props.mittKey)

const models = reactive({
  radioOpts: [], // 存储select下拉选项数据
  radioOptsName: "", // 存储select下拉选项展示的名字
  radioOptsVal: "", // 存储select下拉选项值的key
  radioVal: undefined,// 下拉选框的值，不设置会造成无法选中，antd-vue 的问题
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
      "radio 必须在 extraAttrs 指定参数 name value 分别代表select下拉数据的显示的名字和选定的值"
    );
    return {};
  }
  models.radioOptsName = name;
  models.radioOptsVal = value;

  // 自定义api直接返回响应值作为select下拉值，默认往下取三层
  const responseKey = props.extraAttrs.responseKey || "data"

  if(api && api.then){
    api.then((res) => {
      models.radioOpts = findArrayFromObj(res, responseKey) as never[]
    });
  }else{
    console.warn("radio 传入下拉选项api参数不正确，请参考axios 文档构造");
  }

  return defaultRet
})

// 监听事件 - 更新单选数值
emitter?.on(update.updateRadioValue,({dataIndex, value}: any)=>{
  if(dataIndex == props.dataIndex){
    changeRadioPicker(value)
  }
})

// 监听事件 - 更新选择数据
emitter?.on(update.updateRadioGroupValue,({dataIndex, value}: any)=>{
  if(dataIndex == props.dataIndex){
    models.radioVal = undefined
    models.radioOptsVal = value
  }
})

// 修改数值
function changeRadioPicker(e: RadioChangeEvent) {
  const val = (e.target as any).value
  change(val, e)
}
</script>