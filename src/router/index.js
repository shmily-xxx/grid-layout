import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/page/index.vue')
  },
  {
    path: '/grid-layout',
    name: 'grid-layout',
    component: () => import('@/views/grid-layout/index.vue')
  },
  {
    path: '/topology',
    name: 'topology',
    component: () => import('@/views/topology/index.vue')
  },
];

const router = new VueRouter({
  routes
});

export default router
