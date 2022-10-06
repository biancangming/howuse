import { computed, defineComponent, h, reactive, ref } from 'vue'
import type { RenderableComponent, UseDraggableOptions } from '@vueuse/core'
import { useDraggable, useVModel } from '@vueuse/core';

export interface UseDraggableProps extends UseDraggableOptions, RenderableComponent {
  position: [number, number]
}

export const UseDraggable = defineComponent<UseDraggableProps>({
  name: 'UseDraggable',
  props: [
    'position',
    'handle',
  ] as unknown as undefined,
  setup(props, { slots, emit }) {
    const target = ref()
    const handle = computed(() => props.handle ?? target.value)
    const position = props.position ? { x: props.position[0], y: props.position[1] } : { x: 0, y: 0 }

    const data = reactive(useDraggable(target, {
      handle,
      initialValue: position
    }))

    return () => {
      if (slots.default)
        return h(props.as || 'div', { ref: target, style: `touch-action:none;${data.style}` }, slots.default(data))
    }
  },
})