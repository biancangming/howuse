
<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { createMarkBase64 } from "./util"
const wrapper = ref<HTMLElement>()
const props = defineProps({
  text: {
    default: () => "水印",
    type: String
  },
  show: {
    default: true,
    type: Boolean
  }
})

let lastMark = undefined

// 显示水印
function showMark() {
  const src = lastMark ?? createMarkBase64(props.text)
  const el = unref(wrapper) as HTMLElement
  el.style.background = `url(${src})`
}

onMounted(() => { if (props.show) { showMark() } })

watch(
  [() => props.text, () => props.show],
  ([text, show]) => {
    if (show) { showMark() }
    else {
      const el = unref(wrapper) as HTMLElement
      el.style.background = ``
    }
  })
</script>
<style lang="less" scoped>

</style>