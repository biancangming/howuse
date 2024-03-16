<template>
    <button @click="exportExcel()">导出excel</button>
    <table class="table_one" border="1" ref="tableEl">
      <tr>
        <th>编号</th>
        <th>姓名</th>
        <th>年龄</th>
      </tr>
      <tr>
        <td>1</td>
        <td>张三</td>
        <td>15</td>
      </tr>
      <tr>
        <td>2</td>
        <td>李四</td>
        <td>11</td>
      </tr>
    </table>
</template>
<script lang="ts" setup>
import { tableToXlsxFile } from "howuse/xlsx";
import { loadLocalFile } from "howtools"

const tableEl = ref()

function exportExcel() {
  tableToXlsxFile({
    el: unref(tableEl),
    fileName: "table.xlsx",
  })
}
</script>
<style scoped>
.table_one {
  margin: 10px
}
</style>