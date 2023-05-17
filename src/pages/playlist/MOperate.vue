<template>
<div class="m-operate">
    <svg v-if="liked" class="icon liked" fill="currentColor" height="20" version="1.1"
         viewBox="0 0 1024 1024" width="20" xmlns="http://www.w3.org/2000/svg">
        <path
                d="M780.8 204.8c-83.2-44.8-179.2-19.2-243.2 44.8L512 275.2 486.4 249.6c-64-64-166.4-83.2-243.2-44.8C108.8 275.2 89.6 441.6 185.6 537.6l32 32 153.6 153.6 102.4 102.4c25.6 25.6 57.6 25.6 83.2 0l102.4-102.4 153.6-153.6 32-32C934.4 441.6 915.2 275.2 780.8 204.8z"></path>
    </svg>
    <svg v-else class="icon" fill="currentColor" height="20" version="1.1"
         viewBox="0 0 1024 1024" width="20" xmlns="http://www.w3.org/2000/svg">
        <path
                d="M332.8 249.6c38.4 0 83.2 19.2 108.8 44.8L467.2 320 512 364.8 556.8 320l25.6-25.6c32-32 70.4-44.8 108.8-44.8 19.2 0 38.4 6.4 57.6 12.8 44.8 25.6 70.4 57.6 76.8 108.8 6.4 44.8-6.4 89.6-38.4 121.6L512 774.4 236.8 492.8C204.8 460.8 185.6 416 192 371.2c6.4-44.8 38.4-83.2 76.8-108.8C288 256 313.6 249.6 332.8 249.6L332.8 249.6M332.8 185.6C300.8 185.6 268.8 192 243.2 204.8 108.8 275.2 89.6 441.6 185.6 537.6l281.6 281.6C480 832 499.2 838.4 512 838.4s32-6.4 38.4-19.2l281.6-281.6c96-96 76.8-262.4-57.6-332.8-25.6-12.8-57.6-19.2-89.6-19.2-57.6 0-115.2 25.6-153.6 64L512 275.2 486.4 249.6C448 211.2 390.4 185.6 332.8 185.6L332.8 185.6z"></path>
    </svg>
    <svg v-if="downloading" :stroke-dasharray="strokeDasharray" class="icon" height="20" viewbox="0 0 1024 1024"
         width="20">
        <circle cx="220" cy="220" fill="none" r="170" stroke="blue" stroke-width="50"></circle>
        <circle ref="downloadProgress" cx="220" cy="220" fill="none" r="170" stroke="red" stroke-dasharray="0 1069"
                stroke-width="50" transform="matrix(0,-1,1,0,0,440)"></circle>
    </svg>
    <svg v-else-if="downloaded" class="icon downloaded" fill="currentColor" height="20"
         version="1.1"
         viewBox="0 0 1024 1024" width="20" xmlns="http://www.w3.org/2000/svg">
        <path
                d="M666.272 472.288l-175.616 192a31.904 31.904 0 0 1-23.616 10.4h-0.192a32 32 0 0 1-23.68-10.688l-85.728-96a32 32 0 1 1 47.744-42.624l62.144 69.6 151.712-165.888a32 32 0 1 1 47.232 43.2m-154.24-344.32C300.224 128 128 300.32 128 512c0 211.776 172.224 384 384 384 211.68 0 384-172.224 384-384 0-211.68-172.32-384-384-384"></path>
    </svg>
    <svg v-else class="icon" fill="currentColor" height="20" version="1.1"
         viewBox="0 0 1024 1024" width="20" xmlns="http://www.w3.org/2000/svg">
        <path
                d="M885.333333 544A32 32 0 0 1 917.333333 576v202.666667h-0.426666A128 128 0 0 1 768 915.562667v1.792H256v-1.578667A128 128 0 0 1 107.093333 800L106.666667 800V597.333333a32 32 0 0 1 64 0v192.810667a64 64 0 0 0 64 63.36h21.312L256 853.333333h512l-0.021333 0.170667h21.546666L789.504 853.333333l3.584-0.106666A64 64 0 0 0 853.333333 789.504h0.192l-0.021333-10.837333H853.333333V576a32 32 0 0 1 32-32z"></path>
        <path
                d="M248.021333 396.714667l241.344 241.344a32 32 0 0 0 45.269334 0l241.344-241.344a32 32 0 0 0-45.248-45.269334l-186.112 186.069334V138.026667a32 32 0 0 0-64 0v400.768l-187.349334-187.349334a32 32 0 1 0-45.248 45.269334z"></path>
    </svg>
</div>
</template>

<script lang="ts" setup>
import {computed, ComputedRef, Ref, ref} from 'vue'

interface Props {
  liked: boolean
  downloaded: boolean
  downloading: boolean
  value: number
  max: number
}

const downloadProgress: Ref<SVGCircleElement | undefined> = ref()

const props = defineProps<Props>()

const strokeDasharray: ComputedRef<string> = computed(() => {
  const {value, max} = props
  const percent = value / max
  const svg = downloadProgress.value
  if (svg) {
    const totalLength = svg.getTotalLength()
    return `${totalLength * percent} ${totalLength * (1 - percent)}`
  }
  return '0 0'
})
</script>

<style scoped>
circle {
    -webkit-transition: stroke-dasharray 800ms;
    transition: stroke-dasharray 800ms;
}

svg.icon {
    position: relative;
    top: -1px;
}

.m-operate svg + svg {
    margin-left: 5px;
}

svg.downloaded {
    color: rgb(80, 125, 175);
}

svg.liked {
    color: var(--primary-color);
}
</style>
