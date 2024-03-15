<template>
  <div>
    <button @click="importExcel()">加载excel</button>
  </div>
</template>
<script lang="ts" setup>
import { xlsxFileToJson } from "howuse/xlsx";
import { loadLocalFile } from "howtools"
function importExcel() {
  loadLocalFile().then(files => {
    xlsxFileToJson(files[0]).then(console.log)
  })
}
</script>
