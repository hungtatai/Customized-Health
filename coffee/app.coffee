
$ -> 
  $('.main-block-1').click ->
    console.log "aaa"

  $('.touch-area-head').createVegetable('banana')
  $('.touch-area-chest').createVegetable('bean')
  $('.touch-area-belly').createVegetable('egg')
  $('.touch-area-hand-left').createVegetable('fish')
  $('.touch-area-hand-right').createVegetable('guava')
  $('.touch-area-leg-left').createVegetable('lotus')
  $('.touch-area-leg-right').createVegetable('mango')

  $(window).resize(->
    $('.center').each(->
      $(@).height($(@).width())
    );
  ).resize()
  #for i in [1..4]
  #  console.log ".main-block-#{i} [class^='icon-']"
  #  $(".main-block-#{i} [class^='icon-']").cssvw('font-size', 17)
  #  $(".main-block-#{i} label").cssvw('font-size', 5) 