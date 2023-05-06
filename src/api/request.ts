import {ipcRenderer} from 'electron'

export default function (method: 'GET' | 'POST', url: string, data: any, options: any) {
  return ipcRenderer.invoke('request', [method, url, data, options]).then(({body}) => body)
}
