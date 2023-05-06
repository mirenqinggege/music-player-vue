<template>
  <div id="m-discover-music">
    <div class="nav">
      <template v-for="item in navList" :key="item.key">
        <router-link custom v-slot="{navigate, isActive}" :to="{name: item.routeName}">
          <div @click="navigate" :class="isActive ? ['nav-item', 'active'] : ['nav-item']">{{ item.label }}</div>
        </router-link>
      </template>
    </div>
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {MenuItem} from '@/types'

const navList: MenuItem[] = [
  {routeName: 'recommend', label: '个性推荐', key: 'discover-nav-item-recommend'},
  {routeName: 'customize', label: '专属定制', key: 'discover-nav-item-customize'},
  {routeName: 'playlist', label: '歌单', key: 'discover-nav-item-playlist'},
  {routeName: 'list', label: '排行榜', key: 'discover-nav-item-list'},
]
</script>

<style lang="less" scoped>
#m-discover-music {
  display: flex;
  flex-direction: column;
  height: 100%;

  .nav {
    display: flex;
    flex-shrink: 0;
    box-sizing: border-box;
    padding: 20px;
  }

  .nav-item {
    position: relative;
    cursor: pointer;
    font-size: 20px;
  }

  .nav-item + .nav-item {
    margin-left: 20px;
  }

  .nav-item.active {
    font-weight: bold;
    font-size: 24px;

    &:after {
      content: ' ';
      position: absolute;
      bottom: 0;
      width: 80%;
      height: 3px;
      border-radius: 50px;
      background-color: var(--primary-color);
      left: 0;
      margin-left: 10%;
    }
  }

  #content {
    height: calc(100% - 76px);
    display: flex;
    justify-content: center;
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
