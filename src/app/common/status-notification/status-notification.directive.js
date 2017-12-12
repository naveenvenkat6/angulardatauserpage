(function () {
'use strict';

  angular.module('app.common')
    .directive("statusNotification", statusNotification);

  statusNotification.$inject = [ 'statusNotificationService'];
  //////////////

  function statusNotification(statusNotificationService) {
    return {
      restrict: 'E',
      templateUrl: 'common/status-notification/status-notification.directive.html',
      scope: {},
      link: function (scope) {
        statusNotificationService.setDirectiveScope(scope);

        scope.hideAlert = hideAlert;
        scope.showSuccessMessage = showSuccessMessage;
        scope.showErrorMessage = showErrorMessage;

        function showSuccessMessage(message) {
          scope.alertMessage = message;
          scope.isAlertShown = true;
          scope.alertType = 'success';
        }

        function showErrorMessage(message) {
          scope.alertMessage = message;
          scope.isAlertShown = true;
          scope.alertType = 'danger';
        }

        function hideAlert() {
          scope.isAlertShown = false;
        }
      }
    };
  }

})();
