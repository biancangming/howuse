<template>
  <a-layout hasSider>
    <a-layout-sider style="background: rgba(255,255,255,.7);border-right: 1px solid #f0f0f0;"
      :style="{ overflow: 'auto', position: 'fixed', left: 0, top: '64px', bottom: 0 }">
      <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
        <template v-for="r in menus" :key="r.routerName">
          <a-menu-item-group>
            <template #title>{{r.title}}</template>
            <a-menu-item :key="s.routerName" v-for="s in r.children || []" @click="$router.push({name: s.routerName})">
              {{s.title}}</a-menu-item>
          </a-menu-item-group>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout-content :style="{
      padding: '16px',
      background: '#fff',
      width: 'calc(100vw - 232px)',
      marginLeft: '200px',
    }">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>
<script lang="ts" setup>
import { MenuUnfoldOutlined, MenuFoldOutlined, GithubOutlined } from "@ant-design/icons-vue";
import { useSessionStorage } from "@vueuse/core";
import { ref } from "vue";
import { usePrefixCls } from '../../../src/less/useDesign';
import menus from '../router/menu';

const selectedKeys = useSessionStorage("_menu_about", ["axios"])
const actionSelectedKeys = useSessionStorage("_menu_action", ["about"])

const prefixCls = usePrefixCls("header")
</script>
<style lang="less" scoped>
.howuse-layout-sticky {
  position: sticky;
  top: 0;
  z-index: 20000;
  backdrop-filter: saturate(50%) blur(8px);
}

.howuse-layout-sider {
  position: absolute;
  top: 64px;
  width: 200px;
}

@prefixCls :~"@{namespace}-header";

.@{prefixCls} {
  display: inline-flex;
  justify-content: space-between;
  width: 100%;



  &__title {
    font-weight: 500;
    font-size: 16px;
    display: flex;
    align-items: center;

    >span {
      display: inline-block;
    }

    &--logo {
      font-size: 28px;
      margin-right: 50px;
      color: #67ae7d;
      user-select: none;
    }

    &--desc {
      color: rgba(0, 0, 0, .7);
    }
  }

  &__action {
    font-size: 16px;
    cursor: pointer;
    display: flex;

    .anticon {
      font-size: 25px;
    }

    .github {
      margin-left: 32px;
    }
  }
}


:deep(.ant-menu) {
  background-color: rgba(0, 0, 0, .0) !important
}
</style>
