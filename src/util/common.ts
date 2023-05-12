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
    const m = Math.floor(minute)
    const s = Math.floor(second)
    const result = [m < 10 ? `0${m}` : m, s < 10 ? `0${s}` : s]
    return result.join(':')
  }
  return '00:00'
}

export function second2minute(s: number | undefined): string {
  if (s) {
    const minUnit = 60
    const minute = Math.floor(s / minUnit)
    const second = Math.floor(s % minUnit)
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

export function deepClone<T>(obj: T, hash = new WeakMap()) {
  if (obj === null) {
    return obj
  } // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) {
    return new Date(obj)
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj)
  }
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== 'object') {
    return obj
  }
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) {
    return hash.get(obj)
  }
  let cloneObj = new obj.constructor()
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj)
  objForEach(obj, (k, v) => {
    cloneObj[k] = deepClone(v, hash)
  })
  return cloneObj
}

export function numFormat(num: number): string {
  if (num > 9999) {
    return Math.floor(num * 0.0001) + '万'
  } else {
    return num + ''
  }
}
