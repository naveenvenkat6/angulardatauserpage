(function() {
  'use strict';

  angular
    .module('app.common',
      [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'app.constants',
        'ui.router',
        'ui.bootstrap',
        'ngMessages',
        'bw.paging',
        'ngCsv'
      ]);
})();
