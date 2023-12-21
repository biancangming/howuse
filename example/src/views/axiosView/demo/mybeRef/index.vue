<template>
  <button @click="handle1">按钮1</button>
  <button :onClick="handle2">按钮2</button>
</template>
<script lang="ts" setup>
const handle1 = () => { alert(1) }
const handle2 = () => { alert(2) }
</script>