<template>
  <div class="drag-wrapper">
    <div class="data-wrapper">
      <!-- how-drag-drop 默认宽高都是继承父元素100%， 
        拖放会将容器内部元素拖走，建议只有一个根元素，否则会有点问题 
      -->
      <how-drag-drop :dragDom="false" :data="{ name: '张三', age: 18 }">
        <div class="drag">HOWUSE</div>
      </how-drag-drop>
    </div>
    <div class="target-data-wrapper" ref="boundary">
      <!-- 单向拖动，该元素draggable设置为false -->
      <how-drag-drop :draggable="false" @drop="drop" style="position: relative">
        <template v-for="(postion, index) in postions">
          <UseDraggable :boundary="boundary" :position="[postion.x, postion.y]"
            @update-data="(data) => updataData(index, data)">
            <div class="drag">HOWUSE</div>
          </UseDraggable>
        </template>
      </how-drag-drop>
    </div>
    <div class="target-data-wrapper">
      {{ postions }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { HowDragDrop } from "howuse/vueComponent";
import { useDraggable } from "@vueuse/core";

const boundary = ref()
const postions = ref<{ x: number, y: number, data: [] }[]>([])

function drop(ev, data) {
  postions.value.push({ x: ev.offsetX, y: ev.offsetY, data: data.dropData })
}

function updataData(index, data) {
  postions.value[index] = { ...postions.value[index], x: data.x, y: data.y}
}

// 可拖拽组件容器
const UseDraggable = defineComponent<{ boundary: any; position: [number, number] }>({
  name: 'UseDraggable',
  props: [
    'position',
    'boundary', // 边界元素
  ] as unknown as undefined,
  setup(props, { slots, emit }) {
    const target = ref() // 当前拖动的位置
    const handle = computed(() => target.value)  // 整体元素

    const data = useDraggable(target, {
      handle,
      initialValue: computed(() => props.position ? { x: props.position[0], y: props.position[1] } : { x: 0, y: 0 }),
      containerElement: computed(() => props.boundary),
    })

    watchEffect(() => emit("update-data", data))

    return () => {
      if (slots.default)
        return h('div', { ref: target, style: `touch-action:none;position: absolute;${unref(data.style)}` }, slots.default(reactive(data)))
    }
  },
})
</script>
<style lang="less" scoped>
.drag-wrapper {
  display: flex;
  justify-content: space-around;
  gap: 20px;

  .data-wrapper {
    border: 1px dashed rgba(0, 0, 0, 0.608);
    height: 100px;
    width: 100px;
    padding: 10px;

    .drag {
      background-color: green;
      height: 100%;
    }
  }

  .target-data-wrapper {
    border: 1px dashed rgba(0, 0, 0, 0.608);
    height: 500px;
    width: 500px;
    position: relative;

    .drag {
      background-color: green;
      height: 100px;
      width: 100px;
    }
  }
}
</style>
