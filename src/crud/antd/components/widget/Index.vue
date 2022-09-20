<template>
  <Input v-if="props.type === 'input'" v-bind="props"/>
  <Select v-else-if="props.type === 'select'" v-bind="props"/>
  <DatePicker v-else v-bind="props"/>
</template>
<script lang="ts" setup>
import Select from "./Select.vue"
import Input from "./Input.vue"
import DatePicker from "./DatePicker.vue"

import _props from "../itemcomposition/props";
const props = defineProps(_props);
</script>
<style lang="less" scoped>

</style>