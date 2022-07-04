// 防抖
function debounce(fn, delay = 500, immediate = false) {
  let timer = null;
  let isInvoke = false;

  const _debounce = function (...args) {
    timer && clearTimeout(timer);
    if (immediate && !isInvoke) {
      fn.apply(this, args);
      isInvoke = true;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
        isInvoke = false;
      }, delay);
    }
  };

  return _debounce;
}
