<template>
  <div class="search-item" ref="itemEle">
    <label class="colon">{{ attrs.label }}</label>
    <Widget v-bind="attrs" />
  </div>
</template>
<script lang="ts" setup>
import Widget from "./widget/Index.vue"
const attrs = useAttrs()
</script>
<style lang="less" scoped>
.search-item {
  display: flex;
  align-items: center;
  margin-right: 16px;
  margin-bottom: 10px;

  @media screen {
    @media (min-width: 1440px) {

      .ant-input,
      .ant-select,
      .ant-picker {
        width: 180px;
      }

      .ant-picker-range {
        min-width: 300px;
      }
    }
  }

  >label {
    display: inline-flex;
    white-space: nowrap;
    margin-right: 8px;
    align-items: center;

    &.colon::after {
      content: "：";
      margin-right: -8px;
    }
  }
}
</style>
