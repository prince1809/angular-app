angular.module('admin-users',[
  'services.crud',
  'security.authorization'
])

.config(['crudRouteProvider','securityAuthorizationProvider', function(crudRouteProvider,securityAuthorizationProvider){

crudRouteProvider.routesFor('Users','admin')
  .whenList({
    users: ['Users', function(Users){
      return Users.all();
    }]
    //currentUser: securityAuthorizationProvider.requireAdminUser
  })

  .whenNew({
    user: ['Users', function(Users) {
      return Users();
    }],
    currentUser: securityAuthorizationProvider.requireAdminUser
  })
  .whenEdit({
    user: ['$route', 'Users', function($route, Users){
      return Users.getById($route.current.params.itemId);
    }],
    currentUser: securityAuthorizationProvider.requireAdminUser
  });

}]);
