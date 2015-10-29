angular.module('projectsinfo',['resources.projects'])

.config(['$routeProvider', function($routeProvider){
  $routeProvider.when('/projectsinfo', {
    templateUrl: 'projectsinfo/list.tpl.html',
    controller: 'ProjectsInfoListCtrl',
    resolve: {
      projects: function(Project){
        return Project.all();
      }
    }
  });
}])

.controller('ProjectsInfoListCtrl', ['$scope','$location','projects', function($scope,$location,projects){
  $scope.projects = projects;
}]);
