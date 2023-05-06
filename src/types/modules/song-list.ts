import {UserInfo} from '@/types/modules/user-info'

export interface SongList {
  id: number
  type: number
  name: string
  copywriter: string
  picUrl: string
  playcount: number
  createTime: number
  creator: UserInfo
  trackCount: number
  userId: number
  alg: string
}
