angular.module('resources.tasks',['mongolabResourceHttp']);

angular.module('resources.tasks').factory('Tasks',function($mongolabResourceHttp){

  var Tasks = $mongolabResourceHttp('tasks');

  Tasks.forProductBacklogItem = function(productbacklogItem){
    return Tasks.query({productbacklogItem:productbacklogItem});
  }

  return Tasks;
});
