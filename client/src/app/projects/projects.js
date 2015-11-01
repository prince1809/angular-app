angular.module('projects', ['resources.projects','security.authorization'])

.config(['$routeProvider','securityAuthorizationProvider', function($routeProvider,securityAuthorizationProvider){

  $routeProvider.when('/projects', {
    templateUrl: 'projects/projects-list.tpl.html',
    controller: 'ProjectViewCtrl',
    resolve: {
      projects:  function(Project){
        return Project.all();
      },
      authenticatedUser: securityAuthorizationProvider.requireAuthenticatedUser
    }
  });
}])

.controller('ProjectViewCtrl',['$scope','$location','projects','security',function($scope,$location,projects,security){
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
    if(security.currentUser){
      return project.getRoles(security.currentUser.id);
    }
  };

}]);
