import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/login',
      name: '登录',
      component: () => import('../views/sys/login.vue'),
    },
    {
      path: '/three',
      name: 'about',
      component: () => import('../views/three/demo.vue'),
    },
    {
      path: '/amap',
      name: 'about',
      component: () => import('../views/map/amap/index.vue'),
    },
  ],
})

export default router
