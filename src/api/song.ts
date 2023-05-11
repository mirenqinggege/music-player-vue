import request from '@/api/request'
import {Response, SongDetail} from '@/types'


interface SongDetailResponse extends Response {
  data: SongDetail[]
}

export function getSongDetail(id): Promise<SongDetailResponse> {
  const data = {
    ids: JSON.stringify([id]),
    br: 999000
  }
  return request(
    'POST',
    'https://interface3.music.163.com/eapi/song/enhance/player/url',
    data,
    {crypto: 'weapi', url: '/api/song/enhance/player/url'})
}
