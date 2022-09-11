import { createRouter, createWebHashHistory } from 'vue-router'
import AxiosView from '../views/AxiosView.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AxiosView
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import("../views/EchartsView.vue")
    },
  ]
})

export default router
