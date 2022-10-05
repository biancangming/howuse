<template>
  <Table :columns="[...columns, operations]" :actions="actions" v-bind="$attrs" :dataSource="[{operation:11}]">
    <template v-for="(_,name) in slots" #[name]>
      <slot :name="name"></slot>
    </template>
  </Table>
</template>
<script lang="ts" setup>
import Table from "./components/Table.vue"
import { PropType } from 'vue';

const slots = useSlots()

const props = defineProps({
  columns: {
    default: () => [],
    type: Array as PropType<any[]>
  },
  actions: {
    default: () => [],
    type: Array as PropType<any[]>
  }
})

const columns = computed(() => props.columns?.map(item => ({ ...item, title: item.label })))
const operations = computed(() => {
  if (props.actions.length === 0) return {}
  const divEle = document.createElement("div")
  divEle.style.display = "inline-block"
  divEle.innerText = "仓"
  document.body.appendChild(divEle)
  const textWidth = divEle.clientWidth // 计算页面文字宽度
  divEle.remove()

  const textPix = props.actions.map(item => item.label).join("").length * textWidth; // 计算大概文字宽度，常规是16px

  return {
    title: "操作",
    dataIndex: "operation",
    fixed: 'right',
    width: `${textPix + (props.actions.length - 1) * 8 + 32}px` // 32 是默认padding 距离
  }
})
</script>