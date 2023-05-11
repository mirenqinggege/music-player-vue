import request from '@/api/request'
import {Response, SongDetail} from '@/types'


interface SongDetailResponse extends Response {
  data: SongDetail[]
}

export function getSongDetail(id): Promise<SongDetailResponse> {
  const data = {
    c: JSON.stringify([{id}])
  }
  return request('POST', 'https://music.163.com/api/v3/song/detail', data, {crypto: 'weapi'})
}
