<template>
  <Mask :visible="visible">
    <div :class="prefixCls">
      <div :class="`${prefixCls}__header`" ref="handle">
        <div :class="`${prefixCls}__header--title`">
          {{title}}
        </div>
        <div :class="`${prefixCls}__header--close`" @click="close">X</div>
      </div>
      <div :class="`${prefixCls}__content`">
        <slot></slot>
      </div>
      <div :class="`${prefixCls}__footer`" v-if="isShowSlot('footer')">
        <slot name="footer"></slot>
      </div>
    </div>
  </Mask>
</template>
<script lang="ts" setup>
import { usePrefixCls } from '../../less/useDesign';
import { useVModel } from '@vueuse/core'
import { PropType } from 'vue';
import { Mask } from '..';

const slots = useSlots()
const isShowSlot = (name: string) => !!slots[name];

const handle = ref<HTMLElement | null>(null)

const prefixCls = usePrefixCls("jsonmask-dialog")

const props = defineProps({
  visible: {
    default: false,
    type: Boolean
  },
  position: {
    default: [0, 0],
    type: Array as unknown as PropType<[number, number]>
  },
  title: {
    default: "",
    type: String
  },
  closeExtraFunc: {
    default: () => ({}),
    type: Function
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
  props.closeExtraFunc()
}
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-jsonmask-dialog';

.@{prefix-cls} {
  min-width: 100px;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
  background-color: #FFF;
  display: inline-block;
  // position: fixed;
  z-index:~'@{defaultZIndex}';

  &__header {
    min-height: 55px;
    border-bottom: 1px solid #f0f0f0;
    border-radius: 2px 2px 0 0;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px;
    user-select: none;

    &--title {
      cursor: default;
      color: #000000d9;
      font-weight: 500;
    }

    &--close {
      font-weight: bold;
      cursor: pointer;
      padding: 12px;
    }
  }

  &__content {
    min-height: 100px;
    padding: 12px 14px;
  }

  &__footer {
    min-height: 55px;
    padding: 0 14px;
    border-top: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
  }
}
</style>