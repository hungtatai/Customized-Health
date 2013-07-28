
$ -> 

  $(window).resize(->
    $('.center').each(->
      $(@).height($(@).width())
    );
  ).resize()
  #for i in [1..4]
  #  console.log ".main-block-#{i} [class^='icon-']"
  #  $(".main-block-#{i} [class^='icon-']").cssvw('font-size', 17)
  #  $(".main-block-#{i} label").cssvw('font-size', 5) 


  $("##{id}").val( $.jStorage.get(id, ""))  for id in ["height", "weight", "chest", "belly", "buttock", "hand", "leg", "sex"]
  $("[name=sex][value=#{$.jStorage.get('sex', "")}]").prop("checked", true)
  

  $("[class^='main-block-']").on(
    mousedown: ->
      $(@).addClass('active')
    mouseup: ->
      $(@).removeClass('active')
  )

  $(".main-block-1").click ->
    switchPage('#health-input-view')
    tools.clickBack(-> switchPage("#main-view"))

  $(".main-block-2").click ->
    $('.tab-item-1').click()
    tools.clickBack(-> switchPage("#main-view"))

  $(".main-block-3").click ->
    tools.updateNews().done(->
      switchPage("#news-view")
      tools.clickRefresh(-> tools.updateNews())
      tools.clickBack(-> switchPage("#main-view"))
    )

  $(".main-block-4").click ->
    switchPage("#about-view")
    tools.clickBack(-> switchPage("#main-view"))

  $('.tab-item-1').click ->
    tools.updateReciple()
    sex = if $.jStorage.get("sex").toString().toUpperCase() == 'M' then 'boy' else 'girl'
    $('.human-img').attr('src', "/images/human-#{sex}.png").removeClass('boy').removeClass('girl').addClass(sex)
    switchPage('#reciple-view')
    tools.clickBack(-> switchPage("#main-view"))

  $('.tab-item-2').click ->
    try
      tools.updateNutrition()
      switchPage('#nutrition-view')
      tools.clickBack(-> switchPage("#main-view"))
    catch e
      $('.tab-item-1').click()

  $('.tab-item-3').click ->
    switchPage('#store-view')
    tools.clickBack(-> switchPage("#main-view"))

  $('.tab-item-4').click ->
    tools.updateIdeal()
    switchPage('#ideal-view')
    tools.clickBack(-> switchPage("#main-view"))

  $('#save-health-button').click ->
    $.jStorage.set(id, $("##{id}").val()) for id in ["height", "weight", "chest", "belly", "buttock", "hand", "leg", "sex"]
    $.jStorage.set('sex', $('[name=sex]:checked').val())
    switchPage("#main-view")

  $('#post-store-button').click ->
    area_food = (part) -> $(".touch-area-#{part}").data('food')
    url = "http://healthapp.duapp.com/my.php?head=#{area_food('head')}&chest=#{area_food('chest')}&belly=#{area_food('belly')}&hand=#{area_food('hand-left')}&leg=#{area_food('leg-left')}"
    tools.showLoading()
    $.get(url).done(-> tools.hideLoading()).fail(-> tools.hideLoading())

  $(document).on "switchpage", ->
    $(window).resize() if window.current_page == "#main-view"

  
  window.map.init("store-map") 
  window.map.addRandomMarker(2)
  
