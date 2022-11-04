/*
 * @Date: 2022-11-04 14:02:19
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-11-04 15:41:06
 * @FilePath: /viking-ui/packages/utils/util/index.ts
 */
/**
 * 防抖
 * @param {Function} fn - 函数
 * @param {Number} delay - 时间间隔
 * @returns
 */
 function debounce(fn: Function, delay: number) {
  let timer: any = null;

  return function (this: void) {
    const _this = this;
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      fn.apply(_this, args);
    }, delay);
  };
}

/**
 * 节，创建并返回一个像节流阀一样的函数，当重复调用函数的时候，最多每隔delay毫秒调用一次该函数
 * @param {Function} fn - 函数
 * @param {Number} delay - 时间间隔
 */
function throttle(fn: Function, delay: number, atleast: number) {
  let timer: any = null;
  let previous: any = null;

  return function () {
    const now = +new Date();

    if (!previous) previous = now;
    if (atleast && now - previous > atleast) {
      fn();
      // 重置上一次开始时间为本次结束时间
      previous = now;
      clearTimeout(timer);
    } else {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fn();
        previous = null;
      }, delay);
    }
  };
}

/**
 * 获取随机ID
 * @param {Number} length - 长度
 * @returns {String}
 */
function getRandomID(length = 8): string {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}

export {
  debounce,
  throttle,
  getRandomID
}
