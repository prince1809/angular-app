angular.module('projects', ['resources.projects'])

.config(['$routeProvider', function($routeProvider){

  $routeProvider.when('/projects', {
    templateUrl: 'projects/projects-list.tpl.html',
    controller: 'ProjectsViewCtrl',
    resolve: {
      projects: ['Projects', function(){
        return "Some Projects";
      }]
    }
  });
}]);
