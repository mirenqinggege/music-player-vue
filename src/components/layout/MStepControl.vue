<template>
  <div class="m-step-control">
    <div class="back" @click.stop="handlerBack">
      <svg width="12px" height="12px" class="icon" viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg">
        <path
          d="M721.736 836.44c17.184 17.528 16.906 45.668-0.62 62.852-17.53 17.184-45.668 16.906-62.852-0.622L302.708 536.004c-17.186-17.53-16.906-45.676 0.628-62.858L658.892 124.702c17.532-17.18 45.67-16.896 62.85 0.634 17.18 17.532 16.896 45.67-0.634 62.852L397.302 505.518 721.736 836.44z"
          fill="currentColor"></path>
      </svg>
    </div>
    <div class="forward" @click.stop="handlerForward">
      <svg width="12px" height="12px" class="icon" viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg">
        <path
          d="M302.708 187.56c-17.184-17.528-16.906-45.668 0.622-62.852 17.528-17.184 45.668-16.906 62.852 0.622l355.554 362.666c17.186 17.53 16.906 45.676-0.628 62.858L365.552 899.298c-17.53 17.18-45.67 16.896-62.85-0.634-17.18-17.532-16.896-45.67 0.634-62.852l323.806-317.33L302.708 187.56z"
          fill="currentColor"></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {useRouter} from 'vue-router'

const router = useRouter()

function handlerBack() {
  router.back()
}

function handlerForward() {
  router.forward()
}

</script>

<style lang="less" scoped>
.m-step-control {
  padding: 0 10px;
  display: flex;
  align-items: center;
  color: rgb(227, 114, 114);
  flex-shrink: 0;

  .forward, .back {
    cursor: pointer;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    line-height: 1.3;
    text-align: center;
    background-color: rgb(217, 59, 59);
  }

  .forward {
    margin-left: 10px;
  }
}
</style>
