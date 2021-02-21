//防抖函数debounce(高频操作以间隔时间内出现的最新的为准)/
export function debounce(func, delay) {
  let timer = null
  return function(...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
//节流函数throttle(高频操作以间隔时间内出现的最早的为准)
export function throttle(func, delay) {
  let canUse = true
  return function(...args) {
    if(!canUse) {return canUse }
    canUse = false
    setTimeout(() => {
      func.apply(this, args)
      canUse = true
    }, delay)
  }
}
