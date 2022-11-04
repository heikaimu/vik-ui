function debounce(fn, delay) {
  let timer = null;
  return function() {
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
function throttle(fn, delay, atleast) {
  let timer = null;
  let previous = null;
  return function() {
    const now = +new Date();
    if (!previous)
      previous = now;
    if (atleast && now - previous > atleast) {
      fn();
      previous = now;
      clearTimeout(timer);
    } else {
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn();
        previous = null;
      }, delay);
    }
  };
}
function getRandomID(length = 8) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36);
}
export {
  debounce,
  getRandomID,
  throttle
};
