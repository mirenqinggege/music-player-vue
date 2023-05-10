import {UserInfo} from '@/types'

export interface SongList {
  id?: number
  type?: number
  name?: string
  copywriter?: string
  picUrl?: string
  playcount?: number
  createTime?: number
  creator?: UserInfo
  trackCount?: number
  userId?: number
  alg?: string
}

export interface User {
  defaultAvatar?: boolean,
  province?: number,
  authStatus?: number,
  followed?: boolean,
  avatarUrl?: string,
  accountStatus?: number,
  gender?: number,
  city?: number,
  birthday?: number,
  userId?: number,
  userType?: number,
  nickname?: string,
  signature?: string,
  description?: number,
  backgroundImgId?: number,
  backgroundUrl?: string,
  authority?: number,
  mutual?: boolean,
  expertTags?: any,
  experts?: any,
  djStatus?: number,
  vipType?: number,
  remarkName?: any,
  authenticationTypes?: number,
  avatarDetail?: any,
  anchor?: boolean,
  avatarImgIdStr?: string,
  backgroundImgIdStr?: string,
  avatarImgId_str?: string
}





