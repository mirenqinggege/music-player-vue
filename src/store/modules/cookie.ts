import {defineStore} from 'pinia'
import {store} from '@/store'

interface CookieStore {
  cookie?: string
}

const useCookieStore = defineStore('cookieStore', {
  state(): CookieStore {
    return {
      cookie: undefined
    }
  },
  actions: {
    async setCookie(cookie: string | string[]): Promise<void> {
      if (Array.isArray(cookie)) {
        this.cookie = cookie.join('; ')
      } else {
        this.cookie = cookie
      }
    },
    async clearCookie(): Promise<void> {
      this.cookie = undefined
    }
  },
  getters: {
    getCookie: (state: CookieStore) => state.cookie,
    hasCookie: (state: CookieStore) => 0 < state.cookie?.length
  },
  persist: {
    enabled: true,
    strategies: [{key: 'cookieStore', storage: localStorage}]
  }
})

export function getCookieStore() {
  return useCookieStore(store)
}
