<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { useLocalStorage, useSessionStore } from "howves/core";

export default defineComponent({
  setup() {
    const token = useSessionStore<string>("token", "11");

    const obj = useLocalStorage("obj", { a: 888, b: 2 });

    function changeTextarea(val: string) {
      obj.value = JSON.parse(val);
    }

    onUN
    return {
      token,
      obj,
      changeTextarea,
    };
  },
});
</script>

<template>
  <div>
    <p>==========sessionStore字符串测试==============================</p>
    {{token}}
    <br>
    <input v-model="token" />
    <p>sessionStore删除测试</p>
    <button @click="token = null">删除</button>
    <p>==========localStorage对象测试==============================</p>
    {{obj}}
    <br>
    <br>
    <textarea :value="JSON.stringify(obj)" @change="changeTextarea($event.target.value)"></textarea>
  </div>
</template>