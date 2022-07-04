(function () {
  // $.ajax({
  //   url: 'http://123.207.32.32:9060/beike/api/homePageInfo',
  //   method: 'GET',
  //   success: function (res) {
  //     // console.log(res);
  //     $('.header .address').text(res.curLocation.city);
  //   },
  //   error: function (err) {
  //     console.log(err);
  //   },
  // });

  var $searchHouseInput = $('.header .house-search');
  var $searchList = $('.header .search-list');
  var $searchTips = $('.header .search-tips');
  var $searchMenuUL = $('.header .search-menu ul');
  var $searchMenuArrow = $('.header .search-menu .arrow');

  var cacheSearchListData = []; // 热门推荐数据缓存
  var homePageInfoData = []; // 首页数据
  var currentSearchPlaceHolder = '请输入区域、商圈或小区名开始';
  var currentSearchBarSelector = 'site';
  // 初始化 首屏
  initPage();

  // 搜索 focus
  $searchHouseInput.on('focus', function () {
    var value = $(this).val().trim();
    if (value) {
      $(this).trigger('input');
      return;
    }
    if (cacheSearchListData.length) {
      // 渲染 搜索界面
      renderSearchList(cacheSearchListData);
      return;
    }
    HYReq.get(HYAPI.HOT_RECOMMEND).then(function (res) {
      // console.log(res.rent_house_list.list);
      var searchListData = res.rent_house_list.list || [];
      if (!searchListData) return;
      // 过滤 数据
      searchListData = searchListData.map((item) => ({
        title: item.app_house_title,
      }));

      // 缓存数据
      cacheSearchListData = searchListData;

      // 渲染 搜索界面
      renderSearchList(searchListData);
    });
  });

  $searchHouseInput.on('blur', function () {
    $searchTips.css('display', 'none');
  });

  $searchHouseInput.on(
    'input',
    debounce(function () {
      var value = $(this).val();
      // console.log(value);
      var curLocation = homePageInfoData.curLocation;

      HYReq.get(HYAPI.HOME_SEARCH, {
        cityId: curLocation.cityCode,
        cityName: curLocation.city,
        channel: currentSearchBarSelector,
        keyword: value,
        query: value,
      }).then(function (res) {
        // console.log(res.data.result);
        var searchData = res.data.result || [];
        searchData = searchData.map((item) => ({
          title: item.hlsText || item.text,
        }));
        // console.log(searchData);
        renderSearchList(searchData);
      });
    })
  );

  $searchMenuUL.on('click', 'li', function () {
    // console.log(this);
    var $li = $(this);
    $li.addClass('active').siblings().removeClass('active');
    // 移动箭头
    var liWidth = $li.width();
    var position = $li.position();
    var leftL = position.left + liWidth / 2;
    $searchMenuArrow.css('left', leftL);
    // console.log(liWidth, position);

    // 修改 placeholder
    $searchHouseInput.prop({
      placeholder: currentSearchPlaceHolder + $li.text(),
    });

    currentSearchBarSelector = $li.data('key');
  });

  function initPage() {
    HYReq.get(HYAPI.HOME_PAGE_INFO).then(function (res) {
      // console.log(res);
      // 渲染头部地址
      homePageInfoData = res;
      renderHeaderAddress(res);

      // 渲染 search bar
      renderSearchBar(res);
    });
  }

  // 渲染 页面头部地址区域
  function renderHeaderAddress(res) {
    var addr = res.curLocation || {};
    $('.header .address').text(addr.city);
  }

  function renderSearchList(searchListData = []) {
    // 渲染 搜索界面
    var htmlString = '<li><span>热门搜索</span></li>';
    searchListData.forEach(function (item) {
      htmlString += `<li><span>${item.title}</span></li>`;
    });
    $searchList.empty().append(htmlString);
    $searchTips.css('display', 'block');
  }

  // 渲染 search bar
  function renderSearchBar(res) {
    var searchBarData = res.searchMenus || [];
    // console.log(searchBarData);
    var htmlString = '';
    searchBarData.forEach((item, index) => {
      htmlString += `<li class="item${
        index === 0 ? ' active' : ''
      }" data-key="${item.key}"><span>${item.title}</span></li>`;
    });
    $searchMenuUL.empty().append(htmlString);
  }
})();
