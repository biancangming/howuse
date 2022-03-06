import { shallowRef } from 'vue-demi';

export function useVisible() {
    const visible = shallowRef(false)

    function open() {
        visible.value = true
        return Promise.resolve()
    }

    function close() {
        visible.value = false
        return Promise.resolve()
    }

    return {
        visible,
        open,
        close
    }
}