import {defineStore} from 'pinia'
import {store} from '@/store'
import {getRecommendSongList} from '@/api/recommend'
import {PlayList, SongList} from '@/types'
import {getUserPlayList} from '@/api/user'

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

interface MySongListStore {
  playlists: PlayList[]
}

const useMySongListStore = defineStore('mySongListStore', {
  state(): MySongListStore {
    return {
      playlists: []
    }
  },
  actions: {
    async fetchMySongList() {
      return getUserPlayList().then(({playlist}) => {
        this.playlists = playlist
      })
    },
    async clearMySongList() {
      this.playlists = []
    }
  },
  getters: {
    getMyCreatedPlaylist: (state: MySongListStore) => state.playlists.filter(({subscribed}) => !subscribed),
    getMySubscribedPlaylist: (state: MySongListStore) => state.playlists.filter(({subscribed}) => subscribed)
  },
  persist: {
    enabled: true
  }
})

export function getMySongListStore() {
  return useMySongListStore(store)
}
