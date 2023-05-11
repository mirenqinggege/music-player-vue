<template>
  <div :class="customClass">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import {getPlayerStore} from '@/store'
import {provide, ref, watchSyncEffect} from 'vue'
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

const audio: HTMLAudioElement = new Audio()

audio.addEventListener('canplay', () => {
  playerStore.canplay()
})

audio.addEventListener('pause', () => {
  playerStore.pause()
})

audio.addEventListener('ended', () => {
  playerStore.stop()
  executor.stop()
})

const executor = newInterval(100, () => {
  const {currentTime, duration} = audio
  const progress = ((currentTime / duration) * 100).toFixed(2)
  emits('progress', parseInt(progress), 100)
  emits('timeChange', second2minute(currentTime), second2minute(duration))
})

function play(track: Track) {
  playerStore.update(track)
    .then(playerStore.load)
    .then(url => {
      audio.src = url
      canplayFlag.value = true
    })
  executor.start()
}

function pause() {
  audio.pause()
  executor.stop()
}

provide('play', play)
provide('pause', pause)

watchSyncEffect(() => {
  const canplay = playerStore.isCanplay
  if (canplay && canplayFlag.value) {
    playerStore.play()
    audio.play()
  }
  canplayFlag.value = false
})

</script>
