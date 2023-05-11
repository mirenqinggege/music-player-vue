<template>
  <div class="m-song">
    <div class="cover" v-if="cover">
      <img :src="cover" alt="">
    </div>
    <div class="m-text-info">
      <div class="name" :title="name">{{ name }}</div>
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
  display: flex;

  .cover {
    border-radius: 5px;
    overflow: hidden;
    height: 100%;
    border: 1px solid rgb(242, 242, 242);

    img {
      height: 100%;
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
