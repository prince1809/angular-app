/*! angular-app - v1.0.0 - 2015-10-29
 * http://princekr.com
 * Copyright (c) 2015  Prince;
 * Licensed 
 */
angular.module('admin',['admin-projects']);

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

angular.module('app',[
  'ngRoute',
  'projectsinfo',
  'dashboard',
  'projects',
  'admin',
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
  //$routeProvider.otherwise({ redirectTo: '/projectsinfo'});
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

angular.module('app').controller('HeaderCtrl',['$scope', '$location','$route',
  function($scope,$location,$route){

  $scope.location = $location;
  $scope.breadcrumbs = 'breadcrumbs';

  $scope.isAuthenticated = 'no';

  $scope.isAdmin = 'Yes';

  $scope.home = function(){
    $location.path('/dashboard');
  };

  $scope.isNavbarActive = function(navBarPath){
    return navBarPath === 'something';
  };

  $scope.hasPendingRequests = function(){
    return false;
  };

}]);

angular.module('dashboard', ['resources.projects'])

.config(['$routeProvider', function($routeProvider){

  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.tpl.html',
    controller: 'DashboardCtrl',
    resolve: {
      projects: ['Projects', function(Projects){
        return Projects;
      }]
    }
  });
}])

.controller('DashboardCtrl',['$scope','$location','projects',function($scope,$location,projects){
  $scope.projects = projects;
}]);

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
   Projects.forUser = function(userId,successcb,errorcb){
    return Projects.query({},successcb,errorcb);
  }

  Projects.prototype.isProductOwner = function(userId){
    return this.productOwner === userId;
  }

  return Projects;

}]);

angular.module('services.i18nNotifications',['services.notifications']);


angular.module('services.i18nNotifications').factory('i18nNotifications',[function(){

  return 'something';
}]);

angular.module('templates.app', ['admin/projects/projects-edit.tpl.html', 'admin/projects/projects-list.tpl.html', 'dashboard/dashboard.tpl.html', 'header.tpl.html', 'notifications.tpl.html', 'projects/projects-list.tpl.html', 'projectsinfo/list.tpl.html']);

angular.module("admin/projects/projects-edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("admin/projects/projects-edit.tpl.html",
    "<div class=\"well\">\n" +
    "  \n" +
    "</div>\n" +
    "");
}]);

angular.module("admin/projects/projects-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("admin/projects/projects-list.tpl.html",
    "<table class=\"table table-bordered table-condensed table-striped table-hover\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th>Name </th>\n" +
    "      <th>Description </th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"project in projects\" ng-click=\"edit(project.$id())\">\n" +
    "      <td>{{project.name}}</td>\n" +
    "      <td>{{project.desc}}</td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "<div class=\"well\">\n" +
    "  <button class=\"btn\" ng-click=\"new()\">New Project</button>\n" +
    "</div>\n" +
    "");
}]);

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
    "  <div class=\"navbar-inner\">\n" +
    "    <a class=\"brand\" ng-click=\"home()\">Prince</a>\n" +
    "    <ul class=\"nav\">\n" +
    "      <li ng-class=\"{active:isNavbarActive('projectsinfo')}\">\n" +
    "        <a href=\"/projectsinfo\">Current Projects</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <ul class=\"nav\">\n" +
    "      <li ng-class=\"{active:isNavbarActive('projects')}\">\n" +
    "        <a href=\"/projects\">My Projects</a>\n" +
    "      </li>\n" +
    "      <li class=\"dropdown\" ng-class=\"{active:isNavbarActive('admin'), open:isAdminOpen}\">\n" +
    "        <a id=\"adminmenu\" role=\"button\" class=\"dropdown-toggle\" ng-click=\"isAdminOpen=!isAdminOpen\">Admin<b class=\"caret\"></b></a>\n" +
    "        <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"adminmenu\">\n" +
    "          <li><a tabindex=\"-1\" href=\"/admin/projects\" ng-click=\"isAdminOpen=false\">Manage Projects</a></li>\n" +
    "          <li><a tabindex=\"-1\" href=\"/admin/users\" ng-click=\"isAdminOpen=false\">Manage Users</a></li>\n" +
    "        </ul>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "    <ul class=\"nav pull-right\" ng-show=\"hasPendingRequests()\">\n" +
    "      <li class=\"divider-vertical\"></li>\n" +
    "      <li><a href=\"#\"><img src=\"/static/img/spinner.gif\"></a></li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <div class=\"breadcrumbs\">\n" +
    "    <li ng-repeat=\"breadcrumb in breadcrumbs.getAll()\">\n" +
    "      <span class=\"divider\">/</span>\n" +
    "      <ng-switch on=\"$last\">\n" +
    "        <span ng-switch-when=\"true\">{{breadcrumb.name}}</span>\n" +
    "        <span ng-switch-default><a href=\"{{breadcrumb.path}}\">{{breadcrumb.name}}</a></span>\n" +
    "      </ng-switch>\n" +
    "    </li>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("notifications.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("notifications.tpl.html",
    "<div ng-class=\"['alert','alert-'+notification.type]\" ng-repeat=\"notification in notifications.getCurrent()\">\n" +
    "  <button class=\"close\" ng-click=\"removeNotification(notification)\">x</button>\n" +
    "  {{notification.message}}\n" +
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

