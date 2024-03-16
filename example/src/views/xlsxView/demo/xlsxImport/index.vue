<template>
  <div>
    <button @click="importExcel()">加载excel</button>
    <div style=" max-height: 200px;overflow: auto;">
      {{ refData }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { xlsxFileToJson } from "howuse/xlsx";
import { loadLocalFile } from "howtools"

const refData = ref()

function importExcel() {
  loadLocalFile().then(files => {
    xlsxFileToJson({
      xlsx: files[0],
      replaceFields: { "第一列": "a" }
    }).then((item) => {
      refData.value = item
    })
  })
}
</script>
