
<template>
    <div ref="outSideEl" :class="prefixCls">
      <slot></slot>
    </div>
</template>
<script lang="ts" setup>

import { usePrefixCls } from '../../less/useDesign';
import { useClickOutSide } from './useClickOutSide';

const prefixCls = usePrefixCls("out-side")

const emit = defineEmits<{
  (e: "clickSide", values: MouseEvent): void,
}>()

const outSideEl = ref()

useClickOutSide(outSideEl, (e) => {
  emit("clickSide", e)
})
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-out-side';

.@{prefix-cls}{
  display: inline-block;
}
</style>