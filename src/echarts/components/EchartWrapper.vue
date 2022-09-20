<template>
  <div style="width: 100%; height: 100%" ref="chart"></div>
</template>
<script lang="ts" setup>
const chartRef = ref();
const a = 1
defineExpose({
  chartRef,
  a
});
</script>
