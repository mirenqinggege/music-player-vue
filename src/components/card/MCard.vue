<template>
  <div class="m-card" :style="style">
    <div class="cover">
      <slot name="image">
        <img :src="image" alt="">
      </slot>
    </div>
    <div class="text">
      <slot name="text">{{ text }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from 'vue'

interface Props {
  image?: string
  width?: number | string,
  text?: string
}

const props = defineProps<Props>()

const style = computed(() => ({
  width: props.width
}))

</script>

<style lang="less" scoped>
.m-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  width: 140px;
  margin-bottom: 15px;

  img {
    width: 100%;
    object-fit: cover;
  }

  .cover {
    margin-bottom: 15px;
    border-radius: 5px;
    overflow: hidden;
  }

  .text {
    color: rgb(55, 55, 55);
    font-size: 14px;

    &:hover {
      color: black;
    }
  }
}
</style>
