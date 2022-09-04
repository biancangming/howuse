import Vue from 'vue'
import VueRouter from 'vue-router'
import AxiosView from '../views/AxiosView.vue'
import EchartsView from '../views/EchartsView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: AxiosView
    },
    {
      path: '/context',
      name: 'context',
      component: () => import("../views/context/IndexView.vue")
    },
    {
      path: '/store',
      name: 'store',
      component: () => import("../views/store/IndexView.vue")
    },
    {
      path: '/chart',
      name: 'chart',
      component: () => import("../views/EchartsView.vue")
    },
    {
      path: '/comDemo',
      name: 'comDemo',
      component: () => import("../views/comDemo/IndexView.vue"),
      redirect: {
        name: "comDemoTable"
      },
      children: [
        {
          path: "table",
          name: 'comDemoTable',
          component: () => import("../views/comDemo/Table/IndexView.vue"),
        }
      ]
    },
  ]
})

export default router
