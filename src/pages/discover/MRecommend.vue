<template>
  <div class="m-recommend">
    <m-banner ref="mBanner" :banner-list="bannerList"/>
    <div class="list-content">
      <m-group label="推荐歌单">
        <div class="d-flex flex-wrap justify-content-between">
          <template v-for="(item) in recommendSongList">
            <m-card width="19%" :text="item.name" :image="item.picUrl"/>
          </template>
        </div>
      </m-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MBanner from '@/components/banner/MBanner.vue'
import {BannerItem, SongList} from '@/types'
import {computed, ComputedRef, onMounted, ref} from 'vue'
import {getBannerStore, getRecommendSongListStore} from '@/store'
import MGroup from '@/components/group/MGroup.vue'
import MCard from '@/components/card/MCard.vue'

const bannerStore = getBannerStore()
const recommendSongListStore = getRecommendSongListStore()

const bannerList: ComputedRef<BannerItem[]> = computed(() => bannerStore.getBannerList)
const recommendSongList: ComputedRef<SongList[]> = computed(() => recommendSongListStore.getRecommendSongList.slice(0, 10))

const mBanner = ref()

onMounted(() => {
  if (bannerList.value.length === 0) {
    bannerStore.setBanners()
  }
  if (recommendSongList.value.length === 0) {
    recommendSongListStore.fetchRecommendSongList()
  }

  mBanner.value?.startAnim()
})
</script>

<style lang="less" scoped>
.m-recommend {
  min-width: 820px;
  max-width: 1000px;

  .list-content {
    padding: 20px;
    box-sizing: border-box;
  }
}
</style>
