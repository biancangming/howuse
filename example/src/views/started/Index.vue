<template>
  <div class="app-container">
    <About />
  </div>
</template>
<script lang="ts" setup>
import "@/assets/github-markdown-light.css";
import About from "./started.md"

onMounted(() => {
  document.querySelectorAll('a[href^="http"]').forEach(a => {
    a.setAttribute('target', '_blank');
  })
})
</script>