<template>
  <div>
    <p>用户信息</p>
    <div>{{user}}</div>
    <p>用户属性</p>
    <div>{{id}}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import { useUserContext, useIDContext } from "../context";

export default defineComponent({
  setup() {
    const user = useUserContext();
    const id = useIDContext();
    return {
      user,
      id,
    };
  },
});
</script>
