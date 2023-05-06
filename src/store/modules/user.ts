import {defineStore} from 'pinia'
import {UserInfo} from '@/types'
import {getLoginUserInfo} from '@/api/user'
import {store} from '@/store'

interface UserStore {
  loginUser?: UserInfo
}

const useUserStore = defineStore('userStore', {
  state(): UserStore {
    return {
      loginUser: undefined
    }
  },
  actions: {
    async fetchUserInfo(): Promise<void> {
      return getLoginUserInfo().then(({profile}) => {
        this.loginUser = profile
      })
    },
    async clearUserInfo(): Promise<void> {
      this.loginUser = undefined
    }
  },
  getters: {
    getLoginUser: (state: UserStore) => state.loginUser
  }
})

export function getUserStore() {
  return useUserStore(store)
}
