import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import Layout from '@/layout/index.vue';
import Index from '@/views/index/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Index',
        component: Index,
      },
    ],
  },
  {
    path: '/home',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/home/index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: Layout,
    children: [
      {
        path: '',
        name: '404',
        component: () => import('@/views/exception/404.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes,
});

export default router;
