window.isMobile = {
    Android: ->
        navigator.userAgent.match(/Android/i);
    BlackBerry: ->
        navigator.userAgent.match(/BlackBerry/i);
    iOS: ->
        navigator.userAgent.match(/iPhone|iPad|iPod/i);
    Opera: ->
        navigator.userAgent.match(/Opera Mini/i);
    Windows: ->
        navigator.userAgent.match(/IEMobile/i);
    any: ->
        (@.Android() || @.BlackBerry() || @.iOS() || @.Opera() || @.Windows());
};



window.api = 
  ajax: (url) ->
    $.ajax(
      url: url
      type: "GET"
      dataType: "jsonp"
      jsonp: "jsonp"
    )

  getHeathFeed: ->
    feed_url = "http://news.baidu.com/n?cmd=4&class=meishijk&tn=rss"
    url = 'http://ajax.googleapis.com/ajax/services/feed/load?v=2.0&num=10&callback=?&q='+encodeURIComponent(feed_url)
    console.log url
    @ajax(url)


window.tools = 
  updateIdeal: ->
    ideal = @calcIdealHealth($.jStorage.get("sex"), $.jStorage.get("weight"),$.jStorage.get("height") )
    
    map = 
      head: "臉部"
      chest: "胸圍"
      belly: "腰圍"
      hand: "手臂圍"
      leg: "大腿圍"
    li = ""
    for part in [ "chest", "belly", "hand", "leg"]
      li += "<li>你的最佳#{map[part]}是 <span class=\"green\">#{Number(ideal[part]).toFixed(2)} cm</span></li>"
    $('#idealList').empty().append(li)

  updateNutrition: ->
    ideal = @calcIdealHealth($.jStorage.get("sex"), $.jStorage.get("weight"),$.jStorage.get("height") )
    
    map = 
      head: "臉部"
      chest: "胸圍"
      belly: "腰圍"
      hand: "手臂圍"
      leg: "大腿圍"
    li = ""
    for part in ["chest", "belly", "hand", "leg"] #"head", 
      if ideal.test part, $.jStorage.get(part) 
        color = "-positive"
        text = "通過"
        detail = ""
      else
        color = "-negative"
        text = "不通過"
        detail = "建議多吃：" + _.keys(window.food_map[part].lose)
      li += "<li><h2>你的「#{map[part]}」評估</h2><div>#{$.jStorage.get(part)} -> #{ideal[part].toFixed(2)}</div><div>#{detail}</div><span class=\"count#{color}\">#{text}</span></li>"
    $('#nutritionList').empty().append(li)

  updateReciple: ->
    ideal = @calcIdealHealth($.jStorage.get("sex"), $.jStorage.get("weight"),$.jStorage.get("height") )
    
    $(".#{id}").empty().off('click') for id in ["touch-area-head", "touch-area-belly", "touch-area-chest", "touch-area-hand-left", "touch-area-hand-right", "touch-area-leg-left", "touch-area-leg-right"]
    
    self = this
    # 都當作要瘦臉
    $('.touch-area-head').createVegetable(@randomLoseVeg('head'), 100).click ->
        $('.touch-area-head').empty().createVegetable(self.randomLoseVeg('head'))
    if not ideal.test "chest", $.jStorage.get("chest")
      $('.touch-area-chest').createVegetable(@randomLoseVeg('chest')).click ->
        $('.touch-area-chest').empty().createVegetable(self.randomLoseVeg('chest'))
    if not ideal.test "belly", $.jStorage.get("belly")
      $('.touch-area-belly').createVegetable(@randomLoseVeg('belly')).click ->
        $('.touch-area-belly').empty().createVegetable(self.randomLoseVeg('belly'))

    if not ideal.test "hand", $.jStorage.get("hand")
      $('.touch-area-hand-left, .touch-area-hand-right').createVegetable(@randomLoseVeg('hand')).click ->
        $('.touch-area-hand-left, .touch-area-hand-right').empty().createVegetable(self.randomLoseVeg('hand'))
    if not ideal.test "leg", $.jStorage.get("leg")
      $('.touch-area-leg-left, .touch-area-leg-right').createVegetable(@randomLoseVeg('leg')).click ->
        $('.touch-area-leg-left, .touch-area-leg-right').empty().createVegetable(self.randomLoseVeg('leg'))

  updateNews: ->
    @showLoading()
    window.api.getHeathFeed().done( (data) =>
      li = ""
      for enti in data.responseData.feed.entries
        li += "<li><a href=\"#{enti.link}\"><h2>#{enti.title}</h2><div>#{enti.contentSnippet}</div><span class=\"chevron\"></span></a></li>"

      $('#newsList').empty().append(li);
      @hideLoading()
    )

  randomLoseVeg: (part) ->
    @randomSelect(_.values(window.food_map[part].lose))

  randomSelect: (arr) ->
    arr[Math.floor(Math.random() * arr.length)]

  showLoading:  ->
    @hideLoading()
    $.blockUI({message: "<img src='/images/ajax-loader.gif' />", css: {backgroundColor:'transparent', border: '0px'}});

  hideLoading: ->
    $.unblockUI()

  clickRefresh: (callback) ->
    $('.refresh-button').show().off("click").on("click", (e) ->
      callback(e)
    )

  clickBack: (callback) ->
    $('.back-button').show().off("click").on("click", (e) ->
      callback(e)
    )

  calcBMI: (w, h) ->
    w / Math.pow(h/100, 2)

  calcIdealHealth: (sex, w, h) ->
    obj = 
      if sex.toString().toUpperCase() == "M"
        weight: (h - 100) * 0.9
        chest: h * 0.618
        waist: h * 0.4388
        buttock: h * 0.55
        hand: h * 0.2101
        leg: h * 0.3399
        bmi: @calcBMI(w, h)
      else
        weight: (h - 100) * 0.81
        chest: h * 0.52
        waist: h * 0.37
        buttock: h * 0.54
        hand: h * 0.15
        leg: h * 0.31
        bmi: @calcBMI(w, h)
    obj.belly = obj.waist
    obj.test = (key, val, range = 0.05) ->
      if key.toString().toUpperCase() == "BMI"
        18.5 <= val and val <= 24
      else
        @[key] * (1-range) <= val and val <= @[key] * (1+range)
    obj


window.map = 
  init: (@container) ->
    m = new BMap.Map(@container) 
    @container = "#"+@container                  
    m.centerAndZoom(new BMap.Point(116.404, 39.915), 15);    
    #m.addControl(new BMap.NavigationControl());               
    m.addControl(new BMap.ScaleControl());                
    m.addControl(new BMap.OverviewMapControl());            
    m.addControl(new BMap.MapTypeControl());             
    m.enableScrollWheelZoom();                       
    #m.setCurrentCity("北京"); 
    @map = m
    @mgr = new BMapLib.MarkerManager(m,
        maxZoom: 18
        trackMarkers: true
    )

  
  addRandomMarker: (num = 1) ->
    width = $(@container).width()
    height = $(@container).height()
    realBounds = @mgr._getRealBounds();

    center = @map.getCenter();
    pixel = @map.pointToPixel(center);
    markers = []
    console.log @container, width, height
    while num > 0
      w = width * Math.random()
      h = height * Math.random()

      newPixel = 
        x : pixel.x + (if Math.random() > 0.5 then w else -w)
        y : pixel.y + (if Math.random() > 0.5 then h else -h)
      newPoint = @map.pixelToPoint(newPixel)
      marker = new BMap.Marker(newPoint)
      if realBounds.containsPoint(newPoint)
        markers.push(marker)
        num--

    @mgr.addMarkers(markers)
    @mgr.showMarkers()

  

  