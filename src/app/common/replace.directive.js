// bootstrap structure broken if we use ng-include and styles are not applying properly. This custom directive replace entire element with inner html structure - Jagadeesh Manne - 08/17/2016
'use strict';

angular.module('app').directive("replace", function () {
  return {
    restrict: 'A',
    link: function (scope, el) {
      el.replaceWith(el.children());
    }
  };
});
