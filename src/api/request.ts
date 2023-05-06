import {ipcRenderer} from 'electron'
import {Response} from '@/types'
import {getCookieStore} from '@/store'

interface RequestOption {
  cookie?: string | object
  crypto: 'weapi' | 'linuxapi' | 'eapi' | string
  proxy?: string
  realIP?: string
}

export default function (method: 'GET' | 'POST', url: string, data: any, options: RequestOption): Promise<Response> {
  const cookie = getCookieStore().getCookieToString
  if (options.cookie === undefined) {
    options.cookie = cookie
  }
  return ipcRenderer.invoke('request', [method, url, data, options]).then(({body}) => body)
}
