var express = require('express');
var http = require('http');
var https = require('https');

var app = express();
var server = http.createServer(app);

app.get('/',function(req,res){
  res.send('Hello World');
});

var server = app.listen(3000,function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server Runnning at %s:%s:',host,port);
});
