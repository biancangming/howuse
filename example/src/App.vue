<script setup lang="ts">
import 'ant-design-vue/es/message/style/css';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
</script>

<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>
<style lang="less">
body {
  min-height: 100vh;
}

.app-container {
  margin: 12px 16px;
  padding: 24px;
  background-color: #FFF;
}
</style>
