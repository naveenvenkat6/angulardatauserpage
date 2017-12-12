'use strict';

angular
  .module('app')
  .config(function ($urlRouterProvider, $stateProvider, $locationProvider) {
    $locationProvider.hashPrefix('');

    $stateProvider
      .state('users', {
        url: '/users',
        templateUrl: 'user/user.list.html',
        controller: 'UserCtrl as vm'
      })

      .state('usersEdit', {
        url: '/users/:userId',
        controller: 'UserCtrl as vm',
        templateUrl: 'user/user.html'
      })

    $urlRouterProvider
      .otherwise('/users');

  });
