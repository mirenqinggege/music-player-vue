<template>
  <div class="m-song" @click="handleGoToDetail">
    <div v-if="cover" class="cover">
      <img :src="cover" alt="">
    </div>
    <div class="m-text-info">
      <div class="name">
        <hover-scroll-text :value="name"/>
      </div>
      <div class="artist">
        <hover-scroll-text :value="artist"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HoverScrollText from "@/components/common/HoverScrollText.vue";
import {useRoute, useRouter} from "vue-router";
import {getPlayerStore} from "@/store";

interface Props {
  cover: string
  name: string
  artist: string
  liked: boolean
}

withDefaults(defineProps<Props>(), {
  cover: '',
  name: '',
  artist: '',
  liked: false
})

const router = useRouter();
const route = useRoute();
const playerStore = getPlayerStore();

function handleGoToDetail() {
  if (route.name !== 'lyric') {
    const songInfo = playerStore.getSongInfo;
    router.push({path: '/lyric/' + songInfo.id})
  }
}
</script>

<style lang="less" scoped>
.m-song {
  height: 100%;
  display: flex;
  box-sizing: border-box;
  padding: 14px;

  .cover {
    border-radius: 5px;
    overflow: hidden;
    height: 100%;
    border: 1px solid rgb(242, 242, 242);

    img {
      height: 100%;
      width: 100%;
    }
  }

  .m-text-info {
    width: 150px;
    overflow: hidden;
    box-sizing: border-box;
    word-break: keep-all;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: rgb(55, 55, 55);
    margin-left: 10px;

    .name:hover {
      color: black;
    }

    & > div {
      cursor: pointer;
    }
  }
}
</style>
