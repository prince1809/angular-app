angular.module('projects', ['resources.projects'])

.config(['$routeProvider', function($routeProvider){

  $routeProvider.when('/projects', {
    templateUrl: 'projects/projects-list.tpl.html',
    controller: 'ProjectViewCtrl',
    resolve: {
      projects:  function(Project){
        return Project.all();
      }
    }
  });
}])

.controller('ProjectViewCtrl',['$scope','$location','projects',function($scope,$location,projects){
  $scope.projects = projects;

  $scope.viewProject = function(project){
    $location.path('/projects/'+project.$id());
  };

  $scope.manageBacklog = function(project){
    $location.path('/projets/'+project.$id()+'/productbacklog');
  }

  $scope.manageSprints = function(project){
    $location.path('/projets/'+project.$id()+'/sprints');
  }

  $scope.getMyRoles = function(project){
    return 'PO';
  };

}]);
