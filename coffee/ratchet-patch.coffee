
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

	$('.back-button').hide()
	window.current_page = page_selector

	#$.timer(-> refresh() if window.current_page != page_selector).once(50)
	$.event.trigger('switchpage')
			



$(document).on 'touchend', '.bar-tab li.tab-item', ->
	$(@).siblings().removeClass('active')
	$(@).addClass('active')
	m = $(@).find('a').attr('href').match('#.*')
	id = m[0] if m
	switchPage(id)
	
$(document).on 'touchend', 'a', -> 
	if $(@).parents('.bar-tab').size() == 0
		m = $(@).attr('href').match('#(.*)')
		if m? && m.length == 2 && m[1].trim() != ""
			id = m[0] 
			switchPage(id) 
	

$ ->
	switchPage('.first-content')