import { isNumber } from "howtools";
import { Ref, WritableComputedRef } from 'vue';

export function useAutoScroll(props, content: Ref<HTMLElement>, arrivedState, top: WritableComputedRef<number>) {
  let inter: any;
  let hoverLock = false //hover 锁定滚动

  const addLock = () => hoverLock = true
  const removeLock = () => hoverLock = false

  onMounted(()=>{
    unref(content).addEventListener("mouseover", addLock)
    unref(content).addEventListener("mouseleave", removeLock)
  })

  watch(() => props.autoScroll, (scroll) => {
    if(!scroll) return
    inter = setInterval(() => {
      if(!hoverLock) {
        top.value += 10
      }
      // 到达底部，重新开始滚动
      if(arrivedState.bottom){
        top.value = 0
      }
    }, isNumber(scroll) ? scroll : 1000)
  },
  {
    immediate: true
  })

  onUnmounted(() => {
    clearInterval(inter)
    inter = null
    unref(content).removeEventListener("mouseover", addLock)
    unref(content).removeEventListener("mouseleave", removeLock)
  })
}