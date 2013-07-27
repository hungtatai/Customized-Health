$(function() {
  $('.main-block-1').click(function() {
    return console.log("aaa");
  });
  $('.touch-area-head').createVegetable('banana');
  $('.touch-area-chest').createVegetable('bean');
  $('.touch-area-belly').createVegetable('egg');
  $('.touch-area-hand-left').createVegetable('fish');
  $('.touch-area-hand-right').createVegetable('guava');
  $('.touch-area-leg-left').createVegetable('lotus');
  return $('.touch-area-leg-right').createVegetable('mango');
});
