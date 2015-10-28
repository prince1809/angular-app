angular.module('projects', ['resources.projects'])

.config(['$routeProvider', function($routeProvider){

  $routeProvider.when('/projects', {
    templateUrl: 'projects/projects-list.tpl.html',
    controller: 'ProjectsViewCtrl',
    resolve: {
      projects: ['Projects', function(Projects){
        return Projects;
      }]
    }
  });
}])

.controller('ProjectsViewCtrl',['$scope','$location','projects',function($scope,$location,projects){
  $scope.projects = projects;
}]);
