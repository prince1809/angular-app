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
