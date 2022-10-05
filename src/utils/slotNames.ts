export function useSlotNames() {
  const slots = useSlots()
  const slotNames = computed(() => {
    return Object.keys(slots)
  })
  return slotNames
}