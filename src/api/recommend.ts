import request from '@/api/request'
import {Banner, Response} from '@/types'

interface BannerListResponse extends Response {
  banners: Banner[]
}

export function getBanner(): Promise<BannerListResponse> {
  return request(
    'POST',
    'https://music.163.com/api/v2/banner/get',
    {clientType: 'pc'},
    {crypto: 'api'}
  )
}
