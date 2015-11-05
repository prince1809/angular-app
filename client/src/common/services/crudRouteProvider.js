(function() {

  function crudRouteProvider($routeProvider) {
    this.$get = angular.noop;


    this.routesFor = function(resourceName, urlPrefix, routePrefix) {
      var baseUrl = resourceName.toLowerCase();
      var baseRoute = '/' + resourceName.toLowerCase();
      routePrefix = routePrefix || urlPrefix;

      // Prepend the urlPrefix if available.
      if ( angular.isString(urlPrefix) && urlPrefix !== '' ) {
        baseUrl = urlPrefix + '/' + baseUrl;
      }

      // Prepend the routePrefix if it was provided;
      if (routePrefix !== null && routePrefix !== undefined && routePrefix !== '') {
        baseRoute = '/' + routePrefix + baseRoute;
      }

      // Create the templateUrl for a route to our resource that does the specified operation.
      var templateUrl = function(operation) {
        return baseUrl + '/' + resourceName.toLowerCase() +'-'+operation.toLowerCase()+'.tpl.html';
      };
      // Create the controller name for a route to our resource that does the specified operation.
      var controllerName = function(operation) {
        console.log(operation);
        return resourceName + operation +'Ctrl';
      };

      var routeBuilder = {
        // Create a route that will handle showing a list of items
        whenList: function(resolveFns) {
          routeBuilder.when(baseRoute, {
            templateUrl: templateUrl('List'),
            controller: controllerName('List'),
            resolve: resolveFns
          });
          return routeBuilder;
        },
        // Create a route that will handle creating a new item
        whenNew: function(resolveFns) {
          routeBuilder.when(baseRoute +'/new', {
            templateUrl: templateUrl('Edit'),
            controller: controllerName('Edit'),
            resolve: resolveFns
          });
          return routeBuilder;
        },
        // Create a route that will handle editing an existing item
        whenEdit: function(resolveFns) {
          routeBuilder.when(baseRoute+'/:itemId', {
            templateUrl: templateUrl('Edit'),
            controller: controllerName('Edit'),
            resolve: resolveFns
          });
          return routeBuilder;
        },

        when: function(path, route) {
          $routeProvider.when(path, route);
          return routeBuilder;
        },

        otherwise: function(params) {
          $routeProvider.otherwise(params);
          return routeBuilder;
        },

        $routeProvider: $routeProvider
      };
      return routeBuilder;
    };
  }

  crudRouteProvider.$inject = ['$routeProvider'];

  angular.module('services.crudRouteProvider', ['ngRoute']).provider('crudRoute', crudRouteProvider);
})();
