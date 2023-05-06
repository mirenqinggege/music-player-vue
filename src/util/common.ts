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
