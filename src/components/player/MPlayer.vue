<template>
  <div :class="customClass">
    <slot
        :current-time="currentTime"
        :next="next"
        :pause="pause"
        :play="play"
        :play-status="playStatus"
        :prev="prev"
        :progress="progress"
        :song-info="songInfo"
        :total-time="totalTime">
    </slot>
    <div class="m-options">
      <div class="m-btn" @click.stop="playlistStore.togglePanel">
        <svg class="icon" fill="currentColor" height="20" version="1.1"
             viewBox="0 0 1024 1024" width="20" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M128 432c0-35.2 25.104-49.888 55.776-32.624l144.432 81.248c30.672 17.264 30.672 45.504 0 62.752l-144.432 81.248C153.104 641.888 128 627.2 128 592V432zM896 688a32 32 0 0 1-32 32H480a32 32 0 1 1 0-64h384a32 32 0 0 1 32 32zM896 160a32 32 0 0 1-32 32H160a32 32 0 1 1 0-64h704a32 32 0 0 1 32 32zM896 864a32 32 0 0 1-32 32H160a32 32 0 1 1 0-64h704a32 32 0 0 1 32 32zM896 336a32 32 0 0 1-32 32H480a32 32 0 1 1 0-64h384a32 32 0 0 1 32 32zM896 512a32 32 0 0 1-32 32H480a32 32 0 1 1 0-64h384a32 32 0 0 1 32 32z"></path>
        </svg>
      </div>
      <div class="m-btn">
        <el-popover :teleported="false" trigger="hover" placement="top" width="50">
          <template #default>
            <div>
              <el-slider height="150px" :min="0" :max="100" vertical v-model="volume"/>
              <div style="text-align: center">{{ volume }}%</div>
            </div>
          </template>
          <template #reference>
            <svg @click="handleRestore" v-if="muted" class="icon" fill="currentColor" height="20" version="1.1"
                 viewBox="0 0 1024 1024" width="20" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M448 938.666667a21.333333 21.333333 0 0 1-15.093333-6.246667L225.833333 725.333333H53.333333a53.393333 53.393333 0 0 1-53.333333-53.333333V352a53.393333 53.393333 0 0 1 53.333333-53.333333h172.5l207.08-207.086667A21.333333 21.333333 0 0 1 469.333333 106.666667v810.666666a21.333333 21.333333 0 0 1-21.333333 21.333334zM53.333333 341.333333a10.666667 10.666667 0 0 0-10.666666 10.666667v320a10.666667 10.666667 0 0 0 10.666666 10.666667h181.333334a21.333333 21.333333 0 0 1 15.086666 6.246666L426.666667 865.833333V158.166667L249.753333 335.086667A21.333333 21.333333 0 0 1 234.666667 341.333333z m964.42 377.753334a21.333333 21.333333 0 0 0 0-30.173334L840.833333 512l176.92-176.913333a21.333333 21.333333 0 1 0-30.173333-30.173334L810.666667 481.833333 633.753333 304.913333a21.333333 21.333333 0 0 0-30.173333 30.173334L780.5 512l-176.92 176.913333a21.333333 21.333333 0 0 0 30.173333 30.173334L810.666667 542.166667l176.913333 176.92a21.333333 21.333333 0 0 0 30.173333 0z"></path>
            </svg>
            <svg @click="handleSilent" v-else class="icon" fill="currentColor" height="20" version="1.1"
                 viewBox="0 0 1024 1024" width="20" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M448 938.666667a21.333333 21.333333 0 0 1-15.093333-6.246667L225.833333 725.333333H53.333333a53.393333 53.393333 0 0 1-53.333333-53.333333V352a53.393333 53.393333 0 0 1 53.333333-53.333333h172.5l207.08-207.086667A21.333333 21.333333 0 0 1 469.333333 106.666667v810.666666a21.333333 21.333333 0 0 1-21.333333 21.333334zM53.333333 341.333333a10.666667 10.666667 0 0 0-10.666666 10.666667v320a10.666667 10.666667 0 0 0 10.666666 10.666667h181.333334a21.333333 21.333333 0 0 1 15.086666 6.246666L426.666667 865.833333V158.166667L249.753333 335.086667A21.333333 21.333333 0 0 1 234.666667 341.333333z"></path>
            </svg>
          </template>
        </el-popover>
      </div>
    </div>
    <m-temp-playlist/>
  </div>
</template>

<script lang="ts" setup>
import {getPlayerStore, getPlaylistStore} from '@/store'
import {computed, inject, onMounted, ref, watchSyncEffect} from 'vue'
import {PlayIndexOutboundException, Track} from '@/types'
import {newInterval, second2minute} from '@/util/common'
import MTempPlaylist from '@/components/player/MTempPlaylist.vue'
import {ElPopover, ElSlider} from 'element-plus'
import {PlayerControl} from "@/types/modules/player.ts";

interface Props {
  customClass?: string[] | string
}

defineProps<Props>()

interface Emits {
  (event: 'progress', val: number, max: number): void

  (event: 'timeChange', val: string, max: string): void
}

const emits = defineEmits<Emits>()

const canplayFlag = ref<boolean>(false)

const playerStore = getPlayerStore()
const playlistStore = getPlaylistStore()

const playlist = computed<Track[]>(() => {
  return playerStore.getLoopMethod === 'list-random' ? playlistStore.getRandomOrder : playlistStore.getPlaylist
})
const playStatus = computed<string>(() => playerStore.getPlayStatus)
const songInfo = computed<Track>(() => playerStore.songInfo || {})

const audio: HTMLAudioElement = new Audio()

audio.addEventListener('canplay', () => {
  playerStore.canplay()
})

audio.addEventListener('ended', () => {
  if (playerStore.getLoopMethod === 'single-loop') {
    stop()
    playlistStore.offset(0).then(play).catch((err) => {
      console.error(err)
      play(0)
    })
  } else {
    next()
  }
})

audio.addEventListener('error', () => {
  playerStore.stop()
  executor.stop()
  const currIndex = playlistStore.getCurrIndex
  play(currIndex)
})

const progress = ref<number>(0)
const currentTime = ref<string>('00:00')
const totalTime = ref<string>('00:00')

const executor = newInterval(500, () => {
  const {currentTime: currentTime1, duration} = audio
  playerStore.currentTime = currentTime1
  const progress1 = ((currentTime1 / duration) * 100).toFixed(2)
  const number = parseInt(progress1)
  progress.value = isNaN(number) ? 0 : number
  emits('progress', progress.value, 100)
  currentTime.value = second2minute(currentTime1)
  totalTime.value = second2minute(duration)
  emits('timeChange', currentTime.value, totalTime.value)
  navigator.mediaSession.setPositionState({duration, playbackRate: 1, position: currentTime1})
})

async function play(index: number) {
  if (index == undefined) {
    return
  }
  navigator.mediaSession.playbackState = 'playing'
  if (playStatus.value === 'pause') {
    return audio.play().then(playerStore.play).then(() => {
      executor.start()
    })
  }
  await playlistStore.setPosition(index)
  return playerStore.update(playlist.value[index])
      .then(playerStore.load)
      .then(url => {
        audio.src = url
        canplayFlag.value = true
        executor.start()
      })
      .then(() => {
        const {name: title, ar: [{name: artist}], al: {name: album, picUrl}} = playerStore.getSongInfo;
        navigator.mediaSession.metadata = new MediaMetadata({
          album: album || '未知专辑', artwork: [{
            src: picUrl
          }],
          artist: artist || '未知艺术家',
          title: title || '未知'
        })
      })
}

function pause() {
  navigator.mediaSession.playbackState = 'paused'
  audio.pause()
  executor.stop()
  playerStore.pause()
}

function stop() {
  audio.pause()
  executor.stop()
  playerStore.stop()
}

function next() {
  stop()
  playlistStore.offset(1)
      .then(play)
      .catch((err) => {
        console.error(err)
        if (err instanceof PlayIndexOutboundException) {
          if (playerStore.getLoopMethod === 'list-order') {
            stop()
            return
          }
        }
        play(0)
      })
}

function prev() {
  stop()
  playlistStore.offset(-1)
      .then(play)
      .catch((err) => {
        console.error(err)
        const number = playlistStore.getPlaylist.length - 1
        play(number)
      })
}

let prevVolume: number

function handleSilent() {
  prevVolume = playerStore.getVolume
  playerStore.setVolume(0)
}

function handleRestore() {
  playerStore.setVolume(prevVolume)
}

// provide('play', readonly(play))
const playObj = inject<PlayerControl>('play')

if (playObj !== undefined) {
  playObj.play1 = play
  playObj.stop = stop
}

watchSyncEffect(() => {
  const canplay = playerStore.isCanplay
  if (canplay && canplayFlag.value) {
    playerStore.play()
    audio.play()
    canplayFlag.value = false
  }
})

watchSyncEffect(() => {
  audio.volume = playerStore.getVolume / 100
})

const volume = computed({
  get() {
    return playerStore.getVolume
  },
  set(val) {
    playerStore.setVolume(val)
  }
})
const muted = computed(() => playerStore.getVolume === 0)

onMounted(() => {
  navigator.mediaSession.playbackState = 'paused'
  navigator.mediaSession.setActionHandler('nexttrack', () => {
    next()
  })
  navigator.mediaSession.setActionHandler('previoustrack', () => {
    prev()
  })
  navigator.mediaSession.setActionHandler('play', () => {
    play(playlistStore.currIndex)
  })
  navigator.mediaSession.setActionHandler('pause', () => {
    pause()
  })
  navigator.mediaSession.setActionHandler('stop', () => {
    stop()
  })
})

</script>

<style lang="less">

.m-options {
  width: 206px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;

  .m-btn {
    cursor: pointer;
    margin: 5px;

    .el-popover.el-popper {
      min-width: unset;
      padding-inline: 5px;
      padding-block: 20px;
    }

    .el-slider__bar {
      background-color: #EC4141;
    }

    .el-slider__button {
      border-color: #EC4141;
    }
  }
}
</style>
