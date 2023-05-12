<template>
  <div class="m-temp-play-list" v-show="show">
    <div class="m-play-list-header">
      <div class="m-play-list-title">当前播放</div>
      <div class="m-play-list-options">
        <small>总0首</small>
        <div class="options">
          <div class="option" @click="playlistStore.clear">清空列表</div>
        </div>
      </div>
      <hr/>
    </div>
    <div class="list">
      <m-table row-key="id" :columns="columns" :data-source="dataSource"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, h} from 'vue'
import MTable, {Column} from '@/components/table/MTable.vue'
import {getPlaylistStore} from '@/store'

const columns: Column[] = [
  {
    label: '',
    dataIndex: 'id',
    format() {
      return h('div')
    },
    width: 20
  },
  {
    label: '',
    dataIndex: 'name',
    customClass: ['track-name'],
    width: 195
  },
  {
    label: '',
    dataIndex: 'artist',
    customClass: ['track-name'],
    width: 150
  },
  {
    label: '',
    dataIndex: 'time',
    width: 72
  }
]

const playlistStore = getPlaylistStore()

const show = computed(() => playlistStore.getPanelShow)

const dataSource = computed(() => playlistStore.getPlaylist)
</script>

<style lang="less" scoped>
.m-temp-play-list {
  width: 420px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: calc(100vh - var(--header-height) - var(--footer-height));
  top: var(--header-height);
  right: 0;
  overflow: hidden;
  box-shadow: 0 0 4px #aaa;
  background-color: white;
  z-index: 4;

  .m-play-list-header {
    box-sizing: border-box;
    padding: 20px 20px 0 20px;

    hr {
      color: rgb(200, 200, 200);
      margin-bottom: 0;
    }
  }

  .m-play-list-title {
    font-size: 20px;
    font-weight: bold;
    color: rgb(55, 55, 55);
    margin-bottom: 5px;
  }

  .m-play-list-options {
    display: flex;
    justify-content: space-between;
    align-items: center;

    small {
      font-family: monospace;
      font-size: 13px;
      color: rgb(207, 207, 207);
    }

    .option {
      font-size: 14px;
      color: rgb(80, 125, 175);
    }
  }

  .list {
    height: calc(100% - 93px);
    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
