<template>
<div id="m-banner" ref="banner">
    <template v-for="item in bannerList" :key="item.key">
        <div ref="bannerItem" class="banner-item">
            <img :src="item.cover" alt="">
        </div>
    </template>
</div>
</template>

<script lang="ts" setup>
import {BannerItem} from '@/types'
import {onMounted, ref} from 'vue'
import {AntiShake} from '@/util/common'
import {getBannerStore} from '@/store'

interface Props {
  bannerList: BannerItem[]
}

defineProps<Props>()

const bannerStore = getBannerStore()

const bannerItem = ref()
const banner = ref()

let timer: NodeJS.Timer | undefined

function startAnim() {
  if (timer === undefined) {
    timer = setInterval(() => {
      banner.value?.classList.add('animation')
    }, 5000)
  }
}

function pauseAnim() {
  if (timer !== undefined) {
    clearInterval(timer)
  }
}

onMounted(() => {
  if (banner.value !== undefined) {
    const antiShake = AntiShake()
    const antiShake1 = AntiShake()
    banner.value.onanimationend = () => {
      antiShake1(() => {
        banner.value.classList.remove('animation')
      })
      antiShake(bannerStore.exchange)
    }
  }
})

defineExpose({
  startAnim,
  pauseAnim
})

</script>

<style lang="less" scoped>

@keyframes anim-1 {
  0% {
    left: 0;
  }
  100% {
    // 第四张
    left: 50%;
    margin-left: calc(510px / -2);
    transform: scale(0.5);
    z-index: 1;
  }
}

@keyframes anim-2 {
  0% {
    transform: scale(1);
    z-index: 2;
  }
  100% {
    // 第一张
    left: 0;
    z-index: 1;
    transform: scale(0.8);
    margin-left: 0;
  }
}

@keyframes anim-3 {
  0% {
  }
  100% {
    // 第二张
    right: 50%;
    margin-right: calc(510px / -2);
    z-index: 2;
    transform: scale(1);
  }
}

@keyframes anim-4 {
  0% {
  }
  100% {
    // 第三张
    left: 100%;
    margin-left: -510px;
    z-index: 1;
    transform: scale(0.8);
  }
}

#m-banner {
  position: relative;
  width: 100%;
  height: 200px;

  .banner-item {
    position: absolute;
    width: 510px;
    height: 200px;
    border-radius: 10px;
    overflow: hidden;
    transform-origin: center;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;


    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .banner-item:nth-child(1) {
    z-index: 1;
    transform: scale(0.8);
  }

  .banner-item:nth-child(2) {
    left: 50%;
    margin-left: calc(510px / -2);
    z-index: 2;
  }

  .banner-item:nth-child(3) {
    right: 0;
    z-index: 1;
    transform: scale(0.8);
  }

  .banner-item:nth-child(4) {
    left: 50%;
    z-index: 0;
    margin-left: calc(510px / -2);
    transform: scale(0.8);
  }

  .banner-item:nth-child(4) ~ .banner-item {
    display: none;
  }

  &.animation {
    .banner-item:nth-child(1) {
      animation-name: anim-1
    }

    .banner-item:nth-child(2) {
      animation-name: anim-2
    }

    .banner-item:nth-child(3) {
      animation-name: anim-3
    }

    .banner-item:nth-child(4) {
      animation-name: anim-4
    }
  }
}
</style>
