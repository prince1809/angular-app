angular.module('services.crud',['services.crudRouteProvider']);
angular.module('services.crud').factory('crudEditMethods',function(){

  return function (itemName,item,formName,successcb,errorcb){

    var mixin = {};

    mixin[itemName] = item;

    mixin[itemName+'copy'] = angular.copy(item);

    mixin.save = function(){
      this[itemName].$saveOrUpdate(successcb.successcb,errorcb,errorcb);
    }

  }

});

angular.module('services.crud').factory('crudListMethods',['$location', function($location){

}]);
