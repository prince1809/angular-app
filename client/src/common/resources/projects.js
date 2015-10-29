angular.module('resources.projects', ['mongolabResourceHttp']);
angular.module('resources.projects').factory('Project',function($mongolabResourceHttp){

  var Projects = $mongolabResourceHttp('projects');

  Projects.forUser = function(userId, successcb, errorcb){
    return Projects.query({},errorcb);
  };

  Projects.prototype.isProductOwner = function(userId){
    return this.productOwner === userId;
  };

  Projects.prototype.canActAsProductOwner = function(userId){
    return !this.isScrumMaster(userId) && !this.isDevTeamMember(userId);
  };

  Projects.prototype.isScrumMaster = function(userId){
    return this.scrumMaster === userId;
  };

  Projects.prototype.canActAsScrumMaster = function(userId){
    return !this.isProductOwner(userId);
  };

  Projects.prototype.canActAsDevTeamMember = function(userId){
    return !this.isProductOwner(userId);
  };

  Projects.prototype.getRoles = function(userId){
    var roles = [];

    if(this.isProductOwner(userId)){
      roles.push('PO');
    }else {
      if(this.isScrumMaster(userId)){
        roles.push('SM');
      }
      if(this.isDevTeamMember(userId)){
        roles.push('DEV');
      }
    }
    return roles;
  };



  return Projects;
});
