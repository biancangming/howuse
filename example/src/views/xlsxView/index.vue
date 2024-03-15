<template>
    <CodeView title="xlsx数据导出">
        <XlsxExportDemo />
        <template #code>
            <XlsxExportCode />
        </template>
    </CodeView>
    <CodeView title="xlsx数据导入">
        <XlsxImportDemo />
        <template #code>
            <XlsxImportCode />
        </template>
    </CodeView>
</template>
<script setup lang="ts">
import XlsxExportDemo from "./demo/xlsxExport/index.vue";
import XlsxExportCode from "./demo/xlsxExport/index.md";
import XlsxImportDemo from "./demo/xlsxImport/index.vue";
import XlsxImportCode from "./demo/xlsxImport/index.md";
</script>