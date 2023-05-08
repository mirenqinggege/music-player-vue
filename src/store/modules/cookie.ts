import {defineStore} from 'pinia'
import {store} from '@/store'
import {toHump} from '@/util/common'

interface CookieStore {
  cookie?: string
}

interface Cookie {
  name: string
  value?: string
  equals: (obj: Cookie) => boolean
}

const useCookieStore = defineStore('cookieStore', {
  state(): CookieStore {
    return {
      cookie: undefined
    }
  },
  actions: {
    async setCookie(cookie: string): Promise<void> {
      this.cookie = cookie
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
    strategies: [{storage: localStorage}]
  }
})

function parse(str: string): Cookie {
  const obj = {
    name: '',
    value: '',
    equals(obj) {
      return this.name === obj.name
    }
  }
  str.split(';').forEach((kOfv, index) => {
    const [prop, value] = kOfv.split('=')
    if (index === 0) {
      obj.name = toHump(prop)?.trim()
      obj.value = value?.trim()
    } else {
      obj[toHump(prop)?.trim()] = value?.trim()
    }
  })
  return obj
}

export function getCookieStore() {
  return useCookieStore(store)
}

export function getCookieByName(cookies: Cookie[], name: string) {
  return cookies.find(v => v.name === name)
}
