<template>
  <div id="m-banner">
    <template v-for="item in bannerList" :key="item.key">
      <div class="banner-item">
        <img :src="item.cover" alt="">
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import {defineProps} from 'vue'
import {BannerProps} from '@/types'

interface Props extends BannerProps {}

defineProps<Props>()
</script>

<style lang="less" scoped>
#m-banner {
  position: relative;
  width: 100%;

  .banner-item {
    position: absolute;
    width: 510px;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
