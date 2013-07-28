window.isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows();
  }
};

window.api = {
  ajax: function(url) {
    return $.ajax({
      url: url,
      type: "GET",
      dataType: "jsonp",
      jsonp: "jsonp"
    });
  },
  getHeathFeed: function() {
    var feed_url, url;

    feed_url = "http://news.baidu.com/n?cmd=4&class=meishijk&tn=rss";
    url = 'http://ajax.googleapis.com/ajax/services/feed/load?v=2.0&num=10&callback=?&q=' + encodeURIComponent(feed_url);
    console.log(url);
    return this.ajax(url);
  }
};

window.tools = {
  updateIdeal: function() {
    var ideal, li, map, part, _i, _len, _ref;

    ideal = this.calcIdealHealth($.jStorage.get("sex"), $.jStorage.get("weight"), $.jStorage.get("height"));
    map = {
      head: "臉部",
      chest: "胸圍",
      belly: "腰圍",
      hand: "手臂圍",
      leg: "大腿圍"
    };
    li = "";
    _ref = ["chest", "belly", "hand", "leg"];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      part = _ref[_i];
      li += "<li>你的最佳" + map[part] + "是 <span class=\"green\">" + (Number(ideal[part]).toFixed(2)) + " cm</span></li>";
    }
    return $('#idealList').empty().append(li);
  },
  updateNutrition: function() {
    var color, detail, ideal, li, map, part, text, _i, _len, _ref;

    ideal = this.calcIdealHealth($.jStorage.get("sex"), $.jStorage.get("weight"), $.jStorage.get("height"));
    map = {
      head: "臉部",
      chest: "胸圍",
      belly: "腰圍",
      hand: "手臂圍",
      leg: "大腿圍"
    };
    li = "";
    _ref = ["chest", "belly", "hand", "leg"];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      part = _ref[_i];
      if (ideal.test(part, $.jStorage.get(part))) {
        color = "-positive";
        text = "通過";
        detail = "";
      } else {
        color = "-negative";
        text = "不通過";
        detail = "建議多吃：" + _.keys(window.food_map[part].lose);
      }
      li += "<li><h2>你的「" + map[part] + "」評估</h2><div>" + ($.jStorage.get(part)) + " -> " + (ideal[part].toFixed(2)) + "</div><div>" + detail + "</div><span class=\"count" + color + "\">" + text + "</span></li>";
    }
    return $('#nutritionList').empty().append(li);
  },
  updateReciple: function() {
    var id, ideal, self, _i, _len, _ref;

    ideal = this.calcIdealHealth($.jStorage.get("sex"), $.jStorage.get("weight"), $.jStorage.get("height"));
    _ref = ["touch-area-head", "touch-area-belly", "touch-area-chest", "touch-area-hand-left", "touch-area-hand-right", "touch-area-leg-left", "touch-area-leg-right"];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      id = _ref[_i];
      $("." + id).empty().off('click');
    }
    self = this;
    $('.touch-area-head').createVegetable(this.randomLoseVeg('head'), 100).click(function() {
      return $('.touch-area-head').empty().createVegetable(self.randomLoseVeg('head'));
    });
    if (!ideal.test("chest", $.jStorage.get("chest"))) {
      $('.touch-area-chest').createVegetable(this.randomLoseVeg('chest')).click(function() {
        return $('.touch-area-chest').empty().createVegetable(self.randomLoseVeg('chest'));
      });
    }
    if (!ideal.test("belly", $.jStorage.get("belly"))) {
      $('.touch-area-belly').createVegetable(this.randomLoseVeg('belly')).click(function() {
        return $('.touch-area-belly').empty().createVegetable(self.randomLoseVeg('belly'));
      });
    }
    if (!ideal.test("hand", $.jStorage.get("hand"))) {
      $('.touch-area-hand-left, .touch-area-hand-right').createVegetable(this.randomLoseVeg('hand')).click(function() {
        return $('.touch-area-hand-left, .touch-area-hand-right').empty().createVegetable(self.randomLoseVeg('hand'));
      });
    }
    if (!ideal.test("leg", $.jStorage.get("leg"))) {
      return $('.touch-area-leg-left, .touch-area-leg-right').createVegetable(this.randomLoseVeg('leg')).click(function() {
        return $('.touch-area-leg-left, .touch-area-leg-right').empty().createVegetable(self.randomLoseVeg('leg'));
      });
    }
  },
  updateNews: function() {
    var _this = this;

    this.showLoading();
    return window.api.getHeathFeed().done(function(data) {
      var enti, li, _i, _len, _ref;

      li = "";
      _ref = data.responseData.feed.entries;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        enti = _ref[_i];
        li += "<li><a href=\"" + enti.link + "\"><h2>" + enti.title + "</h2><div>" + enti.contentSnippet + "</div><span class=\"chevron\"></span></a></li>";
      }
      $('#newsList').empty().append(li);
      return _this.hideLoading();
    });
  },
  randomLoseVeg: function(part) {
    return this.randomSelect(_.values(window.food_map[part].lose));
  },
  randomSelect: function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  showLoading: function() {
    this.hideLoading();
    return $.blockUI({
      message: "<img src='/images/ajax-loader.gif' />",
      css: {
        backgroundColor: 'transparent',
        border: '0px'
      }
    });
  },
  hideLoading: function() {
    return $.unblockUI();
  },
  clickRefresh: function(callback) {
    return $('.refresh-button').show().off("click").on("click", function(e) {
      return callback(e);
    });
  },
  clickBack: function(callback) {
    return $('.back-button').show().off("click").on("click", function(e) {
      return callback(e);
    });
  },
  calcBMI: function(w, h) {
    return w / Math.pow(h / 100, 2);
  },
  calcIdealHealth: function(sex, w, h) {
    var obj;

    obj = sex.toString().toUpperCase() === "M" ? {
      weight: (h - 100) * 0.9,
      chest: h * 0.618,
      waist: h * 0.4388,
      buttock: h * 0.55,
      hand: h * 0.2101,
      leg: h * 0.3399,
      bmi: this.calcBMI(w, h)
    } : {
      weight: (h - 100) * 0.81,
      chest: h * 0.52,
      waist: h * 0.37,
      buttock: h * 0.54,
      hand: h * 0.15,
      leg: h * 0.31,
      bmi: this.calcBMI(w, h)
    };
    obj.belly = obj.waist;
    obj.test = function(key, val, range) {
      if (range == null) {
        range = 0.05;
      }
      if (key.toString().toUpperCase() === "BMI") {
        return 18.5 <= val && val <= 24;
      } else {
        return this[key] * (1 - range) <= val && val <= this[key] * (1 + range);
      }
    };
    return obj;
  }
};

window.map = {
  init: function(container) {
    var m;

    this.container = container;
    m = new BMap.Map(this.container);
    this.container = "#" + this.container;
    m.centerAndZoom(new BMap.Point(116.404, 39.915), 15);
    m.addControl(new BMap.ScaleControl());
    m.addControl(new BMap.OverviewMapControl());
    m.addControl(new BMap.MapTypeControl());
    m.enableScrollWheelZoom();
    this.map = m;
    return this.mgr = new BMapLib.MarkerManager(m, {
      maxZoom: 18,
      trackMarkers: true
    });
  },
  addRandomMarker: function(num) {
    var center, h, height, marker, markers, newPixel, newPoint, pixel, realBounds, w, width;

    if (num == null) {
      num = 1;
    }
    width = $(this.container).width();
    height = $(this.container).height();
    realBounds = this.mgr._getRealBounds();
    center = this.map.getCenter();
    pixel = this.map.pointToPixel(center);
    markers = [];
    console.log(this.container, width, height);
    while (num > 0) {
      w = width * Math.random();
      h = height * Math.random();
      newPixel = {
        x: pixel.x + (Math.random() > 0.5 ? w : -w),
        y: pixel.y + (Math.random() > 0.5 ? h : -h)
      };
      newPoint = this.map.pixelToPoint(newPixel);
      marker = new BMap.Marker(newPoint);
      if (realBounds.containsPoint(newPoint)) {
        markers.push(marker);
        num--;
      }
    }
    this.mgr.addMarkers(markers);
    return this.mgr.showMarkers();
  }
};
