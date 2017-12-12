(function () {
  'use strict';

  angular
    .module('app.user')
    .factory('userService', UserService);

  UserService.$inject = ['$http', 'API_URL', 'userDataService'];

  function UserService($http, API_URL, userDataService) {

    return {
      update,
      list,
      get,
      getUsersByIds,
      deleteUser,
      deleteUsers
    };

    ////////////

    /*Example call to hit remote service*/
    /*
    function create(user) {
      return $http.post(`${API_URL}/users/`, user).then(response => response.data)
    }*/

    function update(user) {
      return updateUserInMemory(user);
    }

    function deleteUser(userId) {
        return deleteUserFromMemory(userId);
    }

    function deleteUsers(userIds) {
        return deleteUsersFromMemory(userIds);
    }

    function list() {
      return getUsersFromMemory();
    }

    function get(userId) {
      return getUserFromMemory(userId);
    }

    function getUsersByIds(userIds) {
      return getUsersByIdsFromMemory(userIds);
    }

    function getUserFromMemory(userId) {
        return userDataService.getUser(userId);
    }

    function getUsersFromMemory() {
       return userDataService.getUsers();
    }

    function getUsersByIdsFromMemory(userIds) {
        return userDataService.getUsersByIds(userIds);
    }

    function deleteUserFromMemory(userId) {
       return userDataService.deleteUser(userId);
    }

    function deleteUsersFromMemory(userIds) {
       return userDataService.deleteUsers(userIds);
    }

    function updateUserInMemory(user) {
        return userDataService.updateUser(user)
    }
  }
})();
