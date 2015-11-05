var express = require('express');
var favicon = require('serve-favicon');
var compression = require('compression')

exports.addRoutes = function(app, config){
  //serve up the favicon
  //app.use(favicon(config.server.distFolder+'/favicon.icon'));


  app.use(config.server.staticUrl, compression());
  app.use(config.server.staticUrl,express.static(config.server.distFolder));
  app.use(config.server.staticUrl, function(req,res,next){
    res.sendStatus(404);
  });
};
