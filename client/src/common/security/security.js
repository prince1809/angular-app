angular.module('security.service',[
  'security.retryQueue'
])

.factory('security',['$http','$q','$location', function($http,$q,$location){

  // Redirect to the given url

  function redirect(url){
    url = url || '/';

    $location.path(url);
  }

  // Login from dialog stuff
  var loginDialog = null;
  function openLoginDialog(){
    if(loginDialog){
      throw new Error(' Trying to open a dialog that is already open');
    }
    loginDialog = $dialog.dialog();
    loginDialog.open('security/login/form.tpl.html', 'LoginFormController').then(openLoginDialogClose);
  }

  function closeLoginDialog(success){
    if(loginDialog){
      loginDialog.close(success)
    }
  }

  function openLoginDialogClose(success){
    loginDialog = null;

    if(success){
      queue.retryAll();
    }else {
      queue.cancelAll();
      redirect();
    }
  }

  var service = {
    getLoginReason: function(){
      return queue.retryReason();
    },

    requestCurrentUser: function(){
      if( service.isAuthenticated()){
        return $q.when(service.currentUser);
      }else{
        return $http.get('/current-user').then(function(response){
          service.currentUser = response.data.user;
          return service.currentUser;
        });
      }
    },
    currentUser: null,

    // Is the current user authenticated
    isAuthenticated: function(){
      return !!service.currentUser;
    },

    // Is the current user an administrator
    isAdmin: function(){
      return !!(service.currentUser && service.currentUser.admin);
    }

  };

  return service;
}]);
