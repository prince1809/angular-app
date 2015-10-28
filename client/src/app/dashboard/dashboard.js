angular.module('dashboard', ['resources.projects'])

.config(['$routeProvider', function($routeProvider){

  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.tpl.html',
    controller: 'DashboardCtrl',
    resolve: {
      projects: ['Projects', function(Projects){
        return Projects;
      }]
    }
  });
}])

.controller('DashboardCtrl',['$scope','$location','projects',function($scope,$location,projects){
  $scope.projects = projects;
}]);
