import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from "@/layout/index.vue"
import AxiosView from '../views/axiosView/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Layout",
      component: Layout,
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
          path: '/crud',
          name: 'crud',
          component: () => import("../views/crudView/index.vue"),
          meta: {
            title: "crud-antd",
            menu: true
          }
        },
        {
          path: '/component',
          name: 'component',
          component: () => import("../views/vueComponents/index.vue"),
          meta: {
            title: "组件配置",
            menu: true
          }
        },
      ]
    },

  ]
})

export default router
