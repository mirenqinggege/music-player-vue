import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const discoverMusicChild: Array<RouteRecordRaw> = [
  {
    name: 'recommend',
    path: 'recommend',
    component: () => import('@/pages/discover/MRecommend.vue')
  },
  {
    name: 'list',
    path: 'list',
    component: () => import('@/pages/temp.vue')
  },
  {
    name: 'playlist',
    path: 'playlist',
    component: () => import('@/pages/temp.vue')
  },
  {
    name: 'customize',
    path: 'customize',
    component: () => import('@/pages/temp.vue')
  }
]

const children: Array<RouteRecordRaw> = [
  {
    name: 'index',
    path: 'index',
    component: () => import('@/pages/index.vue')
  },
  {
    name: 'discover',
    path: 'discover',
    redirect: {name: 'recommend'},
    component: () => import('@/pages/discover/MDiscoverMusic.vue'),
    children: discoverMusicChild
  },
  {
    name: 'podcasts',
    path: 'podcasts',
    component: () => import('@/pages/temp.vue')
  },
  {
    name: 'video',
    path: 'video',
    component: () => import('@/pages/temp.vue')
  },
  {
    name: 'concern',
    path: 'concern',
    component: () => import('@/pages/temp.vue')
  },
  {
    name: 'live',
    path: 'live',
    component: () => import('@/pages/temp.vue')
  },
  {
    name: 'private-fm',
    path: 'private-fm',
    component: () => import('@/pages/temp.vue')
  }
]

const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    redirect: {path: '/discover'},
    component: () => import('@/components/layout/MLayout.vue'),
    children
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({
    top: 0,
    el: '#app'
  }),
  linkActiveClass: '  active'
})

export default router
