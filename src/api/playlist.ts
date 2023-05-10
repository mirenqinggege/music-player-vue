import request from '@/api/request'
import {PlayList, Response, Song} from '@/types'

interface PlayListResponse extends Response {
  fromUserCount: number
  fromUsers: any
  relatedVideos: any
  resEntrance: any
  sharedPrivilege: any
  songFromUsers: any
  urls: any
  playlist: PlayList
  privileges: Song[]
}

export function getPlaylistDetail(id): Promise<PlayListResponse> {
  return request('POST', 'https://music.163.com/api/v6/playlist/detail', {id, n: 100000, s: 8}, {crypto: 'weapi'})
}
