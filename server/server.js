var fs = require('fs');
var express = require('express');
var http = require('http');
var https = require('https');

var privatekey = fs.readFileSync(__dirname + '/cert/privatekey.pem').toString();
var certificate = fs.readFileSync(__dirname + '/cert/certificate.pem').toString();
var credentials = {key: privatekey, cert: certificate};

var config = require('./config.js');

var app = express();
var server = http.createServer(app);
var sercureServer = https.createServer(credentials,app);

require('./lib/routes/static').addRoutes(app, config);

app.use(function(req,res,next){
  if( req.user ){
    console.log('Current user: ', req.user.firstName, req.user.lastName);
  }else{
    console.log('____________________');
  }
  next();
});
app.all('/',function(req,res, next){
  res.sendFile('index.html', {root: config.server.distFolder});
});

server.listen(config.server.listenPort, '0.0.0.0', 511, function(){
  var open = require('open');
  open('http://localhost:'+ config.server.listenPort+'/');
});

console.log('Angular app server - listening on port: '+ config.server.listenPort);
sercureServer.listen(config.server.securePort);
console.log('Angular App server - listening on secure port: '+ config.server.securePort)
