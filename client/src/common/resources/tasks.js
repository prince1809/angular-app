angular.module('resources.tasks',['mongolabResourceHttp']);

angular.module('resources.tasks').factory('Tasks',function($mongolabResourceHttp){

  var Tasks = $mongolabResourceHttp('tasks');

  return Tasks;
});
