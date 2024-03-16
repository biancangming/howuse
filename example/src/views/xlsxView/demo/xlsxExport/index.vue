<template>
  <div>
    <button @click="exportExcel()">导出excel</button>
    <ElTable :data="data">
      <ElTableColumn prop="a" label="A"></ElTableColumn>
      <ElTableColumn prop="b" label="B"></ElTableColumn>
      <ElTableColumn prop="c" label="C"></ElTableColumn>
    </ElTable>
  </div>
</template>
<script lang="ts" setup>
import { jsonToXlsxFile } from "howuse/xlsx";
import { ElTable, ElTableColumn } from "element-plus"
import "element-plus/es/components/table/style/css"

const data = [
  {
    a: 1,
    b: 2,
    c: 3,
  },
  {
    a: 4,
    b: 5,
    c: 6,
  },
  {
    a: 7,
    b: 8,
    c: 9,
  }
]

function exportExcel() {
  jsonToXlsxFile({
    // 表格数据
    sheet: [
      {
        sheetName: "sheet1", // 表格sheet页名称
        data: data // 表格数据
      }
    ],
    // 替换字段 把 a 替换成 第一列
    replaceFields: {
      a: "第一列"
    },
    fileName: "hahaha.xlsx"
  })
}
</script>
