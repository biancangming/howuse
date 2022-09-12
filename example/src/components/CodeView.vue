<template>
  <a-card>
    <div class="code-demo">
      <div class="code-demo__title" v-if="isShowSlot('default')">
        <slot></slot>
        <a-divider></a-divider>
      </div>
      <div class="code-demo__desc" v-if="isShowSlot('desc')">
        <strong>说明：</strong> <slot name="desc"></slot>
      </div>
      <a-divider orientation="left" >
        <a-button type="link" @click="showCode = !showCode">
          {{ showCode ? "隐藏源码" : "查看源码" }}
        </a-button>
      </a-divider>
      <div class="code-demo__code" v-if="showCode">
        <slot name="code"></slot>
      </div>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import "prismjs/themes/prism.css";
const slots = useSlots();

const isShowSlot = (name: string) => !!slots[name];

const showCode = shallowRef(false);
</script>
<style lang="less" scoped>
.code-demo {
  position: relative;
  display: inline-block;
  width: 100%;
  transition: all 0.2s;
  :deep(pre[class*="language-"]) {
    background-color: transparent;
    font-size: 16px;
    margin:0;
    padding: 0;
  }
}
.ant-card {
  &:not(:first-child) {
    margin-top: 16px;
  }
}
</style>
