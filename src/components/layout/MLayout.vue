<template>
  <div class="m-layout vertical">
    <div id="m-header">
      <div id="logo-wrapper"></div>
      <m-step-control/>
      <m-search-input/>
      <div id="drag-area"></div>
      <m-window-control/>
    </div>
    <div class="m-layout">
      <div id="side">
        <div class="fixed">
          <template v-for="(item) in fixedMenu" :key="item.key">
            <router-link exact-active-class="active" v-slot="{navigate, isActive}" custom :to="{name: item.routeName}">
              <div :class="isActive ? ['menu-item', 'active'] : ['menu-item']" @click="navigate">{{ item.label }}</div>
            </router-link>
          </template>
        </div>
        <div id="my-song-list">
          <span class="title">我的音乐</span>

          <template v-for="item in playlist" :key="String(item.id)">
            <router-link to="" custom v-slot="{navigate, isActive}">
              <div :class="isActive ? ['menu-item', 'active'] : ['menu-item']" @click="navigate">{{ item.name }}</div>
            </router-link>
          </template>
        </div>
      </div>
      <div id="content">
        <router-view/>
      </div>
    </div>
    <div id="m-footer"></div>
  </div>
</template>

<script lang="ts" setup>
import MStepControl from '@/components/layout/MStepControl.vue'
import MSearchInput from '@/components/layout/MSearchInput.vue'
import MWindowControl from '@/components/layout/MWindowControl.vue'
import {MenuItem, PlayList} from '@/types'
import {getMySongListStore} from '@/store'
import {computed, ComputedRef, onMounted} from 'vue'
import {getLoginUserInfo} from '@/api/user'

const fixedMenu: MenuItem[] = [
  {routeName: 'discover', label: '发现音乐', key: 'fixed-menu-item-discover'},
  {routeName: 'podcasts', label: '播客', key: 'fixed-menu-item-podcasts'},
  {routeName: 'video', label: '视频', key: 'fixed-menu-item-video'},
  {routeName: 'concern', label: '关注', key: 'fixed-menu-item-concern'},
  {routeName: 'live', label: '直播', key: 'fixed-menu-item-live'},
  {routeName: 'private-fm', label: '私人FM', key: 'fixed-menu-item-private-fm'}
]

const mySongListStore = getMySongListStore()

const playlist: ComputedRef<PlayList[]> = computed(() => mySongListStore.getMyCreatedPlaylist)

onMounted(() => {
  if (playlist.value.length === 0) {
    mySongListStore.fetchMySongList()
  }
})
</script>

<style lang="less" scoped>

.m-layout {
  height: 100%;
  display: flex;
  position: relative;

  #m-header {
    color: rgb(251, 217, 217);
    flex-shrink: 0;
    height: var(--header-height);
    display: flex;
    position: relative;
    background-color: var(--primary-color);

    #logo-wrapper {
      width: var(--side-width);
      flex-shrink: 0;
    }

    #drag-area {
      -webkit-app-region: drag;
      width: calc(100% - 630px);
    }
  }

  #side {
    height: 100%;
    flex-shrink: 0;
    width: var(--side-width);
    border-right: 1px solid var(--primary-color-border);
    display: flex;
    flex-direction: column;

    .fixed {
      display: flex;
      flex-direction: column;
      padding: 10px;
      box-sizing: border-box;
    }

    .menu-item {
      cursor: pointer;
      font-size: 18px;
      padding: 5px;
      border-radius: 5px;

      &:hover {
        background-color: rgb(246, 246, 247);
      }
    }

    .menu-item.active {
      font-weight: bold;
      background-color: rgb(246, 246, 247);
    }
  }

  #m-footer {
    flex-shrink: 0;
    height: var(--footer-height);
    border-top: 1px solid var(--primary-color-border);
  }

  #content {
    overflow: hidden;
    width: 100%;
    height: calc(100vh - (var(--header-height) + var(--footer-height)));
    position: relative;
  }

  #my-song-list {
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;

    .title {
      padding: 5px;
      font-size: 14px;
      color: rgb(159, 159, 159);
    }
  }
}

.m-layout.vertical {
  flex-direction: column;
}
</style>
