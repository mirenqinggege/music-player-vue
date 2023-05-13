<template>
  <div class="m-table">
    <div class="m-table-header" v-if="showHeader">
      <template v-for="(item, index) in columns" :key="`m-table-header-column-${Date.now()}-${index}`">
        <div v-if="item.index"
             :style="cellStyle(item)"
             :class="['m-table-column', `_${index}`]">{{ item.label }}
        </div>
        <div v-else :style="cellStyle(item)"
             :class="['m-table-column', `_${index}`]">{{ item.label }}
        </div>
      </template>
    </div>
    <div class="m-table-body">
      <template v-for="(item, index) in dataSource" :key="`m-table-body-row-${index}-${item[rowKey]}`">
        <div :class="['m-table-row', index % 2 !== 0 ? 'odd' : '', selectionFlag[index] ? 'active': '', isPlaying(item)]"
             @click.stop="handlerClickRow(item, index)" @dblclick.stop="handlerDbclickRow(item, index)">
          <template v-for="(cell, i) in columns" :key="`m-table-body-column-${index}-${item[rowKey]}`">
            <div :style="cellStyle(cell)"
                 v-if="cell.index"
                 :class="['m-table-column', `_${i}`, callOrReturn(cell.customClass, item[ifUndefined(cell.dataIndex, '')], item, dataSource)]">
              <component v-if="cell.format !== undefined"
                         :is="cell.format(item[ifUndefined(cell.dataIndex, '')], item, index)"></component>
              <template v-else>{{ index + 1 }}</template>
            </div>
            <div v-else
                 :style="cellStyle(cell)"
                 :class="['m-table-column', `_${i}`, callOrReturn(cell.customClass, item[ifUndefined(cell.dataIndex, '')], item, dataSource)]">
              <component v-if="cell.format !== undefined"
                         :is="cell.format(item[ifUndefined(cell.dataIndex, '')], item, index)"></component>
              <template v-else>{{ item[ifUndefined(cell.dataIndex, '')] }}</template>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, reactive, StyleValue, VNode, watchSyncEffect} from 'vue'
import {UnwrapNestedRefs} from '@vue/reactivity'
import {callOrReturn, ifUndefined} from '@/util/common'
import {getPlayerStore} from '@/store'
import {equals, Track} from '@/types'

interface Props {
  columns: Column[]
  dataSource: any[]
  rowKey: string
}

export interface Column {
  index?: boolean
  label: string
  dataIndex?: string
  format?: (val: any, row?: any, index?: number) => string | VNode
  width?: number
  customClass?: string[] | ((val: any, row?: any, index?: number) => string | string[])
  align?: string
}

const props = withDefaults(defineProps<Props>(), {
  columns: () => [],
  dataSource: () => []
})

interface Emits {
  (event: 'rowClick', obj: any): void

  (event: 'rowDoubleClick', obj: any, index: number): void
}

const emits = defineEmits<Emits>()

const columnWidth = computed(() => {
  const columns = props.columns
  const widths = columns.map(v => v.width)
  const reduce = widths.reduce(((pre, curr) => ifUndefined(pre, 0) + (curr === undefined ? 0 : curr)), 0)
  const hasValCount = widths.filter(v => v === undefined)
  return `calc((100% - ${reduce}px) / ${hasValCount.length})`
})

function handlerClickRow(obj: any, _that: any) {
  if (currentActiveIndex !== undefined) {
    selectionFlag[currentActiveIndex] = false
  }
  currentActiveIndex = _that
  selectionFlag[_that] = true
  emits('rowClick', obj)
}

function handlerDbclickRow(obj: any, index: any) {
  emits('rowDoubleClick', obj, index)
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

const playerStore = getPlayerStore()

const playingSong = computed<Track>(() => playerStore.getSongInfo || {})

function isPlaying(track: Track) {
  return equals(track, playingSong.value) ? 'play-this' : ''
}

const showHeader = computed<boolean>(() => {
  return !props.columns.every(v => v.label.length === 0)
})

watchSyncEffect(() => {
  const dataSource = props.dataSource
  console.debug(dataSource)
  syncSelectionFlag()
})

//{width: item.width === undefined ? columnWidth: `${item.width}px`, textAlign: item.align}

function cellStyle(column: Column): StyleValue {
  return {
    width: ifUndefined(column.width, columnWidth.value, v => `${v}px`),
    textAlign: ifUndefined(column.align, 'left')
  }
}
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
    user-select: none;
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
