import { computed, defineComponent, h, reactive, ref } from 'vue'
import type { RenderableComponent, UseDraggableOptions } from '@vueuse/core'
import { useDraggable } from '@vueuse/core';
import { addResizeListener, removeResizeListener, triggerWindowResize } from "howtools"

export interface UseDraggableProps extends UseDraggableOptions, RenderableComponent {
  position: [number, number],
  lockBoundary: boolean,
  boundary: HTMLElement
}

export const UseDraggable = defineComponent<UseDraggableProps>({
  name: 'UseDraggable',
  props: [
    'position',
    'handle',
    'lockBoundary', // 是否锁定最大的边界
    'boundary', // 边界元素
  ] as unknown as undefined,
  setup(props, { slots, emit }) {
    const target = ref() // 当前拖动的位置
    const handle = computed(() => props.handle ?? target.value) // 整体元素

    const data = useDraggable(target, {
      handle,
      initialValue: computed(() => props.position ? { x: props.position[0], y: props.position[1] } : { x: 0, y: 0 }),
    })

    // 获取边界值
    const bodyBoundary = ref({ x: 0, y: 0, width: 0, height: 0 })
    const bodyRect = () => {
      bodyBoundary.value = props.boundary.getBoundingClientRect()
    }
    onMounted(bodyRect)
    addResizeListener(props.boundary as HTMLDivElement, bodyRect)
    onUnmounted(() => removeResizeListener(props.boundary as HTMLDivElement, bodyRect))

    triggerWindowResize()
    const dragStype = computed(() => {
      // 计算当前元素边界
      if (!props.lockBoundary)`top:${data.x.value}px;left:${data.y.value}px`
      if (!unref(target)) return `top:${data.x.value}px;left:${data.y.value}px`
      const targetRect = unref(target)?.getBoundingClientRect()
      const targetWidth = unref(targetRect)?.width
      const targetHeight = unref(targetRect).height
      // 拖动最大边界
      const _x = Math.min(Math.max(bodyBoundary.value.x, data.x.value), bodyBoundary.value.width - targetWidth)
      const _y = Math.min(Math.max(bodyBoundary.value.y, data.y.value), bodyBoundary.value.height - targetHeight)
      // 修改data的值
      data.x.value = _x
      data.y.value = _y
      return `top:${_y}px;left:${_x}px`
    })

    return () => {
      if (slots.default)
        return h(props.as || 'div', { ref: target, style: `touch-action:none;${unref(dragStype)}` }, slots.default(reactive(data)))
    }
  },
})