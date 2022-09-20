<template>
  <a-select v-if="isSelectMultiple" @change="changeSelectPicker" v-bind="_extraAttrs" v-model:value="models.selectVals">
    <a-select-option key="all" value="" v-if="all">全部</a-select-option>
    <a-select-option v-for="s in models.selectOpts" :key="s[models.selectOptsVal]" :value="s[models.selectOptsVal]">{{
    s[models.selectOptsName] }}</a-select-option>
  </a-select>
  <a-select v-else @change="changeSelectPicker" v-bind="_extraAttrs" v-model:value="models.selectVal">
    <a-select-option key="all" value="" v-if="all">全部</a-select-option>
    <a-select-option v-for="s in models.selectOpts" :key="s[models.selectOptsVal]" :value="s[models.selectOptsVal]">{{
    s[models.selectOptsName] }}</a-select-option>
  </a-select>
</template>
<script lang="ts" setup>
import { SelectValue } from "ant-design-vue/es/select";
import { useChange } from "../itemcomposition/change";
import _props from "../itemcomposition/props";
import { findArrayFromObj } from "../itemcomposition/utils";
const props = defineProps(_props);
const emit = defineEmits(["change"]);
const change = useChange(props, emit)

const models = reactive({
  selectOpts: [], // 存储select下拉选项数据
  selectOptsName: "", // 存储select下拉选项展示的名字
  selectOptsVal: "", // 存储select下拉选项值的key
  selectVal: "",// 下拉选框的值，不设置会造成无法选中，antd-vue 的问题
  selectVals: []
});

// 下拉选择是否支持多选
const isSelectMultiple = computed(() => props.extraAttrs.mode === "multiple" || props.extraAttrs.mode === "tags")
const all = computed(() => props.extraAttrs.all === true)
// 参数配置
const _extraAttrs = computed(() => {
  const defaultRet = { ...props.extraAttrs, defaultValue: props.defaultValue }
  Reflect.deleteProperty(defaultRet, "onChange")
  // 是否展示全部下拉选项，默认不展示
  const { api, name, value, mode } = props.extraAttrs;
  if (!api) console.warn("传入下拉选项api参数不正确，请参考axios 文档构造");
  if (!name || !value) {
    console.warn(
      "selcet 必须在 extraAttrs 指定参数 name value 分别代表select下拉数据的显示的名字和选定的值"
    );
    return {};
  }
  models.selectOptsName = name;
  models.selectOptsVal = value;

  // mode="multiple" or mode="tags"
  if (mode === "multiple" || mode === "tags") {
    defaultRet.defaultValue = []
    models.selectVals = []
  }

  // 自定义api直接返回响应值作为select下拉值，默认往下取三层
  const responseKey = props.extraAttrs.responseKey || "data"
  api.then((res) => {
    models.selectOpts = findArrayFromObj(res, responseKey) as never[]
  });

  return defaultRet
})

// 下拉选择
function changeSelectPicker(val: SelectValue) {
  change(val, val)
}
</script>
<style lang="less" scoped>

</style>