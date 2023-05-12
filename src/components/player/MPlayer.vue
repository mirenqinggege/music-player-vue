<template>
  <div :class="customClass">
    <slot
      :total-time="totalTime"
      :current-time="currentTime"
      :progress="progress"
      :song-info="songInfo"
      :prev="prev"
      :next="next"
      :play-status="playStatus"
      :pause="pause"
      :play="play">
    </slot>
    <div class="m-options">
      {{ progress }}
      {{ currentTime }}
      {{ totalTime }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import {getPlayerStore, getPlaylistStore} from '@/store'
import {computed, inject, ref, watchSyncEffect} from 'vue'
import {Track} from '@/types'
import {newInterval, second2minute} from '@/util/common'

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

const playlist = computed<Track[]>(() => playlistStore.getPlaylist)
const playStatus = computed<string>(() => playerStore.getPlayStatus)
const songInfo = computed<Track>(() => playerStore.songInfo || {})

const audio: HTMLAudioElement = new Audio()

audio.addEventListener('canplay', () => {
  playerStore.canplay()
})

audio.addEventListener('ended', () => {
  next()
})

audio.addEventListener('error', (error) => {
  playerStore.stop()
  executor.stop()
  const currIndex = playlistStore.getCurrIndex
  play(currIndex)
})

const progress = ref<number>(0)
const currentTime = ref<string>('00:00')
const totalTime = ref<string>('00:00')

const executor = newInterval(1000, () => {
  const {currentTime: currentTime1, duration} = audio
  const progress1 = ((currentTime1 / duration) * 100).toFixed(2)
  const number = parseInt(progress1)
  progress.value = isNaN(number) ? 0 : number
  emits('progress', progress.value, 100)
  currentTime.value = second2minute(currentTime1)
  totalTime.value = second2minute(duration)
  emits('timeChange', currentTime.value, totalTime.value)
})

async function play(index: number) {
  if (index == undefined) {
    return
  }

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
}

function pause() {
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
    .catch(() => {
      play(0)
    })
}

function prev() {
  stop()
  playlistStore.offset(-1)
    .then(play)
    .catch(() => {
      const number = playlistStore.getPlaylist.length - 1
      play(number)
    })
}

// provide('play', readonly(play))
const playObj = inject('play')
playObj.play1 = play
playObj.stop = stop

watchSyncEffect(() => {
  const canplay = playerStore.isCanplay
  if (canplay && canplayFlag.value) {
    playerStore.play()
    audio.play()
    canplayFlag.value = false
  }
})

watchSyncEffect(() => {
  audio.volume = playerStore.getVolume
})

</script>

<style lang="less">

.m-options {
  width: 206px;
}

</style>
