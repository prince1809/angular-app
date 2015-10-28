/*! angular-app - v1.0.0 - 2015-10-28
 * http://princekr.com
 * Copyright (c) 2015  Prince;
 * Licensed 
 */
angular.module('app',[
  'ngRoute',
  'projectsinfo',
  'dashboard',
  'projects',
  'templates.app',
  'templates.common']);


angular.module('app').constant('MONGOLAB_CONFIG',{
  baseUrl: '/databases/',
  dbName: 'ascrum'
});

angular.module('app').constant('I18N.MESSAGES', {
  'errors.route.changeError': 'Route change error'
});

angular.module('app').config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider){
  $locationProvider.html5Mode(true);
  $routeProvider.otherwise({ redirectTo: '/projectsinfo'});
}]);

angular.module('app').controller('AppCtrl', ['$scope',function($scope){

  $scope.notifications = "i18nNotifications";

  $scope.removeNotification = function(notification){
    i18nNotifications.remove(notification);
  };

  $scope.$on('$routChangeError', function(event, current, previous, rejection){
    i18nNotifications.pushForCurrentRoute('errors.route.changeError','Error',{},{rejection: rejection});
  });
}]);

angular.module('app').controller('HeaderCtrl',['$scope', '$location',
  function($scope,$location){

  $scope.location = $location;
  $scope.breadcrumbs = 'breadcrumbs';

  $scope.isAuthenticated = 'no';

  $scope.isAdmin = 'Yes';

  $scope.home = function(){
    $location.path('/projectsinfo');
  };

  $scope.isNavbarActive = function(navBarPath){
    return navBarPath === 'something';
  };

  $scope.hasPendingRequests = function(){
    return false;
  };

}]);

angular.module('dashboard',[]);

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

angular.module('resources.projects', ['mongolabResource']);
angular.module('resources.projects').factory('Projects',['mongolabResource',function($mongolabResource){

  var Projects = $mongolabResource['projects'];

  return Projects;

}]);

angular.module('services.i18nNotifications',['services.notifications']);


angular.module('services.i18nNotifications').factory('i18nNotifications',[function(){

  return 'something';
}]);

angular.module('templates.app', ['dashboard/dashboard.tpl.html', 'header.tpl.html', 'notifications.tpl.html', 'projects/projects-list.tpl.html', 'projectsinfo/list.tpl.html']);

angular.module("dashboard/dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("dashboard/dashboard.tpl.html",
    "<h4>My Projects</h4>\n" +
    "<div ng-include=\"'projects/projects-list.tpl.html'\">\n" +
    "\n" +
    "</div>\n" +
    "<h4>My Tasks</h4>\n" +
    "<table class=\"table table-bordered table-condensed table-striped table-hover\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th class=\"span8\">Name</th>\n" +
    "      <th class=\"span1\">Estimation</th>\n" +
    "      <th class=\"span1\">Remaining</th>\n" +
    "      <th class=\"span2\">Tools</th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"task in tasks\">\n" +
    "      <td>{{task.name}}</td>\n" +
    "      <td>{{task.estimation}}</td>\n" +
    "      <td>{{task.remaining}}</td>\n" +
    "      <td></td>\n" +
    "    </tr>\n" +
    "    <tr ng-show=\"!tasks.length\">\n" +
    "      <td colspan=\"4\"> No Tasks for You!</td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("header.tpl.html",
    "<div class=\"navbar\" ng-controller=\"HeaderCtrl\">\n" +
    "  This is header area {{ breadcrumbs }}\n" +
    "</div>\n" +
    "");
}]);

angular.module("notifications.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("notifications.tpl.html",
    "<div>\n" +
    "  This is notification bar\n" +
    "</div>\n" +
    "");
}]);

angular.module("projects/projects-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("projects/projects-list.tpl.html",
    "<table class=\"table table-bordered table-condensed table-striped table-hover\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th class=\"span3\">Name</th>\n" +
    "      <th class=\"span5\">Description</th>\n" +
    "      <th class=\"span2\">My Role</th>\n" +
    "      <th class=\"span2\">Tools</th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"project in projects\">\n" +
    "      <td>{{project.name}}</td>\n" +
    "      <td>{{project.name}}</td>\n" +
    "      <td>{{project.name}}</td>\n" +
    "      <td>{{project.name}}</td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("projectsinfo/list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("projectsinfo/list.tpl.html",
    "<h3>Projects Info</h3>\n" +
    "");
}]);

angular.module('templates.common', []);

