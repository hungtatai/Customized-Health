$(function() {
  var id, _i, _len, _ref;

  $(window).resize(function() {
    return $('.center').each(function() {
      return $(this).height($(this).width());
    });
  }).resize();
  _ref = ["height", "weight", "chest", "belly", "buttock", "hand", "leg", "sex"];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    id = _ref[_i];
    $("#" + id).val($.jStorage.get(id, ""));
  }
  $("[name=sex][value=" + ($.jStorage.get('sex', "")) + "]").prop("checked", true);
  $("[class^='main-block-']").on({
    mousedown: function() {
      return $(this).addClass('active');
    },
    mouseup: function() {
      return $(this).removeClass('active');
    }
  });
  $(".main-block-1").click(function() {
    switchPage('#health-input-view');
    return tools.clickBack(function() {
      return switchPage("#main-view");
    });
  });
  $(".main-block-2").click(function() {
    $('.tab-item-1').click();
    return tools.clickBack(function() {
      return switchPage("#main-view");
    });
  });
  $(".main-block-3").click(function() {
    return tools.updateNews().done(function() {
      switchPage("#news-view");
      tools.clickRefresh(function() {
        return tools.updateNews();
      });
      return tools.clickBack(function() {
        return switchPage("#main-view");
      });
    });
  });
  $('.tab-item-1').click(function() {
    var sex;

    tools.updateReciple();
    sex = $.jStorage.get("sex").toString().toUpperCase() === 'M' ? 'boy' : 'girl';
    $('.human-img').attr('src', "/images/human-" + sex + ".png").removeClass('boy').removeClass('girl').addClass(sex);
    switchPage('#reciple-view');
    return tools.clickBack(function() {
      return switchPage("#main-view");
    });
  });
  $('.tab-item-2').click(function() {
    tools.updateNutrition();
    switchPage('#nutrition-view');
    return tools.clickBack(function() {
      return switchPage("#main-view");
    });
  });
  $('.tab-item-3').click(function() {
    switchPage('#store-view');
    return tools.clickBack(function() {
      return switchPage("#main-view");
    });
  });
  $('.tab-item-4').click(function() {
    tools.updateIdeal();
    switchPage('#ideal-view');
    return tools.clickBack(function() {
      return switchPage("#main-view");
    });
  });
  $('#save-health-button').click(function() {
    var _j, _len1, _ref1;

    _ref1 = ["height", "weight", "chest", "belly", "buttock", "hand", "leg", "sex"];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      id = _ref1[_j];
      $.jStorage.set(id, $("#" + id).val());
    }
    $.jStorage.set('sex', $('[name=sex]:checked').val());
    return switchPage("#main-view");
  });
  $(document).on("switchpage", function() {
    if (window.current_page === "#main-view") {
      return $(window).resize();
    }
  });
  return window.map.init("store-map");
});
