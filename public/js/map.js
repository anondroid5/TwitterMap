$(function() {
  var latlng = new google.maps.LatLng(39, 138);
  var options = {
    zoom : 5,//5
    center : latlng,
    mapTypeId : google.maps.MapTypeId.ROADMAP,
    mapTypeControl: true,
    panControl: true,
    streetViewControl: true,
    zoomControl: true
  }
  var map = new google.maps.Map(document.getElementById('map'), options);
  
  var tweets = $("#tweet");
  var img;
  var tweet;
  var socket = io.connect();
  socket.on('message', function(data) {
   tweet = $("<div>").attr("id",data.id)
		.append($("<img>").attr("src",data.img))
		.append($("<p></p>").html("<strong>UserID:</strong>"+data.id))
		.append($("<p></p>").html("<strong>UserName:</strong>"+data.sname))
		.append($("<p></p>").html("<strong>Tweet:</strong>"+data.text));
   tweets.prepend(tweet);
    var lng = data.lnglat[0];
    var lat = data.lnglat[1];
    var marker = new google.maps.Marker({
      map: map,
      draggable: false,
      animation: google.maps.Animation.DROP,
	//icon:'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=T|00ccff|000000',
      //icon: data.img,
      icon:'../img/twitter.png',
      position: new google.maps.LatLng(lat, lng)
    }); 
   //infowindowに表示する内容を指定する
   var infoWin = new google.maps.InfoWindow({content:'<img src='+ data.img +'><br/>'+'<strong>UserID:</strong>'+data.id+'<br/>'+'<strong>ScreenName:</strong>'+data.sname+'<br/>'+'<strong>Tweet:</strong>'+data.text});
   
   //clickイベントを取得するとListerを追加
   google.maps.event.addListener(marker, 'click',function(){
      infoWin.open(map, marker);
   });
  });

});