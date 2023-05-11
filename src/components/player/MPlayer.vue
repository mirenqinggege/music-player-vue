<template>
  <div :class="customClass">
    <slot
      :song-info="songInfo"
      :prev="prev"
      :next="next"
      :play-status="playStatus"
      :pause="pause"
      :play="play">
    </slot>
  </div>
</template>

<script lang="ts" setup>
import {getPlayerStore, getPlaylistStore} from '@/store'
import {computed, inject, provide, readonly, ref, watchSyncEffect} from 'vue'
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
  console.log('canplay!!!')
  playerStore.canplay()
})

audio.addEventListener('pause', () => {
  playerStore.pause()
})

audio.addEventListener('ended', () => {
  playerStore.stop()
  executor.stop()
})

audio.addEventListener('error', (error) => {
  playerStore.stop()
  executor.stop()
  /*const currIndex = playlistStore.getCurrIndex
  play(currIndex)*/
  console.log(error)
})

const executor = newInterval(1000, () => {
  const {currentTime, duration} = audio
  const progress = ((currentTime / duration) * 100).toFixed(2)
  const number = parseInt(progress)
  emits('progress', isNaN(number) ? 0 : number, 100)
  emits('timeChange', second2minute(currentTime), second2minute(duration))
})

async function play(index: number) {
  if (index == undefined) {
    return
  }
  await playlistStore.setPosition(index)
  return playerStore.update(playlist.value[index])
    .then(playerStore.load)
    .then(url => {
      audio.src = url
      console.log(url)
      canplayFlag.value = true
      executor.start()
    })
}

function pause() {
  audio.pause()
  executor.stop()
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
}

function prev() {
  stop()
  playlistStore.offset(-1)
    .then(play)
}

// provide('play', readonly(play))
const playObj = inject('play')
playObj.play1 = play

watchSyncEffect(() => {
  const canplay = playerStore.isCanplay
  console.log(canplay, canplayFlag.value)
  if (canplay && canplayFlag.value) {
    playerStore.play()
    audio.play()
    canplayFlag.value = false
  }
})

watchSyncEffect(() => {
  const volume = playerStore.getVolume
  audio.volume = volume
})

</script>
