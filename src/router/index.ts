import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

import MRecommend from '@/pages/discover/MRecommend.vue'
import Temp from '@/pages/temp.vue'
import Index from '@/pages/index.vue'
import MDiscoverMusic from '@/pages/discover/MDiscoverMusic.vue'
import MPlayList from '@/pages/playlist/MPlayList.vue'
import MLayout from '@/components/layout/MLayout.vue'


const discoverMusicChild: Array<RouteRecordRaw> = [
  {
    name: 'recommend',
    path: 'recommend',
    component: MRecommend
  },
  {
    name: 'list',
    path: 'list',
    component: Temp
  },
  {
    name: 'playlist',
    path: 'playlist',
    component: Temp
  },
  {
    name: 'customize',
    path: 'customize',
    component: Temp
  }
]

const children: Array<RouteRecordRaw> = [
  {
    name: 'index',
    path: 'index',
    component: Index
  },
  {
    name: 'discover',
    path: 'discover',
    redirect: {name: 'recommend'},
    component: MDiscoverMusic,
    children: discoverMusicChild
  },
  {
    name: 'play-list',
    path: 'play-list/:id',
    component: MPlayList
  },
  {
    name: 'podcasts',
    path: 'podcasts',
    component: Temp
  },
  {
    name: 'video',
    path: 'video',
    component: Temp
  },
  {
    name: 'concern',
    path: 'concern',
    component: Temp
  },
  {
    name: 'live',
    path: 'live',
    component: Temp
  },
  {
    name: 'private-fm',
    path: 'private-fm',
    component: Temp
  }
]

const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    redirect: {path: '/discover'},
    component: MLayout,
    children
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({
    top: 0,
    el: '#app'
  }),
  linkActiveClass: '  active'
})

export default router
