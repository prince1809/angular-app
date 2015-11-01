angular.module('security.service',[])

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
    }
  };

  return service;
}]);
