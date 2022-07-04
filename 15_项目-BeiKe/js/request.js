(function (window, $) {
  function request(config = {}) {
    return $.ajax({
      url: config.url ?? '',
      method: config.method ?? 'GET',
      timeout: config.timeout ?? 3000,
      data: config.data ?? {},
      headers: config.headers ?? {},
      ...config,
    });
  }

  function get(url, data) {
    return request({
      url,
      method: 'GET',
      data,
    });
  }

  function post(url, data) {
    return request({
      url,
      method: 'POST',
      data,
    });
  }

  window.HYReq = {
    request,
    get,
    post,
  };
})(window, jQuery);
