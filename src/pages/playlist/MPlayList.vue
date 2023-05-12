<template>
  <div class="m-play-list">
    <div class="info-area">
      <div class="cover">
        <img :src="playlist?.coverImgUrl" alt=""/>
      </div>
      <div class="text-area">
        <div class="title">
          <div class="tag">歌单</div>
          <div class="label">{{ playlist?.name }}</div>
        </div>
        <div class="user-info">
          <div class="avatar">
            <img :src="playlist?.creator?.avatarUrl" alt="">
          </div>
          <router-link to="">{{ playlist?.creator?.nickname }}</router-link>
          <div class="create-info">
            {{ formatDate(playlist?.createTime, 'yyyy-MM-dd') }}创建
          </div>
        </div>
        <div class="func-area">
          <div class="button-group">
            <button @click.stop="playAll">
              <svg class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor">
                <path
                  d="M817.088 484.96l-512-323.744C295.232 154.976 282.752 154.592 272.576 160.224 262.336 165.856 256 176.608 256 188.256l0 647.328c0 11.648 6.336 22.4 16.576 28.032 4.8 2.656 10.112 3.968 15.424 3.968 5.952 0 11.904-1.664 17.088-4.928l512-323.616C826.368 533.184 832 522.976 832 512 832 501.024 826.368 490.816 817.088 484.96z"></path>
              </svg>
              播放全部
            </button>
            <button @click.stop="appendEnd">
              <svg class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="15" height="15">
                <path
                  d="M512 1024a58.336 58.336 0 0 1-58.368-58.368V58.368a58.336 58.336 0 1 1 116.736 0v907.264c0 31.744-25.6 58.368-58.368 58.368z m453.632-453.632H58.368a58.336 58.336 0 1 1 0-116.736h907.264a58.336 58.336 0 1 1 0 116.736z"></path>
              </svg>
            </button>
          </div>
          <button :disabled="playlist?.subscribed" @click="handlerSubscribe">
            <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 width="16" height="16" fill="currentColor">
              <path
                d="M484 443.1V528h-84.5c-4.1 0-7.5 3.1-7.5 7v42c0 3.8 3.4 7 7.5 7H484v84.9c0 3.9 3.2 7.1 7 7.1h42c3.9 0 7-3.2 7-7.1V584h84.5c4.1 0 7.5-3.2 7.5-7v-42c0-3.9-3.4-7-7.5-7H540v-84.9c0-3.9-3.1-7.1-7-7.1h-42c-3.8 0-7 3.2-7 7.1z"></path>
              <path
                d="M880 298.4H521L403.7 186.2c-1.5-1.4-3.5-2.2-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z"></path>
            </svg>
            收藏({{ numFormat(playlist?.subscribedCount) || 0 }})
          </button>
          <button>
            <svg class="icon" viewBox="0 0 1053 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 width="16" height="16" fill="currentColor">
              <path
                d="M849.09935368 141.42947916h-202.20073764c-9.28906634 0-17.24800831 3.27079843-23.81141001 9.87780978a32.38090101 32.38090101 0 0 0-9.89961607 23.89863152c0 9.26726151 3.27079843 17.18259238 9.89961607 23.76779962 6.54159614 6.60701208 14.52234368 9.89961534 23.81141001 9.89961534h120.82328116l-279.60962593 279.54421a31.94479498 31.94479498 0 0 0-9.70336752 23.78960518c0 9.5943412 3.20538176 17.61869912 9.5943412 23.98585227 6.38895871 6.49798576 14.43512218 9.70336751 24.09487931 9.70336825 9.48531415 0 17.4660617-3.29260327 23.96404674-9.81239457l279.32615733-279.54420999v120.80147633c0 9.35448227 3.27079843 17.29161942 9.87780979 23.87682596 6.58520652 6.58520652 14.52234368 9.87781052 23.83321556 9.87780979 9.28906634 0 17.24800831-3.27079843 23.81141002-9.87780979 6.60701208-6.58520652 9.89961534-14.52234368 9.89961607-23.8986315v-202.13532173c0-9.24545594-3.27079843-17.29161942-9.89961607-23.87682668A32.42451141 32.42451141 0 0 0 849.09935368 141.42947916zM475.00727343 143.28293101c-45.11520803 4.40467496-88.98751322 17.20439794-129.41457771 37.67959431a371.47544195 371.47544195 0 0 0-178.3675228 195.02678766A369.07685628 369.07685628 0 0 0 141.42947916 512.11992911c0 50.34848539 9.74697864 98.42921698 29.19732408 144.26400109 18.09841626 43.34897768 44.52646458 82.68577601 79.26234014 117.9013687 35.25920307 34.8012915 74.59600215 61.16392461 117.94497979 79.28414569 45.79117299 19.45034616 93.87190532 29.21912963 144.2640011 29.21912963a368.29186501 368.29186501 0 0 0 136.08700572-25.83930487 371.69349532 371.69349532 0 0 0 113.49669376-70.73646026 371.34461006 371.34461006 0 0 0 81.61731469-107.58745144 366.76549284 366.76549284 0 0 0 37.63598318-129.34916177c0.87221277-10.09586316-1.96247891-18.75257565-8.56949099-26.16638529a32.38090101 32.38090101 0 0 0-25.14153436-10.98988148c-8.59129656 0-16.09232696 2.87830207-22.50309049 8.63490692-6.45437465 5.7784097-10.07405833 13.08319228-10.94627111 21.63087846a299.38705178 299.38705178 0 0 1-30.63647547 106.06107927 298.10053782 298.10053782 0 0 1-67.05136135 87.94085819 293.6086421 293.6086421 0 0 1-92.67261212 57.95854212 303.09395624 303.09395624 0 0 1-111.33796701 21.02032871c-41.25566688 0-80.57065966-7.93713643-117.96678465-23.68057814-35.45545163-14.93664488-67.66190964-36.67654892-96.61937551-65.08888171-28.43413835-28.93566031-50.10862646-61.05489757-65.00166095-96.59757068a299.14719359 299.14719359 0 0 1-23.72418851-117.87956314c0-38.42097518 7.02131328-75.57724124 21.04213427-111.42518779A292.40934962 292.40934962 0 0 1 287.74317993 308.02212848a299.51788367 299.51788367 0 0 1 194.00193745-97.62242017c8.61310137-0.91582315 15.80885765-4.51370129 21.58726735-11.01168705 5.80021524-6.36715388 8.72212843-13.88998911 8.72212843-22.43767527 0-6.69423357-1.26470841-12.36361694-3.83773634-17.09537089a25.77388893 25.77388893 0 0 0-10.1176687-10.59738585 51.24250371 51.24250371 0 0 0-11.99292615-4.75356021 52.15832687 52.15832687 0 0 0-11.20793487-1.30831878l0.08722151 0.08722075z"></path>
            </svg>
            分享({{ numFormat(playlist?.shareCount) || 0 }})
          </button>
          <button>
            <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 width="16" height="16" fill="currentColor">
              <path
                d="M936.413091 291.712c-5.969455-12.846545-21.224727-18.397091-34.048-12.439273-12.846545 5.969455-18.408727 21.213091-12.427636 34.048 25.623273 55.109818 38.609455 114.129455 38.609455 175.406545 0 229.678545-186.868364 416.546909-416.546909 416.546909C282.309818 905.274182 95.453091 718.405818 95.453091 488.727273c0-61.265455 12.986182-120.273455 38.597818-175.383273 5.969455-12.846545 0.395636-28.090182-12.439273-34.048-12.858182-5.969455-28.090182-0.395636-34.048 12.439273C58.775273 353.664 44.183273 419.933091 44.183273 488.727273c0 257.954909 209.861818 467.816727 467.816727 467.816727S979.816727 746.682182 979.816727 488.727273C979.816727 419.921455 965.213091 353.640727 936.413091 291.712z"></path>
              <path
                d="M500.363636 719.453091l132.817455-132.817455c9.088-9.088 9.088-23.819636 0-32.907636s-23.819636-9.088-32.907636 0L523.636364 630.365091 523.636364 174.545455c0-12.846545-10.426182-23.272727-23.272727-23.272727s-23.272727 10.426182-23.272727 23.272727l0 455.819636-76.625455-76.637091c-9.076364-9.088-23.831273-9.088-32.907636 0-9.088 9.088-9.088 23.819636 0 32.907636L500.363636 719.453091z"></path>
            </svg>
            下载全部
          </button>
        </div>
      </div>
    </div>

    <div class="tabs">
      <template v-for="item in tabs" :key="item.key">
        <div @click="handlerActive(item)" :class="item.active ? 'active' : ''">{{
            item.label
          }}{{ item.count !== undefined ? `(${item.count})` : '' }}
        </div>
      </template>
    </div>
    <div class="tabs-content">
      <m-table @row-double-click="handlerRowDbClick" row-key="id" v-if="tabs[0].active" :columns="columns"
               :data-source="dataSource"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, h, inject, reactive, Ref, ref, watchSyncEffect} from 'vue'
import {useRoute} from 'vue-router'
import {getPlaylistDetail, subscribePlaylist} from '@/api/playlist'
import {equals, PlayList, Track} from '@/types'
import {deepClone, formatDate, millisecond2minute} from '@/util/common'
import {UnwrapNestedRefs} from '@vue/reactivity'
import MTable, {Column} from '@/components/table/MTable.vue'
import MOperate from '@/pages/playlist/MOperate.vue'
import {getPlayerStore, getPlaylistStore} from '@/store'
import MTablePlayIcon from '@/components/icon/MTablePlayIcon.vue'
import {numFormat} from '@/util/common'

const route = useRoute()

const playerStore = getPlayerStore()

const playlist: Ref<PlayList | undefined> = ref(undefined)
const songList: Ref<Track[] | undefined> = ref(undefined)
const columns: Column[] = [
  {
    label: '', index: true, align: 'center', width: 64, format: (val, row, index) => {
      const songInfo = playerStore.getSongInfo
      if (!equals(songInfo || {}, row)) {
        return h('span', {}, String(index + 1))
      }
      return h(MTablePlayIcon, {})
    }, customClass: ['track-name']
  },
  {
    label: '操作',
    width: 50,
    format: (val, row, index) => h(MOperate, {
      liked: true,
      downloaded: true,
      downloading: true,
      value: 50, max: 100,
      key: `operate-${index}`
    })
  },
  {label: '标题', dataIndex: 'name', width: 300, customClass: ['track-name']},
  {label: '歌手', dataIndex: 'artist'},
  {label: '专辑', dataIndex: 'album'},
  {label: '时间', dataIndex: 'time', width: 72}
]

const dataSource = computed(() => {
  return songList.value?.map((value) => {
    const {ar, al, dt} = value
    return {
      ...value,
      artist: (0 < ar?.length ? ar?.[0].name : '未知歌手'),
      album: al?.name || '未知专辑',
      time: millisecond2minute(dt)
    }
  })
})

interface Tab {
  label: string
  active: boolean
  key: string
  count?: number
}

const commentCount = computed(() => playlist.value?.commentCount || 0)

const tabs: UnwrapNestedRefs<Tab[]> = reactive([
  {label: '歌曲列表', active: true, key: 'tabs-song-list'},
  {label: '评论', active: false, key: 'tabs-song-comment', count: commentCount},
  {label: '收藏者', active: false, key: 'tabs-collectors'}
])

watchSyncEffect(() => {
  const {id} = route.params
  if (id) {
    getPlaylistDetail(id).then(({playlist: playList}) => {
      playlist.value = playList
      songList.value = playList.tracks
    })
  }
})

function handlerActive(obj: Tab) {
  tabs.forEach(v => {
    v.active = v.key === obj.key
  })
}

const playlistStore = getPlaylistStore()

const play = inject('play')

function handlerRowDbClick(obj, index) {
  play.stop()
  const includes = playlistStore.includes
  const number = includes(obj)
  if (number === -1) {
    playlistStore.setPlaylist(deepClone(dataSource.value))
      .then(() => play.play1?.(index))
  } else {
    play.play1?.(number)
  }
}

function playAll() {
  play.stop()
  playlistStore.setPlaylist(deepClone(dataSource.value))
    .then(play.play1)
}

function appendEnd() {
  playlistStore.appendPlaylist(...deepClone(dataSource.value))
}

function handlerSubscribe() {
  const {id} = route.params
  if (id) {
    const value = <PlayList>(playlist.value)
    subscribePlaylist(id).then(() => {
      value.subscribed = true
      value.subscribedCount ++
      alert('收藏成功')
    }).catch(() => {
      value.subscribed = true
    })
  }
}
</script>

<style lang="less" scoped>
.m-play-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  .info-area {
    display: flex;
    padding: 30px;
    box-sizing: border-box;

    .cover {
      width: 185px;
      height: 185px;
      border-radius: 5px;
      overflow: hidden;
      border: 1px solid rgb(242, 242, 242)
    }

    .text-area {
      margin-left: 20px;
      display: flex;
      flex-direction: column;

      .title {
        display: flex;
        align-items: center;
        padding-top: 2px;

        .tag {
          height: 20px;
          line-height: 16px;
          padding: 0 3px;
          border-radius: 4px;
          font-size: 14px;
          color: var(--primary-color);
          border: 1px solid var(--primary-color);
        }

        .label {
          position: relative;
          top: -2px;
          margin-left: 10px;
          font-size: 23px;
          color: rgb(55, 55, 55);
          font-weight: bold;
        }
      }

      .user-info {
        display: flex;
        align-items: center;
        font-size: 12px;

        a {
          text-decoration: none;
          color: rgb(80, 125, 175);
        }

        & > *:not(:first-child) {
          margin-left: 10px;
        }

        .avatar {
          border-radius: 50%;
          overflow: hidden;
          height: 25px;
          width: 25px;
        }

        .create-info {
          color: rgb(103, 103, 103);
        }
      }

      .func-area {
        margin-top: 10px;
        display: flex;
        word-break: keep-all;
        white-space: nowrap;

        & > div {
          word-break: keep-all;
          white-space: nowrap;
        }


        & > button {
          margin-left: 12px;
        }

        & > :first-child {
          button {
            background-color: var(--primary-color);
            color: white;

            &:first-child {
              border-right: 0;
            }

            &:nth-child(2) {
              padding: 7.5px 10px;

            }
          }
        }

        button {
          padding: 7px 20px;
          font-size: 12px;
          color: rgb(55, 55, 55);
          border-radius: 20px;
          border: 1px solid rgb(217, 217, 217);
          background-color: transparent;

          svg.icon {
            position: relative;
            top: -1px;
          }
        }
      }
    }
  }

  .tabs {
    display: flex;
    align-items: center;
    font-size: 15px;
    color: rgb(55, 55, 55);
    padding: 10px 30px;

    & > div {
      cursor: pointer;
    }

    & > div:not(:first-child) {
      margin-left: 24px;
    }

    & > div.active {
      font-size: 20px;
      font-weight: bold;
      position: relative;

      &:after {
        content: ' ';
        position: absolute;
        bottom: -2px;
        left: 10%;
        width: 80%;
        height: 4px;
        background-color: var(--primary-color);
        border-radius: 20px;
      }
    }
  }
}

img {
  width: 100%;
  height: 100%;
}
</style>
