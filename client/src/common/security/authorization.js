angular.module('security.authorization',['security.service'])

.provider('securityAuthorization',{

  requireAdminUser: ['securityAuthorization', function(securityAuthorization){
    return securityAuthorization.requireAdminUser();
  }],

  requireAuthenticatedUser: ['securityAuthorization', function(securityAuthorization){
    return securityAuthorization.requireAuthenticatedUser();
  }],

  $get: ['security', function(security){

    var service = {

      requireAuthenticatedUser: function(){
        var promise = security.requestCurrentUser().then(function(userInfo){
          if(!security.isAuthenticated()){
            return 'Some user info';
          }
        });
        return promise;
      },

      requireAdminUser: function(){
        var promise = security.requestCurrentUser().then(function(userInfo){
          if(!security.isAdmin()){
            return 'Not Admin';
          }
        });
        return promise;
      }

    };
    return service;
  }]
});
