import {defineStore} from 'pinia'
import {store} from '@/store'
import {SongDetail, Track} from '@/types'
import {getSongDetail} from '@/api/song'

interface PlayerStore {
    songInfo?: Track
    songDetail?: SongDetail
    playStatus: 'stop' | 'playing' | 'pause' | 'loading' | 'canplay'
    loop: 'single-loop' | 'list-loop' | 'list-order' | 'list-random'
    songTimeLength?: number
    currPlayProgress?: number
    volume: number
}

const usePlayerStore = defineStore('playerStore', {
    state(): PlayerStore {
        return {
            songInfo: undefined,
            songDetail: undefined,
            playStatus: 'stop',
            loop: 'list-order',
            songTimeLength: undefined,
            currPlayProgress: undefined,
            volume: 0.2
        }
    },
    actions: {
        async update(songInfo: Track) {
            this.songInfo = songInfo
            this.playStatus = 'stop'
            this.songTimeLength = songInfo.dt
            this.currPlayProgress = 0
        },
        async load(): Promise<string> {
            this.playStatus = 'loading'
            const {data: [songDetail]} = await getSongDetail(this.songInfo?.id)
            this.songDetail = songDetail
            return songDetail.url
        },
        async stop() {
            this.playStatus = 'stop'
            this.currPlayProgress = 0
        },
        async canplay() {
            this.playStatus = 'canplay'
        },
        async pause() {
            this.playStatus = 'pause'
        },
        async play() {
            this.playStatus = 'playing'
        },
        setVolume(volume: number) {
            this.volume = volume
        },
        setLoopMethod(method: PlayerStore['loop']) {
            this.loop = method
        }
    },
    getters: {
        getUrl: (state: PlayerStore) => state.songDetail?.url,
        getPlayStatus: (state: PlayerStore) => state.playStatus,
        getVolume: (state: PlayerStore) => state.volume,
        getSongTimeLength: (state: PlayerStore) => state.songTimeLength,
        getCurrPlayProgress: (state: PlayerStore) => state.currPlayProgress,
        isCanplay: (state: PlayerStore) => state.songDetail !== undefined && ['canplay', 'pause'].includes(state.playStatus),
        getSongInfo: (state: PlayerStore) => state.songInfo,
        getLoopMethod: (state: PlayerStore) => state.loop
    },
    persist: {
        enabled: true,
        strategies: [
            {
                storage: localStorage,
                paths: ['songInfo', 'loop', 'volume']
            }
        ]
    }
})

export function getPlayerStore() {
    return usePlayerStore(store)
}
