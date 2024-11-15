import {defineStore} from 'pinia'
import {store} from '@/store'

interface CookieStore {
    cookie?: string
}

const regex = [
    / ?Max-Age=\d+;/g,
    / ?Expires=[\w, :]+;/g,
    / ?Path=[\w/]+;/g,
    / ?HTTPOnly;?/g
]

function filter(str: string) {
    regex.forEach(v => {
        str = str.replace(v, '')
    })
    return str.replace(/;;/g, ';')
}

const useCookieStore = defineStore('cookieStore', {
    state(): CookieStore {
        return {
            cookie: null
        }
    },
    actions: {
        async setCookie(cookie: string | string[]): Promise<void> {
            if (Array.isArray(cookie)) {
                return this.setCookie(cookie.join('; '))
            } else {
                this.cookie = filter(cookie)
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
        strategies: [{storage: localStorage}]
    }
})

export function getCookieStore() {
    return useCookieStore(store)
}
