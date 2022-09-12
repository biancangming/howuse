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
          component: () => import("../views/EchartsView.vue"),
          meta: {
            title: "echarts",
            menu: true
          }
        },
      ]
    },

  ]
})

export default router
