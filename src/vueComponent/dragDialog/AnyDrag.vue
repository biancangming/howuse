<template>
  <Draggable :class="prefixCls" v-slot="{ x, y }" :handle="handle" :prevent-default="true" v-if="visible"
    v-model:position="position">
    <slot :x="x" :y="y"></slot>
  </Draggable>
</template>
<script lang="ts" setup>
import { usePrefixCls } from '../../less/useDesign';
import { useVModel } from '@vueuse/core'
import { UseDraggable as Draggable } from './component'
import { PropType } from 'vue';
const slots = useSlots()
const isShowSlot = (name: string) => !!slots[name];

const handle = ref<HTMLElement | null>(null)

const prefixCls = usePrefixCls("drag-dialog")

const props = defineProps({
  visible: {
    default: false,
    type: Boolean
  },
  position: {
    default: [0, 0],
    type: Array as unknown as PropType<[number, number]>
  }
})

const emit = defineEmits<{
  (e: "update:visible", visible: boolean): void;
  (e: "after-close", visible: boolean): void;
}>()


useVModel(props, "visible", emit)


function close() {
  emit("update:visible", false)
  emit("after-close", false)
}
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-drag-dialog';

.@{prefix-cls} {
  min-width: 100px;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
  background-color: #FFF;
  display: inline-block;
  position: fixed;
  z-index:~'@{defaultZIndex}';
  user-select: none;
}
</style>