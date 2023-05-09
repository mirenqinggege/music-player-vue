export interface UserInfo {
  mutual: boolean
  remarkName?: string
  avatarImgId: number
  backgroundImgId: number
  detailDescription: string
  avatarImgIdStr: string
  backgroundImgIdStr: string
  defaultAvatar: boolean
  expertTags?: string
  djStatus: number
  followed: boolean
  backgroundUrl: string
  gender: number
  birthday: number
  city: number
  avatarUrl: string
  authStatus: number
  userType: number
  nickname: string
  accountStatus: number
  vipType: number
  province: number
  description: string
  userId: number
  signature: string
  authority: number
}

export interface PrivacyItemUnLimit {
  area?: boolean
  college?: boolean
  gender?: boolean
  age?: boolean
  villageAge?: boolean
}

export interface Profile {
  privacyItemUnlimit: PrivacyItemUnLimit
  avatarDetail?: any
  avatarImgIdStr: string
  backgroundImgIdStr: string
  description: string
  avatarImgId: number
  birthday: number
  gender: number
  nickname: string
  accountStatus: number
  vipType: number
  userType: number
  createTime: number
  avatarUrl: string
  backgroundImgId: number
  backgroundUrl: string
  mutual: boolean
  followed: boolean
  remarkName?: any
  authStatus: number
  detailDescription: string
  experts: any
  expertTags?: any
  djStatus: number
  province: number
  city: number
  defaultAvatar: boolean
  userId: number
  signature: string
  authority: number
  followeds: number
  follows: number
  blacklist: boolean
  eventCount: number
  allSubscribedCount: number
  playlistBeSubscribedount: number
  avatarImgId_str: string
  followTime?: any
  followMe: boolean
  artistIdentity: Array<any>
  cCount: number
  inBlacklist: boolean
  sDJPCount: number
  playlistCount: number
  sCount: number
  newFollows: number
}

export interface Binding {
  url: string
  expired: boolean
  expiresIn: number
  refreshTime: number
  bindingTime: number
  tokenJsonStr?: any
  userId: number
  id: number
  type: number
}

export interface ProfileVillageInfo {
  title: string
  imageUrl: boolean
  targetUrl: string
}

export interface UserPoint {
  userId: number
  balance: number
  updateTime: number
  version: number
  status: number
  blockBalance: number
}

export interface UserDetail {
  level: number
  listenSongs: number
  userPoint: UserPoint
  mobileSign: boolean
  pcSign: boolean
  profile: Profile
  peopleCanSeeMyPlayRecord: boolean
  bindings: Array<Binding>
  adValid: boolean
  code: number
  newUser: boolean
  recallUser: boolean
  createTime: number
  createDays: number
  profileVillageInfo: ProfileVillageInfo
}
