<template>
  <span :class="prefixCls" ref="dragEl" :draggable="draggable" @drag="drag" @dragleave="dragleave"
    @dragstart="dragstart" @dragover="dragover" @dragend="dragend" @dragenter="dragenter" @drop="drop"
    dropeffect="move">
    <slot :dropData="dropData"></slot>
  </span>
</template>
<script lang="ts" setup>
import { usePrefixCls } from '../../less/useDesign';
import { useTransferContext } from './context';
import { PropType } from 'vue';
const props = defineProps({
  dragDom: {
    type: Boolean,
    default: true
  },
  draggable: {
    type: Boolean,
    default: true
  },
  data: {
    type: Object as PropType<any>
  },
})
const prefixCls = usePrefixCls("drag-drop")
const dragEl = ref()
const { setData, getData } = useTransferContext()
const dropData = shallowRef({})



const emit = defineEmits<{
  (e: "dragstart", ev: DragEventInit): void;
  (e: "drag", ev: DragEventInit): void;
  (e: "dragleave", ev: DragEventInit): void;
  (e: "dragenter", ev: DragEventInit): void;
  (e: "dragover", ev: DragEventInit): void;
  (e: "dragdrop", ev: DragEventInit): void;
  (e: "dragend", ev: DragEventInit): void;
  (e: "drop", ev: DragEventInit, { }): void;
}>()

// 拖动元素或选择文本时触发此事件。
function drag(ev) {
  emit("drag", ev);
}

// dragstart 拖拽行为开始
function dragstart(ev: DragEventInit) {
  setData({
    el: props.dragDom ?
      unref(dragEl).children[0] :
      undefined
    , data: props.data
  })
  emit("dragstart", ev);
}

// dragleave 拖拽元素离开拖拽对象
function dragleave(ev) {
  emit("dragleave", ev);
}

// dragenter 拖拽元素放置到目标元素上方
function dragenter(ev) {
  emit("dragenter", ev);
}

// dragover 拖拽到达目标元素上方
function dragover(ev) {
  ev.preventDefault();
  emit("dragover", ev);
}

// drop 放置元素触发
function drop(ev) {
  ev.preventDefault();
  const el = getData("el")
  dropData.value = getData("data")
  // 如果需要移动整个dom
  if (el) ev.target.appendChild(el);
  emit("drop", ev, { el, dropData: unref(dropData) });
}

// drop 放置元素触发
function dragend(ev) {
  emit("dragend", ev);
}
</script>
<style lang="less" scoped>
@prefixCls: ~"@{namespace}-drag-drop";

.@{prefixCls} {
  cursor: pointer;
  display: inline-block;
  width: 100%;
  height: 100%;
}
</style>