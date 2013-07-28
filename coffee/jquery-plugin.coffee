
$.fn.css3 = (key, val) ->
  $(@).css("#{prefix}#{key}", val) for prefix in ["-webkit-", "-moz-", "-ms-", "-o-", ""]
  @

$.fn.rotate = (deg) ->
  $(@).css3("transform", "rotate(#{deg}deg)")
  @

$.fn.randomRotate = ->
  $(@).rotate(Math.random() * 360)
  @

$.fn.randomCreateVegetable = (veg_name, n = 30) ->
  veg = $("<div class=\"food\"> <img src=\"images/food/#{veg_name}.png\" /> </div>")
  for i in [1..n]
    left = Math.random() * $(@).width()
    top = Math.random() * $(@).height()
    veg_t = veg.clone().randomRotate().css('left', left).css('top', top)
    $(@).append(veg_t)
  @

$.fn.createVegetable = (veg_name, n = 30) ->
  veg = $("<div class=\"food\" data-food=\"#{veg_name}\"> <img src=\"images/food/#{veg_name}.png\" /> </div>")
  for i in [1..n]
    veg_t = veg.clone().randomRotate()
    $(@).append(veg_t)
  $(@).data('food', veg_name)
  @

$.fn.cssvw = (key, val) ->
  $(@).css(key, vw2px(val))
  

window.px2vw = (px) ->
  px / $(window).width() * 100

window.vw2px = (vw) ->
  $(window).width() / vw 