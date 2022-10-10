// 前端打印、下载某个东东成为pdf文件，一般而言后端做比较好，这两个依赖包太大了

import { saveFileFromBlob, isString } from 'howtools';
import html2canvas from "html2canvas"
import { jsPDF, jsPDFOptions } from "jspdf"
import { Ref } from 'vue';
import { pageFormats } from './utils';
import { createIframe } from '../utils/util';

const px2pt = (px: number) => px * 3 / 4

export interface HtmlAsImageOpts {
  ref: Ref<HTMLElement>;
  contentType?: string;
  fileName?: string;
}

export interface HtmlAsPdfOpts extends Omit<HtmlAsImageOpts, "contentType"> {
  pdfOpts?: jsPDFOptions;
}

// html 转为图片
export function useHtmlAsImage(opts: HtmlAsImageOpts) {
  const loading = shallowRef(false)

  const contentType = opts.contentType || "image/png"
  const fileName = opts.fileName || "文件"

  function downloadImg() {
    return new Promise((resovle, reject) => {
      loading.value = true
      html2canvas(unref(opts.ref)).then(canvas => {
        canvas.toBlob((blob) => {
          if (!blob) {
            loading.value = false
            console.error("转换出错")
            reject("转换出错")
            return
          }
          saveFileFromBlob(blob as BlobPart, fileName, contentType)
          loading.value = false
          resovle("ok")
        }, contentType, 1)
      });
    })
  }
  return {
    downloadImg,
    loading
  }
}

// 页面转换为pdf
export function useHtmlAsPdf(opts: HtmlAsPdfOpts) {
  const loading = shallowRef(false)
  // 隐藏的iframe
  const vwindow = createIframe("about:blank")
  onUnmounted(() => vwindow.remove())
  // 是否为自定义内容
  const isCustom = computed(() => unref(opts.ref)?.style?.display === "none")
  const blockCustom = () => unref(opts.ref).style.display = "block"
  const noneCustom = () => unref(opts.ref).style.display = "none"

  const fileName = opts.fileName || "文件"

  function createDoc(cb: (doc: jsPDF) => void) {
    html2canvas(unref(opts.ref), {
      // width: 595.28,
      // windowWidth: 595.28,
      scale: 5,
    }).then(canvas => {
      const format = opts.pdfOpts?.format || "a4" // 默认A4纸张
      const orientation = opts.pdfOpts?.orientation || "portrait" // 纸张方向, 默认纵向显示

      const doc = new jsPDF({
        orientation,
        ...(opts.pdfOpts || {}),
        unit: "pt",
        format,
      })

      const formatArr: [number, number] = [0, 0]; // 纸张纵横长度

      if (isString(format)) {
        if (!pageFormats[format]) {
          throw new ErrorEvent("错误的纸张格式")
        }
        formatArr[0] = pageFormats[format][0]
        formatArr[1] = pageFormats[format][1]
      } else {
        formatArr[0] = format[0]
        formatArr[1] = format[1]
      }

      // 获取网页宽高
      const canvasWidth = px2pt(canvas.width)
      const canvasHeight = px2pt(canvas.height)

      // pdf 纸张的宽高计算
      const pdfWidth = (orientation === "portrait" ? formatArr[0] : formatArr[1])
      const pdfHeight = (orientation === "portrait" ? formatArr[1] : formatArr[0])

      // 文档内容宽高
      const docWidth = pdfWidth // 网页平铺整个pdf
      const docHeight = (pdfWidth / canvasWidth) * canvasHeight // 文档高度


      const pages = docHeight / pdfHeight // 文档高度比纸片高度，表示页数

      for (let n = 0; n < pages; n++) {
        if (n > 0) doc.addPage()
        //  - n * pdfHeight 表示内容偏移量
        doc.addImage(canvas, 'png', 0, - n * pdfHeight, docWidth, docHeight)
      }

      cb(doc)
    });
  }

  function downloadPdf() {
    return new Promise((resovle) => {
      loading.value = true
      if (unref(isCustom)) blockCustom()
      createDoc(doc => {
        doc.save(fileName)
        if (unref(isCustom)) noneCustom()
        resovle("ok")
        loading.value = false
      })
    })

  }

  function printPdf() {
    return new Promise((resovle) => {
      loading.value = true
      if (unref(isCustom)) blockCustom()
      createDoc(doc => {
        vwindow.src = doc.output('bloburl') as unknown as string;
        vwindow.onload = () => {
          vwindow.contentWindow?.print()
        }
        if (unref(isCustom)) noneCustom()
        loading.value = false
        resovle("ok")
      })
    })
  }

  return {
    downloadPdf,
    printPdf,
    loading,
  }
}