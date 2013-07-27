$.fn.css3 = function(key, val) {
  var prefix, _i, _len, _ref;

  _ref = ["-webkit-", "-moz-", "-ms-", "-o-", ""];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    prefix = _ref[_i];
    $(this).css("" + prefix + key, val);
  }
  return this;
};

$.fn.rotate = function(deg) {
  $(this).css3("transform", "rotate(" + deg + "deg)");
  return this;
};

$.fn.randomRotate = function() {
  $(this).rotate(Math.random() * 360);
  return this;
};

$.fn.randomCreateVegetable = function(veg_name, n) {
  var i, left, top, veg, veg_t, _i;

  if (n == null) {
    n = 30;
  }
  veg = $("<div class=\"food\"> <img src=\"images/food/" + veg_name + ".png\" /> </div>");
  for (i = _i = 1; 1 <= n ? _i <= n : _i >= n; i = 1 <= n ? ++_i : --_i) {
    left = Math.random() * px2vw($(this).width());
    top = Math.random() * px2vw($(this).height());
    veg_t = veg.clone().randomRotate().css('left', left + 'vw').css('top', top + 'vw');
    $(this).append(veg_t);
  }
  return this;
};

$.fn.createVegetable = function(veg_name, n) {
  var i, veg, veg_t, _i;

  if (n == null) {
    n = 30;
  }
  veg = $("<div class=\"food\"> <img src=\"images/food/" + veg_name + ".png\" /> </div>");
  for (i = _i = 1; 1 <= n ? _i <= n : _i >= n; i = 1 <= n ? ++_i : --_i) {
    veg_t = veg.clone().randomRotate();
    $(this).append(veg_t);
  }
  return this;
};

window.px2vw = function(px) {
  return px / $(window).width() * 100;
};
