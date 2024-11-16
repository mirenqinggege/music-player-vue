<script setup lang="ts">

import PlayAllBtn from "@/components/btns/PlayAllBtn.vue";
import MTable, {Column} from "@/components/table/MTable.vue";
import {computed, h, inject} from "vue";
import {getPlayerStore, getPlaylistStore, getRecommendStore} from "@/store";
import MTablePlayIcon from "@/components/icon/MTablePlayIcon.vue";
import MOperate from "@/pages/playlist/MOperate.vue";
import {deepClone, millisecond2minute} from "@/util/common.ts";
import {PlayerControl} from "@/types/modules/player.ts";

const playerStore = getPlayerStore();
const playlistStore = getPlaylistStore();
const recommendStore = getRecommendStore();

const songInfo = computed(() => playerStore.getSongInfo)
const listData = computed(() => recommendStore.getSongList.map(v => {
  const {ar, al, dt} = v
  return {
    ...v,
    artist: (0 < ar?.length ? ar?.[0].name : '未知歌手'),
    album: al?.name || '未知专辑',
    time: millisecond2minute(dt)
  }
}))

const columns: Column[] = [
  {
    label: '', index: true, align: 'center', width: 64, format: (val, row, index) => {
      if (row.id !== songInfo.value?.id) {
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

const play = inject<PlayerControl>('play');

function handleDbClick(obj, index) {
  play.stop()
  const i = playlistStore.includes(obj);
  if (i === -1) {
    playlistStore.setPlaylist(deepClone(listData.value))
        .then(() => play.play1(index))
  } else {
    play.play1(i)
  }
}

function handlePlayAll() {
  play.stop()
  playlistStore.setPlaylist(deepClone(listData.value))
      .then(play.play1)
}

function append() {
  playlistStore.appendPlaylist(...deepClone(listData.value))
}

</script>

<template>
  <div class="m-recommend d-flex flex-column">
    <div class="flex-shrink-0 border-bottom">
      <div class="px-5 py-3">
        <h4>每日推荐歌曲</h4>
        <small>根据你的音乐口味生成,每天6:00更新</small>
      </div>
      <div class="px-5 py-3">
        <play-all-btn @play-all="handlePlayAll" @append="append"/>
      </div>
    </div>
    <div class="flex-fill">
      <m-table @row-double-click="handleDbClick" row-key="id" :data-source="listData" :columns="columns"/>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>