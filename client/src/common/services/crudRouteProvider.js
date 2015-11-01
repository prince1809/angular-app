(function(){

  function crudRouteProvider($routeProvider){

    this.$get = angular.noop;

    this.routesFor = function(resourceName, urlPrefix, routePrefix){

      var baseUrl = resourceName.toLowerCase();
      var baseRoute = '/'+resourceName.toLowerCase();
      routePrefix = routePrefix || urlPrefix;

    }
  }

  crudRouteProvider.$inject = ['$routeProvider'];

  angular.module('service.crudRouteProvider',['ngRoute']).provider('crudRoute',crudRouteProvider);

})();
