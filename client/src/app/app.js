angular.module('app',[
  'ngRoute',
  'projectsinfo',
  'dashboard',
  'projects',
  'admin',
  'services.httpRequestTracker',
  'security',
  'templates.app',
  'templates.common']);


angular.module('app').constant('MONGOLAB_CONFIG',{API_KEY:'4fb51e55e4b02e56a67b0b66', DB_NAME:'ascrum'});

angular.module('app').constant('I18N.MESSAGES', {
  'errors.route.changeError': 'Route change error'
});

angular.module('app').config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
  $locationProvider.html5Mode(true);
  $routeProvider.otherwise({ redirectTo: '/projectsinfo'});
}]);

angular.module('app').run(['security',function(security){
  security.requestCurrentUser();
}]);

angular.module('app').controller('AppCtrl', ['$scope',function($scope){

  $scope.notifications = "i18nNotifications";

  $scope.removeNotification = function(notification){
    i18nNotifications.remove(notification);
  };

  $scope.$on('$routChangeError', function(event, current, previous, rejection){
    i18nNotifications.pushForCurrentRoute('errors.route.changeError','Error',{},{rejection: rejection});
  });
}]);

angular.module('app').controller('HeaderCtrl',['$scope', '$location','$route','security','httpRequestTracker',
  function($scope,$location,$route,security,httpRequestTracker){

  $scope.location = $location;
  $scope.breadcrumbs = 'breadcrumbs';

  $scope.isAuthenticated = security.isAuthenticated;
  $scope.isAdmin = security.isAdmin;

  $scope.home = function(){
    if(security.isAuthenticated()){
      $location.path('/dashboard');
    }else{
      $location.path('/projectsinfo');
    }
  };

  $scope.isNavbarActive = function(navBarPath){
    return navBarPath === 'something';
  };

  $scope.hasPendingRequests = function(){
    return httpRequestTracker.hasPendingRequests();
  };

}]);
