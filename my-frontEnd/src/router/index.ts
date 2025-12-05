import type { App } from "vue";
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LAYOUT from "../components/layout/index.vue";
export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:path(.*)*',
      name: 'home',
      component: LAYOUT,
      children:[
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

      ]
    },
    {
      path: '/sys',
      name: 'user',
      component: () => import('../views/sys/user/index.vue'),
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
      name: 'login',
      component: () => import('../views/sys/login.vue'),
    }
  ],
})

export function setupRouter(app: App<Element>) {
  app.use(router);
  // initTabPage();
}
