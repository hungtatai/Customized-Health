
window.switchPage = (page_selector) ->
	console.log "switchPage to "+page_selector
	target = $('.content'+page_selector) 
	if target.size() > 0
		$('.content').hide()
		target.show()

		$('header').show()
		$('header').hide() if $(target).hasClass('hide-header')

		$('nav').show()
		$('nav').hide() if $(target).hasClass('hide-nav')

	#$('.back-button').show().off("click")
	#$('.back-button').hide() if $(target).hasClass('hide-back')
	$('.back-button').hide().off("click")

	#$('.refresh-button').show().off("click")
	#$('.refresh-button').hide() if $(target).hasClass('hide-refresh')
	$('.refresh-button').hide().off("click")

	window.current_page = page_selector

	#$.timer(-> refresh() if window.current_page != page_selector).once(50)
	$.event.trigger('switchpage')
			

$(document).on 'click', '.bar-tab li.tab-item', ->
	$(@).siblings().removeClass('active')
	$(@).addClass('active')
	

$ ->
	switchPage('.first-content')