<template>
<div class="m-table-play-icon">
    <svg v-if="playing" class="icon" fill="currentColor" height="20" version="1.1"
         viewBox="0 0 1024 1024" width="20" xmlns="http://www.w3.org/2000/svg">
        <path
                d="M684.8 346.24a48 48 0 1 0-57.92 76.48 110.72 110.72 0 0 1 0 177.92 48 48 0 1 0 57.92 76.48 206.72 206.72 0 0 0 0-331.2z m128-184a48 48 0 1 0-56.96 77.76 333.76 333.76 0 0 1 0 544 48 48 0 0 0 56 77.76 429.76 429.76 0 0 0 0-699.52z m-307.52-18.88a64 64 0 0 0-69.76 13.76L314.56 277.44A309.12 309.12 0 0 1 96 368a64 64 0 0 0-64 64v160a64 64 0 0 0 64 64 308.8 308.8 0 0 1 218.56 90.56l120.32 120.32A64 64 0 0 0 544 821.44V202.56a64 64 0 0 0-39.36-59.2z"></path>
    </svg>
    <svg v-else class="icon" fill="currentColor" height="20" version="1.1"
         viewBox="0 0 1024 1024" width="20" xmlns="http://www.w3.org/2000/svg">
        <path
                d="M320 656a308.8 308.8 0 0 1 218.56 90.56l120.32 120.32A64 64 0 0 0 768 821.44V202.56a64 64 0 0 0-109.12-45.12l-120.32 120A309.12 309.12 0 0 1 320 368a64 64 0 0 0-64 64v160a64 64 0 0 0 64 64z"></path>
    </svg>
</div>
</template>

<script lang="ts" setup>
import {getPlayerStore} from '@/store'
import {computed} from 'vue'

const playerStore = getPlayerStore

const playing = computed<boolean>(() => playerStore().getPlayStatus === 'playing')
</script>

<style scoped>

</style>
