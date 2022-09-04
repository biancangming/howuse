import { createContext, useContext } from 'howves/core';
import { Ref } from 'vue-demi';
import { reactive, UnwrapRef } from '@vue/composition-api';
const key = Symbol()
const id_key = Symbol()

export interface User {
    name: Ref<string>,
    age: Ref<number>
}

export interface ID {
    height: number,
    weight: number
}

// 用户信息
export function creatUserContext(model: User) {
    return createContext(model, key)
}

export function useUserContext() {
    return useContext<User>(key)
}

// ID 信息
export function createIDContext(model: ID) {
    return createContext(model, id_key)
}

export function useIDContext() {
    return useContext(id_key)
}