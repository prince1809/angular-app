angular.module('projectsinfo',[],['$routeProvider',function($routeProvider){

  $routeProvider.when('/projectsinfo', {
    templateUrl: 'projectsinfo/list.tpl.html',
    controller: 'ProjectsInfoCtrl',
    resolve: {
    //  projects: ['Projects',function(Projects){
      //  return Projects.all();
    //  }]
    }
  });
}]);

angular.module('projectsinfo').controller('ProjectsInfoCtrl', ['$scope', function($scope){
//  $scope.projects = projects;
}]);
