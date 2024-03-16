import { computed, defineComponent, h, reactive, ref } from 'vue'
import type { RenderableComponent, UseDraggableOptions } from '@vueuse/core'
import { useDraggable } from '@vueuse/core';
import { addResizeListener, removeResizeListener } from "howtools"

export interface UseDraggableProps extends UseDraggableOptions, RenderableComponent {
  position: [number, number],
  lockBoundary: boolean,
}

export const UseDraggable = defineComponent<UseDraggableProps>({
  name: 'UseDraggable',
  props: [
    'position',
    'handle',
    'lockBoundary', // 是否锁定最大的边界
  ] as unknown as undefined,
  setup(props, { slots, emit }) {
    const target = ref()
    const handle = computed(() => props.handle ?? target.value)

    // 获取初始值
    const position = props.position ? { x: props.position[0], y: props.position[1] } : { x: 0, y: 0 }

    const data = useDraggable(target, {
      handle,
      initialValue: position
    })

    // 获取边界值
    const bodyBoundary = ref({ x: 0, y: 0, width: 0, height: 0 })
    const bodyRect = () => bodyBoundary.value = document.body.getBoundingClientRect()
    onMounted(bodyRect)
    addResizeListener(document.body as HTMLDivElement, bodyRect)
    onUnmounted(() => {
      removeResizeListener(document.body as HTMLDivElement, bodyRect)
    })


    const dragStype = computed(() => {
      // 计算当前元素边界
      if (!props.lockBoundary)`top:${data.x.value}px;left:${data.y.value}px`
      if (!unref(target)) return `top:${data.x.value}px;left:${data.y.value}px`
      const targetRect = unref(target)?.getBoundingClientRect()
      const targetWidth = unref(targetRect)?.width
      const targetHeight = unref(targetRect).height
      // 姐u三拖动最大边界
      const _x = Math.min(Math.max(bodyBoundary.value.x, data.x.value), bodyBoundary.value.width - targetWidth)
      const _y = Math.min(Math.max(bodyBoundary.value.y, data.y.value), bodyBoundary.value.height - targetHeight)
      return `top:${_y}px;left:${_x}px`
    })

    return () => {
      if (slots.default)
        return h(props.as || 'div', { ref: target, style: `touch-action:none;${unref(dragStype)}` }, slots.default(reactive(data)))
    }
  },
})