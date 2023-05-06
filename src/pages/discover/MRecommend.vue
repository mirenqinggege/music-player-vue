<template>
  <div class="m-recommend">
    <m-banner ref="mBanner" :banner-list="bannerList"/>
  </div>
</template>

<script lang="ts" setup>
import MBanner from '@/components/banner/MBanner.vue'
import {BannerItem} from '@/types'
import {computed, ComputedRef, onMounted, ref} from 'vue'
import {getBannerStore} from '@/store'

const bannerStore = getBannerStore()

const bannerList: ComputedRef<BannerItem[]> = computed(() => bannerStore.getBannerList)

const mBanner = ref()

onMounted(() => {
  if (bannerList.value.length === 0) {
    bannerStore.setBanners()
  }

  mBanner.value?.startAnim()
})
</script>

<style lang="less" scoped>
.m-recommend {
  width: 1200px;
}
</style>
