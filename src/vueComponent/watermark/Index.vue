
<template>
  <div style="position: relative;">
    <div ref="marker" style="position: absolute; inset: 0;pointer-events: none;"></div>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { createMarkBase64 } from "./util"
const props = defineProps({
  text: {
    default: () => "水印",
    type: String
  },
  show: {
    default: true,
    type: Boolean
  },
  opacity: {
    default: 0.15
  }
})

const marker = ref<HTMLElement>(document.createElement("div"))

let lastMark = undefined

// 显示水印
async function showMark() {
  if (!unref(marker)) await nextTick()
  const d = unref(marker)
  d.style.zIndex = "1000"
  const src = lastMark ?? createMarkBase64(props.text, props.opacity)
  d.style.background = `url(${src})`
}

onMounted(() => { if (props.show) { showMark() } })

watch(
  [() => props.text, () => props.show],
  ([text, show]) => {
    if (show) { showMark() }
    else {
      const el = unref(marker) as HTMLElement
      el.style.background = ``
    }
  })
</script>
<style lang="less" scoped></style>