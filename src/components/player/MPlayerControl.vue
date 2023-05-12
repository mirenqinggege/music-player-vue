<template>
  <div class="m-player-control">
    <div class="control-area">
      <div class="m-btn">
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width="20" height="20" fill="currentColor">
          <path
            d="M659.63 879.59H364.29c-40.13 0-79.07-8.3-115.72-24.67-35.3-15.76-66.97-38.3-94.14-66.99-55.64-58.75-86.28-136.77-86.28-219.7 0-82.92 30.64-160.94 86.28-219.7 27.17-28.69 58.84-51.23 94.14-67 36.65-16.37 75.58-24.67 115.72-24.67h295.34c10.15 0 20.37 0.54 30.38 1.62 13.18 1.41 22.72 13.24 21.3 26.42s-13.24 22.72-26.42 21.3c-8.31-0.89-16.81-1.34-25.26-1.34H364.29c-66.03 0-128.18 27.23-175.01 76.67-47.16 49.8-73.13 116.1-73.13 186.69s25.97 136.89 73.13 186.69c46.82 49.44 108.97 76.67 175.01 76.67h295.34c66.03 0 128.18-27.23 175.01-76.67 47.16-49.8 73.13-116.1 73.13-186.69 0-13.25 10.75-24 24-24s24 10.75 24 24c0 82.92-30.64 160.94-86.28 219.69-27.17 28.69-58.84 51.23-94.14 67-36.65 16.38-75.59 24.68-115.72 24.68z"></path>
          <path
            d="M896.94 260.76l-185.33-107c-15.48-8.94-34.83 2.23-34.83 20.11v214c0 17.88 19.35 29.05 34.83 20.11l185.33-107c15.48-8.94 15.48-31.28 0-40.22z"></path>
        </svg>
      </div>
      <div class="m-btn" @click.stop="prev">
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width="20" height="20" fill="currentColor">
          <path d="M362.3 512l445-332.3v664.5L362.3 512zM216.7 179.7h80v664.5h-80V179.7z"></path>
        </svg>
      </div>
      <div class="m-btn" @click.stop="handlerPlay" v-if="playStatus !== 'playing'">
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width="20" height="20" fill="currentColor">
          <path
            d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z"></path>
        </svg>
      </div>
      <div class="m-btn" @click.stop="pause" v-else-if="playStatus === 'playing'">
        <svg class="icon pause" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width="20" height="20" fill="currentColor">
          <path
            d="M426.666667 138.666667v746.666666a53.393333 53.393333 0 0 1-53.333334 53.333334H266.666667a53.393333 53.393333 0 0 1-53.333334-53.333334V138.666667a53.393333 53.393333 0 0 1 53.333334-53.333334h106.666666a53.393333 53.393333 0 0 1 53.333334 53.333334z m330.666666-53.333334H650.666667a53.393333 53.393333 0 0 0-53.333334 53.333334v746.666666a53.393333 53.393333 0 0 0 53.333334 53.333334h106.666666a53.393333 53.393333 0 0 0 53.333334-53.333334V138.666667a53.393333 53.393333 0 0 0-53.333334-53.333334z"></path>
        </svg>
      </div>
      <div class="m-btn" @click.stop="next">
        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width="20" height="20" fill="currentColor">
          <path d="M216.7 844.3V179.7l445 332.3-445 332.3z m590.6 0h-80V179.7h80v664.6z"></path>
        </svg>
      </div>
      <div class="m-btn">
        词
      </div>
    </div>
    <div class="m-progress-bar">
      <div class="m-progress">
        <div :style="{width}" class="m-progress-value"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {getPlaylistStore} from '@/store'

interface Props {
  progressValue?: number | string
  currentTime: string
  totalTime: string
  playStatus: string
  play: (index: number) => Promise<void>
  pause: () => void
  next: () => void
  prev: () => void

}

const props = defineProps<Props>()

const width = computed<string>(() => {
  const {progressValue} = props
  console.log(progressValue)
  if (typeof progressValue === 'string') {
    return progressValue
  } else if (typeof progressValue === 'number') {
    return `${progressValue}%`
  } else {
    return '0'
  }
})

const playlistStore = getPlaylistStore()

function handlerPlay() {
  const currIndex = playlistStore.getCurrIndex
  if (currIndex >= playlistStore.getPlaylist.length) {
    return
  }
  props.play(currIndex)
}
</script>

<style lang="less" scoped>
.m-player-control {
  width: 430px;
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .m-progress-bar {
    height: calc(100% - 36px);
  }


  .m-btn {
    cursor: pointer;
    width: 36px;
    height: 36px;
    text-align: center;
    line-height: 31px;
    margin: 0 10px;

    &:not(:nth-child(3)):hover {
      color: rgb(240, 103, 103);
    }

    &:nth-child(3) {
      border-radius: 50%;
      background-color: rgb(245, 245, 245);

      &:hover {
        background-color: rgb(229, 229, 229);
      }
    }

    svg.icon:not(.pause) {
      position: relative;
      left: 2px;
    }
  }

  .m-progress {
    width: 100%;
    height: 3px;
    background-color: rgb(206, 206, 206);

    .m-progress-value {
      height: 100%;
      background-color: var(--primary-color);
    }
  }
}

</style>
