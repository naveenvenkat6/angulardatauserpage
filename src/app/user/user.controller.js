(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['$stateParams', 'userService', 'pagerService' , 'modalService', '$state', 'statusNotificationService', '$rootScope'];

  //////////////

  function UserCtrl($stateParams, userService, pagerService, modalService, $state, statusNotificationService, $rootScope) {
    const vm = this;
    vm.list = list;
    vm.update = update;
    vm.get = get;
    vm.deleteUserFromList = deleteUserFromList;
    vm.deleteUsers = deleteUsers;
    vm.selectedUsers = [];
    vm.isAnyUserSelected = isAnyUserSelected;
    vm.toggleUserSelection = toggleUserSelection;
    vm.pager = {};
    vm.setPage = setPage;
    vm.cancelUpdate = cancelUpdate;
    vm.downloadUsers = downloadUsers;
    vm.getCsvHeader = getCsvHeader;
    vm.getCsvColumns = getCsvColumns;
    vm.date = new Date().getTime();

    const userUpdateCancelModalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Update User',
      bodyText: 'There are unsaved changes. Are you sure you want to cancel this update ?'
    };

    const deleteUserModalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Remove Users',
      bodyText: 'Are you sure you want to delete selected users ?'
    };


    function list() {
      userService.list()
        .then(users => {
              vm.totalUsers = _.sortBy(users, 'id')
              vm.setPage(1);
          }
        );
    }

    function get() {
      userService.get($stateParams.userId)
        .then(user => {
          vm.user = user
          }
        );
    }

    function update(isValid) {
      if (!isValid) { return; }
      userService.update(vm.user).then((user)=> {
        $state.go('users')
        statusNotificationService.showSuccessMessage(`${vm.user.firstName} updated successfully.`);
      });
    }

    function cancelUpdate(userForm) {
      if (userForm.$dirty) {
        openUserUpdateCancelConfirmationModal()
            .then(clickedButton => {
              if (clickedButton === 'ok') {
                $state.go('users')
              }
        });
      } else {
        $state.go('users');
      }

    }

    function openUserUpdateCancelConfirmationModal() {
      userUpdateCancelModalOptions.headerText = 'Cancel Update';
      return modalService.showModal({}, userUpdateCancelModalOptions);
    }

    function deleteUserFromList(index) {
      vm.list();
    }

    function deleteUsers() {
      openDeleteConfirmationModal()
        .then(clickedButton => {
          if (clickedButton === 'ok') {
            performDelete()
          }
      });
    }

    function downloadUsers() {
       return userService.getUsersByIds(vm.selectedUsers)
          .then((users) => {
          statusNotificationService.showSuccessMessage(`Selected users downloaded successfully.`);
          vm.selectedUsers = [];
          $rootScope.$broadcast('downloadSuccess');
          return users;
        });
    }

    function performDelete() {
        userService.deleteUsers(vm.selectedUsers)
          .then(() => {
            statusNotificationService.showSuccessMessage(`Selected users deleted successfully.`);
            vm.selectedUsers = [];
            vm.list();
        });
    }

    function openDeleteConfirmationModal() {
      deleteUserModalOptions.headerText = 'Delete Users?';
      return modalService.showModal({}, deleteUserModalOptions);
    }

    function isAnyUserSelected() {
        return vm.selectedUsers.length > 0;
    };

    function toggleUserSelection(user) {
        var index = vm.selectedUsers.indexOf(user.id);
        if (index > -1) {
         vm.selectedUsers.splice(index, 1);
        } else {
         vm.selectedUsers.push(user.id);
        }
    };

    function setPage(page) {
        if (page < 1 || page > vm.pager.totalPages) {
            return;
        }
        vm.pager = pagerService.getPager(vm.totalUsers.length, page);
        vm.users = vm.totalUsers.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
    }

    function getCsvHeader() {
        return ["Id", "First Name", "Last Name", "Email", "Country", "Date of Birth"]
    }

    function getCsvColumns() {
        return ['id', 'First Name', 'Last Name', 'Email', 'Country', 'Date of Birth'];
    };
  }

})();
