angular.module('dashboard', ['resources.projects','resources.tasks'])

.config(['$routeProvider', function($routeProvider){

  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.tpl.html',
    controller: 'DashboardCtrl',
    resolve: {
      projects:  function(Project){
        return Project.all();
      },
      tasks: function(Tasks){
        return Tasks.all();
      }
    }
  });
}])

.controller('DashboardCtrl',['$scope','$location','projects','tasks',function($scope,$location,projects,tasks){
  $scope.projects = projects;
  $scope.tasks = tasks;

  $scope.manageBacklog = function(projectId){
    $location.path('/projects/' + projectId + '/productbacklog');
  };

  $scope.manageSprints = function(projectId){
    $location.path('/projects/'+ projectId + '/sprints');
  };
  
}]);
