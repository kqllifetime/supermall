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

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
