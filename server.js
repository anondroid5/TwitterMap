var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);
 
//port:5000

var port = process.env.PORT || process.env.VMC_APP_PORT || 5000;
server.listen(port);
console.log('127.0.0.1:' + port);

app.use(express.static(__dirname + '/public'));

var twitter = require('ntwitter');
var t = new twitter(require('./config').getKeys());
//var keywords = [/*'anonymous',*/'android'];

//t.stream('statuses/filter',  {'track':'pokemon'}, function(stream) {

t.stream('statuses/filter', {'locations': '130.6494140625,31.42866311735861,145.0634765625,43.61221676817573'}, function(stream) {
//t.stream('statuses/filter', {'locations': '-180,-90,180,90'}, function(stream){
  stream.on('data', function (data) {
    if (data.coordinates) {
      //console.log(data);
      io.sockets.emit('message', {
        'id': data.id_str,
        'text': data.text,
        'lnglat': data.coordinates.coordinates,
        'sname': data.user.screen_name,
        'img': data.user.profile_image_url
      });
    }
  });
  stream.on('error', function (response) {
    console.log('error');
    console.log(response);
    process.exit();
  });
  stream.on('end', function (response) {
    console.log('end');
    console.log(response);
    process.exit();
  });
  stream.on('destroy', function (response) {
    console.log('destroy');
    console.log(response);
    process.exit();
  });
});