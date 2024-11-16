<script setup lang="ts">
import {useRoute} from "vue-router";
import {computed, h, inject, reactive, shallowRef, watchPostEffect} from "vue";
import PlayAllBtn from "@/components/btns/PlayAllBtn.vue";
import {PageParams, Track} from "@/types";
import {search} from "@/api/search.ts";
import MTable, {Column} from "@/components/table/MTable.vue";
import MOperate from "@/pages/playlist/MOperate.vue";
import {deepClone, millisecond2minute} from "@/util/common.ts";
import {getPlaylistStore} from "@/store";
import {PlayerControl} from "@/types/modules/player.ts";
import MPagination from "@/components/pagination/MPagination.vue";

const route = useRoute();
const playlistStore = getPlaylistStore();

const keyword = computed(() => route.params.keyword as string);


const listData = shallowRef<Array<Track>>([])
const pageParams = reactive<PageParams>({pageNum: 1, pageSize: 30})
const total = shallowRef(0)
const columns: Column[] = [
  {
    label: '', width: 50, align: 'center', index: true
  },
  {
    label: '', width: 50, align: 'center', format: (val, row, index) => {
      return h(MOperate, {
        liked: true,
        downloaded: true,
        downloading: true,
        value: 50, max: 100,
        key: `operate-${index}`
      })
    }
  },
  {
    label: '音乐标题', dataIndex: 'name', width: 300, customClass: ['track-name']
  },
  {label: '歌手', dataIndex: 'artistName'},
  {label: '专辑', dataIndex: 'albumName'},
  {label: '时长', dataIndex: 'time', width: 72}
]

const play = inject<PlayerControl>('play');

function handleDbClick(obj: any, index: number) {
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

function handleAppend() {
  playlistStore.appendPlaylist(...deepClone(listData.value))
}

function loadData() {
  search(keyword.value, pageParams).then((data) => {
    listData.value = data.result.songs.map(v => {
      const {al, ar, dt} = v
      return {
        ...v,
        artistName: ar.length > 0 ? ar[0].name : '未知歌手',
        albumName: al.name || '未知专辑',
        time: millisecond2minute(dt)
      }
    })
    total.value = data.result.songCount
  })
}

function handlePageChange() {
  loadData()
}

watchPostEffect(() => {
  const value = keyword.value;
  console.log(value)
  Promise.resolve(1)
      .then(i => pageParams.pageNum = i)
      .then(loadData);
})
</script>

<template>
  <div class="m-search d-flex flex-column p-3">
    <div class="flex-shrink-0">
      <h5>搜索 {{ keyword }}</h5>
      <play-all-btn @play-all="handlePlayAll" @append="handleAppend"/>
    </div>
    <div class="flex-fill d-flex flex-column gap-3">
      <m-table @row-double-click="handleDbClick" row-key="id" :data-source="listData" :columns="columns"/>
      <m-pagination @change="handlePageChange" v-model:page-num="pageParams.pageNum" :page-size="pageParams.pageSize"
                    :total="total"/>
    </div>
  </div>
</template>

<style scoped lang="less">

</style>