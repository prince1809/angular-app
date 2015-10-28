angular.module('admin-projects',[

])

.config(['$routeProvider', function($routeProvider){

  $routeProvider.when('/admin/projects', {
    templateUrl: 'admin/projects/projects-list.tpl.html',
    controller: 'ProjectsListCtrl',
    resolve: {
      projects: ['Projects', function(Projects){
        return Projects;
      }]
    }
  });

}])
.controller('ProjectsListCtrl',['$scope',function($scope){


}])
.controller('ProjectsEditCtrl',['$scope',function($scope){

}])
.controller('TeamMembersController',['$scope',function($scope){

}]);
