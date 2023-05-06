import {defineStore} from 'pinia'
import {store} from '@/store'
import {Banner, BannerItem} from '@/types'
import {getBanner} from '@/api/recommend'

interface BannerStore {
  banners: Banner[]
  bannerList: BannerItem[],
  timer?: NodeJS.Timer
}

const useBannerStore = defineStore('bannerStore', {
  state(): BannerStore {
    return {
      banners: [],
      bannerList: [],
      timer: undefined
    }
  },
  actions: {
    async setBanners() {
      const {banners} = await getBanner()
      this.banners = banners
      this.bannerList = banners.map((banner: Banner, index: number): BannerItem => {
        const {imageUrl, bannerBizType, targetId} = banner
        return {
          cover: imageUrl,
          meta: banner,
          key: String(bannerBizType + targetId) + index
        }
      })
    },
    async clearBanner() {
      this.banners = []
      this.bannerList = []
    },
    async exchange() {
      if (this.bannerList.length > 0) {
        this.bannerList.push(this.bannerList.splice(0, 1)[0])
      }
    }
  },
  getters: {
    getBannerList: (state: BannerStore) => state.bannerList,
    getBanners: (state: BannerStore) => state.banners
  }
})

export function getBannerStore() {
  return useBannerStore(store)
}
