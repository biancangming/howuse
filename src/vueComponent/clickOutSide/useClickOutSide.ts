import { Ref } from 'vue';
export function useClickOutSide(ref: Ref<HTMLElement>, callback: (e: MouseEvent) => void) {
  function clickOutSide(e: MouseEvent) {
    const el = unref(ref)
    const target = e.target as HTMLElement
    if (el.contains(target)) {
      return false
    }
    callback(e)
  }

  onMounted(() => {
    document.body.addEventListener("click", clickOutSide)
  })

  onUnmounted(() => {
    document.body.removeEventListener("click", clickOutSide)
  })
}