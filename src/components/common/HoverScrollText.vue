<script setup lang="ts">
import {onMounted, shallowRef} from "vue";
import {scrollEndsEvent} from "@/util/common.ts";

defineProps<{
  value?: string | number
}>()

const divRef = shallowRef<HTMLDivElement>()
const spanRef = shallowRef<HTMLSpanElement>()
const factor = 1
let step: number = 0
let status: 0|1 = 1

const animation = () => {
  requestAnimationFrame(animation)
  if (divRef.value && step != 0) {
    divRef.value.scrollLeft += step
  }
}

onMounted(() => {
  scrollEndsEvent(divRef.value, (_status) => {
    status = _status
    if (step !== 0) {
      step = (status === 1 ? factor : -factor)
    }
  })
  divRef.value?.addEventListener('mouseover', () => step = (status === 1 ? factor : -factor))
  divRef.value?.addEventListener('mouseout', () => {
    step = 0
    divRef.value.scrollLeft = 0
  })
  animation()
})
</script>

<template>
  <div ref="divRef" class="m-hover-scroll-text">
    <span ref="spanRef">{{ value }}</span>
  </div>
</template>

<style scoped lang="less">
.m-hover-scroll-text {
  width: 100%;
  height: 100%;
  overflow: hidden;

  span {
    white-space: nowrap;
  }
}
</style>
