<template>
  <a-layout>
    <a-layout-sider
      theme="light"
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
    >
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
        <template v-for="r in getRoutes()" :key="r.name">
          <a-menu-item v-if="r.meta.menu" :key="r.name" @click="$router.push({name: r.name})">
            <span>{{ r.meta.title }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        howuse
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '16px',
          padding: '16px',
          background: '#fff',
          height: 'calc(100vh - 96px)',
          overflow: 'auto',
        }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { getRoutes } = useRouter();

const selectedKeys = ref<string[]>(["axios"]),
  collapsed = ref<boolean>(false);
</script>
<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  /* background: rgba(255, 255, 255, 0.3); */
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
