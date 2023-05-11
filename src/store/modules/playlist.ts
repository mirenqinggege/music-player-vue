import {defineStore} from 'pinia'
import {store} from '@/store'
import {equals, Track} from '@/types'

interface PlaylistStore {
  playlist: Track[]
  currIndex: number
}

const usePlaylistStore = defineStore('playlistStore', {
  state() {
    return {
      playlist: [],
      currIndex: 0
    }
  },
  actions: {
    async setPlaylist(playlist: Track[]) {
      this.playlist = playlist
    },
    async appendPlaylist(...playlist: Track[]) {
      const length = this.playlist.length
      this.playlist.push(...playlist)
      return length
    },
    async insert(...playlist: Track[]) {
      const index = this.currIndex + 1
      this.playlist.splice(index, 0, ...playlist)
      return index
    },
    async setPosition(index: number) {
      if (index >= this.playlist.length) {
        throw new Error('index 超出播放列表长度')
      }
      this.currIndex = index
    },
    async clear() {
      this.playlist.splice(0)
    },
    async offset(step: number) {
      const index = this.currIndex + step
      await this.setPosition(index)
      return this.currIndex
    },

  },
  getters: {
    getPlaylist: (state: PlaylistStore) => state.playlist,
    getCurrIndex: (state: PlaylistStore) => state.currIndex,
    includes: (state: PlaylistStore) =>
      (track: Track) => state.playlist.findIndex((val) => equals(track, val))
  }
})

export function getPlaylistStore() {
  return usePlaylistStore(store)
}
