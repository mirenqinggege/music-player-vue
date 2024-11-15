<script setup lang="ts">
import {computed, inject, onMounted, onUnmounted, shallowRef, watchPostEffect} from "vue";
import {LayoutProvide} from "@/types";
import {getPlayerStore} from "@/store";
import {getLyric} from "@/api/song.ts";

const layout = inject<LayoutProvide>('layout');

const playerStore = getPlayerStore();

const songInfo = computed(() => playerStore.getSongInfo);
const lyric = shallowRef('')
const tlyric = shallowRef('')
const currentLyricIndex = shallowRef(0)
const showTranslated = shallowRef(false)

function timeToSeconds(timeString: string | undefined): number {
  if (timeString) {
    // 按 ":" 和 "." 分割时间
    let parts = timeString.split(":");
    let minutes = parseInt(parts[0]); // 获取分钟部分
    let seconds = parseInt(parts[1].split(".")[0]); // 获取秒部分
    let milliseconds = parseInt(parts[1].split(".")[1] || "0"); // 获取毫秒部分

    // 将时间转换为秒数
    return minutes * 60 + seconds + milliseconds / 1000;
  } else {
    return 0
  }
}

const formatedLyric = computed(() => (Boolean(tlyric.value) && showTranslated.value ? tlyric : lyric).value.split('\n').map(((item, index) => {
  const strings = item.split(']');
  return {
    index,
    text: strings[1],
    time: timeToSeconds(strings[0].substring(1)),
    original: item
  }
})));

function updateCurrentLyricIndex(time: number, lyric: Array<{ time: number, index: number }>) {
  let left = 0, right = lyric.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    const line = lyric[mid];
    if (line.time === time) {
      currentLyricIndex.value = mid
      return
    } else if (line.time < time) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  currentLyricIndex.value = lyric[right > 0 ? right : 0].index
}

function handleToggleTranslate() {
  showTranslated.value = !showTranslated.value
}

watchPostEffect(() => {
  const id = songInfo.value.id;
  if (id != null) {
    getLyric(id).then((data) => {
      lyric.value = data.lrc.lyric
      tlyric.value = data.tlyric?.lyric || ''
    })
  }
})

watchPostEffect(() => {
  const currentTime = playerStore.currentTime;
  updateCurrentLyricIndex(currentTime, formatedLyric.value)
})
onMounted(() => {
  layout.toggleSideMenu(false)
})
onUnmounted(() => {
  layout.toggleSideMenu(true)
})
</script>

<template>
  <div id="lyric-page" class="h-100 overflow-auto">
    <ul class="lyric">
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li :class="['text-center', {active: item.index === currentLyricIndex}]" v-for="item in formatedLyric"
          :data-time="item.time">{{ item.text }}
      </li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
      <li>&nbsp;</li>
    </ul>
    <ul class="control">
      <li>
        <div @click="handleToggleTranslate">译</div>
      </li>
    </ul>
  </div>
  <router-view/>
</template>

<style scoped lang="less">
#lyric-page {
  position: relative;

  .control {
    position: absolute;
    right: 50px;
    bottom: 50px;
    list-style: none;

    li div {
      cursor: pointer;
    }
  }
}

ul.lyric {
  scroll-behavior: smooth;
  margin: auto;
  height: 99%;
  width: 80%;
  list-style: none;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  transition: all 200ms ease;

  &::-webkit-scrollbar {
    display: none;
  }

  li {
    margin-block: 10px;
    transition: all 200ms linear;
  }

  li.active {
    transform: scale(1.3);
    font-weight: bold;
    scroll-snap-align: center;
  }
}

</style>