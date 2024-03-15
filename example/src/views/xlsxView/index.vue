<template>
    <CodeView title="自适应折线图，其它自适应类似">
        <XlsxImportDemo />
        <template #code>
            <XlsxImportCode />
        </template>
    </CodeView>
</template>
<script setup lang="ts">
import XlsxImportDemo from "./demo/xlsxImport/index.vue";
import XlsxImportCode from "./demo/xlsxImport/index.md";
</script>