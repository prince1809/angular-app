angular.module('resources.projects', ['mongolabResource']);
angular.module('resources.projects').factory('Projects',['mongolabResource',function($mongolabResource){

  var Projects = $mongolabResource['projects'];

  return Projects;

}]);
