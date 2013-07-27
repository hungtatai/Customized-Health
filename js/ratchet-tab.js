(function() {
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
    $('.back-button').hide();
    window.current_page = page_selector;
    return $.event.trigger('switchpage');
  };

  $(document).on('touchend', '.bar-tab li.tab-item', function() {
    var id, m;

    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    m = $(this).find('a').attr('href').match('#.*');
    if (m) {
      id = m[0];
    }
    return switchPage(id);
  });

  $(document).on('touchend', 'a', function() {
    var id, m;

    if ($(this).parents('.bar-tab').size() === 0) {
      m = $(this).attr('href').match('#(.*)');
      if ((m != null) && m.length === 2 && m[1].trim() !== "") {
        id = m[0];
        return switchPage(id);
      }
    }
  });

  $(function() {
    return switchPage('.first-content');
  });

}).call(this);
