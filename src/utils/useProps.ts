export function useProps<T extends object = any>(props: T, cb: (agrs: T) => T) {
  const obj = reactive(props)

  function setProps(f: T) {
    Object.assign(obj, f)
  }

  const _props = computed<T>(() => {
    return cb(obj as T)
  })
  return {
    setProps,
    props: _props
  }
}