(function () {
  'use strict';

  angular
    .module('app.common')
    .factory('statusNotificationService', statusNotificationService);

  function statusNotificationService() {
    let directiveScope;

    return {
      showLoadingSpinner,
      hideLoadingSpinner,
      showSavingSpinner,
      hideSavingSpinner,
      showDeletingSpinner,
      hideDeletingSpinner,
      showSuccessMessage,
      showErrorMessage,
      setDirectiveScope
    };

    function setDirectiveScope(scope) {
      directiveScope = scope;
    }

    function showLoadingSpinner() {
      directiveScope.isLoadingSpinnerShown = true;
    }

    function hideLoadingSpinner() {
      directiveScope.isLoadingSpinnerShown = false;
    }

    function showSavingSpinner() {
      directiveScope.isSavingSpinnerShown = true;
    }

    function hideSavingSpinner() {
      directiveScope.isSavingSpinnerShown = false;
    }

    function showDeletingSpinner() {
      directiveScope.isDeletingSpinnerShown = true;
    }

    function hideDeletingSpinner() {
      directiveScope.isDeletingSpinnerShown = false;
    }

    function showSuccessMessage(message) {
      directiveScope.showSuccessMessage( message);
    }

    function showErrorMessage(message) {
      directiveScope.showErrorMessage(message);
    }
  }

})();
