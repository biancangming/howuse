
import { createVNode } from 'vue';
import JsonPreviewVue from './JsonPreview.vue';
import JsonPreviewDialogVue from './JsonPreviewDialog.vue';


export interface CreateJsonPreviewExtraOpts {
  width?: string;
  height?: string;
  backgroundColor?: string;
  title?: string;
}
export function createJsonPreview(data: any, opts?: CreateJsonPreviewExtraOpts) {
  const _opts = opts || {}
  const width = _opts.width || "500px"
  const height = _opts.height || "auto"
  const backgroundColor = _opts.backgroundColor || "#FFF"
  const title = _opts.title || "json数据预览"

  let maskInstance = createVNode(JsonPreviewDialogVue, {
    visible: true, isBg: false, title,
    closeExtraFunc() {
      app.unmount()
      container.remove()
    }
  },
    () => createVNode("div",
      {
        style: {
          width,
          height,
          backgroundColor,
          padding: "12px 14px"
        }
      },
      [
        createVNode(JsonPreviewVue, { data })
      ])
  )
  const container = document.createElement("div")

  const app = createApp(maskInstance)
  app.mount(container)
}