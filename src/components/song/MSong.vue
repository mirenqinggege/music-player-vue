<template>
  <div class="m-song">
    <div class="cover">
      <img :src="cover" alt="">
    </div>
    <div class="text-info">
      <div class="name">{{ name }}</div>
      <div class="artist">{{ artist }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  cover: string
  name: string
  artist: string
  liked: boolean
}

defineProps<Props>()
</script>

<style lang="less" scoped>
.m-song {
  height: 100%;

  .cover {
    border-radius: 5px;
    overflow: hidden;

    img {
      height: 100%;
    }
  }
}
</style>
