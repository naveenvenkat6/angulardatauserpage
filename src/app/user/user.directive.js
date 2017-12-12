'use strict';
(function () {

  angular.module('app')
    .directive("userRow", userDirective);

  userDirective.$inject = ['userService', 'API_URL', 'modalService', '$state', 'statusNotificationService', '$rootScope'];
  //////////////

  function userDirective(userService, API_URL, modalService, $state, statusNotificationService, $rootScope) {
    return {
      restrict: 'E',
      templateUrl: 'user/user.directive.html',
      scope: {
        user: '=',
        onDelete: '=',
        onSelect: '=',
        index: '=',
        selectedUsersLength: '='
      },
      link: function (scope) {

        scope.deleteUser = deleteUser;
        scope.showDetails = showDetails;
        scope.closeDetailsDialog = closeDetailsDialog;
        scope.edit = edit;
        scope.toggleSelection = toggleSelection;

        const deleteUserModalOptions = {
          closeButtonText: 'Cancel',
          actionButtonText: 'Remove User',
          bodyText: 'Are you sure you want to delete this user ?'
        };

        const showUserModalDefaults = {
              animation: true,
              templateUrl: 'user/user-details.modal.html',
              scope: scope,
              size: 'md'
        };

        function deleteUser() {
          openDeleteConfirmationModal()
            .then(clickedButton => {
              if (clickedButton === 'ok') {
                performDelete()
              }
          });
        }

        function performDelete() {
            userService.deleteUser(scope.user.id)
              .then(() => {
                scope.onDelete(scope.index);
                scope.selectedUsers = [];
                statusNotificationService.showSuccessMessage(scope.user.firstName + ` deleted successfully.`);
              });
        }

        function openDeleteConfirmationModal() {
          deleteUserModalOptions.headerText = 'Delete ' + scope.user.firstName + ' ?';
          return modalService.showModal({}, deleteUserModalOptions);
        }

        function showDetails() {
          scope.user.age = moment().diff(moment(scope.user.dateOfBirth), 'years')
          modalService.showModal(showUserModalDefaults, {});
        }

        function edit() {
          $state.go('usersEdit', {userId: scope.user.id})
        }

        function closeDetailsDialog() {
          modalService.cancelModal();
        }

        function toggleSelection(){
            scope.onSelect(scope.user);
        }

        $rootScope.$on('downloadSuccess', function(){
            scope.selectedUsers = [];
        })
      }
    };
  }
})();
