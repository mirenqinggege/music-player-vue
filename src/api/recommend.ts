import request from '@/api/request'
import {Banner, Response, SongList} from '@/types'

interface BannerListResponse extends Response {
  banners: Banner[]
}

// 获取首页banner
export function getBanner(): Promise<BannerListResponse> {
  return request(
    'POST',
    'https://music.163.com/api/v2/banner/get',
    {clientType: 'pc'},
    {crypto: 'api'}
  )
}

interface RecommendSongListResponse extends Response {
  featureFirst: boolean
  haveRcmdSongs: boolean
  recommend: SongList[]
}

// 获取每日推荐歌单
export function getRecommendSongList(): Promise<RecommendSongListResponse> {
  return request(
    'POST',
    'https://music.163.com/weapi/v1/discovery/recommend/resource',
    {},
    {crypto: 'weapi'}
  )
}
