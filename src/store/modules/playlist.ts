import {defineStore} from 'pinia'
import {store} from '@/store'
import {equals, PlayIndexOutboundException, Track} from '@/types'
import {shuffleArray} from "@/util/common.ts";

interface PlaylistStore {
    playlist: Track[],
    randomOrder: Track[]
    currIndex: number
    panelShow: boolean
}

const usePlaylistStore = defineStore('playlistStore', {
    state(): PlaylistStore {
        return {
            playlist: [],
            randomOrder: [],
            currIndex: 0,
            panelShow: false
        }
    },
    actions: {
        async setPlaylist(playlist: Track[]) {
            this.playlist = playlist
            this.randomOrder = [...playlist]
            shuffleArray(this.randomOrder)
            return 0
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
                throw new PlayIndexOutboundException('index 超出播放列表长度')
            }
            this.currIndex = index
            return index
        },
        async clear() {
            this.playlist.splice(0)
        },
        async offset(step: number) {
            const index = this.currIndex + step
            await this.setPosition(index)
            return this.currIndex
        },
        async togglePanel() {
            this.panelShow = !this.panelShow
        }
    },
    getters: {
        getPlaylist: (state: PlaylistStore) => state.playlist,
        getRandomOrder: (state: PlaylistStore) => state.randomOrder,
        getCurrIndex: (state: PlaylistStore) => state.currIndex,
        includes: (state: PlaylistStore) =>
            (track: Track) => state.playlist.findIndex((val) => equals(track, val)),
        getPanelShow: (state: PlaylistStore) => state.panelShow
    },
    persist: {
        enabled: true,
        strategies: [{storage: localStorage}]
    }
})

export function getPlaylistStore() {
    return usePlaylistStore(store)
}
