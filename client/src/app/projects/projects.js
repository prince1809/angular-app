angular.module('projects', [])

.config(['$routeProvider', function($routeProvider){

  $routeProvider.when('/projects', {
    templateUrl: 'projects/projects-list.tpl.html',
    controller: 'ProjectsViewCtrl',
    resolve: {
      projects:  function(){
        return "";
      }
    }
  });
}])

.controller('ProjectsViewCtrl',['$scope','$location',function($scope,$location,projects){
  $scope.projects = projects;
}]);
