<script setup lang="ts">

const emits = defineEmits<{
  (evt: 'playAll'): void
  (evt: 'append'): void
}>();

function playAll() {
  emits('playAll')
}

function append() {
  emits('append')
}
</script>

<template>
  <div class="button-group">
    <button @click.stop="playAll">
      <svg class="icon" fill="currentColor" height="16"
           version="1.1" viewBox="0 0 1024 1024" width="16" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M817.088 484.96l-512-323.744C295.232 154.976 282.752 154.592 272.576 160.224 262.336 165.856 256 176.608 256 188.256l0 647.328c0 11.648 6.336 22.4 16.576 28.032 4.8 2.656 10.112 3.968 15.424 3.968 5.952 0 11.904-1.664 17.088-4.928l512-323.616C826.368 533.184 832 522.976 832 512 832 501.024 826.368 490.816 817.088 484.96z"></path>
      </svg>
      播放全部
    </button>
    <button @click.stop="append">
      <svg class="icon" fill="currentColor" height="15"
           version="1.1" viewBox="0 0 1024 1024" width="15" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M512 1024a58.336 58.336 0 0 1-58.368-58.368V58.368a58.336 58.336 0 1 1 116.736 0v907.264c0 31.744-25.6 58.368-58.368 58.368z m453.632-453.632H58.368a58.336 58.336 0 1 1 0-116.736h907.264a58.336 58.336 0 1 1 0 116.736z"></path>
      </svg>
    </button>
  </div>
</template>

<style scoped lang="less">
.button-group button {
  outline: none;
  background-color: var(--primary-color);
  color: white;

  &:first-child {
    border-right: 0;
  }

  &:nth-child(2) {
    padding: 7.3px 10px;
  }

  padding: 7px 20px;
  font-size: 12px;
  border-radius: 20px;
  border: 1px solid rgb(217, 217, 217);

  svg.icon {
    position: relative;
    top: -1px;
  }
}
</style>