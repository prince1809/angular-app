/*! angular-app - v1.0.0 - 2015-10-28
 * http://princekr.com
 * Copyright (c) 2015  Prince;
 * Licensed 
 */
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

angular.module('services.i18nNotifications',['services.notifications']);


angular.module('services.i18nNotifications').factory('i18nNotifications',[function(){

  return 'something';
}]);

angular.module('templates.app', ['header.tpl.html', 'notifications.tpl.html']);

angular.module("header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.tpl.html",
    "<div class=\"navbar\" ng-controller=\"HeaderCtrl\">\n" +
    "  This is header area\n" +
    "</div>\n" +
    "");
}]);

angular.module("notifications.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("notifications.tpl.html",
    "<div>\n" +
    "  This is notification bar\n" +
    "</div>\n" +
    "");
}]);

angular.module('templates.common', []);

