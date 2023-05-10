<template>
  <div class="m-table">
    <div class="m-table-header">
      <template v-for="(item, index) in columns" :key="`m-table-header-column-${Date.now()}-${index}`">
        <div v-if="item.index"
             :style="{width: item.width === undefined ? columnWidth: `${item.width}px`, textAlign: item.align}"
             :class="['m-table-column', `_${index}`]">{{ item.label }}
        </div>
        <div v-else :style="{width: item.width === undefined ? columnWidth: `${item.width}px`, textAlign: item.align}"
             :class="['m-table-column', `_${index}`]">{{ item.label }}
        </div>
      </template>
    </div>
    <div class="m-table-body">
      <template v-for="(item, index) in dataSource" :key="`m-table-body-row-${index}-${item[rowKey]}`">
        <div :class="['m-table-row', index % 2 !== 0 ? 'odd' : '', selectionFlag[index] ? 'active': '']"
             @click="handlerClickRow(item, index)">
          <template v-for="(cell, i) in columns" :key="`m-table-body-column-${index}-${item[rowKey]}`">
            <div :style="{width: cell.width === undefined ? columnWidth: `${cell.width}px`, textAlign: cell.align}"
                 v-if="cell.index"
                 :class="['m-table-column', `_${i}`, cell.customClass]">
              {{ index + 1 }}
            </div>
            <div v-else
                 :style="{width: cell.width === undefined ? columnWidth: `${cell.width}px`, textAlign: cell.align}"
                 :class="['m-table-column', `_${i}`, cell.customClass]">
              {{
                cell.format !== undefined ? cell.format(item[cell.dataIndex], item, dataSource) : item[cell.dataIndex]
              }}
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, reactive, VNode, watchSyncEffect} from 'vue'
import {UnwrapNestedRefs} from '@vue/reactivity'

interface Props {
  columns: Column[]
  dataSource: any[]
  rowKey: string
}

export interface Column {
  index?: boolean
  label: string
  dataIndex?: string
  format?: (val, row, arr) => string | VNode
  width?: number
  customClass?: string[]
  align?: string
}

const props = defineProps<Props>()

interface Emits {
  (event: 'rowClick', obj: any): void
}

const emits = defineEmits<Emits>()

const columnWidth = computed(() => {
  const columns = props.columns
  const widths = columns.map(v => v.width)
  const reduce = widths.reduce(((pre, curr) => pre + (curr === undefined ? 0 : curr)), 0)
  const hasValCount = widths.filter(v => v === undefined)
  return `calc((100% - ${reduce}px) / ${hasValCount.length})`
})

function handlerClickRow(obj, _that) {
  if (currentActiveIndex !== undefined) {
    selectionFlag[currentActiveIndex] = false
  }
  currentActiveIndex = _that
  selectionFlag[_that] = true
  emits('rowClick', obj)
}

let currentActiveIndex: number | undefined

const selectionFlag: UnwrapNestedRefs<boolean[]> = reactive([])

function syncSelectionFlag() {
  if (selectionFlag.length < props.dataSource.length) {
    const diff = props.dataSource.length - selectionFlag.length
    const fill: boolean[] = Array.from({length: diff})
    fill.fill(false)
    selectionFlag.concat(...fill)
  } else if (selectionFlag.length > props.dataSource.length) {
    const diff = selectionFlag.length - props.dataSource.length
    selectionFlag.splice(selectionFlag.length - diff, diff)
  }
}

watchSyncEffect(() => {
  const dataSource = props.dataSource

  syncSelectionFlag()
})
</script>

<style lang="less" scoped>
.m-table {
  display: flex;
  flex-direction: column;

  .m-table-row.odd {
    background-color: rgb(250, 250, 250);
  }

  .m-table-row:hover {
    background-color: rgb(241, 242, 243);
  }

  .m-table-row.active {
    background-color: rgb(229, 229, 229);
  }

  .m-table-column {
    line-height: 2.5;
    cursor: default;
    box-sizing: border-box;
    padding: 0 5px;
  }

  .m-table-column {
    font-size: 13px;
    color: rgb(136, 136, 136);
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .m-table-header {
    display: flex;

    .m-table-column:hover {
      background-color: rgb(241, 242, 243);
    }
  }

  .m-table-body {
    display: flex;
    flex-direction: column;

    .m-table-row {
      display: flex;
    }
  }
}

</style>
