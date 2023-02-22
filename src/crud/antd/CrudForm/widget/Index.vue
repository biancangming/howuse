<template>
  <Input v-if="props.type === 'input'" v-bind="props"/>
  <Select v-else-if="props.type === 'select'" v-bind="props"/>
  <Switch v-else-if="props.type === 'switch'" v-bind="props"/>
  <Slider v-else-if="props.type === 'slider'" v-bind="props"/>
  <Radio v-else-if="props.type === 'radio'" v-bind="props"/>
  <Checkbox v-else-if="props.type === 'checkbox'" v-bind="props"/>
  <Rate v-else-if="props.type === 'rate'" v-bind="props"/>
  <Upload v-else-if="props.type === 'upload'" v-bind="props"/>
  <TreeSelect v-else-if="props.type === 'tree-select'" v-bind="props"/>
  <SlotComponent v-else-if="props.type === 'slot'" v-bind="props"/>
  <DatePicker v-else v-bind="props"/>
</template>
<script lang="ts" setup>
import Select from "./Select.vue"
import Switch from "./Switch.vue"
import Slider from "./Slider.vue"
import Radio from "./Radio.vue"
import Upload from "./Upload.vue"
import Checkbox from "./Checkbox.vue"
import Rate from "./Rate.vue"
import TreeSelect from "./TreeSelect.vue"
import Input from "./Input.vue"
import DatePicker from "./DatePicker.vue"
import SlotComponent from './SlotComponent.tsx'

import _props from "../itemcomposition/props";
const props = defineProps(_props);
</script>
<style lang="less" scoped>

</style>
