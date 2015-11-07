var express = require('express');
var passport = require('passport');
var MongoStrategy = require('./mongo-strategy');

var security = {

  initialize: function(url, apiKey, dbName, authCollection){
    passport.use(new MongoStrategy(url,apiKey,dbName,authCollection));
  },

  authenticationRequired: function(req,res,next){
    console.log('authenticationRequired');
  },

  adminRequired: function(req,res,next){

  },

  sendCurrentUser: function(req, res, next){

  },

  login: function(req,res,next){
    function authenticationFailed(err,user,info){
      if(err){
        return next(err);
      }
      if(!user){
        return res.json(filterUser(user));
      }
      req.logIn(user, function(err){
        if(err){ return next(err); }
        return res.json(filterUser(user));
      });
    }
    return passport.authenticate(MongoStrategy.name, authenticationFailed)(req, res, next);

  },

  logout: function(req, res, next){
    req.logout();
    res.send(204);
  }

};

module.exports = security;
