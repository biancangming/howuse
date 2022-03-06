<script setup lang="ts">
</script>

<template>
  <div id="app">
    <header>
      <div class="wrapper">
        <nav>
          <router-link to="/">Axios测试</router-link>
          |
          <router-link to="/context">Context测试</router-link>
          |
          <router-link to="/store">Store</router-link>
          |
          <router-link to="/chart">echarts</router-link>
        </nav>
      </div>
    </header>
    <router-view />
  </div>
</template>
