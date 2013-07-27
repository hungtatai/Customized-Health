
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
    left = Math.random() * px2vw($(@).width())
    top = Math.random() * px2vw($(@).height())
    veg_t = veg.clone().randomRotate().css('left', left+'vw').css('top', top+'vw')
    $(@).append(veg_t)
  @

$.fn.createVegetable = (veg_name, n = 30) ->
  veg = $("<div class=\"food\"> <img src=\"images/food/#{veg_name}.png\" /> </div>")
  for i in [1..n]
    veg_t = veg.clone().randomRotate()
    $(@).append(veg_t)
  @



window.px2vw = (px) ->
  px / $(window).width() * 100