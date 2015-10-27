angular.module('app',['ngRoute','templates.app','templates.common']);

angular.module('app').constant('I18N.MESSAGES', {
  'errors.route.changeError': 'Route change error'
});

//angular.module('app').config(['$routeProvider', function($routeProvider){
  //$routeProvider.otherwise({ redirectTo: '/projectsinfo'});
//}]);

angular.module('app').controller('AppCtrl', ['$scope',function($scope){

  $scope.notifications = "i18nNotifications";

  $scope.removeNotification = function(notification){
    i18nNotifications.remove(notification);
  };

  $scope.$on('$routChangeError', function(event, current, previous, rejection){
    i18nNotifications.pushForCurrentRoute('errors.route.changeError','Error',{},{rejection: rejection});
  });
}]);

angular.module('app').controller('HeaderCtrl',['$scope', '$location',
  function($scope,$location){

  $scope.location = $location;

}]);
