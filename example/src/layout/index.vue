<template>
  <a-layout>
    <a-layout-sider theme="light" v-model:collapsed="collapsed" :trigger="null" collapsible>
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
        <!-- <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" /> -->
        <div :class="prefixCls">
          <div :class="`${prefixCls}__title`">howuse 一个好用的vue增强库</div>
          <div :class="`${prefixCls}__action`">
            <a href="https://github.com/biancangming/howuse" style="color:#000" target="_blank"><github-outlined /></a>
          </div>
        </div>
      </a-layout-header>
      <a-layout-content :style="{
        margin: '16px',
        padding: '16px',
        background: '#fff',
        height: 'calc(100vh - 96px)',
        overflow: 'auto',
      }">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { MenuUnfoldOutlined, MenuFoldOutlined, GithubOutlined } from "@ant-design/icons-vue";
import { useSessionStorage } from "@vueuse/core";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { usePrefixCls } from '../../../src/less/useDesign';

const { getRoutes } = useRouter();

const selectedKeys = useSessionStorage("_menu_about", ["about"]),
  collapsed = ref<boolean>(false);

const prefixCls = usePrefixCls("header")
</script>
<style lang="less" scoped>
@prefixCls :~"@{namespace}-header";

.@{prefixCls} {
  display: inline-flex;
  justify-content: space-between;
  width: 100%;

  &__title {
    font-weight: 500;
    font-size: 16px;
  }

  &__action {
    font-size: 16px;
    cursor: pointer;

    .anticon {
      font-size: 25px;
    }
  }
}

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
