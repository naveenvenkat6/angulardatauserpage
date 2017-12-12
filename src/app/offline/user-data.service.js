(function () {
  'use strict';
  angular.module('app')
  .factory('userDataService', userDataService);

  userDataService.$inject = ['$http', '$q'];

  function userDataService($http, $q) {
    let usersList = {};
    const userData = {};

    return {
      getJSONData,
      getUser,
      getUsers,
      getUsersByIds,
      deleteUser,
      deleteUsers,
      updateUser,
      initializeAllUserDataOnAppStart
    };

    function initializeAllUserDataOnAppStart() {
      getJSONData()
        .then(users => {
          usersList = users;
          users.forEach((user, userIndex) => {
            userData[user.id] = user;
          });
        })
    }

    function getJSONData() {
      return $http.get(`${getRelativePath()}/users.json`, { cache: true })
        .then(response => {
          return response.data;
        });
    }

    function getRelativePath() {
        return "../data"
    }

    function promisifyStoredData(data) {
      const deffered = $q.defer();
      deffered.resolve(data);
      return deffered.promise;
    }

    function getUsers() {
      return promisifyStoredData(usersList);
    }

    function getUsersByIds(userIds) {
       const users = usersList.filter( function( user ) {
         return userIds.indexOf( user.id ) != -1;
       });
       return promisifyStoredData(users);
    }

    function getUser(userId) {
      return promisifyStoredData(userData[userId]);
    }

    function deleteUser(userId) {
      const user = _.findWhere(usersList, {id: userId});
      usersList = _.without(usersList, user);
      return promisifyStoredData({});
    }

    function deleteUsers(userIds) {
      const users = usersList.filter(function(e){
        return userIds.indexOf(e.id) != -1;
      });
      console.log(users.length);
      _.each(users,function(user,index){
        usersList = _.without(usersList, user);
      });
      return promisifyStoredData({});
    }

    function updateUser(user) {
     const existingUser = _.findWhere(usersList, {id: user.id});
     usersList = _.without(usersList, user);
     Object.assign(existingUser, user);
     usersList.push(user);
     return promisifyStoredData(user);
    }
  }

})();
