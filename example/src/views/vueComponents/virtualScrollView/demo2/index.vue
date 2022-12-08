<template>
  <div class="data-wrapper">
    <how-virtual-scroll :data-source="data" :el-height="30" auto-scroll>
      <template #title>
        <component :is="template"></component>
      </template>
      <template #default="{ item }">
        <component :is="templateContent(item)" :key="item"></component>
      </template>
    </how-virtual-scroll>
  </div>
</template>
<script lang="ts" setup>
import { HowVirtualScroll } from "howuse/vueComponent";
import { Ref, createVNode } from "vue";

const childrenItem = (content) =>
  createVNode("div", { style: { width: "25%" } }, content);
const template = createVNode("div", { style: { width: "100%", height: "100%", display: "flex", "align-items": "center", "background-color": "aliceblue" } }, [
  childrenItem("姓名"),
  childrenItem("年龄"),
  childrenItem("体重"),
  childrenItem("身高"),
]);

const templateContent = (item)=> createVNode("div", { style: { width: "100%", height: "100%", display: "flex", "align-items": "center", borderBottom: "1px solid rgba(0, 0, 0, 0.608)" } }, [
  childrenItem("姓名" + item),
  childrenItem("年龄"+ item),
  childrenItem("体重" + item),
  childrenItem("身高" + item),
]);

const data: Ref<number[]> = ref([]);
for (let i = 0; i <= 20; i++) {
  data.value.push(i);
}
</script>
