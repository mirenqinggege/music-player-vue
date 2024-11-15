<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
  pageNum: number
  pageSize: number
  total: number
}>();

const emits = defineEmits<{
  (evt: 'update:pageNum', page: number): void
  (evt: 'change', page: number): void
}>();

const totalPages = computed(() => Math.ceil(props.total / props.pageSize))
const btns = computed(() => calcShowBtn(9))

function calcShowBtn(maxVisiblePages: number) {
  const pageNum = props.pageNum
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  if (totalPages.value <= maxVisiblePages) {
    return Array.from({length: totalPages.value}, (_, i) => i + 1)
  }

  // 计算当前页面前后的分页按钮范围
  let startPage = Math.max(1, pageNum - halfVisiblePages);
  let endPage = Math.min(totalPages.value, pageNum + halfVisiblePages);

  // 调整开始和结束页码范围，以确保页码数量不小于 maxVisiblePages
  if (pageNum - halfVisiblePages < 1) {
    endPage = Math.min(totalPages.value, endPage + (1 - (pageNum - halfVisiblePages)));
  }
  if (pageNum + halfVisiblePages > totalPages.value) {
    startPage = Math.max(1, startPage - ((pageNum + halfVisiblePages) - totalPages.value));
  }

  // 生成分页按钮列表
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // 如果需要省略号，添加到列表
  if (startPage > 1) {
    pages.unshift('...');
  }
  if (endPage < totalPages.value) {
    pages.push('...');
  }

  return pages;
}

function handleChange(pageNum: number) {
  if (props.pageNum !== pageNum && !isNaN(pageNum)) {
    emits('update:pageNum', pageNum)
    emits('change', pageNum)
  }
}

function addPage(num: number) {
  const result = props.pageNum + num;
  if (result > 0 && result <= totalPages.value) {
    emits('update:pageNum', result)
    emits('change', result)
  }
}

</script>

<template>
  <div class="m-pagination">
    <div @click="addPage(-1)" class="m-btn prev">
      <svg class="icon" height="12px" version="1.1" viewBox="0 0 1024 1024" width="12px"
           xmlns="http://www.w3.org/2000/svg">
        <path
            d="M721.736 836.44c17.184 17.528 16.906 45.668-0.62 62.852-17.53 17.184-45.668 16.906-62.852-0.622L302.708 536.004c-17.186-17.53-16.906-45.676 0.628-62.858L658.892 124.702c17.532-17.18 45.67-16.896 62.85 0.634 17.18 17.532 16.896 45.67-0.634 62.852L397.302 505.518 721.736 836.44z"
            fill="currentColor"></path>
      </svg>
    </div>
    <div @click="handleChange(item)" :class="['m-btn', {active: item === pageNum}]" v-for="(item) in btns" :key="item">
      {{ item }}
    </div>
    <div @click="addPage(1)" class="m-btn next">
      <svg class="icon" height="12px" version="1.1" viewBox="0 0 1024 1024" width="12px"
           xmlns="http://www.w3.org/2000/svg">
        <path
            d="M302.708 187.56c-17.184-17.528-16.906-45.668 0.622-62.852 17.528-17.184 45.668-16.906 62.852 0.622l355.554 362.666c17.186 17.53 16.906 45.676-0.628 62.858L365.552 899.298c-17.53 17.18-45.67 16.896-62.85-0.634-17.18-17.532-16.896-45.67 0.634-62.852l323.806-317.33L302.708 187.56z"
            fill="currentColor"></path>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="less">
.m-pagination {
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;

  .m-btn {
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid #E4E4E2;
    padding-inline: 10px;
    padding-block: 5px;
    font-size: 12px;
    width: fit-content;

    svg {
      position: relative;
      top: -2px;
    }

    &.active {
      background-color: var(--primary-color);
      color: white;
    }

    &:not(.active):hover {
      background-color: #e9e9e7;
    }
  }
}
</style>