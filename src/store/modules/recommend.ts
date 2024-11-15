import {defineStore} from "pinia";
import {store} from "@/store";
import {DailySong} from "@/types";
import {getRecommendSong} from "@/api/recommend.ts";

export type RecommendStoreState = {
    songList: DailySong[]
}
export type RecommendStoreActions = {
    fetchSongList(): Promise<void>
}
export type RecommendStoreGetters = {
    getSongList(state: RecommendStoreState): Array<DailySong>
    getCover(state: RecommendStoreState): string
}

const useRecommendStore = defineStore<'recommendStore', RecommendStoreState, RecommendStoreGetters, RecommendStoreActions>('recommendStore', {
    state() {
        return {
            songList: []
        }
    },
    actions: {
        async fetchSongList(): Promise<void> {
            const data = await getRecommendSong();
            this.songList = data.data.dailySongs
        }
    },
    getters: {
        getSongList(state: RecommendStoreState): Array<DailySong> {
            return state.songList
        },
        getCover(state: RecommendStoreState): string {
            if (state.songList.length > 0) {
                return state.songList[0].al.picUrl
            }
            return null
        }
    }
});

export default useRecommendStore

export function getRecommendStore() {
    return useRecommendStore(store)
}