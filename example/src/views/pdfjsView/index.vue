<template>
  <p>在原有的jsPDF 基础上封装，解决翻页问题，自动填充页面显示</p>
  <p>选择元素区域会自动填充整个pdf文档，需要页面自行设置padding间距</p>
  <p>依赖插件 <code>jspdf</code> <code>html2canvas</code></p>
  <CodeView title="pdf下载示例">
    <UseHtmlAsImageDemo />
    <template #desc>
      如果不需要打印范围内存在不需要打印的内容，添加如下css即可
      <pre>
        @media print {
        .no-print {
          display: none;
        }
      }
      </pre>
    </template>
    <template #code>
      <UseHtmlAsImageCode />
    </template>
  </CodeView>
  <CodeView title="pdf预览示例">
    <PreviewPdfDemo />
    <template #code>
      <PreviewPdfCode />
    </template>
  </CodeView>
</template>
<script lang="ts" setup>
import UseHtmlAsImageDemo from "./demo/useHtmlAsImage/index.vue";
import UseHtmlAsImageCode from "./demo/useHtmlAsImage/index.md";
import PreviewPdfDemo from "./demo/previewPdf/index.vue";
import PreviewPdfCode from "./demo/previewPdf/index.md";
</script>
<style lang="less" scoped></style>
