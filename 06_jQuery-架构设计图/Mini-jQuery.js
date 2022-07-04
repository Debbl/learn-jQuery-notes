// 立即执行函数 避免全局变量冲突
(function (global, factory) {
  factory(global);
})(window, function (window) {
  console.log(window);

  function DEjQuery(selector) {
    return new DEjQuery.fn.init(selector);
  }

  // 原型方法
  DEjQuery.prototype = {
    constructor: DEjQuery,
    extend: function () {},
    text: function () {},
    ready: function () {},
  };

  // 类方法
  DEjQuery.noConflict = function () {};
  DEjQuery.isArray = function () {};
  DEjQuery.map = function () {};

  DEjQuery.fn = DEjQuery.prototype;
  DEjQuery.fn.init = function (selector) {
    if (!selector) {
      return this;
    }
    var el = document.querySelector(selector);
    this[0] = el;
    this.length = 1;
    return this;
  };
  DEjQuery.fn.init.prototype = DEjQuery.fn;
  window.DEjQuery = window.$ = DEjQuery;
});
