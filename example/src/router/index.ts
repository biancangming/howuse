import Vue from 'vue'
import VueRouter from 'vue-router'
import AxiosView from '../views/AxiosView.vue'

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
  ]
})

export default router
