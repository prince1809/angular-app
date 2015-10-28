angular.module('projectsinfo',[],['$routeProvider',function($routeProvider){

  $routeProvider.when('/projectsinfo', {
    templateUrl: 'projectsinfo/list.tpl.html',
    controller: 'ProjectsInfoCtrl',
    resolve: {
      projects: ['Projects',function(Projects){
        return Projects;
      }]
    }
  });
}]);

angular.module('projectsinfo').controller('ProjectsInfoCtrl', ['$scope','projects', function($scope,projects){
  $scope.projects = projects;
}]);
