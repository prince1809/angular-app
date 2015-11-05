var express = require('express');
var passport = require('passport');
var MongoStrategy = require('./mongo-strategy');

var security = {

  initialize: function(url, apiKey, dbName, authCollection){
    passport.use(new MongoStrategy(url,apiKey,dbName,authCollection));
  },
  authenticationRequired: function(req,res,next){
    console.log('authenticationRequired');
  }

};

module.exports = security;
