import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/PageHome.vue'),
    },
    {
      path: '/service/:id',
      name: 'detail',
      component: () => import('../views/PageDetail.vue'),
    },
  ],
})

export default router
