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

export function millisecond2minute(ms: number | undefined): string {
  if (ms) {
    const minUnit = 1000 * 60
    const minute = ms / minUnit
    const second = ms % minUnit / 1000
    const m = minute.toFixed(0)
    const s = second.toFixed(0)
    const result = [m < 10 ? `0${m}` : m, s < 10 ? `0${s}` : s]
    return result.join(':')
  }
  return '00:00'
}

export function second2minute(s: number | undefined): string {
  if (s) {
    const minUnit = 60
    const minute = (s / minUnit).toFixed(0)
    const second = (s % minUnit).toFixed(0)
    const result = [minute < 10 ? `0${minute}` : minute, second < 10 ? `0${second}` : second]
    return result.join(':')
  }
  return '00:00'
}

export function newInterval(ms: number, task?: Function) {
  let index: NodeJS.Timer | undefined
  return {
    start(callable?: Function) {
      if (index !== undefined) {
        throw new Error('this interval is running')
      }
      index = setInterval(callable !== undefined ? callable : (task || (() => {})), ms)
    },
    stop() {
      clearInterval(index)
      index = undefined
    }
  }
}

export function callOrReturn(obj: any, ...args: any[]) {
  if (typeof obj === 'function') {
    return obj.apply(obj, args)
  } else {
    return obj
  }
}
