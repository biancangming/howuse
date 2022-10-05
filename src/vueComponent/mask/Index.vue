<template>
  <teleport :to="props.to" v-if="visible">
    <div :style="{'background-color': bgColor }" :class="['mask-wrapper', positionClass]" @click="handleMask">
      <slot></slot>
    </div>
  </teleport>
</template>
<script lang="ts" setup>
import { PropType, TeleportProps } from 'vue';
const props = defineProps({
  to: {
    type: [String, null, undefined] as unknown as PropType<TeleportProps>,
    default: "body"
  },
  isBg: {
    type: Boolean,
    default: true
  },
  position: {
    type: String as PropType<"center" | "top" | "left" | "right" | "bottom" | "">,
    default: "center"
  },
  visible: {
    default: false,
    type: Boolean
  },
  isClickMaskClose: {
    default: true,
    type: Boolean
  }
})

const emit = defineEmits<{
  (e: "after-close", visile: boolean): void;
  (e: "update:visible", visile: boolean): void;
}>()

const bgColor = computed(() => props.isBg ? '#00000073' : '#00000000')
const positionClass = computed(() => {
  if (props.position === "center") {
    return "flex-center"
  } else if (props.position === "left") {
    return "flex-left"
  } else if (props.position === "right") {
    return "flex-right"
  } else if (props.position === "top") {
    return "flex-top"
  } else if (props.position === "bottom") {
    return "flex-bottom"
  } else {
    return ""
  }
})

// 点击关闭侧栏
function handleMask() {
  if (!props.isClickMaskClose) return // 打开此选项关闭
  emit("after-close", false)
  emit("update:visible", false)
}
</script>
<style lang="less" scoped>
.mask-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  &.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.flex-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  &.flex-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &.flex-top {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  &.flex-bottom {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>