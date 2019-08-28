/**
 * 空函数
 */
export function noop () { }

/**
 * 时间格式化
 * @param {String} value 时间
 * @param {String} fmt 格式
 */
export function formatTime (value, fmt = 'yyyy-MM-dd hh:mm:ss') {
  const time = new Date(value)
  const obj = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    'q+': Math.floor((time.getMonth() + 3) / 3),
    S: time.getMilliseconds(),
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (const k in obj) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? obj[k] : ('00' + obj[k]).substr(('' + obj[k]).length))
    }
  }

  return fmt
}

/**
 * 格式化数字
 * @param {number} number 数字
 * @param decimals 保留小数位数
 * @param decimal 整数与小数分隔符
 * @param separator 千分符
 * @param prefix 前缀
 * @param postfix 后缀
 */
export function formatNumber (number, {
  decimals = 0,
  decimal = '.',
  separator = ',',
  prefix = '',
  postfix = '',
} = {}) {
  if (isNaN(parseFloat(number)) || !isFinite(number)) return 0

  number = Number(number)

  const toFixedFix = (x, y) => {
    const k = Math.pow(10, decimals)

    return `${(Math.round(x * k) / k).toFixed(y)}`
  }
  const s = (decimals ? toFixedFix(number, decimals) : `${Math.round(number)}`).split(decimal)

  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, separator)
  }

  if (typeof s[1] === 'string' && s[1].length < decimals) {
    s[1] = `${'0'.repeat(decimals)}${s[1]}`.slice(-decimals)
  }

  return `${prefix}${s.join(decimal)}${postfix}`
}
