exports.addRoutes = function(app, config){
  app.all('/*', function(req, res){
    res.sendFile('index.html',{ root: config.server.distFolder });
  });
};
