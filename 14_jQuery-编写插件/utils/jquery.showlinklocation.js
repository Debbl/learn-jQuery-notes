(function (window, $) {
  // 获取 this jQuery 对象
  // $.fn.showlinklocation = function () {
  //   console.log(this);
  //   this.append('(http://aiwan.run)');
  // };

  // 过滤 a 元素
  // $.fn.showlinklocation = function () {
  //   console.log(this);
  //   this.filter('a').append('(http://aiwan.run)');
  // };

  // 遍历 a 元素
  $.fn.showlinklocation = function () {
    console.log(this);
    var $tarEl = this.filter('a');
    $tarEl.each(function () {
      var $a = $(this);
      $a.attr('title', $a.text());
      $a.append(`(${$a.prop('href')})`);
    });
    return $tarEl;
  };
})(window, jQuery);
