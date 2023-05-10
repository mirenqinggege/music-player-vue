import {UserInfo} from '@/types/modules/user-info'

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

export interface PlayList {
  adType?: number
  anonimous?: boolean
  artists?: any
  backgroundCoverId?: number
  backgroundCoverUrl?: any
  cloudTrackCount?: number
  commentThreadId?: string
  copied?: boolean
  coverImgId?: number
  coverImgId_str?: string
  coverImgUrl?: string
  createTime?: number
  creator?: User
  description?: string
  englishTitle?: any
  highQuality?: boolean
  id?: number
  name?: string
  newImported?: boolean
  opRecommend?: boolean
  playCount?: number
  privacy?: number
  recommendInfo?: any
  shareStatus?: any
  sharedUsers?: any
  specialType?: number
  subscribed?: boolean
  subscribedCount?: number
  subscribers?: []
  titleImage?: number
  titleImageUrl?: any
  totalDuration?: number
  trackCount?: number
  trackNumberUpdateTime?: number
  trackUpdateTime?: number
  tracks?: any
  updateFrequency?: any
  updateTime?: number
  userId?: number
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





