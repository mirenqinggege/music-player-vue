import request from '@/api/request'
import {Lyric, Response, SongDetail} from '@/types'


interface SongDetailResponse extends Response {
    data: SongDetail[]
}

type LyricResponse = Lyric & Response

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

export function getLyric(id: number): Promise<LyricResponse> {
    return request(
        'POST',
        'https://music.163.com/api/song/lyric?_nmclfl=1',
        {
            id,
            tv: -1,
            lv: -1,
            rv: -1,
            kv: -1,
        },
        {
            crypto: 'api'
        }
    )
}
