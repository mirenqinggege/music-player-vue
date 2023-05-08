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
