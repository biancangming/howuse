<template>
    <div>
        <p>对xlsx 库进行简单的二次封装</p>
        <p>依赖 xlsx 库</p>
    </div>
    <CodeView title="json数据导出为xlsx">
        <XlsxExportDemo />
        <template #code>
            <XlsxExportCode />
        </template>
    </CodeView>
    <CodeView title="xlsx数据导入为Json">
        <XlsxImportDemo />
        <template #code>
            <XlsxImportCode />
        </template>
    </CodeView>
    <CodeView title="table 表格导出为xlsx">
        <TableXlsxExportDemo />
        <template #code>
            <TableXlsxExportCode />
        </template>
    </CodeView>
</template>
<script setup lang="ts">
import XlsxExportDemo from "./demo/xlsxExport/index.vue";
import XlsxExportCode from "./demo/xlsxExport/index.md";
import XlsxImportDemo from "./demo/xlsxImport/index.vue";
import XlsxImportCode from "./demo/xlsxImport/index.md";
import TableXlsxExportDemo from "./demo/tableXlsxExport/index.vue";
import TableXlsxExportCode from "./demo/tableXlsxExport/index.md";
</script>