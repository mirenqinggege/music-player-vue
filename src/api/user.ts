import request from '@/api/request'
import {PlayList, Response, UserInfo, UserDetail} from '@/types'
import {getUserStore} from '@/store'

interface LoginUserInfoResponse extends Response {
  account: any
  profile: UserInfo
}

// 获取登录用户信息
export function getLoginUserInfo(): Promise<LoginUserInfoResponse> {
  return request(
    'POST',
    'https://music.163.com/api/nuser/account/get',
    {},
    {crypto: 'weapi'}
  )
}

interface UserDetails extends Response, UserDetail {}

export function getUserDetail(uid: number): Promise<UserDetails> {
  return request('POST', `https://music.163.com/weapi/v1/user/detail/${uid}`, {}, {crypto: 'weapi'})
}

interface UserPlayListResponse extends Response {
  playlist: PlayList[]
}

// 获取用户歌单
export async function getUserPlayList(): Promise<UserPlayListResponse> {
  const userStore = getUserStore()
  let loginUser = userStore.getLoginUser
  if (loginUser === undefined) {
    await userStore.fetchUserInfo()
  }
  loginUser = userStore.getLoginUser
  console.log(loginUser?.userId)
  return request(
    'POST',
    'https://music.163.com/api/user/playlist',
    {
      uid: loginUser?.userId,
      limit: 30,
      offset: 0,
      includeVideo: true
    },
    {crypto: 'weapi'}
  )
}
