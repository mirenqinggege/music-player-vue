import request from '@/api/request'
import {Response} from '@/types'
import {toDataURL} from 'qrcode'

interface QrcodeKeyResponse extends Response {
  unikey: string
}

export function getQrcodeKey(): Promise<QrcodeKeyResponse> {
  const data = {
    type: 1
  }
  const url = 'https://music.163.com/weapi/login/qrcode/unikey'
  return request('POST', url, data, {crypto: 'weapi'})
}


export function getQrcodeUrl(key: string): Promise<string> {
  return new Promise((resolve, reject) => {
    toDataURL(`https://music.163.com/login?codekey=${key}`, (error, url) => {
      if (error) {
        reject(error)
      } else {
        resolve(url)
      }
    })
  })
}

interface CheckQrResponse extends Response {
  message: string
  cookie: string
  nickname?: string
  avatarUrl?: string
}

export function checkQr(key: string): Promise<CheckQrResponse> {
  return new Promise((resolve, reject) => {
    request('POST', 'https://music.163.com/weapi/login/qrcode/client/login', {key, type: 1}, {crypto: 'weapi'})
      .catch((data) => {
        if (data.code === 803) {
          resolve(data)
        } else {
          reject(data)
        }
      })
  })
}

export const CHECK_QR_CODE = {
  800: '二维码不存在或已过期',
  801: '等待扫码',
  802: '授权中',
  803: '授权登陆成功'
}
