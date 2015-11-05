var util = require('util');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var rest = require('request');


function MongoDBStrategy(dbUrl, apiKey, dbName, collection){

  this.dbUrl = dbUrl;
  this.apiKey = apiKey;
  this.dbName = dbName;
  this.collection = collection;
  this.baseUrl = this.dbUrl+'/databases/'+this.dbName+'/collections/'+this.collection+'/';

  LocalStrategy.call(this,{ usernameField: 'email'}, this.verifyUser.bind(this));

  //serialize the user into a toString for storing in the session

passport.serializeUser(function(user, done){
  done(null, user._id.$oid);
});

passport.desrializeUser(this.get.bind(this));
this.name = MongoDBStrategy.name;

}

//MongoDBStrategy inherit from LocalStrategy
util.inherits(MongoDBStrategy, LocalStrategy);

MongoDBStrategy.name = "mongo";

MongoDBStrategy.prototype.get = function(id, done){
  var query = { apiKey: this.apiKey };
  var request = rest.get(this.baseUrl + id, {qs: query, json: {}}, function(err, response, body){
    done(err,body);
  });
}

module.exports = MongoDBStrategy;
