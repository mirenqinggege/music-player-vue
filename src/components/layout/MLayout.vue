<template>
  <div class="m-layout vertical">
    <div id="m-header">
      <div id="logo-wrapper"></div>
      <m-step-control/>
      <m-search-input/>
      <div id="drag-area">
        <div class="drag"></div>
        <m-user-profile @reload="handlerReload"/>
        <m-window-control/>
      </div>
    </div>
    <div class="m-layout">
      <div id="side" :class="{hide: !showSideMenu}">
        <div class="fixed">
          <template v-for="(item) in fixedMenu" :key="item.key">
            <router-link v-slot="{navigate, isActive}" :to="{name: item.routeName}" custom
                         exact-active-class="active"
                         replace>
              <div :class="isActive ? ['menu-item', 'active'] : ['menu-item']" @click="navigate">
                {{ item.label }}
              </div>
            </router-link>
          </template>
        </div>
        <div id="my-song-list">
          <span class="title">我的音乐</span>

          <template v-for="item in playlist" :key="String(item.id)">
            <router-link v-slot="{navigate, isActive}" :to="{path: `/play-list/${item.id}`}" custom replace>
              <div :class="isActive ? ['playlist', 'active'] : ['playlist']" @click="navigate">
                <svg class="icon" height="30" version="1.1"
                     viewBox="0 0 1024 1024" width="30" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M717.12 394.88v12.592h-0.32v218.656h-48v-48h0.32V397.616a11.248 11.248 0 0 1-0.08-1.28v-36.864h48v34.752l0.08 0.64zM648.528 748.8h-68.256a85.328 85.328 0 1 1 0-170.672h88.848V397.616a11.248 11.248 0 0 1-0.08-1.28V336a48 48 0 0 1 48-48h71.232a48 48 0 0 1 48 48v23.472a48 48 0 0 1-48 48H716.8v273.056a68.272 68.272 0 0 1-68.272 68.272z m-67.2-122.704a37.344 37.344 0 0 0 0 74.688h71.504a16 16 0 0 0 16-16V626.08h-87.488zM716.912 336v23.568h71.36V336h-71.36z m-529.76-48H580.88c6.16 0 11.136 4.976 11.136 11.136v25.728A11.136 11.136 0 0 1 580.88 336H187.136A11.136 11.136 0 0 1 176 324.864v-25.728c0-6.16 4.976-11.136 11.136-11.136zM580.88 464c-15.84 0-29.328 9.984-34.56 24 5.232 14.016 18.72 24 34.56 24H187.136c15.84 0 29.328-9.984 34.56-24a36.88 36.88 0 0 0-34.56-24h393.728z m-393.728 0H580.88c6.16 0 11.136 4.976 11.136 11.136v25.728A11.136 11.136 0 0 1 580.88 512H187.136A11.136 11.136 0 0 1 176 500.864v-25.728c0-6.16 4.976-11.136 11.136-11.136z m0 192H404.88c6.16 0 11.136 4.976 11.136 11.136v25.728A11.136 11.136 0 0 1 404.88 704H187.136A11.136 11.136 0 0 1 176 692.864v-25.728c0-6.16 4.976-11.136 11.136-11.136z"
                  ></path>
                </svg>
                {{ item.name }}
              </div>
            </router-link>
          </template>
        </div>
      </div>
      <div id="content">
        <router-view/>
      </div>
    </div>
    <div id="m-footer">
      <m-player custom-class="m-player" @progress="handlerProgress" @time-change="handlerTimeChange">
        <template
            v-slot="{songInfo: {al, name, ar}, currentTime, totalTime, progress, play, pause, next, prev, playStatus}">
          <m-song :artist="ar?.[0]?.name" :cover="al?.picUrl" :liked="false" :name="name"/>
          <m-player-control
              :current-time="currentTime"
              :next="next"
              :pause="pause"
              :play="play"
              :play-status="playStatus"
              :prev="prev"
              :progress-value="progress"
              :total-time="totalTime"/>
        </template>
      </m-player>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MStepControl from '@/components/layout/MStepControl.vue'
import MSearchInput from '@/components/layout/MSearchInput.vue'
import MWindowControl from '@/components/layout/MWindowControl.vue'
import {LayoutProvide, MenuItem, PlayList} from '@/types'
import {getMySongListStore} from '@/store'
import {computed, ComputedRef, nextTick, onMounted, provide, reactive, shallowRef} from 'vue'
import MUserProfile from '@/components/user/MUserProfile.vue'
import MPlayer from '@/components/player/MPlayer.vue'
import MSong from '@/components/song/MSong.vue'
import MPlayerControl from '@/components/player/MPlayerControl.vue'

const fixedMenu: MenuItem[] = [
  {routeName: 'discover', label: '发现音乐', key: 'fixed-menu-item-discover'},
  {routeName: 'podcasts', label: '播客', key: 'fixed-menu-item-podcasts'},
  {routeName: 'video', label: '视频', key: 'fixed-menu-item-video'},
  {routeName: 'concern', label: '关注', key: 'fixed-menu-item-concern'},
  {routeName: 'live', label: '直播', key: 'fixed-menu-item-live'},
  {routeName: 'private-fm', label: '私人FM', key: 'fixed-menu-item-private-fm'}
]

const mySongListStore = getMySongListStore()
const showSideMenu = shallowRef(true)

const playlist: ComputedRef<PlayList[]> = computed(() => mySongListStore.getMyCreatedPlaylist)

onMounted(() => {
  if (playlist.value.length === 0) {
    handlerReload()
  }
})

function handlerReload() {
  nextTick(() => {
    mySongListStore.fetchMySongList()
  })
}

function handlerProgress() {
}

function handlerTimeChange() {
}

function toggleSideMenu(flag: boolean) {
  showSideMenu.value = flag
}

const play = reactive({play: () => undefined})

provide('play', play)
provide<LayoutProvide>('layout', {
  toggleSideMenu
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
      display: flex;
      width: 100%;

      .drag {
        width: 100%;
        -webkit-app-region: drag;
      }

      :nth-of-type(.drag) {
        flex-shrink: 0;
      }
    }
  }

  #side.hide {
    display: none;
  }

  #side {
    overflow: auto;
    height: 100%;
    flex-shrink: 0;
    width: var(--side-width);
    border-right: 1px solid var(--primary-color-border);
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
      display: none;
    }

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
    box-sizing: border-box;

    .m-player {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  #content {
    overflow: hidden;
    overflow-y: auto;
    width: 100%;
    height: 100%;
    position: relative;

    &::-webkit-scrollbar {
      display: none;
    }
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

    .playlist.active {
      background-color: rgb(246, 246, 247);
    }

    .playlist {
      font-size: 13px;
      padding: 5px;
      word-break: keep-all;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
      color: rgb(55, 55, 55);
      user-select: none;

      &:hover {
        color: black;
        background-color: rgb(246, 246, 247);
      }

      .icon {
        position: relative;
        top: -1.5px;
      }
    }
  }
}

.m-layout.vertical {
  flex-direction: column;
}

.m-layout:nth-child(2) {
  height: calc(100vh - (var(--footer-height) + var(--header-height)));
}
</style>
<style>
.play-this .track-name {
  color: var(--primary-color) !important;
}
</style>
