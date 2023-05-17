import request from '@/api/request'
import {PlayList, Response} from '@/types'

interface PlayListResponse extends Response {
  fromUserCount: number
  fromUsers: any
  relatedVideos: any
  resEntrance: any
  sharedPrivilege: any
  songFromUsers: any
  urls: any
  playlist: PlayList
}

export function getPlaylistDetail(id): Promise<PlayListResponse> {
  return request('POST', 'https://music.163.com/api/v6/playlist/detail', {id, n: 100000, s: 8}, {crypto: 'weapi'})
}

export function subscribePlaylist(id) {
  return request('POST', 'https://music.163.com/weapi/playlist/subscribe', {id}, {crypto: 'weapi'})
}

export function unsubscribePlaylist(id) {
  return request('POST', 'https://music.163.com/weapi/playlist/unsubscribe', {id}, {crypto: 'weapi'})
}
