(function() {
  'use strict';

  angular
    .module('app',
      [
		'app.common',
		'app.user'
      ])
    .run(function($window, userDataService) {
      //On app startup, load the users into the local storage
      userDataService.initializeAllUserDataOnAppStart();
    });


})();
