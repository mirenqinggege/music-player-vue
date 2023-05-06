import {defineStore} from 'pinia'
import {store} from '@/store'
import {getRecommendSongList} from '@/api/recommend'
import {SongList} from '@/types'

interface RecommendSongListStore {
  updateTime?: Date
  songLists: SongList[]
}

const useRecommendSongListStore = defineStore('recommendSongListStore', {
  state(): RecommendSongListStore {
    return {
      updateTime: undefined,
      songLists: []
    }
  },
  actions: {
    async fetchRecommendSongList() {
      const songList = await getRecommendSongList()
      this.songLists = songList.recommend
      this.updateTime = new Date()
    }
  },
  getters: {
    getRecommendSongList: (state: RecommendSongListStore) => state.songLists
  }
})

export function getRecommendSongListStore() {
  return useRecommendSongListStore(store)
}
