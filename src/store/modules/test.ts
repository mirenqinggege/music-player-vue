import {defineStore} from 'pinia'
import {store} from '@/store'

export const useTestStore = defineStore('testStore', {
  state() {
    return {}
  },
  actions: {},
  getters: {}
})

export function getTestStore() {
  return useTestStore(store)
}

