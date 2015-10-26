angular.module('app',[]);

angular.module('app').controller('AppCtrl', ['$scope',function($scope){

  $scope.notifications = "Some notifications";

  $scope.removeNotification = function(notification){
    i18nNotifications.remove(notification);
  };

  
}]);

angular.module('app').controller('HeaderCtrl',['$scope', function($scope){

  $scope.title = "Header";

}]);
