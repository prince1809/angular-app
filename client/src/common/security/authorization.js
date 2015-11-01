angular.module('security.authorization',['security.service'])

.provider('securityAuthorization',{

  requireAdminUser: ['securityAuthorization', function(securityAuthorization){
    return securityAuthorization.requireAdminUser();
  }]
});
