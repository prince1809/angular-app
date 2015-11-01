angular.module('security.retryQueue',[])

.factory('securityRetryQueue',['$q','$log',function($q,$log){

  var retryQueue = [];

  var service = {

    // The security service puts its own handler in here
    onItemAddedCallbacks: [],

    hasMore: function(){
      return retryQueue.length > 0;
    },
    push: function(retryItem){

    },

    pushRetryFn: function(reason, retryFn){
        if(arguments.length == 1){
          retryFn = reason;
          reason = undefined;
        }

        var deferred = $q.defer();
        var retryItem = {
          reason: reason,
          retry: function(){
            $q.when(retryFn()).then(function(value){
              deferred.resolve(value);
            }, function(value){
              deferred.reject(value);
            });
          },
          cancel: function(){
            deferred.reject();
          }
        };
        service.push(retryItem);
        return deferred.promise;
    }

  };

  return service;
}]);
