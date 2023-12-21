<template>
  <a-layout>
    <a-layout-header style="background: rgba(255,255,255,.7)" class="howuse-layout-sticky">
      <div :class="prefixCls">
        <div :class="`${prefixCls}__title`">
          <span :class="`${prefixCls}__title--logo`" title="一个好用的vue3增强库">howuse</span>
          <span :class="`${prefixCls}__title--desc`">一个好用的vue3增强库， 文档版本：v {{pkg.version}}</span>
        </div>
        <div :class="`${prefixCls}__action`">
          <a-menu v-model:selectedKeys="actionSelectedKeys" mode="horizontal">
            <a-menu-item @click="$router.push({name: 'about'})" key="about">简介</a-menu-item>
            <a-menu-item @click="$router.push({name: 'started'})" key="fastStart">快速上手</a-menu-item>
            <a-menu-item @click="$router.push({name: 'document'})" key="document">文档</a-menu-item>
          </a-menu>
          <a href="https://github.com/biancangming/howuse" style="color:#000" class="github" target="_blank">
            <github-outlined />
          </a>
        </div>
      </div>
    </a-layout-header>
    <router-view />
  </a-layout>
</template>
<script lang="ts" setup>
import { GithubOutlined } from "@ant-design/icons-vue";
import { useSessionStorage } from "@vueuse/core";
import { usePrefixCls } from '../../../src/less/useDesign';
import pkg from "../../../package.json"
const actionSelectedKeys = useSessionStorage("_menu_action", ["about"])

const prefixCls = usePrefixCls("header")
</script>
<style lang="less" scoped>
.howuse-layout-sticky {
  position: sticky;
  top: 0;
  z-index: 100;
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
