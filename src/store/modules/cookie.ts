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
            cookie: "MUSIC_R_T=1508508755187; MUSIC_A_T=1508508688748; MUSIC_A_T=1508508688748; MUSIC_A_T=1508508688748; MUSIC_U=002AD690238100B9F520FB058CA5F21FFBB8ADB5823FF5926311E2DB7D4B9219911F875F500C6F2A958FF393B236EB10BAAB023BF2AF4F6299AE48323FC41AFF0BADE9D5FB8C41C301248D9EE38D9BE0100CAE912B73C6E341242ACD48DECB4FD9B7856728C9C8C96C1376704A6D7D03B8636C45332483486596E558C9A4367537A460B8D586401FDDDA59812BB7DA97FDDF5662C67AB00CB6821D47B4ACEAD4E133196065B4F76643B533C905F46BC069CA89155DECA091F041CB1B96A9192C0D39580958FF7E3485270803C86BA06B62671F7A548156741B3E1406A0A90CCFE244CD9314C9CA01B1E5B389976B79F1F5FBA77522075B17A88091AFBD3038B6E557B8AC9471BF802686568F697D53F04FA2A3431081D464E9F060F26DCE7B62611C9810C0CA4E9AE8A3C4740345547ED8112F3048EC6EBD21B03B07847431CF84; MUSIC_A_T=1508508688748; MUSIC_A_T=1508508688748; MUSIC_R_T=1508508755187; MUSIC_A_T=1508508688748; MUSIC_A_T=1508508688748; MUSIC_A_T=1508508688748; MUSIC_R_T=1508508755187; MUSIC_R_T=1508508755187; MUSIC_R_T=1508508755187; MUSIC_A_T=1508508688748; NMTID=00OzqF54B0pCbdbYEgOgI1DRt_S2BQAAAGTCftCNg; MUSIC_R_T=1508508755187; MUSIC_R_T=1508508755187; MUSIC_R_T=1508508755187; MUSIC_SNS=; MUSIC_A_T=1508508688748; MUSIC_R_T=1508508755187; MUSIC_R_T=1508508755187; __csrf=288f272b0c1d2ebc3da749477fefc40b; MUSIC_R_T=1508508755187; MUSIC_A_T=1508508688748;"
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
