export interface Menu {
  title: string;
  routerName: string;
  children?: Menu[]
}

const menus: Menu[] = [
  {
    title: "扩展区",
    routerName: "extend",
    children: [
      {
        title: "axios",
        routerName: "axios"
      },
      {
        title: "echarts",
        routerName: "chart"
      },
      {
        title: "jsPDF",
        routerName: "jsPDF"
      },
      {
        title: "xlsx",
        routerName: "xlsx"
      },
    ]
  },
  // {
  //   title: "增删改查",
  //   routerName: "crud",
  //   children: [
  //     {
  //       title: "antd-design-vue",
  //       routerName: "crudAntd"
  //     },
  //     {
  //       title: "element-plus",
  //       routerName: "crudElement"
  //     }
  //   ]
  // },
  {
    title: "组件",
    routerName: "crud",
    children: [
      {
        title: "可拖拽弹窗",
        routerName: "componentDragDialog"
      },
      {
        title: "托放组件",
        routerName: "componentDragDrop"
      },
      {
        title: "蒙版",
        routerName: "componentMask"
      },
      // {
      //   title: "json预览",
      //   routerName: "componentJsonPreview"
      // },
      {
        title: "图片预览",
        routerName: "componentImgPreview"
      },
      {
        title: "加水印",
        routerName: "componentWatermark"
      },
      {
        title: "虚拟滚动",
        routerName: "componentVirtualScroll"
      },
      {
        title: "点击区域外部",
        routerName: "componentClickOutSide"
      },
    ]
  },
]
export default menus