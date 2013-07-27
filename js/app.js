$(function() {
  $('.main-block-1').click(function() {
    return console.log("aaa");
  });
  $('.touch-area-head').createVegetable('banana', 100);
  $('.touch-area-chest').createVegetable('bean');
  $('.touch-area-belly').createVegetable('egg');
  $('.touch-area-hand-left').createVegetable('fish');
  $('.touch-area-hand-right').createVegetable('guava');
  $('.touch-area-leg-left').createVegetable('lotus');
  $('.touch-area-leg-right').createVegetable('mango');
  return $(window).resize(function() {
    return $('.center').each(function() {
      return $(this).height($(this).width());
    });
  }).resize();
});
