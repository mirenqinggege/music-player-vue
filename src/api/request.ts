import {ipcRenderer} from 'electron'
import {Response} from '@/types'
import {getCookieStore} from '@/store'

interface RequestOption extends Record<string, any>{
  cookie?: string | object
  crypto: 'weapi' | 'linuxapi' | 'eapi' | string
  proxy?: string
  realIP?: string
}

export default function (method: 'GET' | 'POST', url: string, data: any, options: RequestOption): Promise<Response> {
  const cookie = getCookieStore().getCookie
  if (options.cookie === undefined) {
    options.cookie = cookie
  }
  return new Promise<Response>((resolve, reject) => {
    ipcRenderer.invoke('request', [method, url, data, options])
      .then((data) => {
        const {body: {code}, cookie} = data
        data.body.cookie = cookie
        if (code === 200) {
          resolve(data.body)
        } else {
          // isNotLogin(code)
          reject(data.body)
        }
      })
  })
}

function isNotLogin(code: number): boolean {
  if (code === 301) {
    getCookieStore().clearCookie().then()
  }
  return code === 301
}
