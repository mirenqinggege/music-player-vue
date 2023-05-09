import {defineStore} from 'pinia'
import {UserInfo, UserDetail} from '@/types'
import {getLoginUserInfo, getUserDetail} from '@/api/user'
import {store} from '@/store'

interface UserStore {
  loginUser?: UserInfo
  userDetail?: UserDetail
}

const useUserStore = defineStore('userStore', {
  state(): UserStore {
    return {
      loginUser: undefined,
      userDetail: undefined
    }
  },
  actions: {
    async fetchUserInfo(): Promise<void> {
      return getLoginUserInfo().then(({profile}) => {
        this.loginUser = profile
        return getUserDetail(profile.userId)
      }).then((userDetail) => {
        this.userDetail = userDetail
      })
    },
    async clearUserInfo(): Promise<void> {
      this.loginUser = undefined
      this.userDetail = undefined
    }
  },
  getters: {
    getLoginUser: (state: UserStore) => state.loginUser,
    getUserDetail: (state: UserStore) => state.userDetail
  },
  persist: {
    enabled: true
  }
})

export function getUserStore() {
  return useUserStore(store)
}
