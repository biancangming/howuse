<script lang="ts">
import { defineComponent, reactive, ref } from "@vue/composition-api";
import { createIDContext, creatUserContext, User } from "./context";
import ChildView from "./components/ChildView.vue";
export default defineComponent({
  components: {
    ChildView,
  },
  setup() {
    const user: User = {
      name: ref("张三"),
      age: ref(100),
    };

    const idRec = reactive({
      height: 180,
      weight: 180,
    });

    creatUserContext(user);
    createIDContext(idRec);
    return { user, idRec };
  },
});
</script>
<template>
  <div>
    <ChildView />
    <button @click="user.age = 18">修改年龄为18</button>
    <p></p>
    <button @click="idRec.weight = 145">修改体重为145</button>
  </div>
</template>
