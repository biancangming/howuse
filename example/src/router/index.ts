import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from "@/layout/index.vue"
import LayoutDocument from "@/layout/document.vue"
import About from "@/views/about/Index.vue"
import Started from "@/views/started/Index.vue"
import AxiosView from '../views/axiosView/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: Layout,
      redirect: {
        name: "about"
      },
      children: [
        {
          path: "about",
          name: "about",
          component: About,
        },
        {
          path: "started",
          name: "started",
          component: Started,
        },
        {
          path: "document",
          name: "document",
          component: LayoutDocument,
          redirect: {
            name: "axios"
          },
          children: [
            {
              path: '/axios',
              name: 'axios',
              component: AxiosView,
              meta: {
                title: "axios",
                menu: true
              }
            },
            {
              path: '/chart',
              name: 'chart',
              component: () => import("../views/echartsView/index.vue"),
              meta: {
                title: "echarts",
                menu: true
              }
            },
            {
              path: '/crudAntd',
              name: 'crudAntd',
              component: () => import("../views/crudView/index.vue"),
            },
            {
              path: '/crudElement',
              name: 'crudElement',
              component: () => import("../views/crudElementView/index.vue"),
            },
            {
              path: '/component',
              name: 'component',
              component: () => import("../views/vueComponents/index.vue"),
              meta: {
                title: "组件",
              },
              children: [
                {
                  path: "dragDialog",
                  name: "componentDragDialog",
                  component: () => import("../views/vueComponents/Drag.vue"),
                },
                {
                  path: "imgPreview",
                  name: "componentImgPreview",
                  component: () => import("../views/vueComponents/Img.vue"),
                },
                {
                  path: "jsonPreview",
                  name: "componentJsonPreview",
                  component: () => import("../views/vueComponents/Json.vue"),
                },
                {
                  path: "mask",
                  name: "componentMask",
                  component: () => import("../views/vueComponents/Mask.vue"),
                }
              ]
            },
          ]
        }
      ]
    },
  ]
})

export default router
