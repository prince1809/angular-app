angular.module('dashboard', ['mongolabResourceHttp'])

.config(['$routeProvider', function($routeProvider){

  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.tpl.html',
    controller: 'DashboardCtrl',
    resolve: {
      projects:  function(Project){
        return Project.all();
      }
    }
  });
}])


.factory('Project',function($mongolabResourceHttp){
  return $mongolabResourceHttp('projects');
})

.controller('DashboardCtrl',['$scope','$location','projects',function($scope,$location,projects){
  $scope.projects = projects;
}]);
