<template>
  <div class="m-player-control">
    <div class="control-area">
      <div class="m-btn">
        <m-loop-method/>
      </div>
      <div class="m-btn" @click.stop="prev">
        <svg class="icon" fill="currentColor" height="20" version="1.1"
             viewBox="0 0 1024 1024" width="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M362.3 512l445-332.3v664.5L362.3 512zM216.7 179.7h80v664.5h-80V179.7z"></path>
        </svg>
      </div>
      <div v-if="playStatus !== 'playing'" class="m-btn" @click.stop="handlerPlay">
        <svg class="icon" fill="currentColor" height="20" version="1.1"
             viewBox="0 0 1024 1024" width="20" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M128 138.666667c0-47.232 33.322667-66.666667 74.176-43.562667l663.146667 374.954667c40.96 23.168 40.853333 60.8 0 83.882666L202.176 928.896C161.216 952.064 128 932.565333 128 885.333333v-746.666666z"></path>
        </svg>
      </div>
      <div v-else-if="playStatus === 'playing'" class="m-btn" @click.stop="pause">
        <svg class="icon pause" fill="currentColor" height="20" version="1.1"
             viewBox="0 0 1024 1024" width="20" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M426.666667 138.666667v746.666666a53.393333 53.393333 0 0 1-53.333334 53.333334H266.666667a53.393333 53.393333 0 0 1-53.333334-53.333334V138.666667a53.393333 53.393333 0 0 1 53.333334-53.333334h106.666666a53.393333 53.393333 0 0 1 53.333334 53.333334z m330.666666-53.333334H650.666667a53.393333 53.393333 0 0 0-53.333334 53.333334v746.666666a53.393333 53.393333 0 0 0 53.333334 53.333334h106.666666a53.393333 53.393333 0 0 0 53.333334-53.333334V138.666667a53.393333 53.393333 0 0 0-53.333334-53.333334z"></path>
        </svg>
      </div>
      <div class="m-btn" @click.stop="next">
        <svg class="icon" fill="currentColor" height="20" version="1.1"
             viewBox="0 0 1024 1024" width="20" xmlns="http://www.w3.org/2000/svg">
          <path d="M216.7 844.3V179.7l445 332.3-445 332.3z m590.6 0h-80V179.7h80v664.6z"></path>
        </svg>
      </div>
      <div class="m-btn">
        词
      </div>
    </div>
    <div class="m-progress-bar">
      <span>{{ currentTime }}</span>
      <div class="m-progress">
        <div :style="{width}" class="m-progress-value"></div>
      </div>
      <span>{{ totalTime }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import {getPlaylistStore} from '@/store'
import MLoopMethod from "@/components/player/MLoopMethod.vue";

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
  box-sizing: border-box;
  padding: 7px 0;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .m-progress-bar {
    height: calc(100% - 36px);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    font-size: 12px;

    span {
      margin: 0 5px;
      color: rgb(159, 159, 159);
    }
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
      transition: all 800ms;
      height: 100%;
      background-color: var(--primary-color);
    }
  }
}

</style>
