<template>
  <div class="m-recommend">
    <m-banner :banner-list="bannerList"/>
  </div>
</template>

<script lang="ts" setup>
import MBanner from '@/components/banner/MBanner.vue'
import {BannerItem} from '@/types'
import {onMounted} from 'vue'

const bannerList: BannerItem[] = []

onMounted(() => {

})
</script>

<style lang="less" scoped>
.m-recommend {
  width: 1200px;
}
</style>
