import {defineStore} from 'pinia'
import {store} from '@/store'
import {objForEach} from '@/util/common'

interface CookieStore {
  cookie?: Cookie[]
}

interface Cookie {
  name: string
  value?: string
  equals: (obj: Cookie) => boolean
}

const useCookieStore = defineStore('cookieStore', {
  state(): CookieStore {
    return {
      cookie: []
    }
  },
  actions: {
    async setCookie(cookie: Cookie[] | string | object): Promise<void> {
      if (typeof cookie === 'string') {
        this.cookie = cookie.split(';').map((str) => {
          const strings = str.split('=')
          return {
            name: strings[0],
            value: strings[1]?.trim(),
            equals(obj) {
              return this.name === obj.name
            }
          }
        })
      } else if (Array.isArray(cookie)) {
        this.cookie = cookie
      } else if (typeof cookie === 'object') {
        this.cookie = []
        objForEach(cookie, (name, value) => {
          this.cookie?.push({
            name, value, equals(obj) {
              return this.name === obj.name
            }
          })
        })
      } else {
      }
    },
    async addCookie(cookie: Cookie | Cookie[] | string, replace: boolean = true): Promise<void> {
      if (Array.isArray(cookie)) {
        this.cookie?.forEach((value, index: number) => {
          let i = -1
          cookie.forEach((value1, index1) => {
            if (value.equals(value1)) {
              i = index1
            }
          })
          if (i !== -1) {
            this.cookie?.splice(index, 1, cookie[i])
            cookie.splice(i, 1)
          }
        })
        this.cookie?.push(...cookie)
      } else if (typeof cookie === 'object') {
        return this.addCookie([cookie])
      } else {
        const cookies: string[] = cookie.split(';')
        const cookieArr: Cookie[] = cookies.map(v => {
          const str: string[] = v.split('=')
          const cookie1: Cookie = {
            name: str[0].trim(),
            value: str[1]?.trim(),
            equals(obj) {
              return this.name === obj.name
            }
          }
          return cookie1
        })
        return this.addCookie(cookieArr)
      }
    }
  },
  getters: {
    getCookieToString: (state: CookieStore) => state
      .cookie?.map(({name, value}) => (`${name}=${value}`))
      .join(';'),
    getCookie: (state: CookieStore) => state.cookie
  },
  persist: {
    enabled: true,
    strategies: [{storage: localStorage}]
  }
})

export function getCookieStore() {
  return useCookieStore(store)
}
