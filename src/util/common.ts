import {valueEquals} from 'element-plus'

export function AntiShake(time: number = 100) {
  let timer: NodeJS.Timer | undefined
  return (callback: Function) => {
    if (timer !== undefined) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = undefined
      callback()
    }, time)
  }
}

export function objForEach<T>(obj: T, callback: (prop: string, value: any, obj?: T) => boolean | void) {
  for (let objKey in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, objKey)) {
      if (callback(objKey, obj[objKey], obj) === false) {
        break
      }
    }
  }
}


export function toHump(str: string): string {
  return str.toLowerCase()
    .replace(/[_-](\w)/g, (all, char) => char.toUpperCase())
}

export function getCookieFromStr(cookie: string, name: string): string {
  const strings = cookie.split(';')
  const s = strings.find(value => value.trim().startsWith(name))
  if (s) {
    const [key, value] = s.split('=')
    return value
  }
  return ''
}

export function formatDate(date: Date | string | number | undefined, format: string) {
  if (typeof date === 'number' || typeof date === 'string') {
    return formatDate(new Date(date), format)
  } else if (typeof date === 'undefined') {
    return ''
  } else {
    const reg: Record<string, number> = {
      'y+': date.getFullYear(),
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    objForEach(reg, (k, v) => {
      if (new RegExp(`(${k})`).test(format)) {
        const regV = RegExp.$1
        const fillZero = regV.length > 1 && v < 10
        if (fillZero) {
          format = format.replace(regV, `0${v}`)
        } else {
          format = format.replace(regV, v)
        }
      }
    })
    return format
  }
}
