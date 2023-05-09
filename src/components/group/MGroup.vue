<template>
  <div class="m-group">
    <div id="label">
      <slot name="label" v-bind:label="label">{{ label }}</slot>
      <span class="more" @click="handlerDetail">
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             width="24" height="24" fill="currentColor"><path
          d="M682.666667 533.333333a21.333333 21.333333 0 0 1-15.146667-6.186666l-298.666667-298.666667a21.333333 21.333333 0 0 1 30.293334-30.293333l298.666666 298.666666a21.333333 21.333333 0 0 1 0 30.293334A21.333333 21.333333 0 0 1 682.666667 533.333333z"
          fill="#333333"></path><path
          d="M384 832a21.333333 21.333333 0 0 1-15.146667-6.186667 21.333333 21.333333 0 0 1 0-30.293333l298.666667-298.666667a21.333333 21.333333 0 0 1 30.293333 30.293334l-298.666666 298.666666A21.333333 21.333333 0 0 1 384 832z"
          fill="#333333"></path></svg>
      </span>
    </div>
    <div class="content">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts" setup>

interface Props {
  label: string
  meta?: any
}

const props = defineProps<Props>()

const emits = defineEmits(['detail'])

function handlerDetail() {
  emits('detail', props.meta)
}

</script>

<style lang="less" scoped>
.m-group {
  #label {
    font-size: 24px;
    font-weight: bold;
    line-height: 1.5;
    margin-bottom: 10px;

    .more {
      position: relative;
      top: -3px;
    }
  }
}
</style>
