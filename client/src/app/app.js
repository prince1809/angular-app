var app = angular.module('app',[]);

app.controller('AppCtrl', function($scope){

  $scope.name = {
    firstName: "Prince",
    lastName: "Kumar",

  fullName: function(){
    var nameObject;
    nameObject = $scope.name;
    return nameObject.firstName + " " + nameObject.lastName;
  }
};
});
