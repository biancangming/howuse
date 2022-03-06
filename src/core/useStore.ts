import { isNull, isString, isUndefined } from 'howtools';
import { customRef, reactive, watchEffect } from 'vue-demi';

interface storeOption<T> {
    storage: Storage;
    key: string;
    defaultVal: T
}

function createStore<T>(option: storeOption<T>) {
    const { key, storage, defaultVal } = option

    function setItem(val: string) {
        const _val = isString(defaultVal) ? val : JSON.stringify(val)
        storage.setItem(key, _val)
    }

    function getItem() {
        const _val = storage.getItem(key)
        return isString(defaultVal) ? _val : JSON.parse(_val)
    }

    function removeItem() {
        storage.removeItem(key)
    }

    return {
        setItem, getItem, removeItem
    }
}


export function useStore<T extends NonNullable<any>>(storage: Storage, key: string, defaultVal: T) {
    const STORE_KEY = "howves.key"
    const value = reactive({ [STORE_KEY]: null })

    const { setItem, removeItem, getItem } = createStore({ storage, key, defaultVal })

    // 获取原本存在的值
    const originValue = getItem()
    originValue ? value[STORE_KEY] = originValue : value[STORE_KEY] = defaultVal

    // 深度监听值变化，并修改store存储
    watchEffect(() => {
        const _value = value[STORE_KEY]
        if (isUndefined(_value) || isNull(_value)) {
            removeItem()
        } else {
            setItem(_value)
        }
    })

    return customRef<T>((track, trigger) => {
        return {
            get() {
                track();
                return value[STORE_KEY]
            },
            set(newValue: T) {
                value[STORE_KEY] = newValue
                trigger();
            }
        }
    })
}

export function useSessionStore<T = NonNullable<any>>(key: string, defaultVal: T) {
    return useStore<T>(sessionStorage, key, defaultVal)
}

export function useLocalStorage<T = NonNullable<any>>(key: string, defaultVal: T) {
    return useStore<T>(localStorage, key, defaultVal)
}
