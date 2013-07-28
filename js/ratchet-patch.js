window.switchPage = function(page_selector) {
  var target;

  console.log("switchPage to " + page_selector);
  target = $('.content' + page_selector);
  if (target.size() > 0) {
    $('.content').hide();
    target.show();
    $('header').show();
    if ($(target).hasClass('hide-header')) {
      $('header').hide();
    }
    $('nav').show();
    if ($(target).hasClass('hide-nav')) {
      $('nav').hide();
    }
  }
  $('.back-button').hide().off("click");
  $('.refresh-button').hide().off("click");
  window.current_page = page_selector;
  return $.event.trigger('switchpage');
};

$(document).on('click', '.bar-tab li.tab-item', function() {
  $(this).siblings().removeClass('active');
  return $(this).addClass('active');
});

$(function() {
  return switchPage('.first-content');
});
