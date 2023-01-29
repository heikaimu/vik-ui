/*
 * @Date: 2022-11-04 14:02:19
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-11-28 14:04:20
 * @FilePath: /viking-ui/packages/utils/util/index.ts
 */
/**
 * 防抖
 * @param {Function} fn - 函数
 * @param {Number} delay - 时间间隔
 * @returns
 */
function debounce(fn: Function, delay: number) {
  let timer: any = null

  return function (this: void) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _this = this
    // eslint-disable-next-line prefer-rest-params
    const args = arguments
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    timer = setTimeout(() => {
      fn.apply(_this, args)
    }, delay)
  }
}

/**
 * 节，创建并返回一个像节流阀一样的函数，当重复调用函数的时候，最多每隔delay毫秒调用一次该函数
 * @param {Function} fn - 函数
 * @param {Number} delay - 时间间隔
 */
function throttle(fn: Function, delay: number, atleast: number) {
  let timer: any = null
  let previous: any = null

  return function () {
    const now = +new Date()

    if (!previous)
      previous = now
    if (atleast && now - previous > atleast) {
      fn()
      // 重置上一次开始时间为本次结束时间
      previous = now
      clearTimeout(timer)
    }
    else {
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn()
        previous = null
      }, delay)
    }
  }
}

/**
 * 获取随机ID
 * @param {Number} length - 长度
 * @returns {String}
 */
function getRandomID(length = 8): string {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}

// 数字格式化
function number(val: number, inscriber = 2) {
  const str: string = val.toFixed(inscriber) // 数字转换为字符
  const x = str.split('.') // 按照小数点分隔
  let x1 = x[0] // 整数部分
  const x2 = x.length > 1 ? `.${x[1]}` : '' // 小数部分

  const rgx = /(\d+)(\d{3})/ // 正则式定义
  while (rgx.test(x1)) { // 正则式匹配
    x1 = x1.replace(rgx, '$1' + ',' + '$2') // 正则式替换
  }

  return x1 + x2.substr(0, inscriber + 1)
}

export {
  debounce,
  throttle,
  getRandomID,
  number,
}
