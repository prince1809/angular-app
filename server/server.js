var express = require('express');
var http = require('http');
var https = require('https');

var config = require('./config.js');

var app = express();
var server = http.createServer(app);


app.use(function(req,res,next){
  if( req.user ){
    console.log('Current user: ', req.user.firstName, req.user.lastName);
  }else{
    console.log('Unauthenticated');
  }
  next();
});
app.all('/*',function(req,res){
  res.sendFile('index.html', {root: config.server.distFolder});
});

server.listen(config.server.listenPort, '0.0.0.0', 511, function(){
  var open = require('open');
  open('http://localhost:'+ config.server.listenPort+'/');
})
