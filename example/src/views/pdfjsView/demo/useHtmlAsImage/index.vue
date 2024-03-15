<template>
  <div style="margin-bottom: 10px; text-align: center">
    <a-space>
      <button @click="downloadImg()">{{ loadingImg ? "正在..." : "" }}下载为图片</button>
      <button @click="downloadPdf()">{{ loadingPdf ? "正在..." : "" }}下载为Pdf</button>
      <button @click="printPdf()">打印pdf</button>
      <button @click="anyPrintPdf()">自定义内容打印pdf</button>
    </a-space>
  </div>
  <!-- 如果打印的内容不想呈现给用户，这里可以设置 style="display: none" -->
  <div ref="fileArea2" style="display: none">我是任意内容</div>
  <div style="text-align: center" class="howuse-demo-chart" ref="fileArea">
    <Chart />
    <Water />
  </div>
</template>
<script lang="ts" setup>
import Chart from "./chart.vue";
import Water from "./water.md";
import { useHtmlAsImage, useHtmlAsPdf } from "howuse/pdf";

const fileArea = ref();
const fileArea2 = ref();

// saveCanvasBlob 保存为一个blob流，Promise对象。 0.0.5-beta.2 以上版本
const { downloadImg, saveCanvasBlob, loading: loadingImg } = useHtmlAsImage({
  ref: fileArea,
  fileName: "雨巷.png",
});
// pdfOpts 是pdf的参数
const { downloadPdf, printPdf, loading: loadingPdf } = useHtmlAsPdf({
  ref: fileArea,
  fileName: "雨巷.pdf",
});

// 这个其实是一种思路，当打印任意内容时，可将页面先隐藏，然后打印的时候, 渲染即可。
const { printPdf: anyPrintPdf } = useHtmlAsPdf({
  ref: fileArea2,
  fileName: "任意内容.pdf",
});
</script>
<style scoped lang="less">
.howuse-demo-chart {
  max-width: 700px;
  box-shadow: 0 0 5px #000;
  margin: auto;
  padding-top: 10px;
}
</style>
