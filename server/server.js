var fs = require('fs');
var express = require('express');
var http = require('http');
var https = require('https');
require('express-namespace');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var passport = require('passport');

var errorhandler = require('errorhandler');

var privatekey = fs.readFileSync(__dirname + '/cert/privatekey.pem').toString();
var certificate = fs.readFileSync(__dirname + '/cert/certificate.pem').toString();
var credentials = {key: privatekey, cert: certificate};

var config = require('./config.js');
var security = require('./lib/security');
var protectJSON = require('./lib/protectJSON');
var xsrf = require('./lib/xsrf');

var app = express();
var server = http.createServer(app);
var sercureServer = https.createServer(credentials,app);


/** functions **/

require('./lib/routes/static').addRoutes(app, config);

app.use(protectJSON);
app.use(morgan('combined'));
app.use(bodyParser.raw());
app.use(cookieParser(config.server.cookieSecret));
app.use(cookieSession({
  name: config.server.cookieSecret,
  keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(xsrf);



app.use(function(req,res,next){
  if( req.user ){
    console.log('Current user: ', req.user.firstName, req.user.lastName);
  }else{
    console.log('____________________');
  }
  next();
});

app.namespace('/databases/:db/collections/:collection*', function(){

});

require('./lib/routes/appFile').addRoutes(app,config);

app.use(errorhandler({ dumpExceptions: true, showStack: true}));

server.listen(config.server.listenPort, '0.0.0.0', 511, function(){
  var open = require('open');
  open('http://localhost:'+ config.server.listenPort+'/');
});

console.log('Angular app server - listening on port: '+ config.server.listenPort);
sercureServer.listen(config.server.securePort);
console.log('Angular App server - listening on secure port: '+ config.server.securePort)
